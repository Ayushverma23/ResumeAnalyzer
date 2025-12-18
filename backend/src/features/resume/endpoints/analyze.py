
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from src.features.resume.services.parser import ResumeParser
from src.features.resume.services.analyzer import ResumeAnalyzer
from src.features.resume.schemas.resume import AnalysisResponse

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_resume(
    file: UploadFile = File(...),
    jd: str = Form(...),
    provider: str = Form("gemini")
):
    try:
        content = await file.read()
        resume_text = ResumeParser.extract_text(content)
        
        analysis_result = await ResumeAnalyzer.analyze(resume_text, jd, provider)
        
        return AnalysisResponse(
            score=analysis_result.get("score", 0),
            summary=analysis_result.get("summary", "No summary received."),
            missing_keywords=analysis_result.get("missing_keywords", []),
            strong_points=analysis_result.get("strong_points", []),
            weak_points=analysis_result.get("weak_points", []),
            raw_text=resume_text
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
