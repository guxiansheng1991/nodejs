# mysql数据库
## myblog 数据库
```mysql
CREATE DATABASE `myblog` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
```
## users
```mysql
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  `createtime` bigint(20) NOT NULL DEFAULT '0',
  `author` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
## blogs
```mysql
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `realname` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

### 数据插入
```mysql
insert into users(username, `password`, realname) values('zhangsan', 123456, 'zs');
insert into users(username, `password`, realname) values('lisi', 123456, 'ls');
insert into users(username, `password`, realname) values('wangwu', 123456, 'ww');
insert into users(username, `password`, realname) values('zhaoliu', 123456, 'zl');
insert into users(username, `password`, realname) values('shenqi', 123456, 'sq');

select * from users;

insert into blogs(title, content, createtime, author) values('测试1', '一念起, 天涯咫尺; 一念灭, 咫尺天涯.', 1564578691093, 'zhangsan');
insert into blogs(title, content, createtime, author) values('测试2', '山无棱天地合, 乃敢与君绝.', 1564578691093, 'zhangsan');
insert into blogs(title, content, createtime, author) values('测试3', '天涯共此时', 1564578691093, 'lisi');
insert into blogs(title, content, createtime, author) values('测试4', '无心插柳柳成荫', 1564578691093, 'lisi');
insert into blogs(title, content, createtime, author) values('测试5', '浪子回头金不换', 1564578691093, 'lisi');

select * from blogs;
```