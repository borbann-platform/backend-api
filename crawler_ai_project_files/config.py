# config.py
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from .env file located in the script's directory
# Make sure .env is in the *same directory* as config.py
dotenv_path = Path(__file__).parent / '.env'
if dotenv_path.is_file():
    load_dotenv(dotenv_path=dotenv_path)
else:
    print(f"Warning: .env file not found at {dotenv_path}")


# --- Default Settings ---
DEFAULT_OUTPUT_FILE = "extracted_data.json"
DEFAULT_OUTPUT_FORMAT = "json"  # csv, json, sqlite
DEFAULT_CACHE_MODE = "ENABLED"  # ENABLED, BYPASS, DISABLED, READ_ONLY, WRITE_ONLY
DEFAULT_VERBOSE = False
DEFAULT_LLM_PROVIDER = "openai/gpt-4o-mini"  # Default LLM

# --- LLM Provider Configuration ---
PROVIDER_ENV_MAP = {
    "openai": "OPENAI_API_KEY",
    "gemini": "GEMINI_API_KEY",
    "groq": "GROQ_API_KEY",
    "anthropic": "ANTHROPIC_API_KEY",
    "ollama": None,  # Ollama typically doesn't require an API key
    # Add other providers and their corresponding env variable names here
}


def get_api_key_env_name(provider: str) -> str | None:
    """Gets the expected environment variable name for the given provider."""
    provider_prefix = provider.split('/')[0].lower()
    return PROVIDER_ENV_MAP.get(provider_prefix)


def get_api_key(provider: str, direct_key: str | None = None, env_var_name: str | None = None) -> str | None:
    """
    Retrieves the API key for a given provider.
    Priority: direct_key > env_var_name > default env var from PROVIDER_ENV_MAP.
    """
    if direct_key:
        print(f"INFO: Using direct API key provided via --api-key for provider '{provider}'.")
        return direct_key

    if env_var_name:
        key = os.getenv(env_var_name)
        if key:
            print(
                f"INFO: Using API key from specified environment variable '{env_var_name}' for provider '{provider}'."
            )
            return key
        else:
            print(f"Warning: Specified environment variable '{env_var_name}' not found.")

    default_env_name = get_api_key_env_name(provider)
    if default_env_name:
        key = os.getenv(default_env_name)
        if key:
            print(
                f"INFO: Using API key from default environment variable '{default_env_name}' for provider '{provider}'."
            )
            return key
        else:
            if default_env_name is not None:  # Don't warn if provider like Ollama has None mapping
                print(
                    f"Warning: Default environment variable '{default_env_name}' for provider '{provider}' not found."
                )
            return None

    # If provider is not in map and no key was provided
    # Allow providers like 'ollama' to proceed without a key
    if provider.split('/')[0].lower() != "ollama":
        print(f"Warning: No API key found or specified for provider '{provider}'. LLM features might fail.")
    return None


# --- Exportable Configuration Variables ---
LLM_PROVIDER = os.getenv("DEFAULT_LLM_PROVIDER", DEFAULT_LLM_PROVIDER)
OUTPUT_FILE = os.getenv("DEFAULT_OUTPUT_FILE", DEFAULT_OUTPUT_FILE)
OUTPUT_FORMAT = os.getenv("DEFAULT_OUTPUT_FORMAT", DEFAULT_OUTPUT_FORMAT)
CACHE_MODE = os.getenv("DEFAULT_CACHE_MODE", DEFAULT_CACHE_MODE)
VERBOSE = os.getenv("DEFAULT_VERBOSE", str(DEFAULT_VERBOSE)).lower() in ('true', '1', 't')
