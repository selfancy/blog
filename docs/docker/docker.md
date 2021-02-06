# docker入门及使用

## 1 docker 介绍
> docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。
> 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。
> 容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

docker的应用场景
- Web 应用的自动化打包和发布。
- 自动化测试和持续集成、发布。
- 在服务型环境中部署和调整数据库或其他的后台应用。
- 从头编译或者扩展现有的 OpenShift 或 Cloud Foundry 平台来搭建自己的 PaaS 环境。

## 2 Centos7 安装 docker

### 2.1 卸载老版本 docker
```shell
yum remove -y docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```

### 2.2 安装 docker
```shell
yum install -y yum-utils device-mapper-persistent-data lvm2 \
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo \
yum-config-manager --disable docker-ce-edge \
yum install -y docker-ce
```

### 2.3 设置开机启动
```shell
systemctl enable docker
```
### 2.4 修改默认存储目录
当我们挂载了数据盘后，一般希望把它迁移到数据盘挂载的目录进行存储

docker默认数据存储目录为：/var/lib/docker

修改存储目录有两种方式

#### 2.4.1 软连接数据目录
假设挂载点在 /data 路径。
```shell
# 首先停掉 docker 服务
systemctl stop docker \
# 创建新存储目录
mkdir -p /data/docker \
# 然后移动整个 /var/lib/docker 目录到新存储目录
mv /var/lib/docker /root/data/docker \
# 做软连接
ln -s /data/docker /var/lib/docker \
# 启动docker服务
systemctl start docker
```

#### 2.4.2 修改存储位置（推荐）
```shell
vim /etc/docker/daemon.json
# 添加如下内容：
# registry-mirrors 为docker镜像源地址
# graph 为 docker 的数据存储目录
{
    "registry-mirrors":[
        "https://mirror.domain.com"
    ],
    "graph":"/data/docker"
}
```

## 3 docker 基本命令

### 拉取镜像
```
docker pull [选项] [Docker Registry地址]<仓库名>:<标签>
```

选项可以通过 docker pull –help 查看

Docker Registry地址：<域名/IP>[:端口号]， 默认地址是Docker Hub

仓库名：仓库名是两段式名称，既 <用户名>/<软件名> 。对于 Docker Hub，如果不给出用户名，则默认为 library ，也就是官方镜像。
### 列出本地镜像
```shell
docker images
```
### 删除镜像
```shell
docker rmi {IMAGE_ID}
```
删除镜像之前，先查看是否有容器在运行，若在运行，先 docker stop {CONTAINER_ID}

再查看停止的容器 docker ps -a

清除所有已经停止的容器 docker rm $(docker ps -qa)

删除对应的镜像： docker rmi IMAGE_ID
### 启动容器
```shell
docker run {IMAGE_ID}
```
相关参数
- -a stdin: 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；
- -d: 后台运行容器，并返回容器ID；
- -i: 以交互模式运行容器，通常与 -t 同时使用；
- -P: 随机端口映射，容器内部端口随机映射到主机的端口
- -p: 指定端口映射，格式为：主机(宿主)端口:容器端口
- -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
- --name="nginx-lb": 为容器指定一个名称；
- --dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；
- --dns-search example.com: 指定容器DNS搜索域名，默认和宿主一致；
- -h "mars": 指定容器的hostname；
- -e username="ritchie": 设置环境变量；
- --env-file=[]: 从指定文件读入环境变量；
- --cpuset="0-2" or --cpuset="0,1,2": 绑定容器到指定CPU运行；
- -m :设置容器使用内存最大值；
- --net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；
- --link=[]: 添加链接到另一个容器；
- --expose=[]: 开放一个端口或一组端口；
- --volume , -v: 绑定一个卷

### 查看容器
查看运行的容器： docker ps

查看所有的容器： docker ps -a

只显示容器的id: docker ps -q 或者 docker ps -qa
### 查看容器日志
```shell
docker logs {CONTAINER_ID}
```
获取对应容器的日志，容器的CONTAINER_ID可以通过docker ps获得
### 容器的启动停止和重启
```shell
docker start/stop/restart {CONTAINER_ID}
```
### 删除处于终止状态的容器
```shell
docker rm {CONTAINER_ID}
```
清理容器：docker rm CONTAINER_ID

清理所有处于终止状态的容器： docker rm $(docker ps -a -q)
### 文件拷贝
拷贝docker中的文件到宿主机，需要注意的是：不管容器有没有启动，拷贝命令都会生效。

拷贝文件到宿主机： docker cp {CONTAINER_ID}:SRC_DIRECTORY DES_DIRECTORY

拷贝文件到容器： docker cp SRC_DIRECTORY {CONTAINER_ID}:DES_DIRECTORY
### 构建镜像（制作Dockerfile）
docker build -f /path/Dockerfile -t imagename

-f：指定Dockerfile上下文路径

docker build -t imagename

`.`为当前目录
### 提交镜像
对已有容器更改后，提交镜像

docker commit {CONTAINER_ID} 新镜像名字

-a：作者名字

-m：提交注释
### 镜像导入导出
save&load 【保存镜像，并不是容器】

docker save vell001/tf-keras > tf-keras.tar

docker load < tf-keras.tar

export&import 【Ex   port命令用于持久化容器（不是镜像），不会保留镜像的层级信息，所以大小会比save要小】

docker export 33f6c8359187 > tf-keras-33f6c8359187.tar

docker import tf-keras-33f6c8359187.tar