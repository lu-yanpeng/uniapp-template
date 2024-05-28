// 用pm2启动，pm2 start server.js
// https://docs.strapi.io/dev-docs/deployment
const strapi = require("@strapi/strapi");
const app = strapi({ distDir: "./dist" });
app.start();
