from deta import Deta, _Drive
from typing import Union

from config import settings

deta = Deta(settings.DRIVE_KEY)


class UniAppDrive:
    """
    每一个property的名字都应该跟uniapp-muji数据库的对上
    """
    
    # 在deta添加的数据库名，放到这里方便管理
    __drive_set = {'banner', 'special', 'news', 'toolbar'}

    def get_drive(self, drive_name: str) -> Union[_Drive, None]:
        """
        如果传入的drive_name不存在会直接创建对应数据库，所以这里只能手动添加已存在的数据库
        """        
        return deta.Drive(drive_name) if drive_name in self.__drive_set else None


uniapp_drive = UniAppDrive()
