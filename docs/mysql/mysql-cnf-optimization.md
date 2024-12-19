# 高性能 MySQL 8.0 配置

```
[client]
default_character_set=utf8mb4

[mysql]
default_character_set=utf8mb4

[mysqld]
default_time_zone='+08:00'
character_set_server=utf8mb4
collation_server=utf8mb4_general_ci

skip_ssl

slow_query_log=ON
long_query_time=2

log_bin=ON
binlog_format=ROW
expire_logs_days=7
max_binlog_size=500M

# high performance settings, see https://help.aliyun.com/zh/rds/apsaradb-rds-for-mysql/optimize-the-parameters-of-an-apsaradb-rds-for-mysql-instance

max_connections=8532
max_user_connections=8000
back_log=3000
innodb_autoinc_lock_mode=2
net_write_timeout=120
tmp_table_size=2MB
innodb_buffer_pool_instances=8
table_open_cache=2048
table_open_cache_instances=16
open_files_limit=655350
innodb_thread_concurrency=0
binlog_transaction_dependency_history_size=500000
binlog_transaction_dependency_tracking=WRITESET
eq_range_index_dive_limit=100
innodb_lock_wait_timeout=50
innodb_lru_scan_depth=1024
innodb_sync_array_size=128
innodb_page_cleaners=8
innodb_open_files=20000
innodb_io_capacity=20000
innodb_io_capacity_max=40000

pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
log-error       = /var/log/mysql/error.log
bind-address    = 0.0.0.0
```