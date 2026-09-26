---
title: "客户端教程｜Clash、小火箭、v2rayN、安卓客户端怎么选与配置"
description: "梯子与机场客户端教程：Windows、macOS、iOS、Android 常用客户端怎么选、怎么导入订阅、规则模式怎么设置，附各平台教程入口与排错链接。"
h1: "客户端教程：按设备选，再照着做"
lead: "拿到订阅链接后，你需要一个客户端。这里按设备整理：该用哪个、怎么导入、常见问题在哪查。"
kicker: "CLIENTS · 客户端"
updated: 2026-09-26
keywords: ["机场客户端","Clash教程","小火箭教程","安卓梯子客户端","v2rayN"]
cardsTitle: "各平台教程"
cards:
  - { href: "/tutorials/clash-desktop-setup/", title: "Clash（Windows / macOS）", desc: "桌面端最常见的选择", tag: "桌面" }
  - { href: "/tutorials/ios-shadowrocket-setup/", title: "Shadowrocket 小火箭", desc: "iPhone / iPad", tag: "iOS" }
  - { href: "/tutorials/android-setup/", title: "Android 客户端", desc: "安卓订阅导入", tag: "Android" }
  - { href: "/tutorials/how-to-import-subscription/", title: "订阅导入通用步骤", desc: "所有客户端通用", tag: "通用" }
  - { href: "/tutorials/airport-getting-started/", title: "机场怎么用（完整流程）", desc: "从购买到连上", tag: "入门" }
  - { href: "/troubleshooting/clash-import-failed/", title: "Clash 导入失败", desc: "报错怎么查", tag: "排错" }
faq:
  - q: "我该选哪个客户端？"
    a: "Windows/macOS 常用 Clash 系；iPhone 常用 Shadowrocket（付费）；Android 常用 Clash 系或 v2rayNG。以你的设备和服务商支持的格式为准。"
  - q: "规则模式和全局模式有什么区别？"
    a: "规则模式按规则分流，国内直连、国外走代理；全局模式所有流量走代理。日常建议规则模式，排查问题时可临时切全局。"
  - q: "同一个订阅能在几台设备用？"
    a: "取决于服务商的设备数限制，购买前看清楚，见 [机场能几台设备同时用](/knowledge/airport-multi-device/)。"
related:
  - { href: "/subscription/", title: "订阅链接" }
  - { href: "/protocols/", title: "协议对比" }
  - { href: "/troubleshooting/", title: "排错清单" }
---
## 按设备选客户端

| 设备 | 常见客户端 | 备注 |
| --- | --- | --- |
| Windows | Clash 系、v2rayN | 界面和规则功能各不同 |
| macOS | Clash 系 | 与 Windows 通用配置思路 |
| iPhone / iPad | Shadowrocket、Quantumult X 等 | 需要相应的账号环境 |
| Android | Clash 系、v2rayNG | 注意系统电池优化 |
| 路由器 | OpenClash 等 | 适合全家设备共用，配置更复杂 |

选择原则：**先看服务商支持哪种订阅格式，再选与你设备匹配的客户端**。

## 通用流程

1. 安装客户端；
2. 复制订阅链接；
3. 导入订阅并更新；
4. 选择规则模式；
5. 选一个节点，访问网页测试。

## 设置时的注意点

- 系统时间要准确，时间偏差会导致部分协议连不上；
- 保持客户端为较新版本；
- 规则模式下国内网站直连是正常的。

## 遇到问题

先看 [排错清单](/troubleshooting/)：从订阅、客户端、节点、网络四个方向逐个排除。
