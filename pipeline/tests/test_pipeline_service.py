import pytest
import asyncio
from unittest.mock import AsyncMock, MagicMock, patch
from uuid import UUID, uuid4
from datetime import datetime, timedelta, timezone

from freezegun import freeze_time

from models.pipeline import (
    Pipeline,
    PipelineCreate,
    PipelineConfig,
    RunFrequency,
    PipelineStatus,
)
from models.ingestion import (
    IngestorInput,
    IngestSourceConfig,
    SourceType,
    ApiConfig,
)
from services.pipeline_service import PipelineService
from stores.base import PipelineStore
from scheduler.manager import SchedulerManager
from scheduler.utils import calculate_next_run

pytestmark = pytest.mark.asyncio

# --- Fixtures ---


@pytest.fixture
def mock_store(mocker) -> AsyncMock:
    """Fixture for a mocked PipelineStore."""
    mock = mocker.patch("stores.base.PipelineStore", spec=PipelineStore)
    mock.save = AsyncMock(return_value=None)
    mock.get = AsyncMock(return_value=None)
    mock.get_all = AsyncMock(return_value=[])
    mock.delete = AsyncMock(return_value=False)
    return mock


@pytest.fixture
def mock_scheduler(mocker) -> AsyncMock:
    """Fixture for a mocked SchedulerManager."""
    mock = mocker.patch("scheduler.manager.SchedulerManager", spec=SchedulerManager)
    mock.schedule_pipeline = AsyncMock(return_value=None)
    mock.reschedule_pipeline = AsyncMock(return_value=None)
    mock.unschedule_pipeline = AsyncMock(return_value=None)

    # NOTE: add other methods if the service starts calling them
    return mock


@pytest.fixture
def pipeline_service(mock_store, mock_scheduler) -> PipelineService:
    """Fixture for PipelineService instance with mocked dependencies."""
    service = PipelineService(store=mock_store, scheduler_manager=mock_scheduler)

    # NOTE: if has internal methods to mock (like actual execution logic)
    # NOTE: you might patch them here or within specific tests using mocker.patch.object

    return service


@pytest.fixture
def sample_ingestor_input() -> IngestorInput:
    """Sample IngestorInput for creating pipelines."""
    return IngestorInput(
        sources=[
            IngestSourceConfig(
                type=SourceType.API, config=ApiConfig(url="http://example.com/api")
            )
        ]
    )


@pytest.fixture
def sample_pipeline_config(sample_ingestor_input) -> PipelineConfig:
    """Sample PipelineConfig."""
    return PipelineConfig(
        ingestor_config=sample_ingestor_input,
        run_frequency=RunFrequency.DAILY,
        last_run=None,
        next_run=None,
    )


@pytest.fixture
def sample_pipeline(sample_pipeline_config) -> Pipeline:
    """Sample Pipeline object."""
    now = datetime.now(timezone.utc)
    pid = uuid4()
    next_run = calculate_next_run(sample_pipeline_config.run_frequency, None, now)
    return Pipeline(
        id=pid,
        name="Test Pipeline",
        description="A pipeline for testing",
        config=sample_pipeline_config.model_copy(
            update={"next_run": next_run}
        ),  # Use updated config
        status=PipelineStatus.INACTIVE,
        created_at=now - timedelta(hours=1),
        updated_at=now - timedelta(minutes=30),
    )


@pytest.fixture
def sample_pipeline_create(sample_pipeline_config) -> PipelineCreate:
    """Sample PipelineCreate object for updates/creations."""
    return PipelineCreate(
        name="New Test Pipeline",
        description="Creating a pipeline",
        config=sample_pipeline_config,
    )


# --- Test Cases ---

FROZEN_TIME = datetime(2025, 5, 12, 12, 30, 0, tzinfo=timezone.utc)  # NOTE: 7:30 PM +07


