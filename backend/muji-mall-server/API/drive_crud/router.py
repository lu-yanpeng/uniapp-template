from typing import Annotated

from fastapi import APIRouter, HTTPException, Query

from deta_space.base import uniapp_drive

from .schemas import DriveListResponse

router = APIRouter()


@router.get('/list', response_model=DriveListResponse)
def drive_list(name: Annotated[str, Query(min_length=1)]):
    """
    返回这个数据库下的所有图片名，数据库格式需要和本地的static目录保持一致，文件也尽量统一
    """
    drive = uniapp_drive.get_drive(name)
    if drive is None:
        raise HTTPException(400, detail=f'数据库 {name} 不存在')

    result: list[str] = drive.list().get('names', [])

    return {
        'data':
            {'data': result, 'total': len(result)}
    }
