from os import environ
import httpx
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.responses import JSONResponse


async def http_exception_handler(request, exc: StarletteHTTPException):
    """
    这个用来处理手动抛出的异常，一般是400之类的异常
    """
    # print('exc1', exc.detail, exc.status_code)
    content = {'status': exc.status_code, 'msg': f'{exc.detail}，400异常', 'data': None}
    return JSONResponse(content, status_code=exc.status_code)


# 注意：这个字典的key只能是http代码或者要注册的异常类，不能是字符串
# 参考：https://www.starlette.io/exceptions/
exception_handlers = {
    StarletteHTTPException: http_exception_handler,
}

# root_path=environ.get('ROOT_PATH', '/proxy'),
app = FastAPI(exception_handlers=exception_handlers)
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


async def async_iterable(path: str, method: str = 'GET', **kwargs):
    url = f'http://139.159.239.104:1337/{path}'
    async with client.stream(method, url, **kwargs) as response:
        async for i in response.aiter_raw():
            yield i


@app.get('/')
def index():
    return {'msg': 'ok'}


@app.get('/{path:path}')
async def proxy_get(path: str, request: Request):
    try:
        print('路径111', path)
        return StreamingResponse(content=async_iterable(path, method='GET', params=request.query_params))
    except:
        raise HTTPException(400, '异常，只能发送GET请求')


"""
@app.post('/{path:path}')
async def proxy_post(path: str, request: Request):
    print('路径111', path, await request.body())
    # 如果要发post请求，应该用client.post，这样才能传递表单数据
    return StreamingResponse(content=async_iterable(path, 'POST'))
"""