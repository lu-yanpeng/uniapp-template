"""
全局路由
"""
from os import environ

from fastapi import APIRouter
from .drive_crud.router import router as drive_crud__router
from .drive_crud.dev_router import router as drive_crud__dev_router

router = APIRouter()

if environ.get('DEPLOY', None):
    router.include_router(drive_crud__router, prefix='/drive')
else:
    router.include_router(drive_crud__dev_router, prefix='/drive')
