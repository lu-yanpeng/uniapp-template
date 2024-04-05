from typing import Generic, TypeVar, Union

from pydantic import BaseModel


# 类型变量，用在泛型中传递什么类型，上下文中就是什么类型
# 比如下面这个类，如果T是str类型，那么data就是str类型
T = TypeVar('T')


class ResponseModel(BaseModel, Generic[T]):
    status: int = 200
    msg: str = 'ok'
    data: Union[T, None] = None
