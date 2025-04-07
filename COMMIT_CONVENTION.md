# Commit Message Convention

This project follows the **Conventional Commits** specification (v1.0.0). This leads to more readable messages that are easier to follow when looking through the project history and allows for automated changelog generation.

Reference: [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

## Format

Each commit message consists of a **header**, a **body** and a **footer**.

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Header

The header is mandatory and includes a **type**, an optional **scope**, and a **description**.

### `<type>`

This describes the kind of change that this commit is providing. Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **chore**: Other changes that don't modify src or test files (e.g., updating dependencies, project config)
- **revert**: Reverts a previous commit

### `<scope>` (Optional)

The scope provides contextual information to the commit type. It's contained within parentheses, e.g., `feat(api): ...` or `fix(ui): ...`. Choose a scope that represents the area of the codebase affected (e.g., `auth`, `map`, `pipeline`, `worker`, `deps`, `config`, `ci`, `ui`, `docs`).

### `<description>`

A short summary of the code changes.

- Use the imperative, present tense: "change" not "changed" nor "changes".
- Don't capitalize the first letter.
- No dot (.) at the end.

## Body (Optional)

The body should include the motivation for the change and contrast this with previous behavior. Use the imperative, present tense.

## Footer(s) (Optional)

- **Breaking Changes:** Start with `BREAKING CHANGE:` followed by a description of the breaking change.
- **Referencing Issues:** Use keywords like `Closes #123`, `Fixes #456`.

## Examples

```
feat: add user authentication endpoint
```

```
fix(api): correct pagination logic for pipelines endpoint

The previous implementation did not handle the offset correctly,
causing duplicate items on subsequent pages.
```

```
refactor(map): extract overlay management into separate context

Improves separation of concerns and makes the map component cleaner.
```

```
chore(deps): update FastAPI to version 0.100.0
```

```
test(crud): add unit tests for pipeline run creation
```

```
docs: update README with deployment instructions
```

```
feat(ui)!: replace Button component with new design system button

BREAKING CHANGE: The `variant` prop for Button components has changed.
Refer to the updated design system documentation. Closes #78
```
