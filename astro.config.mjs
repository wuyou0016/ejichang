// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import providers from './src/data/providers/providers.json' with { type: 'json' };
import rankings from './src/data/rankings/rankings.json' with { type: 'json' };
import articleLastmods from './src/data/utils/article-lastmods.json' with { type: 'json' };
// most-stable / for-beginners 两个专项榜目前没有任何服务商通过发布门槛，
// rankings.json 里也就没有它们的记录，lastmod 无法从 rankings 数据推导，
// 单独维护一份——只在这两个页面的方法论文案被修改时才需要手动更新这里。
import extraLastmods from './src/data/utils/extra-lastmods.json' with { type: 'json' };

// lastmod 只使用真实存在的 updatedAt 字段，不用构建时间代替——否则每次
// build 都会让所有页面看起来"刚更新过"，这对 Bing/Google 的新鲜度信号是噪音而非帮助。
/** @type {Record<string, string>} */
const lastmodByPathname = {};
for (const provider of providers) {
  lastmodByPathname[`/airports/${provider.slug}/`] = provider.updatedAt;
}
for (const ranking of rankings) {
  const path = ranking.slug === 'overall' ? '/rankings/' : `/rankings/${ranking.slug}/`;
  lastmodByPathname[path] = ranking.updatedAt;
}
Object.assign(lastmodByPathname, articleLastmods, extraLastmods);

// Hub 页（/airports/、/knowledge/、/tutorials/、首页）本身没有独立的 updatedAt 字段，
// 但它们的可见内容完全由所列条目决定，所以用"所列条目里最新的 updatedAt"作为
// hub 的 lastmod——这是可推导的真实值，不是构建时间也不是编造的日期。
function maxDate(dates) {
  return dates.reduce((max, d) => (d > max ? d : max), dates[0]);
}
const providerDates = providers.map((p) => p.updatedAt);
const knowledgeDates = Object.entries(articleLastmods)
  .filter(([path]) => path.startsWith('/knowledge/'))
  .map(([, date]) => date);
const tutorialDates = Object.entries(articleLastmods)
  .filter(([path]) => path.startsWith('/tutorials/'))
  .map(([, date]) => date);
const troubleshootingDates = Object.entries(articleLastmods)
  .filter(([path]) => path.startsWith('/troubleshooting/'))
  .map(([, date]) => date);
const overallRankingDate = rankings.find((r) => r.slug === 'overall')?.updatedAt;

if (providerDates.length > 0) lastmodByPathname['/airports/'] = maxDate(providerDates);
if (knowledgeDates.length > 0) lastmodByPathname['/knowledge/'] = maxDate(knowledgeDates);
if (tutorialDates.length > 0) lastmodByPathname['/tutorials/'] = maxDate(tutorialDates);
if (troubleshootingDates.length > 0) lastmodByPathname['/troubleshooting/'] = maxDate(troubleshootingDates);
// 首页的动态内容是综合推荐 TOP3，所以跟综合榜共用同一个 lastmod 来源。
if (overallRankingDate) lastmodByPathname['/'] = overallRankingDate;

// Sitemap 收录策略：
// - 排除 404 页面（不是可索引内容）
// - 排除任何带 query string 的 URL（canonical 不含 query，sitemap 也不应包含）
// - 排除任何路径片段命中 demo/mock 关键词的 URL（开发占位数据的防御性兜底，
//   正式发布门槛应在页面生成阶段就不产出这些路径，这里是第二道防线）
// - 排除分页类路径（/page/ 或 ?page=），除非该分页本身是独立有价值的 canonical 页面
/** @param {string} pageUrl @returns {boolean} */
function isSitemapExcluded(pageUrl) {
  const url = new URL(pageUrl);

  if (url.pathname === '/404' || url.pathname === '/404/' || url.pathname === '/404.html') {
    return true;
  }
  if (url.search) {
    return true;
  }
  if (/\/(demo|mock)(-|\/|$)/i.test(url.pathname)) {
    return true;
  }
  if (/\/page\/\d+\/?$/.test(url.pathname)) {
    return true;
  }
  return false;
}

// https://astro.build/config
export default defineConfig({
  // sitemap 需要绝对域名才能生成 canonical 绝对 URL，正式 canonical host 见 CLAUDE.md。
  site: 'https://ejichang.com',
  integrations: [
    sitemap({
      filter: (page) => !isSitemapExcluded(page),
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const lastmod = lastmodByPathname[pathname];
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
