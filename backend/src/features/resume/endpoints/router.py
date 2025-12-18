
from fastapi import APIRouter
from src.features.resume.endpoints.analyze import router as analyze_router
from src.features.resume.endpoints.generate import router as generate_router

router = APIRouter()

router.include_router(analyze_router, tags=["Resume Analysis"])
router.include_router(generate_router, tags=["Resume Generation"])