@freeze_time(FROZEN_TIME)
async def test_create_pipeline_success(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    mock_scheduler: AsyncMock,
    sample_ingestor_input: IngestorInput,
):
    """Test successful pipeline creation."""
    name = "My New Pipeline"
    description = "Test description"
    frequency = RunFrequency.WEEKLY

    expected_next_run = calculate_next_run(frequency, None, FROZEN_TIME)

    created_pipeline = await pipeline_service.create_pipeline(
        name=name,
        description=description,
        ingestor_config=sample_ingestor_input,
        run_frequency=frequency,
    )

    assert created_pipeline is not None
    assert created_pipeline.name == name
    assert created_pipeline.description == description
    assert created_pipeline.config.run_frequency == frequency
    assert created_pipeline.config.ingestor_config == sample_ingestor_input
    assert created_pipeline.status == PipelineStatus.INACTIVE
    assert created_pipeline.created_at == FROZEN_TIME
    assert created_pipeline.updated_at == FROZEN_TIME
    assert created_pipeline.config.last_run is None
    assert created_pipeline.config.next_run == expected_next_run
    assert isinstance(created_pipeline.id, UUID)

    mock_store.save.assert_awaited_once()
    saved_pipeline_arg = mock_store.save.call_args[0][0]
    assert isinstance(saved_pipeline_arg, Pipeline)
    assert saved_pipeline_arg.id == created_pipeline.id
    assert saved_pipeline_arg.config.next_run == expected_next_run

    # Verify scheduler interaction (using create_task, so check if called)
    # We check if schedule_pipeline was called with the created pipeline object
    await asyncio.sleep(0)  # Allow create_task to potentially run
    mock_scheduler.schedule_pipeline.assert_awaited_once_with(created_pipeline)


async def test_create_pipeline_store_error(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    mock_scheduler: AsyncMock,
    sample_ingestor_input: IngestorInput,
):
    """Test pipeline creation when store save fails."""
    mock_store.save.side_effect = Exception("Database connection error")

    with pytest.raises(Exception, match="Database connection error"):
        await pipeline_service.create_pipeline(
            name="Fail Pipeline",
            description="This should fail",
            ingestor_config=sample_ingestor_input,
            run_frequency=RunFrequency.DAILY,
        )

    # Ensure scheduler was NOT called if store save failed
    mock_scheduler.schedule_pipeline.assert_not_awaited()


@freeze_time(FROZEN_TIME)
async def test_update_pipeline_success_no_freq_change(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    mock_scheduler: AsyncMock,
    sample_pipeline: Pipeline,
):
    """Test successful update without changing run frequency."""
    mock_store.get.return_value = sample_pipeline

    update_payload = PipelineCreate(
        name="Updated Name",
        description="Updated Description",
        config=sample_pipeline.config,
    )

    updated_pipeline = await pipeline_service.update_pipeline(
        sample_pipeline.id, update_payload
    )

    assert updated_pipeline is not None
    assert updated_pipeline.id == sample_pipeline.id
    assert updated_pipeline.name == "Updated Name"
    assert updated_pipeline.description == "Updated Description"
    assert updated_pipeline.config.run_frequency == sample_pipeline.config.run_frequency
    assert updated_pipeline.config.next_run == sample_pipeline.config.next_run
    assert updated_pipeline.created_at == sample_pipeline.created_at

    mock_store.get.assert_awaited_once_with(sample_pipeline.id)
    mock_store.save.assert_awaited_once()
    saved_pipeline_arg = mock_store.save.call_args[0][0]
    assert saved_pipeline_arg.id == sample_pipeline.id
    assert saved_pipeline_arg.name == "Updated Name"
    assert saved_pipeline_arg.config.next_run == sample_pipeline.config.next_run

    # Verify scheduler interaction (should still be called if config changes, even if freq doesn't)
    await asyncio.sleep(0)
    mock_scheduler.reschedule_pipeline.assert_awaited_once_with(updated_pipeline)


