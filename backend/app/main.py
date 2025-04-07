import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.api.v1.endpoints import api_router
from app.core.db import check_db_connection  # Optional DB check

# --- Logging Configuration ---
# Basic config, consider more advanced setup (JSON, handlers) for production
logging.basicConfig(level=settings.LOG_LEVEL.upper(), format='%(levelname)s:     %(name)s - %(message)s')
logger = logging.getLogger(__name__)


# --- Lifespan Management ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    logger.info("Application startup...")
    # Example: Check DB connection (using dummy core.db function)
    # if not await check_db_connection():
    #     logger.critical("Database connection failed on startup. Check config/connections.")
    # Decide if this is fatal. In dummy mode, we probably continue.
    # sys.exit(1) # Or raise RuntimeError

    # Example: Placeholder for loading ML models, external resources, etc.
    # app.state.ml_model = load_my_model()
    logger.info("Dummy startup tasks complete.")

    yield  # Application runs here

    # Shutdown logic
    logger.info("Application shutdown...")
    # Example: Clean up resources
    # if hasattr(app.state, 'ml_model'):
    #     app.state.ml_model.cleanup()
    # Optional: Dispose DB engine explicitly if needed (often handled by context managers)
    # from app.core.db import engine
    # if engine: await engine.dispose()
    logger.info("Dummy shutdown tasks complete.")


# --- FastAPI Application Instance ---
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    version="0.1.0",  # Example version
    description="Dummy API for Borbann Data Pipeline",
    lifespan=lifespan,
)


# --- Global Exception Handler Example ---
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    # Log the full error internally
    logger.error(f"Unhandled exception for request {request.url}: {exc}", exc_info=True)
    # Return a generic error response to the client
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred."},
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    # Default handler for FastAPI's own HTTPExceptions
    # You might want to log these as well, depending on the status code
    logger.warning(f"HTTP Exception: Status={exc.status_code}, Detail={exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers=exc.headers,
    )


# --- Mount API Router ---
app.include_router(api_router, prefix=settings.API_V1_STR)


# --- Root Endpoint ---
@app.get("/", tags=["Root"], summary="Root endpoint")
async def read_root():
    """Simple root endpoint providing basic info."""
    return {"message": f"Welcome to {settings.PROJECT_NAME} (Dummy Version)"}


# --- Middleware (Example: CORS) ---
# from fastapi.middleware.cors import CORSMiddleware
# origins = [
#     "http://localhost:3000", # Allow frontend dev server
#     # Add production frontend URL here
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
