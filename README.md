# Borbann Project

A data integration and analysis platform focused on real estate.

## Project Structure

- `/backend`: Contains the Python FastAPI backend application, background workers, and database models.
- `/frontend`: Contains the Next.js (React/TypeScript) frontend application.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js:** (Specify version, e.g., v20.x or later)
- **pnpm:** (Specify version or `npm install -g pnpm`)
- **Python:** (Specify version, e.g., v3.11 or v3.12, matching `.python-version` if present)
- **Docker:** Latest version
- **Docker Compose:** Latest version (often included with Docker Desktop)
- **Database Client:** (Optional, for direct DB access, e.g., `psql` for PostgreSQL)

## Environment Setup

Both frontend and backend might require environment variables.

1.  **Backend:**
    - Navigate to the `backend` directory: `cd backend`
    - Create a `.env` file by copying `.env.example`: `cp .env.example .env`
    - **Crucially, fill in the required values in `.env`**, especially secrets like database passwords and API keys. **Never commit your `.env` file to Git.**
2.  **Frontend:**
    - Navigate to the `frontend` directory: `cd frontend`
    - Create a `.env.local` file if needed (e.g., for `NEXT_PUBLIC_API_URL`). Copy from `.env.example` if one exists. **Do not commit `.env.local` files containing secrets.**

_(See `.env.example` files in respective directories for required variables)_

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment (recommended)
python -m venv .venv
# Windows:
# .\ .venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies (uses pyproject.toml)
pip install -e .

# Or if requirements.txt is preferred:
# pip install -r requirements.txt

# Set up the database (Run Docker Compose first if DB is containerized)
# Example assuming Alembic migrations (add if you use Alembic)
# alembic upgrade head
```

### 2. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies using pnpm
pnpm install
```

## Running the Application

### Development Mode

You typically need multiple terminals for development.

1.  **Start Docker Services (Database, Redis, etc.):**

    ```bash
    # From the 'backend' directory
    docker-compose up -d db redis # Add other services as needed
    ```

2.  **Start Backend API:**

    ```bash
    # From the 'backend' directory (with virtual env activated)
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

    _(The API will be accessible at http://localhost:8000)_

3.  **Start Celery Worker (if needed for background tasks):**

    ```bash
    # From the 'backend' directory (with virtual env activated)
    celery -A app.workers.celery_app worker --loglevel=info
    ```

4.  **Start Celery Beat (if using scheduled tasks):**

    ```bash
    # From the 'backend' directory (with virtual env activated)
    celery -A app.workers.celery_app beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler
    # Or if not using DB scheduler:
    # celery -A app.workers.celery_app beat --loglevel=info
    ```

5.  **Start Frontend:**
    ```bash
    # From the 'frontend' directory
    pnpm dev
    ```
    _(The frontend will be accessible at http://localhost:3000)_

### Production Mode (Using Docker)

```bash
# Navigate to the 'backend' directory (or project root if compose file is there)
cd backend

# Build the Docker images
docker-compose build

# Start all services in detached mode
docker-compose up -d

# To stop the services
docker-compose down
```

## Building for Production

### Backend

Python code doesn't typically require a separate build step unless you are creating a distributable package. Docker handles the "build" in the context of creating an image.

### Frontend

```bash
# Navigate to the frontend directory
cd frontend

# Create a production build
pnpm build
```

This will create an optimized build in the `.next` directory. Use `pnpm start` to run this build.

## Testing

### Backend

```bash
# Navigate to the backend directory (with virtual env activated)
pytest
```

_(Ensure test database is configured and any necessary test setup is performed)_

### Frontend

```bash
# Navigate to the frontend directory
pnpm test
```

_(Add specific test commands if using Jest, Cypress, etc.)_

## Environment Setup

_(Keep existing instructions, ensure `.env.example` is mentioned)_

## Setup Instructions (Using uv)

`uv` is a fast Python package installer and resolver, usable as a drop-in replacement for `pip` and `venv`.

1.  **Install `uv`:** (If not already installed)

    ```bash
    # Using pipx (recommended)
    pipx install uv
    # Or using pip
    pip install uv
    ```

2.  **Backend Setup (using uv):**

    ```bash
    # Navigate to the backend directory
    cd backend

    # Create virtual environment (uv handles this implicitly often,
    # but explicit creation is good practice for clarity)
    uv venv .venv
    # Activate it
    # Windows: .\.venv\Scripts\activate
    # macOS/Linux: source .venv/bin/activate

    # Install dependencies from pyproject.toml (includes editable install)
    uv pip install -e .

    # Install development dependencies (if defined in pyproject.toml under [project.optional-dependencies])
    # Example: uv pip install -e .[dev]

    # Initialize/Upgrade Database (using Alembic)
    # Ensure DB service is running (e.g., via docker-compose up db)
    # Initialize Alembic (only once per project):
    # alembic init alembic
    # Configure alembic.ini and alembic/env.py (see Alembic docs)

    # Generate a new migration script based on model changes:
    # alembic revision --autogenerate -m "Describe your change here"

    # Apply migrations to the database:
    alembic upgrade head
    ```

3.  **Frontend Setup:**
    _(Keep existing `pnpm install` instructions)_

## Running the Application (using uv)

1.  **Start Docker Services (DB, Redis):**

    ```bash
    # From the 'backend' directory
    docker-compose up -d db redis
    ```

2.  **Activate Backend Environment:**

    ```bash
    # From the 'backend' directory
    # Windows: .\.venv\Scripts\activate
    # macOS/Linux: source .venv/bin/activate
    ```

3.  **Run Backend API (using uv):**

    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    # Or run via uv directly (less common for servers, more for scripts):
    # uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

4.  **Run Celery Worker (using uv):**

    ```bash
    celery -A app.workers.celery_app worker --loglevel=info
    # Or via uv:
    # uv run celery -A app.workers.celery_app worker --loglevel=info
    ```

5.  **Run Celery Beat (using uv, if needed):**

    ```bash
    celery -A app.workers.celery_app beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler # Or without scheduler
    # Or via uv:
    # uv run celery -A app.workers.celery_app beat --loglevel=info --scheduler ...
    ```

6.  **Run Frontend:**
    _(Keep existing `pnpm dev` instructions)_

## Testing (using uv)

````bash
# Navigate to the backend directory
cd backend

# Activate environment
# Windows: .\.venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate

# Run tests using uv (finds pytest if installed)
uv run pytest
# Or explicitly:
# pytest

## Linting and Formatting

### Backend

```bash
# Navigate to the backend directory (with virtual env activated)
# Check formatting
black --check .
# Format code
black .

# Check linting/imports
ruff check .
# Fix linting/imports where possible
ruff check . --fix
````

### Frontend

```bash
# Navigate to the frontend directory
# Check linting
pnpm lint

# Check/Apply formatting (assuming Prettier is setup)
pnpm prettier --check .
pnpm prettier --write .
```

## Deployment

- **Backend:** Can be deployed using Docker containers on services like AWS ECS, Google Cloud Run, Kubernetes, etc. Ensure environment variables are securely managed.
- **Frontend:** The Next.js application can be easily deployed to platforms like Vercel (recommended), Netlify, AWS Amplify, or self-hosted using Node.js or Docker.
