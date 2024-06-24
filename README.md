[简体中文](./README.zh-CN.md) · **English**

# Web Visitor Analytics Service Based on Cloudflare + Huno + D1

[Demo Site](https://webviso.yestool.org/)

## Deployment Steps

### Install Dependencies

```bash
npm install -g wrangler
npm install hono
```

### Login

Redirect to the Cloudflare web authorization page.

```bash
npx wrangler login
```

### Create D1 Database: [web_analytics]

> The database name should be `web_analytics`, consistent with the name in `package.json`.

```bash
npx wrangler d1 create web_analytics
```

After successful creation, it will display:

```
✅ Successfully created DB web_analytics

[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = "web_analytics"
database_id = "<unique-ID-for-your-database>"
```

### Configure Worker and Bind D1 Database

Write the `unique-ID-for-your-database` returned from the previous step into `wrangler.toml`.

```toml
name = "analytics_with_cloudflare"
main = "src/index.ts"
compatibility_date = "2024-06-14"

[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = "web_analytics"
database_id = "<unique-ID-for-your-database>"
```

### Initialize the D1 Database Schema

```bash
npm run initSql
```

### Deploy

```bash
npm run deploy
```

After successful deployment, it will display:

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

## How to Use

> - `data-base-url` default value: `https://webviso.yestool.org`
> - `data-page-pv-id` default value: `page_pv`
> - `data-page-uv-id` default value: `page_uv`

### 1. Include the Script

Add the following `<script>...</script>` segment before the closing `</body>` tag in your HTML.

- Using the online JS file:
> With the defer attribute, the browser will execute these scripts after all content is loaded.

```html
<script defer src="//webviso.yestool.org/js/index.min.js"></script>
```

- Using a local JS file:

```html
<script src="/front/dist/index.min.js"></script>
```

- If you have deployed your backend, use your service address to send requests to your own service.
> Change `your-url` to your worker address, like `https://analytics_with_cloudflare.workers.dev`, and ensure there is no trailing `/`.

```html
<script defer src="//webviso.yestool.org/js/index.min.js" data-base-url="your-url"></script>
```

### 2. Display Data

- Add tags with the ID `page_pv` or `page_uv` to show `Page Views (pv)` or `Unique Visitors (uv)` respectively.

```html
Page Views on this page:<span id="page_pv"></span>

Unique Visitors on this page:<span id="page_uv"></span>
```

- You can edit the script parameters to adjust the tag IDs.

```html
<script defer src="//webviso.yestool.org/js/index.min.js" data-base-url="your-url" data-page-pv-id="page_pv" data-page-uv-id="page_uv"></script>
```
