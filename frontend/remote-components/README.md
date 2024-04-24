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

自定义打包

```shell
uni build --outDir dist
```

微信小程序启动后，手动打开微信开发工具，从`/dist/dev/mp-weixin`导入生成好的项目文件。
