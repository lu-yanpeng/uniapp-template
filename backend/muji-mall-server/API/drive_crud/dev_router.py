from pathlib import Path
from typing import Annotated

from fastapi import APIRouter, HTTPException, Query

from .schemas import DriveListResponse

router = APIRouter()
MAIN_PATH: str = Path().resolve().__str__()


@router.get('/list', response_model=DriveListResponse)
def drive_list(name: Annotated[str, Query(min_length=1)]):
    """
    返回static目录下某个目录下的所有文件名，拿到文件名后访问 `/static/目录/文件名` 就可以拿到到对应文件

    比如：[localhost:8000/static/banner/swiper_1.jpg](http://localhost:8000/static/banner/swiper_1.jpg)
    """
    try:
        p = Path(MAIN_PATH + '/static/' + name)
        result: list[str] = [file.name for file in p.iterdir()]
    except Exception:
        raise HTTPException(400, detail=f'数据库 {name} 不存在')

    return {
        'data':
            {'data': result, 'total': len(result)}
    }
