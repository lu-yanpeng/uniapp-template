from typing import Any

from pydantic import BaseModel


class Schemas400(BaseModel):
    status: int
    msg: str
    data: Any


class Schemas422(BaseModel):
    status: int = 422
    msg: str = '参数错误'
    data: None


# 文档页面每个api下面的response code
responses = {
    400: {'model': Schemas400, 'description': '通用异常模型'},
    422: {'model': Schemas422, 'description': '校验失败模型'}
}
