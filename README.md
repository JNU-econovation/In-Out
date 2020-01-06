# In-Out

에코노베이션 정보전산원 야간 출입 신청 서비스



### History

------

|          Date          | Version |                           Contents                           |                          Charge of                           |
| :--------------------: | :-----: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 2020.01.06<br />(예정) |   1.0   | 회원 관리 기능(로그인, 회원 정보 수정), 관리자 모드(회원 추가 및 권한 설정, 출입 신청 조회), 출입 신청, 출입 신청 양식 메일 전송 기능20 | Back-end (15기 정병재, 김종근), <br /> Front-end (16기 김기표, 김정인) |
|           -            |    -    |                              -                               |                              -                               |
|           -            |    -    |                              -                               |                              -                               |



### 기술 스택

------

| Tech      | Stacks           |
| --------- | ---------------- |
| Server    | 동아리 전용 서버 |
| Database  | MySQL            |
| Back-end  | Express/Node.js  |
| Front-end | React            |



### 실행 방법

------

in-out 루트 폴더에서 sh starter.sh 실행





### Datebase 스키마

------

**User** (회원 테이블)

> - memberId = 학번, not null, INTEGER
> - name = 이름, not null, String
> - passwod = 비밀번호, not null, String
> - role = 권한, not null, Integer -> enum 적용시 재설정
> - createdAt
> - updatedAt

**Entrollment** (출입 신청 테이블)

> - id : autocrement primarykey
> - today : 날짜, Date, not null , unique
> - memberId : Integer, not null
> - reason : String, not null
> - createdAt
> - updatedAt



### API 명세서

------

Wiki 참고