@freeze_time(FROZEN_TIME)
async def test_update_pipeline_success_with_freq_change(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    mock_scheduler: AsyncMock,
    sample_pipeline: Pipeline,  # Existing pipeline (Daily frequency)
    sample_ingestor_input: IngestorInput,
):
    """Test successful update changing run frequency."""
    mock_store.get.return_value = sample_pipeline
    original_next_run = sample_pipeline.config.next_run

    new_config = PipelineConfig(
        ingestor_config=sample_ingestor_input,
        run_frequency=RunFrequency.MONTHLY,
        last_run=sample_pipeline.config.last_run,
    )
    update_payload = PipelineCreate(
        name=sample_pipeline.name,
        description=sample_pipeline.description,
        config=new_config,
    )

    # Calculate expected next run for MONTHLY based on FROZEN_TIME and no last_run
    expected_new_next_run = calculate_next_run(
        RunFrequency.MONTHLY, sample_pipeline.config.last_run, FROZEN_TIME
    )

    updated_pipeline = await pipeline_service.update_pipeline(
        sample_pipeline.id, update_payload
    )

    assert updated_pipeline is not None
    assert updated_pipeline.id == sample_pipeline.id
    assert updated_pipeline.config.run_frequency == RunFrequency.MONTHLY
    assert updated_pipeline.config.next_run != original_next_run
    assert updated_pipeline.config.next_run == expected_new_next_run

    mock_store.get.assert_awaited_once_with(sample_pipeline.id)
    mock_store.save.assert_awaited_once()
    saved_pipeline_arg = mock_store.save.call_args[0][0]
    assert saved_pipeline_arg.config.run_frequency == RunFrequency.MONTHLY
    assert saved_pipeline_arg.config.next_run == expected_new_next_run

    await asyncio.sleep(0)
    mock_scheduler.reschedule_pipeline.assert_awaited_once_with(updated_pipeline)


async def test_update_pipeline_not_found(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    mock_scheduler: AsyncMock,
    sample_pipeline_create: PipelineCreate,
):
    """Test updating a pipeline that doesn't exist."""
    non_existent_id = uuid4()
    mock_store.get.return_value = None

    updated_pipeline = await pipeline_service.update_pipeline(
        non_existent_id, sample_pipeline_create
    )

    assert updated_pipeline is None
    mock_store.get.assert_awaited_once_with(non_existent_id)
    mock_store.save.assert_not_awaited()
    mock_scheduler.reschedule_pipeline.assert_not_awaited()


async def test_delete_pipeline_success(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    mock_scheduler: AsyncMock,
    sample_pipeline: Pipeline,
):
    """Test successful pipeline deletion."""
    mock_store.delete.return_value = True
    mock_store.get.return_value = sample_pipeline

    pipeline_id = sample_pipeline.id
    deleted = await pipeline_service.delete_pipeline(pipeline_id)

    assert deleted is True
    call_order = MagicMock()
    call_order.attach_mock(mock_scheduler.unschedule_pipeline, "scheduler_unschedule")
    call_order.attach_mock(mock_store.delete, "store_delete")

    mock_scheduler.unschedule_pipeline.assert_awaited_once_with(pipeline_id)
    mock_store.delete.assert_awaited_once_with(pipeline_id)

    # NOTE: can check call order hear
    # assert call_order.mock_calls == [
    #     mocker.call.scheduler_unschedule(pipeline_id),
    #     mocker.call.store_delete(pipeline_id),
    # ]


async def test_delete_pipeline_not_found(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    mock_scheduler: AsyncMock,
):
    """Test deleting a pipeline that doesn't exist."""
    non_existent_id = uuid4()
    mock_store.get.return_value = None
    mock_store.delete.return_value = False

    deleted = await pipeline_service.delete_pipeline(non_existent_id)

    assert deleted is False

    # Verify interactions:
    mock_store.get.assert_awaited_once_with(non_existent_id)  # Verify get was checked
    # Scheduler should NOT be called if pipeline wasn't found by get
    mock_scheduler.unschedule_pipeline.assert_not_awaited()
    # Store delete should NOT be called if pipeline wasn't found by get
    mock_store.delete.assert_not_awaited()


