# ejichang.com 改版方案（2026-09-26）

## 一、现状诊断

| 问题 | 证据 | 影响 |
| --- | --- | --- |
| 与 rocketjichang 旧站同模板同架构 | 目录、组件、榜单/评测/教程分区、文章命名几乎一致（how-to-choose、what-is-airport-proxy、protocols-compared…） | 同站长多站同质化；rocketjichang 已被 Bing 降权，风险会连带 |
| 内容量太小 | 仅 23 篇文章 + 7 个品牌页 + 4 个榜单，全站约 45 页，每篇约 4KB | 覆盖不了机场/梯子/VPN/翻墙的长尾词，没有主题权威 |
| 关键词只押“机场” | 关键词地图里没有 VPN、翻墙、梯子（只有 1 篇梯子/VPN 关系） | 三个大词几乎没有入口 |
| 站点定位模糊 | “机场E家”= 又一个机场资料站 | 没有独占的搜索意图 |
| 榜单靠“评分 + 站长实测”叙事 | rankings.json/tests.json 自由文本，无法结构化 | 可信度与可维护性差 |
| 规范化问题 | http://ejichang.com、www.ejichang.com 都返回 200，无 301 到 https 主域 | 权重分散、重复收录 |
| UI 普通 | 和 rocket 旧站同一套通用文章模板 | 停留时间、点击率低 |

## 二、定位（与其他站的领地切分）

- rocketjichang.com：最稳定 / 丢包 / 数据 / 工具（暗色 3D 科技风）
- jichangbao.com：机场推荐
- **ejichang.com：梯子 + VPN + 机场三大主词并列的导航站（翻墙降为辅助词，融入梯子/VPN 内容，不做一级栏目）**：
  用户第一步要“找入口”，页面结构就是一个分类清晰的导航门户，而不是又一个测评博客。
- jichangtj.net：便宜 / 免费 / 场景

## 三、关键词矩阵（每个词只有一个主页面，避免自相蚕食）

| 主题簇 | 主页面（Hub） | 子页面（示例，独立搜索意图） |
| --- | --- | --- |
| 机场导航 | `/` `/airports/` | 分类导航：/nav/hk、/nav/japan 等不做；用分类筛选页：新手、稳定、便宜、流媒体、AI |
| VPN（一级主词） | `/vpn/` | VPN 是什么、VPN 和机场区别、VPN 推荐、免费 VPN 风险、VPN 会不会封号、VPN 协议 |
| 梯子（一级主词，含翻墙） | `/ladder/` | 梯子是什么、梯子推荐、稳定梯子怎么选、便宜梯子、免费梯子、手机/电脑梯子、梯子连不上、梯子和机场；翻墙相关（翻墙软件、翻墙安全、翻墙会被发现吗）作为梯子下的 3~4 篇子文章，不单独做 Hub |
| 机场 | `/airports/` | 机场推荐、机场怎么选、机场订阅、机场跑路、机场节点 |
| 订阅 | `/subscription/` | 订阅链接是什么、订阅怎么导入、订阅转换、订阅更新失败 |
| 客户端教程 | `/clients/` | Clash Verge、v2rayN、Shadowrocket、Quantumult X、sing-box、Hiddify、NekoBox、Surge |
| 协议 | `/protocols/` | SS、Trojan、VLESS、Reality、Hysteria2、TUIC、WireGuard |
| 排错 | `/troubleshooting/` | 订阅失败、连不上、慢、DNS、时间不同步、证书 |
| 前缀词落地 | 榜单页承接 | 便宜 / 稳定 / 免费 / 推荐 / 工具 各一页，且各页答案不同、不做模板复制 |

原则：不做“关键词 × 地区 × 年份”批量页；每个新页面写进 keyword-map，先查蚕食再建。

## 四、信息架构（新）

```
/                     首页：搜索框式导航（分类入口 + 首推 + 最新）
/airports/            机场导航（分类筛选：新手/稳定/便宜/流媒体/AI/多设备）
/airports/{slug}/     品牌资料页
/ladder/              梯子 Hub（主词，含翻墙子文章）
/vpn/                 VPN Hub（主词）
/subscription/        订阅 Hub
/clients/             客户端教程 Hub
/protocols/           协议 Hub
/tools/               工具：订阅检测、延迟丢包计算器、协议速查
/knowledge/ /troubleshooting/ /glossary/
/about/ /method/ /disclosure/ /disclaimer/
```

旧 URL 全部保留或 301：/rankings/ → /airports/（合并榜单），/tutorials/ → /clients/，避免死链。

## 五、UI 方向（与 rocket 的暗色 3D 拉开）

- 浅色为主的“导航门户”风：顶部大搜索框（站内搜索，前端过滤，无依赖）、分类图标网格、带标签的站点卡片列表、左侧分类栏；暗色模式可切换。
- 首页第一屏：一句话定位 + 搜索 + 入口（梯子/VPN/机场/客户端/协议/排错），前三个是主词入口+ 首推卡（无忧链接）。
- 品牌资料统一 BrandCard，价格口径按站长确认版本，不做每 GB 比较。

## 六、内容与诚信规则

- 不发布未经核实的测速与评分；旧 tests.json 里的“站长实测”若无法保留原始记录并写明方法，则下线为“站长资料”性质；榜单改为“按资料完整度”。
- 每篇文章：直接回答 → 对比表/步骤 → 注意事项 → FAQ（有真实问题才加）→ 相关内链（3~6 个，按 Topic Cluster）。
- 目标篇幅：Hub 页 1500 字以上，教程 1200 字以上，术语/短问答 600 字以上；不灌水。
- 披露：页脚仅一句，另有披露页；首页不写“推广合作”。

## 七、技术 SEO

1. Cloudflare 规则：http → https、www → apex 301。
2. 每页 canonical、唯一 title（20~42 字）、唯一 description、BreadcrumbList、Article/FAQPage（与可见内容一致）、WebSite + SearchAction。
3. sitemap 只含可索引页，lastmod 用真实更新时间；IndexNow 在每次部署后提交。
4. 内链：Hub ↔ 子页面双向；每篇文章末尾链到对应 Hub 与一个下一步页面；全站导航含六大主题。
5. Core Web Vitals：静态 HTML、无框架、内联关键 CSS、少量原生 JS。

## 八、实施阶段

1. 分支 `redesign-nav`，搭新 UI（Layout/Header/Footer/Card/Search）。
2. 引入品牌资料库（与 rocket 同源数据，改展示）。
3. 新 Hub 页与首批约 30 篇内容（翻墙 / VPN / 梯子 / 订阅 / 客户端 / 协议）。
4. 旧内容清理、重定向、keyword-map 更新。
5. build + 全站审计（标题、描述、内链、H1、JSON-LD）+ 手机与暗色检查。
6. 用户说“上线”后：合并、`wrangler deploy`、IndexNow、GSC/Bing 重提 sitemap。
