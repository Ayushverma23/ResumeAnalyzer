from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class AnalyzeRequest(BaseModel):
    # For file upload endpoints, this might not be used directly in body if using Form data
    pass

class AnalysisResponse(BaseModel):
    score: int
    summary: str
    missing_keywords: List[str]
    strong_points: List[str]
    weak_points: List[str]
    raw_text: str # Extracted text from PDF

class GenerateRequest(BaseModel):
    resume_text: str
    jd_text: str
    analysis: Dict[str, Any]
    provider: str = "gemini"

class GenerateResponse(BaseModel):
    latex_code: str
