from os import environ

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.middleware.cors import CORSMiddleware

from API.space_drive.router import router as space_drive_router
from API.router import router as api_router

from exceptions import exception_handlers
from responses import responses


app = FastAPI(
    title='静态资源服务器',
    version='0.1',
    docs_url=None,
    root_path=environ.get('ROOT_PATH', ''),
    exception_handlers=exception_handlers,
    responses=responses
)
print('-------------------ROOT_PATH-----------------', environ.get('ROOT_PATH', ''))
app.add_middleware(
    CORSMiddleware,
    # 支持的源的列表
    allow_origins=['*'],
    # allow_origin_regex=['https://.*\.deta.app'],
    allow_credentials=True,
    # 支持的方法
    allow_methods=["*"],
    # 支持的请求头
    allow_headers=["*"],
)


if environ.get('DEPLOY', ''):
    app.include_router(space_drive_router, prefix='/static')
else:
    app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(api_router)

@app.get('/')
def index():
    return {'msg': f'{environ.get("DEPLOY") + environ.get("ROOT_PATH")}'}


@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    root_path = environ.get('ROOT_PATH', '')
    openapi_url: str = root_path + app.openapi_url
    return get_swagger_ui_html(
        openapi_url=openapi_url,
        title=app.title + " - Swagger UI",
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url,
        swagger_js_url="https://cdn.bootcdn.net/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.min.js",
        swagger_css_url="https://cdn.bootcdn.net/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css",
    )

if __name__ == '__main__':
    from uvicorn import run
    run('main:app', reload=True)
