---
type: knowledge
title: 机场协议对比：SS / V2Ray / SSR / Trojan / Hysteria2 怎么选
description: 逐个说明 Shadowsocks、ShadowsocksR、VMess/VLESS（V2Ray 系列）、Trojan、Hysteria2 这几种机场常见协议的设计特点和定位区别，以及日常使用要不要关心协议这件事。
category: 基础知识
difficulty: beginner
publishedAt: 2026-08-25
updatedAt: 2026-08-25
relatedTopics:
  - what-is-airport-proxy
  - how-to-choose-an-airport-proxy
---

看机场服务商介绍时经常会看到 SS、SSR、V2Ray、VMess、VLESS、Trojan、Hysteria2 这些名字，它们都是**协议**——节点与客户端之间约定的数据传输规则。这篇按协议逐个说明设计特点，帮你看懂服务商页面里这些术语具体指什么。如果还分不清"协议"和"客户端"（比如 Clash）的关系，建议先看[机场代理是什么](/knowledge/what-is-airport-proxy/)。

## 快速对比

| 协议 | 传输层 | 定位 |
| --- | --- | --- |
| Shadowsocks（SS） | TCP/UDP | 最早期、最轻量的协议之一，实现简单，至今仍被广泛支持 |
| ShadowsocksR（SSR） | TCP/UDP | 在 SS 基础上加了混淆和协议插件，曾经流行，目前多数机场已转向更新的协议 |
| VMess | TCP/UDP（依托 V2Ray） | V2Ray 项目最初的协议，内置身份验证和时间戳校验 |
| VLESS | TCP/UDP（依托 V2Ray/Xray） | 比 VMess 更轻量的替代方案，本身不做加密，依赖外层 TLS |
| Trojan | TCP（伪装为 HTTPS） | 把代理流量伪装成普通 HTTPS 网页流量，设计目标是不容易被流量特征识别 |
| Hysteria2 | UDP（基于 QUIC） | 较新的协议，基于 QUIC，设计目标是在弱网、丢包率高的网络环境下有更好表现 |

以上是各协议公开的设计目标和技术定位，不是本站的测速对比结果——具体在某个机场、某条线路上哪个协议实际表现更好，会因服务商的线路质量、节点部署而异，不能只看协议名称下结论。

## 逐个协议说明

**Shadowsocks（SS）** 是这个领域最早、影响最广的协议之一，设计简单、资源占用低，几乎所有客户端都原生支持。至今仍有不少机场在用，通常作为最基础、兼容性最好的选项。

**ShadowsocksR（SSR）** 是社区在 SS 基础上做的分支，加入了混淆插件等特性。近年来行业里新协议（VLESS、Trojan、Hysteria2）逐渐成为主流，SSR 的更新和使用都在减少，你在新机场的介绍页面上看到 SSR 的概率已经比几年前低不少。

**VMess / VLESS（V2Ray / Xray 系列）** 出自 V2Ray 项目及其分支 Xray。VMess 是最初的协议，内置了身份验证机制；VLESS 是后来推出的更轻量版本，本身不做加密，通常需要搭配 TLS 来保证传输安全。这两者目前都还在广泛使用。

**Trojan** 的设计思路是"伪装"——把代理流量包装成看起来和正常访问 HTTPS 网站没有区别的流量，目标是降低被识别为代理流量的概率。

**Hysteria2** 是相对较新的协议，基于 QUIC（HTTP/3 底层用的传输协议），设计目标是在网络质量不稳定、丢包率较高的环境下仍能维持可用的传输效果。

## 日常使用要不要关心协议

对大部分用户来说，不需要自己去"选协议"——机场服务商会在节点里配置好协议，你只要把订阅链接导入客户端，客户端会自动按节点配置好的协议连接，具体操作步骤见[机场客户端使用教程](/tutorials/)。协议名称更多是在你阅读服务商介绍、判断这家机场技术选型是否"跟得上"时的参考信息，而不是你每次连接前要手动决定的选项。

如果你想知道具体某个机场用的是什么协议，可以在[机场导航](/airports/)对应的详情页里查——比如无忧链接的第三方资料记录其协议为 VLESS / Trojan / Hysteria2，灵猫网络的第三方资料则在协议描述上出现了"宣传文案称新 SS 协议，但测速截图显示 Vless"这类前后不一致的情况，这也是本站在整理服务商资料时如实记录、不替你下结论的原因之一。

## 你可能还想看

- [机场代理是什么](/knowledge/what-is-airport-proxy/)
- [机场代理怎么选](/knowledge/how-to-choose-an-airport-proxy/)
- [机场导航｜机场代理服务商目录](/airports/)
- [机场客户端使用教程](/tutorials/)
- [机场代理和自建节点有什么区别](/knowledge/airport-vs-self-hosted/)
