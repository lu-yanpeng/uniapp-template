from typing import Annotated

from fastapi import APIRouter, Path, HTTPException
from fastapi.responses import StreamingResponse

from deta.drive import DriveStreamingBody

from deta_space.base import uniapp_drive

router = APIRouter()


async def file_async_iterable(file: DriveStreamingBody):
    for i in file.iter_chunks():
        yield i
    file.close()


@router.get('/{drive_name}/{file_name}')
def get_file(
    drive_name: Annotated[str, Path(min_length=1)],
    file_name: Annotated[str, Path(min_length=1)]
):
    drive = uniapp_drive.get_drive(drive_name)
    if drive is None:
        raise HTTPException(400, detail=f'数据库 {drive_name} 不存在')

    file = drive.get(file_name)
    if file is None:
        raise HTTPException(404, detail=f'文件 {file_name} 不存在')

    media_type = 'image/png'
    suffix = file_name.split(".")[-1]
    if suffix:
        media_type = f'image/{suffix}'

    return StreamingResponse(file_async_iterable(file), media_type=media_type)
