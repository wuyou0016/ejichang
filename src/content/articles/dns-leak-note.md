---
type: knowledge
title: "DNS 泄露是什么？怎么检查与减少梯子中的 DNS 泄露"
description: "使用梯子时 DNS 请求没有走代理，就可能泄露你访问的域名；本文解释 DNS 泄露是什么、怎么检查，以及在客户端里怎么减少风险。"
category: "基础知识"
difficulty: intermediate
publishedAt: 2026-09-26
updatedAt: 2026-09-26
relatedTopics:
  - fanqiang-safety
  - airport-privacy-safety
  - connection-failed-troubleshooting
---
**先给结论**：DNS 泄露指你访问网站时的域名解析请求没有经过代理，而是直接发给了本地网络的 DNS。它会暴露你访问了哪些域名，也可能导致部分网站访问异常。

## 为什么会发生

打开网页前，设备要先把域名解析成 IP。如果解析请求没有走代理，本地网络就能看到你请求了哪些域名。常见原因：

- 客户端规则模式下部分域名走直连解析；
- 系统 DNS 与代理 DNS 设置不一致；
- 部分应用绕过了系统代理。

## 怎么检查

1. 连上代理；
2. 使用公开的 DNS 泄露检测网页，观察显示的 DNS 服务器归属；
3. 如果显示的是你本地运营商的 DNS，说明有解析请求没有走代理。

检测结果只能作为参考，请自己判断检测网站是否可信。

## 怎么减少

- 在客户端里启用 DNS 相关设置（例如让 DNS 也走代理，或使用客户端提供的 DNS 增强模式）；
- 关闭浏览器里冲突的 DNS 设置；
- 需要更严格时使用 TUN 模式，让系统流量整体走代理。

## 需要注意

- 规则模式下国内网站直连、直连解析是设计的一部分；
- 想完全避免泄露，使用全局模式并配合客户端的 DNS 设置；
- 不同客户端的设置项名称不一样，请参考各客户端文档。

## 相关阅读

- [翻墙安全吗](/knowledge/fanqiang-safety/)
- [连不上排查步骤](/troubleshooting/connection-failed-troubleshooting/)
