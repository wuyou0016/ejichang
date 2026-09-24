// 统一统计配置。两个平台都是"配置项开关"——留空就什么都不加载，不会产生半成品脚本，
// 也不会因为缺 ID 就报错。之后只需要把真实 ID/token 填进来，不用再改代码。
export const analyticsConfig = {
  // 用于区分多站点数据的站点标识，随每个自定义事件一起上报。
  siteId: 'ejichang.com',

  // Google Analytics 4 Measurement ID，形如 "G-XXXXXXXXXX"。
  // 在 https://analytics.google.com 为 ejichang.com 创建 GA4 资源后，
  // "数据流 → 网页数据流" 里能看到。
  ga4MeasurementId: '',

  // Cloudflare Web Analytics 的 beacon token。
  // 在 Cloudflare Dashboard → Analytics & Logs → Web Analytics → Add a site
  // 为 ejichang.com 单独添加站点后可以拿到，是一串 32 位十六进制字符串。
  cloudflareBeaconToken: '',

  // zztools.cc 站点访问统计的检测码（data-sid），三站统一用这套简易统计做访问量对比。
  zztoolsSiteId: 'd1906d84605b1dee',
} as const;
