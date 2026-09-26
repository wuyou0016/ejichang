// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import brands from './src/data/brands/brands.json' with { type: 'json' };

// lastmod 只取内容自己声明的更新日期（文章 updatedAt / 页面 updated），不用构建时间。
/** @type {Record<string, string>} */
const lastmod = {};
const BRAND_UPDATED = '2026-09-26';

/** @param {string} file @param {string} key */
function fm(file, key) {
  const m = fs.readFileSync(file, 'utf8').match(new RegExp(`^${key}:\s*"?([^"\r\n]+)"?`, 'm'));
  return m ? m[1].trim() : undefined;
}
/** @param {string} p @returns {string[]} */
function walk(p) {
  return fs.readdirSync(p, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(p, d.name)) : [path.join(p, d.name)]));
}
/** @type {Record<string, string>} */
const prefix = { knowledge: '/knowledge/', tutorial: '/tutorials/', troubleshooting: '/troubleshooting/', news: '/news/' };
for (const f of walk('src/content/articles')) {
  const id = path.basename(f).replace(/[.]mdx?$/, '');
  const type = fm(f, 'type');
  const u = fm(f, 'updatedAt');
  if (type && u && prefix[type]) lastmod[`${prefix[type]}${id}/`] = u.slice(0, 10);
}
for (const f of walk('src/content/pages')) {
  const id = path.relative('src/content/pages', f).split(path.sep).join('/').replace(/[.]md$/, '');
  const u = fm(f, 'updated');
  if (u) lastmod[`/${id}/`] = u.slice(0, 10);
}
for (const b of Object.values(/** @type {Record<string, any>} */ (brands))) {
  if (b.slug) lastmod[`/airports/${b.slug}/`] = BRAND_UPDATED;
}
/** @param {string} start */
const maxUnder = (start) => Object.entries(lastmod).filter(([p]) => p.startsWith(start)).map(([, d]) => d).sort().pop();
for (const hub of ['/knowledge/', '/tutorials/', '/troubleshooting/']) {
  const d = maxUnder(hub);
  if (d) lastmod[hub] = d;
}
lastmod['/airports/'] = BRAND_UPDATED;
lastmod['/'] = Object.values(lastmod).sort().pop() ?? BRAND_UPDATED;

/** @param {string} pageUrl @returns {boolean} */
function isSitemapExcluded(pageUrl) {
  const url = new URL(pageUrl);
  if (url.pathname === '/404' || url.pathname === '/404/' || url.pathname === '/404.html') return true;
  if (url.search) return true;
  if (/\/(demo|mock)(-|\/|$)/i.test(url.pathname)) return true;
  if (/\/page\/\d+\/?$/.test(url.pathname)) return true;
  return false;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://ejichang.com',
  integrations: [
    sitemap({
      filter: (page) => !isSitemapExcluded(page),
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const d = lastmod[pathname];
        return d ? { ...item, lastmod: d } : item;
      },
    }),
  ],
});
