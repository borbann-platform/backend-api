import logging
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings

logger = logging.getLogger(__name__)

# Define a base for declarative models
Base = declarative_base()

# Create the async engine
try:
    engine = create_async_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,
        # echo=True, # Uncomment for debugging SQL statements
    )
    logger.info("Database engine created successfully.")
except Exception as e:
    logger.error(f"Failed to create database engine: {e}", exc_info=True)
    # Depending on the application, you might want to exit here
    # sys.exit(1)
    engine = None  # Ensure engine is None if creation failed

# Create a sessionmaker
if engine:
    AsyncSessionFactory = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
else:
    AsyncSessionFactory = None  # No factory if engine failed


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency to get an async database session."""
    if not AsyncSessionFactory:
        logger.error("Database session factory not configured.")
        raise RuntimeError("Database not configured.")

    async with AsyncSessionFactory() as session:
        # Optional: Start transaction (though commit/rollback might happen elsewhere)
        # async with session.begin():
        try:
            yield session
            # If not using 'async with session.begin()', you might commit here
            # await session.commit()
        except Exception:
            logger.exception("Session rollback due to exception")
            await session.rollback()
            raise
        finally:
            # Close is handled by the context manager 'async with AsyncSessionFactory()'
            pass


async def check_db_connection() -> bool:
    """Optional function to check DB connection on startup."""
    if not engine:
        return False
    try:
        async with engine.connect() as connection:
            # You can execute a simple query like "SELECT 1" if needed
            logger.info("Database connection verified.")
            return True
    except Exception as e:
        logger.error(f"Database connection failed: {e}", exc_info=True)
        return False
