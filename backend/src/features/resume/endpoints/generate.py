
import json
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from src.features.resume.schemas.resume import GenerateRequest, GenerateResponse
from src.features.resume.services.orchestrator_flow import OrchestratorFlow
from src.features.resume.services.orchestrator_stream import OrchestratorStream

router = APIRouter()

@router.post("/generate", response_model=GenerateResponse)
async def generate_resume_endpoint(request: GenerateRequest):
    try:
        result = await OrchestratorFlow.optimize_resume(
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

@router.post("/generate_stream")
async def generate_resume_stream_endpoint(
    file: UploadFile = File(None),
    resume_text: str = Form(...),
    jd_text: str = Form(...),
    analysis: str = Form(None),
    provider: str = Form("gemini")
):
    # Parse analysis JSON if provided
    initial_analysis = json.loads(analysis) if analysis else None
    
    # Read PDF bytes if file is provided
    pdf_bytes = await file.read() if file else None

    async def event_generator():
        async for update in OrchestratorStream.optimize_resume_stream(
            resume_text=resume_text,
            jd_text=jd_text,
            provider_name=provider,
            initial_analysis=initial_analysis,
            pdf_bytes=pdf_bytes
        ):
            yield json.dumps(update) + "\n"

    return StreamingResponse(event_generator(), media_type="application/x-ndjson")