async def test_get_pipeline_success(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    sample_pipeline: Pipeline,
):
    """Test getting an existing pipeline."""
    mock_store.get.return_value = sample_pipeline
    pipeline_id = sample_pipeline.id

    result = await pipeline_service.get_pipeline(pipeline_id)

    assert result == sample_pipeline
    mock_store.get.assert_awaited_once_with(pipeline_id)


async def test_get_pipeline_not_found(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
):
    """Test getting a non-existent pipeline."""
    mock_store.get.return_value = None
    pipeline_id = uuid4()

    result = await pipeline_service.get_pipeline(pipeline_id)

    assert result is None
    mock_store.get.assert_awaited_once_with(pipeline_id)


async def test_list_pipelines(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    sample_pipeline: Pipeline,
):
    """Test listing pipelines."""
    pipelines_list = [
        sample_pipeline,
        sample_pipeline.model_copy(update={"id": uuid4(), "name": "Another Pipeline"}),
    ]
    mock_store.get_all.return_value = pipelines_list

    result = await pipeline_service.list_pipelines()

    assert result == pipelines_list
    mock_store.get_all.assert_awaited_once()


# --- Tests for run_pipeline ---


async def test_run_pipeline_not_found(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
):
    """Test running a pipeline that doesn't exist."""
    mock_store.get.return_value = None
    pipeline_id = uuid4()

    # Patch the internal execution method just in case, although it shouldn't be reached
    with patch.object(
        pipeline_service, "_execute_ingestion", new_callable=AsyncMock
    ) as mock_exec:
        await pipeline_service.run_pipeline(pipeline_id)

    mock_store.get.assert_awaited_once_with(pipeline_id)
    mock_store.save.assert_not_awaited()
    mock_exec.assert_not_awaited()


async def test_run_pipeline_already_active(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    sample_pipeline: Pipeline,
):
    """Test running a pipeline that is already in ACTIVE status."""
    active_pipeline = sample_pipeline.model_copy(
        update={"status": PipelineStatus.ACTIVE}
    )
    mock_store.get.return_value = active_pipeline
    pipeline_id = active_pipeline.id

    with patch.object(
        pipeline_service, "_execute_ingestion", new_callable=AsyncMock
    ) as mock_exec:
        await pipeline_service.run_pipeline(pipeline_id)

    mock_store.get.assert_awaited_once_with(pipeline_id)
    mock_store.save.assert_not_awaited()
    mock_exec.assert_not_awaited()


@freeze_time(FROZEN_TIME)
async def test_run_pipeline_success(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    mock_scheduler: AsyncMock,
    sample_pipeline: Pipeline,
    mocker,
):
    """Test a successful pipeline run."""
    pipeline_id = sample_pipeline.id

    # --- Setup Mock Responses ---
    # 1. Initial get returns the inactive pipeline
    # 2. Second get (after execution) returns the pipeline again (simulate no external changes)
    mock_store.get.side_effect = [
        sample_pipeline,
        sample_pipeline.model_copy(update={"status": PipelineStatus.ACTIVE}),
    ]

    # --- Patch Internal Execution Logic ---
    mock_execute_ingestion = mocker.patch.object(
        pipeline_service, "_execute_ingestion", new_callable=AsyncMock
    )
    mock_execute_ingestion.return_value = None

    # --- Execute ---
    await pipeline_service.run_pipeline(pipeline_id)

    # --- Assertions ---

    # Verify get calls
    assert mock_store.get.await_count == 2
    mock_store.get.assert_any_await(pipeline_id)

    # Verify execution logic was called
    mock_execute_ingestion.assert_awaited_once()  # Check if the core logic ran

    # Verify save calls (should be 2: one for ACTIVE, one for INACTIVE+updates)
    assert mock_store.save.await_count == 2

    # Check the first save call (setting status to ACTIVE)
    call1_args = mock_store.save.await_args_list[0][0]
    saved_pipeline_active: Pipeline = call1_args[0]
    assert saved_pipeline_active.id == pipeline_id
    assert saved_pipeline_active.status == PipelineStatus.ACTIVE

    # Check the second save call (setting status to INACTIVE and updating times)
    call2_args = mock_store.save.await_args_list[1][0]
    saved_pipeline_final: Pipeline = call2_args[0]
    assert saved_pipeline_final.id == pipeline_id
    assert saved_pipeline_final.status == PipelineStatus.INACTIVE
    assert (
        saved_pipeline_final.config.last_run == FROZEN_TIME
    )  # Should be updated to now
    # Verify next_run was recalculated based on the new last_run time
    expected_next_run_after_success = calculate_next_run(
        saved_pipeline_final.config.run_frequency,
        FROZEN_TIME,  # The new last_run
        FROZEN_TIME,
    )
    assert saved_pipeline_final.config.next_run == expected_next_run_after_success
    # assert (
    #     saved_pipeline_final.config.next_run != original_next_run
    # )  # Ensure it changed

    # Verify scheduler notification for reschedule after completion
    await asyncio.sleep(0)  # Allow create_task to run
    mock_scheduler.reschedule_pipeline.assert_awaited_once_with(saved_pipeline_final)


