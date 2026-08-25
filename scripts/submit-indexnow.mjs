// 手动向 Bing / IndexNow 提交本站 URL，让 Bing 更快抓取新增或更新的页面。
// 用法：先 `npm run build`，再 `node scripts/submit-indexnow.mjs`（或 `npm run indexnow`）。
// 不需要额外依赖——用 Node 内置 fetch，读 dist/ 下 astro 生成的 sitemap 拿 URL 列表。
//
// IndexNow key 文件位于 public/3054ecb941fc9b3104a9e645b3e5087e.txt，构建后会原样
// 出现在 dist 根目录，Bing 抓取时用它验证提交请求确实来自本站所有者。

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const SITE = 'https://ejichang.com';
const KEY = '3054ecb941fc9b3104a9e645b3e5087e';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const SITEMAP_INDEX = new URL('../dist/sitemap-index.xml', import.meta.url);
const SITEMAP_0 = new URL('../dist/sitemap-0.xml', import.meta.url);

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  if (!existsSync(SITEMAP_0)) {
    console.error('找不到 dist/sitemap-0.xml，请先运行 `npm run build`。');
    process.exit(1);
  }

  const sitemapIndexXml = await readFile(SITEMAP_INDEX, 'utf-8');
  const sitemapUrls = extractLocs(sitemapIndexXml);
  const pageXmls = await Promise.all(sitemapUrls.map(() => readFile(SITEMAP_0, 'utf-8')));
  const urlList = [...new Set(pageXmls.flatMap(extractLocs))];

  if (urlList.length === 0) {
    console.error('sitemap 中没有找到任何 URL，未提交。');
    process.exit(1);
  }

  console.log(`准备提交 ${urlList.length} 个 URL 到 IndexNow（含 Bing）...`);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  console.log(`IndexNow 响应状态：${res.status} ${res.statusText}`);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(body);
    process.exit(1);
  }
  console.log('提交完成。Bing 通常在数小时内响应抓取，具体收录情况请以 Bing Webmaster Tools 为准。');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
