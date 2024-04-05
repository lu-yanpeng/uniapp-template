from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # 数据库的key，如果丢失可以重新获取，或者重新创建一个数据库
    DRIVE_KEY: str = ''

    model_config = SettingsConfigDict(env_file='env')


settings = Settings()
