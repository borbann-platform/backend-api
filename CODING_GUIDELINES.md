# Coding Guidelines & Standards

These guidelines aim to ensure code consistency, readability, and maintainability across the Borbann project for both frontend (TypeScript/React) and backend (Python/FastAPI).

## 1. Formatting

- **General:** Code should be consistently formatted. Use automated tools to enforce this.
- **Frontend (TypeScript/React):**
  - Use **Prettier** for code formatting. Configure it (`.prettierrc`) and integrate it with your IDE and pre-commit hooks.
  - Use **ESLint** for linting. The project already has `eslint.config.mjs` based on `next/core-web-vitals`. Ensure rules are agreed upon and enforced.
- **Backend (Python):**
  - Use **Black** for code formatting.
  - Use **Ruff** (or Flake8 + isort) for linting and import sorting. Configure it in `pyproject.toml`.
- **Line Length:** Aim for a maximum line length of ~100-120 characters for better readability, but prioritize clarity over strict adherence. Formatting tools usually handle this.
- **Indentation:** Use 4 spaces for Python, 2 spaces for TypeScript/JSX/CSS/JSON (or configure Prettier as desired). **Do not use tabs.**

## 2. Naming Conventions

- **General:** Use descriptive and meaningful names. Avoid abbreviations unless they are widely understood (e.g., `id`, `url`, `http`).
- **Frontend (TypeScript/React):**
  - **Components:** `PascalCase` (e.g., `UserProfileCard.tsx`).
  - **Variables/Functions:** `camelCase` (e.g., `fetchUserData`, `userName`).
  - **Constants:** `UPPER_SNAKE_CASE` (e.g., `const MAX_USERS = 100;`).
  - **Interfaces/Types:** `PascalCase` (e.g., `interface UserProfileProps`).
  - **Hooks:** Prefix with `use` (`camelCase`, e.g., `useAuthStatus`).
  - **Files:** Match the main export (e.g., `UserProfileCard.tsx` for `UserProfileCard` component). Use `kebab-case` for utility/config files (e.g., `api-client.ts`).
- **Backend (Python):**
  - **Variables/Functions/Methods:** `snake_case` (e.g., `fetch_user_data`, `user_name`).
  - **Classes:** `PascalCase` (e.g., `class DatabaseManager:`).
  - **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES = 3`).
  - **Modules/Packages:** `snake_case` (e.g., `data_processing_service.py`).

## 3. Basic Principles

- **KISS (Keep It Simple, Stupid):** Prefer simple solutions over complex ones.
- **DRY (Don't Repeat Yourself):** Avoid code duplication. Use functions, components, classes, or modules to encapsulate reusable logic.
- **YAGNI (You Aren't Gonna Need It):** Avoid implementing functionality until it's necessary.
- **Readability:** Write code that is easy for others (and your future self) to understand. Use clear variable names, add comments where necessary, and structure code logically.
- **Modularity:** Break down code into smaller, reusable, and testable units (functions, components, classes, modules).
- **Comments:**
  - Explain _why_ something is done, not _what_ it does (the code should explain the 'what').
  - Comment complex logic, workarounds, or important assumptions.
  - Keep comments up-to-date with the code.
  - Use TODO/FIXME comments judiciously for temporary notes.
  - **Python:** Use docstrings for modules, classes, and functions (`"""Docstring goes here."""`).
  - **TypeScript:** Use TSDoc comments (`/** Doc comment here */`) for functions, classes, types, and complex logic.

## 4. Error Handling

- **General:** Avoid silent failures. Handle potential errors gracefully.
- **Backend (Python):**
  - Use specific exception types (e.g., `ValueError`, `TypeError`, custom exceptions) rather than generic `Exception`.
  - Log errors effectively, including relevant context (e.g., user ID, request ID).
  - Use `try...except...finally` blocks appropriately.
  - Provide meaningful error responses in APIs (e.g., using FastAPI's `HTTPException`).
- **Frontend (TypeScript/React):**
  - Use `try...catch` for asynchronous operations (API calls).
  - Implement Error Boundaries for React components to catch rendering errors.
  - Provide clear feedback to the user when errors occur (e.g., toast notifications, inline messages).
  - Validate user input thoroughly.

## 5. Testing

- **General:** Write tests for your code.
  - **Unit Tests:** Test individual functions, components, or classes in isolation.
  - **Integration Tests:** Test the interaction between different parts of the system (e.g., API endpoint calling a service that uses the DB).
  - **End-to-End (E2E) Tests:** Test the application flow from the user's perspective.
- **Backend:** Use `pytest`. Aim for good test coverage, especially for business logic and CRUD operations. Use fixtures for setup/teardown. Mock external dependencies where appropriate.
- **Frontend:** Use Jest/Vitest with React Testing Library for unit/integration tests. Consider Cypress or Playwright for E2E tests.

## 6. Imports

- **Frontend:** Use absolute imports (`@/components/ui/button`) over relative imports (`../../components/ui/button`) where possible (already configured via `tsconfig.json`). Keep imports organized (e.g., React imports first, then external libs, then internal modules/components). ESLint can help enforce this.
- **Backend:** Organize imports according to PEP 8 (stdlib, third-party, local application). Use absolute imports within the application (e.g., `from app.services import ...`). Ruff/isort handles this automatically.

## 7. Version Control

- Use Git for version control.
- Follow the agreed commit message convention (see separate document).
- Make small, atomic commits.
- Use feature branches for development and Pull Requests (PRs) for merging.
- Require code reviews for PRs.
