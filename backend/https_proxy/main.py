from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    # 支持的源的列表
    allow_origins=['*'],
    allow_credentials=True,
    # 支持的方法
    allow_methods=["*"],
    # 支持的请求头
    allow_headers=["*"],
)


@app.get('/{path:path}')
async def proxy_get():
    return RedirectResponse('http://139.159.239.104:8000')

if __name__ == '__main__':
    from uvicorn import run
    run('main:app')
