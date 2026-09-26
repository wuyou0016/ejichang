// 品牌资料库（28 个机场品牌入口 + 九云）。
// 来源与口径：站长提供的推广入口 + 已整理的第三方资料；没有可核实资料的品牌一律写“暂无”。
// 价格口径（站长确认 2026-09-25）：无忧链接 MINI 包月起步约 ¥6.6/月，舒心 100GB 包月低至 ¥14/月，
// 省心 200GB ¥33/月起；微风网络约 ¥27/月（包月价）。本站不在品牌之间比较流量大小或每 GB 单价。
import raw from './brands.json';
import plansRaw from './wuyou-plans.json';

export interface Brand {
  id: string;
  slug: string | null;
  name: string;
  alias: string;
  tier: number;
  aff: string;
  source: string;
  tagline: string;
  price: string;
  line: string;
  protocols: string;
  nodes: string;
  client: string;
  fit: string;
  caution: string;
  facts: string[];
  num: { m: number; gb: number; basis: string; note: string } | null;
}

export const BRANDS = raw as unknown as Record<string, Brand>;
export const WUYOU_PLANS = plansRaw as { name: string; m: number; gb: number; billing: string }[];

/** 榜单顺序：无忧链接第一；2–4 名微风、飞猫云、Firefly；5–7 名星岛梦、Sogo云、光速云。 */
export const PICKS_ORDER = ['wuyou', 'weifeng', 'feimao', 'firefly', 'xingdao', 'sogo', 'guangsu', 'lingmao', 'shanyue', 'yuzhou', 'kuajie', 'kuaili'];

/** 有独立品牌页的品牌（沿用旧 URL：/airports/<slug>/） */
export const PAGE_BRANDS = Object.values(BRANDS).filter((b) => Boolean(b.slug));

const NO_RE = /^(暂无|资料未列出|第三方资料未列出)/;
export const has = (v: string | undefined | null): boolean => Boolean(v) && !NO_RE.test(v as string);

export function srcLabel(b: Brand): string {
  if (b.tier === 4) return '仅登记推广入口';
  if (/^官方/.test(b.source)) return '官方/联盟页面资料';
  if (/^仅/.test(b.source)) return '仅确认入口可访问';
  if (/有限|分歧/.test(b.source)) return '资料有限';
  return '第三方资料整理';
}

export function byId(id: string): Brand {
  const b = BRANDS[id];
  if (!b) throw new Error(`unknown brand ${id}`);
  return b;
}

export function brandHref(b: Brand): string | null {
  return b.slug ? `/airports/${b.slug}/` : null;
}

export function priceLine(b: Brand): string {
  if (b.id === 'wuyou') return 'MINI 包月起步约 ¥6.6/月；舒心 100GB 包月低至 ¥14/月；省心 200GB ¥33/月起';
  if (b.num) return `约 ¥${b.num.m}/月起（${b.num.basis}）`;
  return '价格资料有限';
}

export const AFF_REL = 'nofollow noopener sponsored';
