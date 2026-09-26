// 全站基础配置。只放品牌/域名/语言等站点级事实，
// 不放具体文章 SEO、Provider 数据、Ranking 数据——那些属于内容/数据层。

export const siteConfig = {
  siteName: '机场E家',
  brandName: '机场E家',
  brandNameEn: 'EJichang',
  url: 'https://ejichang.com',
  locale: 'zh-CN',
  language: 'zh-CN',

  // 简洁、真实的站点描述，不为 SEO 堆砌关键词。
  description:
    '机场E家是面向中文用户的梯子、VPN、机场代理导航与选购资料站，整理价格口径、线路、协议，并提供客户端教程与排错清单。',

  defaultTitle: '机场E家｜梯子、VPN、机场导航与选购资料站',
  defaultDescription:
    '机场E家整理梯子、VPN、机场代理的选购资料：价格、线路、协议逐条标注来源，附客户端教程与排错清单，不发布没有依据的测速与评分。',

  // 页面未提供 og:image 时的默认图路径。文件本身尚未创建，
  // 待未来真正需要时再制作，这里只先固定配置位置。
  defaultOgImage: '/images/og/default.png',

  // 编辑团队署名，不虚构个人专家/权威身份。
  author: {
    name: '机场E家编辑团队',
  },
} as const;
