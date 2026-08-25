---
type: tutorial
title: 苹果小火箭（Shadowrocket）配置教程
description: 说明 iOS 上的 Shadowrocket（俗称小火箭）怎么获取、怎么导入机场订阅链接、怎么连接节点，以及常见问题排查思路。
category: 客户端教程
difficulty: beginner
publishedAt: 2026-08-25
updatedAt: 2026-08-25
relatedTopics:
  - protocols-compared
  - what-is-airport-proxy
---

**Shadowrocket**（俗称"小火箭"）是 iOS 上最常用的机场客户端之一，图标是一枚小火箭。这篇说明它的基本使用流程。

## 第一步：获取 Shadowrocket

Shadowrocket 是 App Store 上的付费应用。它长期以来只在部分非中国区的 App Store（如美区、日区等）上架，具体当前哪些区域可以下载、价格是多少，请以你打开 App Store 时看到的实际情况为准——App Store 的区域上架政策会变化，这里不给出可能过时的具体地区/价格断言。如果你的 Apple ID 是中国区，通常需要切换到有该应用上架的区域账号才能下载。

## 第二步：导入订阅链接

拿到机场的订阅链接后（获取方式见[机场导航](/airports/)对应服务商的官网/客户端后台），有两种常见导入方式：

- **点击订阅链接直接导入**：如果服务商提供的是 `shadowrocket://add/subscribe?url=...` 格式的链接，在 iPhone 上直接点击通常会自动跳转到 Shadowrocket 并弹出添加确认。
- **手动添加**：打开 Shadowrocket，点击右上角"+"或"配置"里的添加订阅入口，把普通的 `http(s)://` 订阅链接粘贴进去，保存后客户端会拉取节点列表。

## 第三步：选择节点组、开启连接

订阅导入后，在主界面可以看到按地区分组的节点。点选你要用的节点（或选择自动测速/自动选择的分组），然后打开主界面的连接开关。开关打开后，iOS 会弹出"VPN 配置"授权提示，需要允许，否则无法建立连接。

## 第四步：验证是否生效

开关变绿、界面显示已连接后，可以打开浏览器访问一个平时无法直接打开的网站测试。如果长时间连接中或反复断开，通常是节点本身当前不可用，换一个节点组里的其他节点即可。

## 常见问题

**为什么打开就显示订阅链接无效？** 常见原因是套餐已过期，或复制链接时漏掉了部分字符，建议回到机场后台重新完整复制一次。

**为什么开了连接但网页打不开？** 先确认 VPN 授权是否已允许（可在 iOS 系统设置的"VPN与设备管理"里查看是否有对应配置）；如果授权正常，更完整的排查顺序见[机场连不上、网页打不开怎么排查](/troubleshooting/connection-failed-troubleshooting/)。

**耗电量/后台保持连接的问题** 因具体机型、iOS 版本和节点线路不同而有差异，Shadowrocket 官方设置里通常有"保持连接"相关选项，可按需调整，机场E家不对具体耗电数据做断言。

## 你可能还想看

- [Clash 客户端配置教程（Windows / macOS）](/tutorials/clash-desktop-setup/)
- [Android 机场客户端配置教程](/tutorials/android-setup/)
- [机场协议对比：SS / V2Ray / SSR / Trojan / Hysteria2](/knowledge/protocols-compared/)
- [机场导航｜机场代理服务商目录](/airports/)
