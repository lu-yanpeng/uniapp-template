from deta import Deta, _Drive
from typing import Union

from config import settings

deta = Deta(settings.DRIVE_KEY)


class UniAppDrive:
    """
    每一个property的名字都应该跟uniapp-muji数据库的对上
    """

    @property
    def banner(self) -> _Drive:
        return deta.Drive('banner')

    @property
    def special(self) -> _Drive:
        return deta.Drive('special')

    @property
    def news(self) -> _Drive:
        return deta.Drive('news')

    def get_drive(self, drive_name: str) -> Union[_Drive, None]:
        """
        如果传入的drive_name不存在会直接创建对应数据库，所以这里只能手动添加已存在的数据库
        """
        return getattr(self, drive_name, None)


uniapp_drive = UniAppDrive()
