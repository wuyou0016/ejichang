---
type: tutorial
title: 机场怎么用？新手从购买到连上的完整流程
description: 面向第一次使用机场的新手，按顺序说明从确认需求、选服务商、付款、拿到订阅链接，到选客户端、导入订阅、选节点并验证是否连通的完整步骤。
category: 客户端教程
difficulty: beginner
publishedAt: 2026-09-24
updatedAt: 2026-09-24
relatedTopics:
  - how-to-import-subscription
  - what-is-airport-proxy
  - clash-desktop-setup
---

第一次接触机场，最常见的困惑是"买了之后到底怎么用"。这篇把整个流程按顺序拆成几步，每一步只说做什么、要注意什么，具体客户端的操作细节放到对应的教程里。如果你连"机场"是什么都还不清楚，先看[机场代理是什么](/knowledge/what-is-airport-proxy/)。

## 第 1 步：先想清楚需求

在看任何服务商之前，先回答几个问题，能省下很多试错成本：

- 你主要用在手机、电脑，还是多台设备？（设备限制见[机场能几台设备同时用](/knowledge/airport-multi-device/)）
- 每月大概用多少流量？只是查资料和刷网页，还是长时间看视频？
- 预算大概多少？愿意先从短周期套餐试起吗？

## 第 2 步：选择服务商

这一步没有标准答案，建议：

1. 先看[机场代理怎么选](/knowledge/how-to-choose-an-airport-proxy/)了解常见的判断维度；
2. 参考[适合新手的机场推荐](/rankings/for-beginners/)和[机场导航](/airports/)里整理的资料，注意区分官方信息、第三方资料和编辑分析；
3. 下单前留意跑路和资金风险，见[机场"跑路"风险怎么识别](/knowledge/airport-scam-risk/)。

**第一次购买时，优先选最便宜的短周期套餐**，先验证在你自己的网络环境里是否好用，再决定要不要长期订阅。

## 第 3 步：付款

不同服务商支持的付款方式不同，选择前可以先看[机场怎么付款？常见支付方式和注意事项](/knowledge/airport-payment-methods/)。几点通用提醒：

- 留意是否**默认开启自动续费**，续费价格是否和首购一致；
- 保存好订单信息和付款凭证，后面遇到问题时用得上；
- 不要在非官方页面输入账号密码和付款信息。

## 第 4 步：找到你的订阅链接

付款完成后，在服务商的用户中心里通常能找到一条**订阅链接**（有的叫"订阅地址"或"复制订阅"）。这条链接包含了节点信息，导入客户端后才能使用。

重要提醒：**订阅链接相当于账号凭证**，不要发到公开的群组、也不要在截图里露出完整链接。链接是什么、有哪些格式，见[机场订阅链接导入教程（通用步骤）](/tutorials/how-to-import-subscription/)。

## 第 5 步：选择并安装客户端

客户端是安装在你设备上的软件，负责读取订阅链接并连接节点。根据你的系统选择：

| 设备 | 常见客户端 | 教程 |
| --- | --- | --- |
| Windows / macOS | Clash 系列（如 Clash Verge） | [Clash 客户端配置教程](/tutorials/clash-desktop-setup/) |
| iPhone / iPad | Shadowrocket（小火箭） | [苹果小火箭配置教程](/tutorials/ios-shadowrocket-setup/) |
| Android | 支持订阅导入的客户端 | [Android 机场客户端配置教程](/tutorials/android-setup/) |

客户端要从**可信来源**下载，不要安装来路不明的破解版或修改版。

## 第 6 步：导入订阅并更新

按对应教程，在客户端里添加订阅链接，导入后**执行一次更新**，节点列表才会出现。如果提示导入失败或解析失败，见[Clash 导入订阅报错、解析失败怎么办](/troubleshooting/clash-import-failed/)。

## 第 7 步：选择节点和模式

- **节点**：先选一个地区的节点测试延迟，再根据需要切换；节点名称里的"专线""倍率"等标签含义见[机场节点是什么](/knowledge/airport-nodes-guide/)。
- **模式**：常见有"规则"（按规则决定哪些走代理）、"全局"（所有流量都走代理）、"直连"（不走代理）。日常使用一般选规则模式，遇到某个网站打不开时再临时试试全局模式对比。

## 第 8 步：验证是否连通

1. 确认客户端里代理已开启（或系统代理已启用）；
2. 用浏览器访问一个你需要访问的网站，看能否正常打开；
3. 在客户端里查看节点延迟，明显超时的节点先换一个；
4. 如果打不开，先确认客户端已开启、订阅已更新、节点没有超时，再看[机场连不上、网页打不开怎么排查](/troubleshooting/connection-failed-troubleshooting/)。

## 第 9 步：用几天再判断

网络体验会随时段、你的宽带和所选节点变化。建议试用几天，在**不同时段**（例如白天和晚高峰）都用一用，再判断这个服务商是否适合长期订阅。怎么理解速度和延迟数据，见[机场测速怎么测、怎么看](/knowledge/airport-speed-test-explained/)；速度不理想时先看[机场节点慢怎么办](/troubleshooting/airport-node-slow/)。

## 关于合规

跨境网络服务的合规要求因地区而异，请了解并遵守你所在地区的法律法规。本站只做信息整理，不构成法律意见。

## 你可能还想看

- [机场订阅链接导入教程（通用步骤）](/tutorials/how-to-import-subscription/)
- [梯子是什么？梯子、VPN、机场、代理的关系](/knowledge/ladder-vpn-airport-relationship/)
- [VPN 和机场怎么选？按使用场景判断](/knowledge/vpn-or-airport/)
- [机场常见问题排查](/troubleshooting/)
- [机场推荐排行榜](/rankings/)
