from os import environ
from typing import Annotated

import httpx
from fastapi import FastAPI, Request, HTTPException, Depends, Path
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

# root_path=environ.get('ROOT_PATH', '/proxy'),
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    # 支持的源的列表
    # allow_origins=['*'],
    allow_origins=environ.get('ALLOW_ORIGINS', '*').split(','),
    allow_credentials=True,
    # 支持的方法
    allow_methods=["*"],
    # 支持的请求头
    allow_headers=["*"],
)
client = httpx.AsyncClient()
# content_type = {
CONTENT_TYPE = {
    'txt': 'text/html;charset=utf-8',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'mp4': 'video/mp4',
    'ico': 'image/vnd.microsoft.icon'
}

# FIXME：在deta space中，用httpx发请求有时候会莫名报错，有时候又可以
def get_response(path: Annotated[str, Path(...)], request: Request):
    # /uploads/1749cf23_455c_44fc_9727_a35a451a231e_aa1c20d2bb.jpg
    suffix = path.split('.')[-1]
    content_type = CONTENT_TYPE.get(suffix, 'application/json')
    headers = {'Content-Type': content_type, 'Cache-Control': 'max-age=604800'}

    def fn():
        url = f'http://139.159.239.104:1337/{path}'
        with httpx.stream('GET', url, params=request.query_params) as response:
            for i in response.iter_raw():
                yield i
    return fn, headers


@app.get('/{path:path}')
async def proxy_get(_response=Depends(get_response)):
    try:
        iter_raw, headers = _response
        return StreamingResponse(content=iter_raw(), headers=headers)
    except Exception as e:
        print('异常', e)
        raise HTTPException(400, '异常，只能发送GET请求')


if __name__ == '__main__':
    from uvicorn import run
    run('main:app')
