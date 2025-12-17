from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from src.services.resume.parser import ResumeParser
from src.services.resume.analyzer import ResumeAnalyzer
from src.services.resume.generator import ResumeGenerator
from src.models.schemas import AnalysisResponse, GenerateRequest, GenerateResponse

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_resume(
    file: UploadFile = File(...),
    jd: str = Form(...),
    provider: str = Form("gemini")
):
    try:
        # 1. Parse PDF
        content = await file.read()
        resume_text = ResumeParser.extract_text(content)
        
        # 2. Analyze
        analysis_result = await ResumeAnalyzer.analyze(resume_text, jd, provider)
        
        # 3. Return combined result
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

from src.services.resume.orchestrator import AgenticOrchestrator

@router.post("/generate", response_model=GenerateResponse)
async def generate_resume(request: GenerateRequest):
    try:
        # Use Agentic Orchestrator for iterative improvement
        result = await AgenticOrchestrator.optimize_resume(
            resume_text=request.resume_text,
            jd_text=request.jd_text,
            provider_name=request.provider,
            initial_analysis=request.analysis
        )
        
        final_score_val = result.get("final_score", {}).get("score", 0)
        
        return GenerateResponse(
            latex_code=result.get("final_latex", ""),
            final_score=final_score_val,
            execution_log=result.get("execution_log", [])
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
