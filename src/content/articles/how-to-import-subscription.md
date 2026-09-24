---
type: tutorial
title: 机场订阅链接导入教程（通用步骤）
description: 说明机场订阅链接是什么、常见格式、导入前要确认的几件事，以及不同客户端的具体导入步骤该去哪里看。
category: 客户端教程
difficulty: beginner
publishedAt: 2026-08-25
updatedAt: 2026-09-24
relatedTopics:
  - what-is-airport-proxy
  - clash-desktop-setup
  - ios-shadowrocket-setup
---

不管用哪个客户端，"导入订阅"这一步的原理是一样的：把机场服务商提供的订阅链接交给客户端，客户端会自动拉取里面的节点列表。这篇说明这一步通用的概念和注意事项，具体到某个客户端的详细操作步骤，见页面底部对应的分平台教程。

## 订阅链接是什么

订阅链接是机场服务商生成的一个网址，通常以 `http://` 或 `https://` 开头，也有部分服务商用 `clash://`、`shadowrocket://` 这类自定义协议链接方便一键跳转导入。这个链接本质上指向一份包含该服务商当前节点信息的配置文件，客户端定期访问这个链接就能拿到最新的节点列表。

订阅链接通常能在你购买套餐后，登录服务商官网或客户端账号后台找到，机场E家不销售套餐、也不会替你生成或托管订阅链接。如果还没选好服务商，可以先看[机场导航](/airports/)。

## 导入前建议确认这几件事

- **链接是否完整**：订阅链接通常很长，复制时容易漏掉末尾的字符，导致导入后节点列表为空或报错；
- **套餐是否在有效期内**：过期套餐的订阅链接通常无法拉取到节点；
- **是否需要定期更新订阅**：多数机场的节点会变化，客户端一般有"更新订阅"的按钮或自动更新周期设置，长期不更新可能导致部分节点失效；
- **客户端是否支持该服务商的订阅格式**：极少数机场只支持自己的自研客户端，通用订阅链接可能无法在 Clash、Shadowrocket 等第三方客户端里使用，具体某个服务商是否有这个限制，可以在其[机场导航详情页](/airports/)查到本站整理的信息。

## 不同客户端的具体导入步骤

- [Clash 客户端配置教程（Windows / macOS）](/tutorials/clash-desktop-setup/)
- [苹果小火箭（Shadowrocket）配置教程](/tutorials/ios-shadowrocket-setup/)
- [Android 机场客户端配置教程](/tutorials/android-setup/)

## 导入后常见问题

**节点列表是空的？** 最常见的原因是链接复制不完整或套餐已过期，回到服务商后台重新完整复制一次通常能解决。

**导入成功但连不上？** 说明订阅本身没问题，更完整的排查顺序见[机场连不上、网页打不开怎么排查](/troubleshooting/connection-failed-troubleshooting/)。

**Clash 导入时弹出具体报错，而不是节点列表为空？** 见[Clash 导入订阅报错、解析失败怎么办](/troubleshooting/clash-import-failed/)。

## 你可能还想看

- [机场代理是什么](/knowledge/what-is-airport-proxy/)
- [机场导航｜机场代理服务商目录](/airports/)
- [机场常见问题排查](/troubleshooting/)
- [适合新手的机场推荐](/rankings/for-beginners/)
- [机场怎么用？新手从购买到连上的完整流程](/tutorials/airport-getting-started/)