@freeze_time(FROZEN_TIME)
async def test_run_pipeline_execution_fails(
    pipeline_service: PipelineService,
    mock_store: AsyncMock,
    mock_scheduler: AsyncMock,
    sample_pipeline: Pipeline,
    mocker,
):
    """Test a pipeline run where the internal execution logic fails."""
    pipeline_id = sample_pipeline.id

    # --- Setup Mock Responses ---
    mock_store.get.side_effect = [
        sample_pipeline,
        sample_pipeline.model_copy(update={"status": PipelineStatus.ACTIVE}),
    ]

    # --- Patch Internal Execution Logic to Raise Error ---
    mock_execute_ingestion = mocker.patch.object(
        pipeline_service, "_execute_ingestion", new_callable=AsyncMock
    )
    execution_error = ValueError("Something went wrong during ingestion")
    mock_execute_ingestion.side_effect = execution_error

    # --- Execute ---
    # The service currently catches the exception and logs it, but doesn't re-raise.
    # If it re-raised, we'd wrap this in pytest.raises.
    await pipeline_service.run_pipeline(pipeline_id)

    # --- Assertions ---

    # Verify get calls
    assert mock_store.get.await_count == 2
    mock_store.get.assert_any_await(pipeline_id)

    # Verify execution logic was called and raised error
    mock_execute_ingestion.assert_awaited_once()

    # Verify save calls (should be 2: one for ACTIVE, one for INACTIVE after failure)
    assert mock_store.save.await_count == 2

    # Check the first save call (setting status to ACTIVE)
    call1_args = mock_store.save.await_args_list[0][0]
    saved_pipeline_active: Pipeline = call1_args[0]
    assert saved_pipeline_active.status == PipelineStatus.ACTIVE

    # Check the second save call (setting status back to INACTIVE, NO last_run update)
    call2_args = mock_store.save.await_args_list[1][0]
    saved_pipeline_final: Pipeline = call2_args[0]
    assert saved_pipeline_final.id == pipeline_id
    assert saved_pipeline_final.status == PipelineStatus.FAILED
    # ! IMPORTANT: last_run should NOT be updated on failure
    assert saved_pipeline_final.config.last_run == sample_pipeline.config.last_run
    # Next run should be recalculated based on the *original* last_run
    expected_next_run_after_fail = calculate_next_run(
        saved_pipeline_final.config.run_frequency,
        sample_pipeline.config.last_run,  # Use original last_run
        FROZEN_TIME,
    )
    assert saved_pipeline_final.config.next_run == expected_next_run_after_fail

    # Verify scheduler notification for reschedule even after failure
    await asyncio.sleep(0)
    mock_scheduler.reschedule_pipeline.assert_awaited_once_with(saved_pipeline_final)
