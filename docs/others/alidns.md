# 阿里云公共 DNS
## 1、特性优势
### 一站式数据解析，加速域名访问
全国近半的域名托管数量，域名的权威解析数据和递归解析都在阿里云DNS内部，解析无需层层递归，访问直达请求点，使访问速度更快。

### 秒级生效，容灾切换
- 和阿里云权威解析（云解析DNS）联动，实现域名变更秒级生效；
- 丰富的容灾调度策略，实现灾备。

### 全球多节点部署
- 全球16个DNS集群节点，可为用户提供就近访问和最低延迟解析能力；
- 线路覆盖国内六大运营商（联通、电信、移动、教育网、鹏博士、广电网）细化到省级，海外线路精细到国家级别；
- 智能解析，根据访问请求来源，返回最近的访问节点，降低延时，提升访问效率。

### 技术领先，深耕DNS领域
阿里云深耕DNS领域多年，有一系列完整的DNS解决方案，无论权威DNS、递归DNS都能在内部闭环。

### 服务稳定
公共DNS的节点丰富，调度精准，多年来的公共DNS运营经验，保证给接入的用户提供高质量的稳定服务。

### 多终端集成
仅需更改DNS到阿里云公共DNS的地址，即可立刻享受免费的公共DNS服务；支持通过SDK的方式接入。不限制各种终端设备的接入类型，现已支持iOS、安卓系统接入，支持OpenAPI接入。

## 2、接入指南
> [点此查看](https://www.alidns.com/setup)

## 3、DNS JSON API
DNS JSON API的URL 接口 （提供TLS和非TLS API）
- https://dns.alidns.com/resolve?
- https://alidns_ip/resolve?
- http://dns.alidns.com/resolve?
- http://alidns_ip/resolve?
> 注意：其中alidns_ip是dns.alidns.com 的A记录，可以是以下两个地址之一 ：223.5.5.5，223.6.6.6.

请求方式： GET

请求参数 ：

参数 | 类型 | 描述 | 示例 | 使用方法和默认值
--- | --- | --- | --- | --- 
name | string | 请求域名 | name=www.taobao.com. | 必选，无默认值
type | number | 请求类型 | type=1 | 可选，1
edns_client_subnet | IP | ECS IP | edns_client_subnet=1.2.3.4/24 | DNS代理使用，普通客户端不适用

**关于edns_client_subnet参数 ：**

edns_client_subnet是为了支持DNS ECS功能（RFC7871），将用户的子网信息传递给权威DNS，做更精确的DNS解析和流量调度。其中掩码越长地址信息越精确，掩码越短用户隐私效果越好。建议使用"/24" 掩码长度

注：该参数是特地为DNS代理（proxy）使用DNS JSON API场景设计，即用户发送DNS查询给DNS代理，DNS代理通过该参数携带用户的子网信息传递给阿里公共DNS，最后传递到权威DNS服务器。

例如edns_client_subnet=1.2.3.4/24，权威服务器会收到基于1.2.3.0/24地址前缀信息来帮助用户选择DNS链路

**关于type参数支持类型：**

记录类型 | ID | 意义 | 示例（以 taobao.com , www.taobao.com 为例）
--- | --- | --- | ---
A | 1 | IPv4 地址 | 101.37.183.171
NS | 2 | NS 记录 | ns1.taobao.com.
CNAME | 5 | 域名 CNAME 记录 | www.taobao.com.danuoyi.tbcache.com.
SOA | 6 | ZONE 的 SOA 记录 | ns4.taobao.com. hostmaster.alibabadns.com. 2018011109 3600 1200 3600 360
TXT | 16 | TXT 记录 | "v=spf1 include:spf1.staff.mail.aliyun.com -all"
AAAA | 28 | IPv6 地址 | 240e:e1:f300:1:3::3fa

请求示例：
http://dns.alidns.com/resolve?name=www.taobao.com.&type=1

返回示例：
```json5
{
    "Status": 0,
    "TC": false,
    "RD": true,
    "RA": true,
    "AD": false,
    "CD": false,
    "Question": {       // 请求段
        "name": "www.taobao.com.",
        "type": 1
    },
    "Answer": [         // 应答段
        {
            "name": "www.taobao.com.",
            "TTL": 45,
            "type": 5,
            "data": "www.taobao.com.danuoyi.tbcache.com."
        },
        {
            "name": "www.taobao.com.danuoyi.tbcache.com.",
            "TTL": 45,
            "type": 1,
            "data": "47.246.24.234"
        },
        {
            "name": "www.taobao.com.danuoyi.tbcache.com.",
            "TTL": 45,
            "type": 1,
            "data": "47.246.24.233"
        }
    ]
    //"Authority" 权威段, 如果有数据与Answer字段一致
    //"Additional" 附加段, 如果有数据与Answer字段一致
    // 可选 "edns_client_subnet":"1.2.3.4/24"
}
```
注：用户可以在客户端应用或APP中调用DoH和DNS JSON API解析DNS 。

## 4、DNS over TLS （DoT）
阿里公共DNS通过RFC 7858指定的经过TLS加密的TCP连接提供DNS解析。提供两种模式接入：域名方式和IP方式。基本流程是：
1. 终端设备配置DoT的解析服务器dns.alidns.com 或alidns_ip
2. 如果配置的是alidns.com，客户端先解析alidns.com获得地址alidns_ip
3. 获得DoT解析服务器IP地址之后，终端设备再建立与DoT解析服务器在端口853 的TCP连接
4. 经过TLS握手协商，终端设备与DoT解析服务器建立TLS连接
5. 通过该TLS连接，终端设备可以发送DNS查询到远端DoT解析服务器

对使用安卓手机的用户来说，可以设置在手机设置界面设置阿里公共DNS的域名和地址来获取DNS的DoT安全传输服务。

![](https://www.alidns.com/public/img/faqs-safe-1.png)
![](https://www.alidns.com/public/img/faqs-safe-2.png)

华为手机的DoT网络设置