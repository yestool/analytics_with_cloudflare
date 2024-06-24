[English](./README.md) · **简体中文**

# 基于 Cloudflare + Huno + D1 的网页访客统计服务

[参考演示站点](https://webviso.yestool.org/)

## 部署步骤

### 安装依赖

```
npm install -g wrangler
npm install hono
```

### 登录

跳转cloudflare网页授权
```bash
npx wrangler login
```

### 创建D1数据库：[web_analytics]

> 数据库名称为`web_analytics`，与`package.json`内保持一致

```
npx wrangler d1 create web_analytics
```

成功后显示：
```
✅ Successfully created DB web_analytics

[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = "web_analytics"
database_id = "<unique-ID-for-your-database>"
```

### 配置worker和D1数据库绑定

将上个步骤返回的`unique-ID-for-your-database`写进`wrangler.toml`中

```
name = "analytics_with_cloudflare"
main = "src/index.ts"
compatibility_date = "2024-06-14"

[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = "web_analytics"
database_id = "<unique-ID-for-your-database>"
```


### 初始化D1数据库的表结构

```
npm run initSql
```


### 发布

```
npm run deploy
```

成功后显示：
```
> analytics_with_cloudflare@0.0.0 deploy
> wrangler deploy

Proxy environment variables detected. We'll use your proxy for fetch requests.
 ⛅️ wrangler 3.18.0
-------------------
Your worker has access to the following bindings:
- D1 Databases:
  - DB: web_analytics (<unique-ID-for-your-database>)
Total Upload: 50.28 KiB / gzip: 12.23 KiB
Uploaded analytics_with_cloudflare (1.29 sec)
Published analytics_with_cloudflare (4.03 sec)
  https://analytics_with_cloudflare.xxxxx.workers.dev
Current Deployment ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```


## 如何使用
> - `data-base-url` 默认值： `https://webviso.yestool.org`
> - `data-page-pv-id` 默认值： `page_pv`
> - `data-page-uv-id` 默认值： `page_uv`
### 1.引入脚本
在html的body标签前加入下面的 `<script>...</script>` 段落即可

- 使用网络js文件：
> 使用 defer 属性时，浏览器会在加载完所有内容后再执行这些脚本
```
<script defer src="//webviso.yestool.org/js/index.min.js"></script>
```
- 使用本地js文件：
```
<script src="/front/dist/index.min.js"></script>
```
- 如果已经部署了后端，使用你的服务地址将请求发送到自己的服务
> 将`your-url`更改为你的worker地址，如`https://analytics_with_cloudflare.workers.dev`，注意结尾不要有`/`

```
<script defer src="//webviso.yestool.org/js/index.min.js" data-base-url="your-url"></script>
```

### 2.展示数据

- 加入id为`page_pv` 或 `page_uv`的标签，即可显示 `访问人次(pv)` 或 `访问人数(uv)`
```
本页访问人次:<span id="page_pv"></span>

本页访问人数:<span id="page_uv"></span>
```
- 可以编辑脚本参数，调整标签id
```
<script defer src="//webviso.yestool.org/js/index.min.js" data-base-url="your-url" data-page-pv-id="page_pv" data-page-uv-id="page_uv"></script>
```


