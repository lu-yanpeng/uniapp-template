from os import environ
from typing import Annotated

import httpx
from fastapi import FastAPI, Request, HTTPException, Response, Depends, Path, BackgroundTasks
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


# async def get_response(path: Annotated[str, Path(...)], request: Request):
#     try:
#         url = f'http://139.159.239.104:1337/{path}'
#         _response = await client.get(url, params=request.query_params)
#         content = await _response.aread()
#         yield content, dict(_response.headers.items())
#     finally:
#         await client.aclose()
#
#
# @app.get('/{path:path}')
# async def proxy_get(_response: tuple[bytes, dict] = Depends(get_response)):
#     try:
#         content, headers = _response
#         return Response(content, headers=headers)
#     except Exception as e:
#         print('异常', e)
#         raise HTTPException(400, '异常，只能发送GET请求')

async def get_response(path: Annotated[str, Path(...)], request: Request):
    url = f'http://139.159.239.104:1337/{path}'
    try:
        req = client.build_request('GET', url, params=request.query_params)
        r = await client.send(req, stream=True)
        yield r
        # return r
    finally:
        client.clo
        await client.aclose()
    # async with client.stream('GET', url, params=request.query_params) as response:
    #     return response.aiter_raw, dict(response.headers.items())


    # _response = await client.get(url, params=request.query_params)
    # headers = dict(_response.headers.items())
    # await client.aclose()
    # async def fn():
    #     # _response = await client.get(url, params=request.query_params)
    #     # content = await _response.aread()
    #     # yield content, dict(_response.headers.items())
    #     async with client.stream('GET', url, params=request.query_params) as response:
    #         return response.aiter_raw, dict(_response.headers.items())
    #         # async for i in response.aiter_raw():
    #         #     yield i
    # return fn

# tasks: BackgroundTasks,
@app.get('/{path:path}')
async def proxy_get(_response=Depends(get_response)):
    try:
        # r.aiter_raw, dict(r.headers.items())
        # tasks.add_task(client.aclose)
        return StreamingResponse(content=_response.aiter_raw(), headers=dict(_response.headers.items()), )
    except Exception as e:
        print('异常', e)
        raise HTTPException(400, '异常，只能发送GET请求')


if __name__ == '__main__':
    from uvicorn import run
    run('main:app')
