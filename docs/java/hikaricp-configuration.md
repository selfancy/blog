## 高性能 MySQL 配置

?> 为了获得 MySQL 的最佳性能，这些是我们推荐的一些设置。MySQL 中还有许多其他[`与性能相关的设置`](http://dev.mysql.com/doc/connector-j/en/connector-j-reference-configuration-properties.html)，我们建议您查看所有这些设置，以确保您的应用程序获得最佳性能。

**prepStmtCacheSize**

这设置了 MySQL 驱动程序将缓存每个连接的准备好的语句数。默认是保守的25。我们建议将其设置为250-500之间。

**prepStmtCacheSqlLimit**

这是驱动程序将缓存的准备好的 SQL 语句的最大长度。MySQL 默认值为256。根据我们的经验，尤其是对于像 Hibernate 这样的 ORM 框架，这个默认值远低于生成语句长度的阈值。我们推荐的设置是2048。

**cachePrepStmts**

如果缓存实际上被禁用，则上述参数都没有任何影响，因为它是默认情况下。您必须将此参数设置为true。

**useServerPrepStmts**

较新版本的 MySQL 支持服务器端准备语句，这可以显着提高性能。将此属性设置为true。

HikariCP 的典型 MySQL 配置可能如下所示：
```properties
jdbcUrl=jdbc:mysql://localhost:3306/simpsons
username=test
password=test
dataSource.cachePrepStmts=true
dataSource.prepStmtCacheSize=250
dataSource.prepStmtCacheSqlLimit=2048
dataSource.useServerPrepStmts=true
dataSource.useLocalSessionState=true
dataSource.rewriteBatchedStatements=true
dataSource.cacheResultSetMetadata=true
dataSource.cacheServerConfiguration=true
dataSource.elideSetAutoCommits=true
dataSource.maintainTimeStats=false
```
### 也可以看看

如果你使用的是 MySQL，你真的需要阅读[`这张幻灯片`](https://cdn.oreillystatic.com/en/assets/1/event/21/Connector_J%20Performance%20Gems%20Presentation.pdf)