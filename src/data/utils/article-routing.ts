import type { CollectionEntry } from 'astro:content';

// Article 的 URL 前缀由 type 字段决定，全站统一从这里取值，不各自重复定义。
// 目前只有 knowledge 类型有真实内容，其余前缀先保留映射，等对应内容建成后直接可用。
export const articleBasePathByType: Record<CollectionEntry<'articles'>['data']['type'], string> = {
  knowledge: '/knowledge/',
  tutorial: '/tutorials/',
  troubleshooting: '/troubleshooting/',
  news: '/news/',
};

export function getArticleHref(article: CollectionEntry<'articles'>): string {
  return `${articleBasePathByType[article.data.type]}${article.id}/`;
}
