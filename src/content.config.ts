import { defineCollection, reference, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { withProviderRefCheck } from './data/utils/with-provider-ref-check.js';
import { EDITORIAL_ADJUSTMENT_MAX, EDITORIAL_ADJUSTMENT_MIN } from './data/utils/ranking-constants.js';

// comparisons / glossary / reviews 尚无真实内容，按 CLAUDE.md §9"不要提前创建
// 大量空目录/结构"暂不定义，等对应内容真正开始建设时再加回来（同一套 schema
// 模式，加回来的成本很低）。articles 已开始建设（知识库），见下方。

// ---------------------------------------------------------------------------
// 共享子 Schema
// ---------------------------------------------------------------------------

// 来源必须分组标注，不允许把厂商信息 / 本站测试 / 第三方资料 / 编辑观点混成一个事实。
const sourceMetaSchema = z.object({
  type: z.enum(['vendor', 'in-house', 'third-party', 'editorial']),
  sourceUrl: z.url().optional(),
  retrievedAt: z.coerce.date(),
  publishedAt: z.coerce.date().optional(),
  verifiedAt: z.coerce.date().optional(),
  claim: z.string(),
  evidence: z.string().optional(),
});

const pricingPlanSchema = z.object({
  name: z.string(),
  price: z.string(),
  billingCycle: z.string().optional(),
  trafficQuota: z.string().optional(),
});

const thirdPartyNoteSchema = z.object({
  source: z.string(),
  sourceUrl: z.url().optional(),
  claim: z.string(),
  date: z.coerce.date(),
});

// ---------------------------------------------------------------------------
// providers（Data Collection）
// ---------------------------------------------------------------------------

const providerSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  aliases: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive', 'discontinued', 'watch']),
  vendor: z.object({
    officialWebsite: z.url(),
    description: z.string(),
    pricing: z.array(pricingPlanSchema).optional(),
    traffic: z.string().optional(),
    devices: z.number().optional(),
    protocols: z.array(z.string()).optional(),
    routes: z.array(z.string()).optional(),
    regions: z.array(z.string()).optional(),
    clientSupport: z.array(z.string()).optional(),
    support: z.array(z.string()).optional(),
    source: sourceMetaSchema,
  }),
  thirdPartyNotes: z.array(thirdPartyNoteSchema).optional(),
  editorial: z.object({
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    suitableFor: z.array(z.string()),
    notSuitableFor: z.array(z.string()),
    summary: z.string(),
    source: sourceMetaSchema,
  }),
  lastVerified: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const providers = defineCollection({
  loader: file('src/data/providers/providers.json'),
  schema: providerSchema,
});

// ---------------------------------------------------------------------------
// tests（Data Collection，TestRecord，独立于 Provider，通过 providerId 关联）
// ---------------------------------------------------------------------------

const testEnvironmentSchema = z.object({
  location: z.string(),
  network: z.string(),
  client: z.string(),
  protocol: z.string(),
});

const streamingResultSchema = z.object({
  platform: z.string(),
  unlocked: z.boolean(),
  notes: z.string().optional(),
});

const aiServiceResultSchema = z.object({
  service: z.string(),
  accessible: z.boolean(),
  notes: z.string().optional(),
});

const testRecordSchema = z.object({
  id: z.string(),
  providerId: reference('providers'),
  date: z.coerce.date(),
  methodology: z.string(),
  environment: testEnvironmentSchema,
  // results 全部 optional：不强制每次测试覆盖所有指标，不得为凑 Schema 造假数据。
  results: z
    .object({
      downloadMbps: z.number().optional(),
      uploadMbps: z.number().optional(),
      latencyMs: z.number().optional(),
      packetLossPercent: z.number().optional(),
      stabilityScore: z.number().optional(),
      streaming: z.array(streamingResultSchema).optional(),
      aiServicesAccess: z.array(aiServiceResultSchema).optional(),
    })
    .optional(),
  tester: z.string().optional(),
  notes: z.string().optional(),
});

const tests = defineCollection({
  loader: withProviderRefCheck(file('src/data/tests/tests.json'), (data) => [data.providerId]),
  schema: testRecordSchema,
});

// ---------------------------------------------------------------------------
// rankings（Data + Content：结构化排名 + 独立方法论文字）
// ---------------------------------------------------------------------------

const rankingCriterionSchema = z.object({
  key: z.string(),
  label: z.string(),
  weight: z.number(),
  description: z.string(),
});

// score / rank 不作为人工直接填写的最终事实来源。Base Score 由 Evidence/Metric
// 计算得出（见 ranking-scoring.ts），这里只保存"编辑对计算结果的调整"与
// "编辑对最终排名的强制指定"，且两者都必须附带可读的理由。
const rankingEntrySchema = z
  .object({
    providerId: reference('providers'),
    reason: z.string(),
    editorialAdjustment: z.number().min(EDITORIAL_ADJUSTMENT_MIN).max(EDITORIAL_ADJUSTMENT_MAX).optional(),
    editorialAdjustmentReason: z.string().optional(),
    rankOverride: z.number().int().min(1).optional(),
    rankOverrideReason: z.string().optional(),
  })
  .refine((entry) => !entry.editorialAdjustment || Boolean(entry.editorialAdjustmentReason?.trim()), {
    message: 'editorialAdjustment 非零时必须填写 editorialAdjustmentReason',
    path: ['editorialAdjustmentReason'],
  })
  .refine((entry) => entry.rankOverride === undefined || Boolean(entry.rankOverrideReason?.trim()), {
    message: 'rankOverride 存在时必须填写 rankOverrideReason',
    path: ['rankOverrideReason'],
  });

const rankingSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  methodology: z.string(),
  criteria: z.array(rankingCriterionSchema),
  scoringVersion: z.string(),
  snapshotAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  entries: z.array(rankingEntrySchema),
});

const rankings = defineCollection({
  loader: withProviderRefCheck(file('src/data/rankings/rankings.json'), (data) => {
    const entries = (data.entries as Array<{ providerId: unknown }>) ?? [];
    return entries.map((entry) => entry.providerId);
  }),
  schema: rankingSchema,
});

// ---------------------------------------------------------------------------
// articles（Content Collection：知识库 knowledge，未来可扩展 tutorial / troubleshooting / news）
// ---------------------------------------------------------------------------

const articleSchema = z.object({
  type: z.enum(['knowledge', 'tutorial', 'troubleshooting', 'news']),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  relatedTopics: z.array(z.string()).optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: articleSchema,
});

export const collections = {
  providers,
  tests,
  rankings,
  articles,
};
