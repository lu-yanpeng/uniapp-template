## 启动项目

### 安装依赖

```shell
# 安装依赖
pnpm install
```

### 启动项目

```shell
# 启动h5
pnpm run dev:h5

# 微信小程序
pnpm run dev:mp-weixin
```

微信小程序启动后，手动打开微信开发工具，从`/dist/dev/mp-weixin`导入生成好的项目文件。


## 本地开发

在`backend/muji-mall-server`下有一个python写的静态资源服务器，本地开发建议用它返回图片，如果用我的`deta`服务器响应会非常慢。

启动python的`fastapi`服务器后，修改`src/constants.ts`的`SERVER_ADDRESS`常量。
