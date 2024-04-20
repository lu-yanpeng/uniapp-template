## 安装依赖

注意python版本`python >= 3.8`

```shell
# 创建虚拟环境，强烈建议创建虚拟环境
py -m venv .venv
# 打开安装目录并启动环境
cd .venv/Scripts
./activate

# 安装依赖，-i 指定国内下载源
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 启动项目

如果依赖安装在虚拟环境中，需要先开启虚拟环境。启动后访问`localhost:8000/docs`

```shell
# python解释器启动main.py
py main.py
# 或者命令行启动，--port 可以手动指定端口
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 部署

如果要部署到`deta`服务器，需要创建一个`env`文件，然后提供`DRIVE_KEY`，就是要提供deta数据库的连接key

或者直接修改`config.py`的`DRIVE_KEY`字段
