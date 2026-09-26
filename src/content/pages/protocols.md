---
title: "机场协议对比｜Shadowsocks、Trojan、VLESS、Hysteria2 怎么选"
description: "梯子与机场常见协议对比：Shadowsocks、Trojan、VLESS、Hysteria2、WireGuard 的特点、适用场景与客户端支持，帮你看懂节点名称里的协议标签。"
h1: "协议对比：节点后面的那些名字是什么意思"
lead: "多数用户不需要挑协议，服务商给什么就用什么。但看懂协议名称，能帮你选客户端、排查连接问题。"
kicker: "PROTOCOL · 协议"
updated: 2026-09-26
keywords: ["机场协议","Shadowsocks","Trojan","VLESS","Hysteria2"]
cardsTitle: "逐个了解"
cards:
  - { href: "/knowledge/protocols-compared/", title: "协议对比详解", desc: "SS / V2Ray / Trojan / Hysteria2", tag: "总览" }
  - { href: "/knowledge/vpn-protocols-explained/", title: "VPN 协议", desc: "WireGuard、OpenVPN 等", tag: "VPN" }
  - { href: "/knowledge/airport-nodes-guide/", title: "节点、专线与倍率", desc: "看懂节点名称标签", tag: "节点" }
faq:
  - q: "协议越新越好吗？"
    a: "不一定。可用性取决于服务商支持、客户端支持和你的网络环境，稳定可用比新更重要。"
  - q: "需要自己选协议吗？"
    a: "大多数情况不需要，服务商订阅里已配置好。协议影响的是兼容性与性能特点。"
  - q: "为什么有的客户端连不上某些节点？"
    a: "可能客户端版本太旧，不支持该协议。升级客户端或换支持该协议的客户端。"
related:
  - { href: "/clients/", title: "客户端教程" }
  - { href: "/subscription/", title: "订阅链接" }
  - { href: "/troubleshooting/", title: "排错清单" }
---
## 五种常见协议

| 协议 | 特点 | 常见客户端 |
| --- | --- | --- |
| Shadowsocks | 简单、轻量，兼容性最好 | 几乎所有客户端 |
| Trojan | 模拟 HTTPS 流量，配置相对固定 | Clash 系、v2rayN 等 |
| VLESS | 轻量、灵活，配合 TLS 等传输层 | v2rayN、sing-box、新版 Clash 内核 |
| Hysteria2 | 基于 QUIC/UDP，注重弱网表现 | 新版客户端、sing-box |
| WireGuard | 常见于 VPN，简洁高效 | 官方客户端、部分代理客户端 |

上表是概括性说明，不代表任何机场的实际表现。

## 怎么看待“协议”

- **兼容性**：协议要被客户端支持；
- **网络环境**：UDP 被限制的网络里，基于 QUIC 的协议可能表现不同；
- **服务商配置**：同一协议在不同线路上的表现不同。

## 选择建议

1. 用服务商默认订阅即可；
2. 连不上时，先换协议不同的节点试一试，再升级客户端；
3. 想深入，读 [协议对比详解](/knowledge/protocols-compared/)。
