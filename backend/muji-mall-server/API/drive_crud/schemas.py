from pydantic import BaseModel

from schemas import ResponseModel


class __DriveListResponse(BaseModel):
    data: list[str]
    total: int


DriveListResponse = ResponseModel[__DriveListResponse]
