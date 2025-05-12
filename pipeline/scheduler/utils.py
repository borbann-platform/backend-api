"""
Helper for calculating next run times
"""

from datetime import datetime, timedelta

from loguru import logger
import pytz

from models.pipeline import RunFrequency

UTC = pytz.utc


def calculate_next_run(
    frequency: RunFrequency,
    last_run: datetime | None = None,
    start_reference_time: datetime | None = None,
) -> datetime | None:
    """
    Calculates the next scheduled run time based on frequency and last run.

    Args:
        frequency: The desired run frequency (DAILY, WEEKLY, MONTHLY).
        last_run: The timestamp of the last successful run (must be timezone-aware, preferably UTC).
        start_reference_time: The time to calculate from if last_run is None (timezone-aware, UTC).

    Returns:
        A timezone-aware datetime object (UTC) for the next run, or None if frequency is invalid.
    """
    if start_reference_time is None:
        start_reference_time = datetime.now(UTC)
    elif start_reference_time.tzinfo is None:
        logger.warning(
            "calculate_next_run received naive start_reference_time, assuming UTC."
        )
        start_reference_time = UTC.localize(start_reference_time)
    else:
        start_reference_time = start_reference_time.astimezone(UTC)

    # Ensure last_run is timezone-aware (UTC) if provided
    if last_run:
        if last_run.tzinfo is None:
            logger.warning(
                f"calculate_next_run received naive last_run ({last_run}), assuming UTC."
            )
            base_time = UTC.localize(last_run)
        else:
            base_time = last_run.astimezone(UTC)
    else:
        # If never run, calculate the *first* run time relative to now
        base_time = start_reference_time

    try:
        next_run_time: datetime | None = None
        if frequency == RunFrequency.DAILY:
            # If last run was today (UTC), schedule for tomorrow. Otherwise, schedule for today (or next occurrence).
            target_date = base_time.date()
            if (
                last_run
                and last_run.astimezone(UTC).date() >= start_reference_time.date()
            ):
                target_date += timedelta(days=1)
            # Schedule for midnight UTC of the target date
            next_run_time = datetime(
                target_date.year,
                target_date.month,
                target_date.day,
                0,
                0,
                0,
                tzinfo=UTC,
            )

        elif frequency == RunFrequency.WEEKLY:
            # Schedule for start of the next week (e.g., Monday 00:00 UTC)
            days_until_next_monday = (7 - base_time.weekday()) % 7
            # If today is Monday and we haven't run yet this week OR last run was before this Monday
            run_this_week = True
            if last_run:
                last_run_monday = last_run.astimezone(UTC) - timedelta(
                    days=last_run.weekday()
                )
                this_monday = start_reference_time - timedelta(
                    days=start_reference_time.weekday()
                )
                if last_run_monday.date() >= this_monday.date():
                    run_this_week = False

            if (
                days_until_next_monday == 0 and not run_this_week
            ):  # It's Monday, but we ran >= this Monday
                days_until_next_monday = 7  # Schedule for next week

            target_date = (base_time + timedelta(days=days_until_next_monday)).date()
            next_run_time = datetime(
                target_date.year,
                target_date.month,
                target_date.day,
                0,
                0,
                0,
                tzinfo=UTC,
            )

        elif frequency == RunFrequency.MONTHLY:
            # Schedule for start of the next month (1st day, 00:00 UTC)
            current_year = base_time.year
            current_month = base_time.month
            run_this_month = True

            if last_run:
                last_run_start_of_month = last_run.astimezone(UTC).replace(
                    day=1, hour=0, minute=0, second=0, microsecond=0
                )
                this_start_of_month = start_reference_time.replace(
                    day=1, hour=0, minute=0, second=0, microsecond=0
                )
                if last_run_start_of_month.date() >= this_start_of_month.date():
                    run_this_month = False

            if run_this_month:
                # Schedule for the 1st of the *current* month if not already past/run
                target_date = base_time.replace(day=1).date()
                target_dt = datetime(
                    target_date.year,
                    target_date.month,
                    target_date.day,
                    0,
                    0,
                    0,
                    tzinfo=UTC,
                )
                # If the 1st of this month is in the future, or it's today and we haven't run this month
                if target_dt >= start_reference_time:
                    next_run_time = target_dt
                else:  # The 1st has passed this month, schedule for next month
                    run_this_month = False  # Force calculation for next month

            if not run_this_month:
                # Calculate 1st of next month
                next_month = current_month + 1
                next_year = current_year
                if next_month > 12:
                    next_month = 1
                    next_year += 1
                target_date = datetime(next_year, next_month, 1).date()
                next_run_time = datetime(
                    target_date.year,
                    target_date.month,
                    target_date.day,
                    0,
                    0,
                    0,
                    tzinfo=UTC,
                )

        # Ensure calculated time is in the future relative to 'now' if last_run wasn't provided
        if last_run is None and next_run_time and next_run_time <= start_reference_time:
            # If calculated time is in the past based on 'now', recalculate as if last run just happened
            logger.debug(
                f"Initial calculated next_run {next_run_time} is in the past/present for new schedule. Recalculating."
            )
            return calculate_next_run(
                frequency, start_reference_time, start_reference_time
            )

        return next_run_time

    except Exception as e:
        logger.error(
            f"Error calculating next run for frequency {frequency}, last_run {last_run}: {e}"
        )
        return None
