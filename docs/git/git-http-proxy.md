# Git 设置 HTTP/HTTPS 代理
> 解决如: GitHub无法拉取或push代码

## http 代理方式
```shell
git config http.proxy http://代理服务器地址:端口
git config https.proxy https://代理服务器地址:端口
```

## socks5 代理方式
```shell
git config http.proxy socks5://代理服务器地址:端口
git config https.proxy socks5://代理服务器地址:端口
```