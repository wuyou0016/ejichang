---
type: tutorial
title: Clash 客户端配置教程（Windows / macOS）
description: 以 Clash Verge Rev 为例，说明 Windows 和 macOS 上安装 Clash 客户端、导入机场订阅链接、连接节点的具体步骤。
category: 客户端教程
difficulty: beginner
publishedAt: 2026-08-25
updatedAt: 2026-08-25
relatedTopics:
  - protocols-compared
  - what-is-airport-proxy
---

Clash 是 Windows 和 macOS 上最常用的机场客户端之一，两个系统的操作步骤基本一致。原始的 Clash for Windows 已经停止更新，目前主流是它的分支 **Clash Verge Rev**（也有人用 mihomo party 等其他分支），这篇以 Clash Verge Rev 为例说明配置流程。不同分支、不同版本之间界面细节可能有出入，具体菜单名称请以你安装的版本实际显示为准。

## 第一步：下载安装客户端

前往 Clash Verge Rev 的官方发布渠道（GitHub Releases 是最常见的分发方式）下载对应系统的安装包：Windows 选 `.exe` 或 `.msi`，macOS 选 `.dmg`。下载完成后按系统常规方式安装即可。

## 第二步：拿到你的订阅链接

订阅链接由你选择的机场服务商在其官网/客户端后台提供，通常是一长串以 `http` 或 `https` 开头的网址。这一步需要你先注册并购买对应机场的套餐——机场E家不销售套餐，只做导航和信息整理，具体可以先看[机场导航](/airports/)挑选服务商。

## 第三步：导入订阅

打开 Clash Verge Rev，一般在"订阅"（Profiles）页面里有"新建/导入"的入口，把上一步拿到的订阅链接粘贴进去，点击确认后客户端会自动拉取该机场的节点列表。如果订阅链接需要定期更新（大多数机场是这样），客户端通常也会提供手动或自动更新订阅的选项。

## 第四步：选择节点、开启代理

订阅导入成功后，在"节点"（Proxies）页面可以看到该机场提供的所有节点，按地区选择一个你需要的节点。选好节点后，需要在设置里开启"系统代理"（System Proxy）或"TUN 模式"，才能让系统流量真正走这个节点——只导入订阅、不开启代理是没有效果的。

## 第五步：验证是否连接成功

可以打开浏览器访问一个平时无法直接打开的网站，如果能正常加载，说明代理已经生效。Clash Verge Rev 通常也会在界面上显示当前节点的连接状态和延迟测试结果，可以作为参考。

## 常见问题

**为什么导入订阅后节点列表是空的？** 常见原因是订阅链接已过期、套餐已到期，或者链接本身复制不完整，建议回到机场服务商的后台重新复制一次完整链接。如果不是空列表、而是弹出具体的报错信息（比如解析失败），见[Clash 导入订阅报错、解析失败怎么办](/troubleshooting/clash-import-failed/)。

**为什么开了代理还是打不开某些网站？** 可能是节点本身当前不可用，也可能是该网站对代理 IP 有额外限制，更完整的排查顺序见[机场连不上、网页打不开怎么排查](/troubleshooting/connection-failed-troubleshooting/)。

## 你可能还想看

- [苹果小火箭（Shadowrocket）配置教程](/tutorials/ios-shadowrocket-setup/)
- [Android 机场客户端配置教程](/tutorials/android-setup/)
- [Clash 导入订阅报错、解析失败怎么办](/troubleshooting/clash-import-failed/)
- [机场协议对比：SS / V2Ray / SSR / Trojan / Hysteria2](/knowledge/protocols-compared/)
- [机场导航｜机场代理服务商目录](/airports/)
- [适合新手的机场推荐](/rankings/for-beginners/)
