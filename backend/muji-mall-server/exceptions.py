"""
全局异常处理
"""
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


async def http_exception_handler(request, exc: StarletteHTTPException):
    """
    这个用来处理手动抛出的异常，一般是400之类的异常
    """
    # print('exc1', exc.detail, exc.status_code)
    content = {'status': exc.status_code, 'msg': exc.detail, 'data': None}
    return JSONResponse(content, status_code=exc.status_code)


async def server_error(request, exc: Exception):
    """
    这个用来处理代码的异常，比如某个方法用错了或者pydantic验证不通过
    因为
    """
    # if isinstance(exc, Exception):
    #     data = exc.args
    # else:
    #     data = '未知错误'
    # content = {'status': 500, 'msg': '服务器错误', 'data': data}
    content = {'status': 500, 'msg': '服务器错误', 'data': None}

    # ServerErrorMiddleware中间件是系统自带的异常处理程序，所有代码的错误都会在这里被拦截，并且会直接返回响应，不再执行后续中间件
    # 因为ServerErrorMiddleware中间件处在第一位，这里拦截异常的时候CORS中间件还没生效
    # 要让前端能正确显示数据就要手动指定这个请求头，否者前端会报错跨域不通过
    headers = {'Access-Control-Allow-Origin': '*'}
    return JSONResponse(content, status_code=500, headers=headers)


async def validation_exception_handler(request, exc: RequestValidationError):
    """
    这个专门用来处理pydantic验证失败的情况
    """
    # exc是pydantic的ValidationError子类，可以到官网看看它有什么方法
    # print(exc.errors(), exc)  # 生产中不要把错误信息直接返回，应该保存到日志里面
    # data = {'status': 422, 'msg': '参数错误', 'data': exc.errors()}
    content = {'status': 422, 'msg': '参数错误', 'data': None}
    return JSONResponse(content, status_code=422)


# 注意：这个字典的key只能是http代码或者要注册的异常类，不能是字符串
# 参考：https://www.starlette.io/exceptions/
exception_handlers = {
    500: server_error,
    StarletteHTTPException: http_exception_handler,
    RequestValidationError: validation_exception_handler
}
