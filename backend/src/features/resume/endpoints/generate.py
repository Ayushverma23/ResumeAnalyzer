
import json
from fastapi import APIRouter, HTTPException
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
async def generate_resume_stream_endpoint(request: GenerateRequest):
    async def event_generator():
        async for update in OrchestratorStream.optimize_resume_stream(
            resume_text=request.resume_text,
            jd_text=request.jd_text,
            provider_name=request.provider,
            initial_analysis=request.analysis
        ):
            yield json.dumps(update) + "\n"

    return StreamingResponse(event_generator(), media_type="application/x-ndjson")
