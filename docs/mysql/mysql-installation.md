### 选择下载需要安装的 mysql 版本, 解压 tar.gz 压缩包
> https://downloads.mysql.com/archives/community
```shell
wget -P /usr/local https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.32-linux-glibc2.12-x86_64.tar.gz \
cd /usr/local \
tar -zxvf mysql-5.7.32-linux-glibc2.12-x86_64.tar.gz
```

### 添加 mysql 用户和用户组
```shell
groupadd mysql \
useradd -g mysql mysql
```

### 创建数据目录，授权给mysql用户
```shell
mkdir -p /usr/local/mysql/data \
chown -R mysql:mysql /usr/local/mysql/data
```

### 执行安装脚本
```shell
cd /usr/local/mysql-5.7.32 \
bin/mysqld --initialize --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data --defaults-file=/etc/my.cnf
```

### 添加启动项
```shell
cp support-files/mysql.server /etc/init.d/mysqld \
vim /etc/init.d/mysqld

# 修改项
basedir=/usr/local/mysql/
datadir=/usr/local/mysql/data
port=3306
#... 其他属性在 /etc/my.cnf 更改
```

### 将 mysql 的 bin 目录下常用脚本创建软链接
```shell
ln -s /usr/local/mysql-5.7.32/bin/mysqld /usr/local/bin/mysql \
ln -s /usr/local/mysql-5.7.32/bin/mysqld /usr/local/bin/mysqld
```
### 启动 mysql
```shell
systemctl start mysqld
```

### 查看安装初始密码, 并修改初始密码
```shell
grep "password" /var/log/mysql/mysqld.log \
mysql -uroot -p <初始密码> \

set password=password('root123');
flush privileges;
```