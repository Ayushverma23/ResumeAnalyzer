
import os
from functools import lru_cache

class Settings:
    PROJECT_NAME: str = "Agentic Resume AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # AI Providers
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    HF_TOKEN: str = os.getenv("HF_TOKEN", "")
    
    # Paths
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@lru_cache()
def get_settings():
    return Settings()
