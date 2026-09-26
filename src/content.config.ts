import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---------------------------------------------------------------------------
// 内容集合：articles（知识/教程/排障）、pages（场景与说明页）。
// 品牌资料在 src/data/brands/（价格、线路、协议、节点，逐条标注来源）。
// 2026-09 重构：移除 providers / tests / rankings / comparisons / reviews 集合——
// 其中的“测试记录与自动评分”缺少可核实的原始数据，不再作为对外发布依据。
// ---------------------------------------------------------------------------

const articleSchema = z.object({
  type: z.enum(['knowledge', 'tutorial', 'troubleshooting', 'news']),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  author: z.string().optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  coverImage: z.string().optional(),
  relatedTopics: z.array(z.string()).optional(),
  symptom: z.string().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: articleSchema,
});

// 场景/说明页：URL 为 /<id>/，正文用 Markdown，头部字段驱动品牌卡片、链接卡片与 FAQ。
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    lead: z.string().optional(),
    kicker: z.string().optional(),
    updated: z.coerce.date(),
    crumbs: z.array(z.object({ name: z.string(), href: z.string() })).optional(),
    keywords: z.array(z.string()).optional(),
    brands: z.array(z.string()).optional(),
    brandView: z.enum(['cards', 'table']).default('table'),
    brandTitle: z.string().optional(),
    cards: z.array(z.object({ href: z.string(), title: z.string(), desc: z.string(), tag: z.string().optional() })).optional(),
    cardsTitle: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    related: z.array(z.object({ href: z.string(), title: z.string() })).optional(),
    noindex: z.boolean().default(false),
  }),
});

export const collections = { articles, pages };
