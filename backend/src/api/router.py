
from fastapi import APIRouter
from src.features.resume.endpoints.router import router as resume_router

router = APIRouter()

router.include_router(resume_router, prefix="/resume")
