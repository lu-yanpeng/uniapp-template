"""
全局路由
"""
from fastapi import APIRouter
from .drive_crud.router import router as drive_crud__router


router = APIRouter()
router.include_router(drive_crud__router, prefix='/drive')