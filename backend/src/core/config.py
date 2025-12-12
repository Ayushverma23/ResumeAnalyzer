import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend root
BACKEND_ROOT = Path(__file__).resolve().parent.parent.parent
load_dotenv(BACKEND_ROOT / ".env")

class Settings:
    PROJECT_NAME: str = "Agentic Resume AI"
    VERSION: str = "1.0.0"
    
    # AI Providers
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    HF_TOKEN: str = os.getenv("HF_TOKEN", "")
    
    # Paths
    UPLOAD_DIR: Path = BACKEND_ROOT / "uploads"
    OUTPUT_DIR: Path = BACKEND_ROOT / "outputs"

settings = Settings()

# Ensure directories exist
settings.UPLOAD_DIR.mkdir(exist_ok=True)
settings.OUTPUT_DIR.mkdir(exist_ok=True)

if __name__ == "__main__":
    print(f"Loaded Config for: {settings.PROJECT_NAME}")
    print(f"Upload Dir: {settings.UPLOAD_DIR}")
