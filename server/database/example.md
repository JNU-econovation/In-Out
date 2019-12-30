(임시 db)
dbconfig -> password - 자신의 비밀번호로 설정하기

자신의 컴퓨터에 mysql에 접속하여
`CREATE DATABASE inandout;`
테이블 생성 후
`use in-out`

```
--
-- Table structure for table `author`
--

CREATE TABLE `author` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(20) NOT NULL,
`profile` varchar(200) DEFAULT NULL,
PRIMARY KEY (`id`)
);

--
-- Dumping data for table `author`
--

INSERT INTO `author` VALUES (1,'egoing','developer');
INSERT INTO `author` VALUES (2,'duru','database administrator');
INSERT INTO `author` VALUES (3,'taeho','data scientist, developer');
```

위 코드 작성
