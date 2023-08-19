<div align="center">
<h2>[2023] IKEA Renewal Company Site </h2> 
  기존 IKEA 기업 사이트의 디자인 변경 및 새로운 기능들을 추가하여 리뉴얼했습니다.
</div>
<br>

<img src='https://github.com/Du0Du0/coding-guide-react-ikea/blob/main/1.png?raw=true' width='200%;'>
<br>

## 개요

- 프로젝트 인원 및 이름 : 1인 프로젝트 / 김도현
- 프로젝트 기간 : 2023.07.11~2023.08.13
  <br>

## 배포 주소

- 개발 버전:
- 프론트 서버:
- 백엔드 서버:
  <br>

## 시작 가이드

### <strong> Requirements <strong>

For building and running thr application you need:

- <a href=''>React 17.0.2 </a>
- <a href=''>React-router-dom 5.3.4 </a>
- <a href=''>Node 18.15.0 </a>
- <a href=''>Npm 9.6.5 </a>

## <strong>Installation<strong>

```
$ git clone https://github.com/Du0Du0/IKEA_React_Portfolio.git
$ cd IKEA_React_Portfolio
```

#### <strong>Frontend<strong>

```
$ cd client
$ npm install
$ npm start
```

#### <strong>Backend<strong>

```
$ cd server
$ npm install
$ npm i nodemon
$ nodemon server.js
```

<br>

## Stacks

<h3><strong>✔️ Front-end</strong></h3>
<table>
  <tr>
    <td><img src='https://raw.githubusercontent.com/Du0Du0/IKEA_React_Portfolio/1875993b6009f431a1cd58983e0624d9aa8728c4/client/public/img/javascript.svg' alt=''/></td>
    <td><img src='https://raw.githubusercontent.com/Du0Du0/IKEA_React_Portfolio/1875993b6009f431a1cd58983e0624d9aa8728c4/client/public/img/react.svg' alt=''/></td>
  </tr>
  <tr align="center">
    <td> JavaScript </td>
    <td>React</td>
  </tr>
</table>

<h3><strong>✔️ Back-end</strong></h3>
<table>
  <tr>
    <td><img src='https://raw.githubusercontent.com/Du0Du0/IKEA_React_Portfolio/1875993b6009f431a1cd58983e0624d9aa8728c4/client/public/img/node.svg' alt=''/></td>
       <td><img src='https://raw.githubusercontent.com/Du0Du0/coding-guide-react-ikea/97c7d56213bbc5070bf945aabe8752f87019c848/swagger.svg?token=A6NTPNFFIAQIDGVIQNBOKPDE4A7H2' width='100px;;' alt=''/></td>
  </tr>
  <tr align="center">
    <td>Node </td>
     <td>Swagger </td>
  </tr>
</table>

<h3><strong>✔️ DB </strong></h3>
<table>
  <tr>
    <td width='30%;'><img src='https://github.com/Du0Du0/coding-guide-react-ikea/blob/main/mongo.png?raw=true'  alt=''/></td>
  </tr>
  <tr align="center">
    <td>MongoDB </td>
  </tr>
</table>
<br>

## 기술적 의사결정

|         기술         | 사용 이유                                                                                                                                                                                                                                                                                                                                       |
| :------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|        redux         | 컨포넌트 내에서 상태관리 함에 있어서 페이지 이동 하면서 데이터를 유지하기 어려워 전역으로 데이터 저장하는 방법으로 react-redux선택                                                                                                                                                                                                              |
|    redux toolkit     | (*redux -> *redux toolkit)<br/>쓰는 기능에 비해서 react-redux가 무거워 대신 client-side-state전역 관리로 redux-toolkit을 선정<br/>리덕스보다 action을 정의하지 않고 작성할 수 있어 코드가 간결해지고 immer부분이 내장되어 있어 편하게 사용할 수 있기에 선택하게 됨. 또한 비동기를 수월하게 할 수 있는 thunk도 함께 사용할 수 있어서 선택하게 됨 |
|     React query      | (*redux toolkit -> *React query)<br/>리액트 쿼리 사용 시 캐싱 처리를 이용하거나 데이터 변경 시 get api를 자동 실행하는 등 최적화와 효율적인 코드 작성을 위해 선정, 실시간 변동하는 Flicker API와 Youtube API 데이터를 실시간으로 가져올 수 있음                                                                                                 |
|        Axios         | API를 연동하기 위해서 fetch나 axios 등으로 활용할 수 있는데 axios를 사용하게 된 이유는 자동으로 JSON 데이터 형식으로 변환이 가능하고 XSRF의 보호를 받는다는 점에서 fetch대신 axios를 선택함                                                                                                                                                     |
|       Firebase       | 구현 중이던 회원가입 기능에서 차선택으로 Firebase Authentication을 이용해 이메일/비밀번호 입력 로그인 방식 채택                                                                                                                                                                                                                                 |
|   React router dom   | UI를 url에 따라 분기 처리하여 렌더링하기 위해서 선정                                                                                                                                                                                                                                                                                            |
| React kakao maps sdk | 기존의 html + js로 구성되어있는 kakao maps 레퍼런스를 리액트와 jsx에 맞게 함수형 컴포넌트 코드로 작성하기 위해 선정                                                                                                                                                                                                                             |
| react daum postcode  | 회원가입 폼에 필요한 우편번호, 도로명주소, 동 주소가 필요했고 상세 주소를 찾을수 있도록 도와주는 상세 주소검색창을 띄워주기 때문에 선택                                                                                                                                                                                                         |
|    react calendar    | 매장 영업 일정 표기를 위해 달력이 필요했고 일정 표시 등 커스터마이징도 가능해서 선택                                                                                                                                                                                                                                                            |

<br>

## 아키텍쳐

### <strong>Directory Structure<strong>

<img src='https://github.com/Du0Du0/coding-guide-react-ikea/raw/main/2.png?raw=true' width='200%;'>
<br>

## 화면 구성 / API 주소

### <strong>1️⃣ Main Page<strong>

<img src='https://github.com/Du0Du0/coding-guide-react-ikea/raw/main/6.png?raw=true' width='200%;'>
<img src='https://github.com/Du0Du0/coding-guide-react-ikea/raw/main/7.png?raw=true' width='200%;'>
<br>

### <strong>2️⃣ Login Process<strong>

### <strong> ✔ 소셜 로그인<strong>

1. 카카오 & 네이버 id와 pw를 입력
2. 카카오 & 네이버 서버에서 유저 닉네임, 이메일을 가져와 Firebase와 MongoDB에 회원목록 추가
3. Redux dispatch를 통해 전역 데이터를 관리함으로써 로그인 및 로그아웃 상태 확인 가능

### <strong> ✔ 일반 로그인<strong>

<img src='https://github.com/Du0Du0/coding-guide-react-ikea/raw/main/8.png?raw=true' width='200%;'>
<br>

### <strong>3️⃣ Sub Page<strong>

<img src='https://user-images.githubusercontent.com/127612852/260990977-f4e7ab08-cfa7-4ba4-ac18-e531ca1c0fbf.png' width='200%;'>
<br>

### <strong>✔ 회원 가입<strong>

1. 사용자가 입력할 때 마다 상태값이 변하면서 리렌더링이 될 것이고, 예외 처리를 하는 함수가 그 때마다 호출된다면 굉장히 비효율적이기 때문에 특정 시간이 지난 후 예외 처리를 한 번만 실행하도록 debounce를 적용

<img src='https://github.com/Du0Du0/coding-guide-react-ikea/raw/main/9.png?raw=true' width='200%;'>
<br>

### <strong>✔ API Specification<strong>

주요 기능에 따라 도메인 나누고 리스트업:

- FAQ게시판 (/faq)
- 회원 (/user)
- 회원가입 (/join)

| Index | Method |                      URI                       |      Description      |
| :---: | :----: | :--------------------------------------------: | :-------------------: |
|   1   |  GET   |         <a href=''>/faq/lists </a>         | FAQ 모든 글 목록 조회 |
|   2   |  GET   | <a href=''>/faq/detail/{communityNum} </a> |    상세페이지 조회    |
|   3   |  GET   |        <a href=''>/user/{uid} </a>         |      작성자 조회      |
|   4   | DELETE |   <a href=''>/delete/{communityNum} </a>   |      게시물 삭제      |
|   5   |  PUT   |        <a href=''>/faq/update </a>         |      게시물 수정      |
|   6   |  POST  |         <a href=''>/faq/write </a>         |      게시물 작성      |
|   7   |  POST  |            <a href=''>/user/join</a>            |       회원 가입       |

<br>

### <strong>✔ 익명 게시판<strong>

1. Localstorage를 이용한 익명게시판
2. 게시물 조회 / 게시물 추가 / 게시물 수정 / 삭제
3. 게시물 비밀번호 설정 -> 비밀번호 인증 후 글 수정 가능

<img src='https://github.com/Du0Du0/coding-guide-react-ikea/raw/main/11.png?raw=true' width='200%;'>
<br>
<br>

4. 댓글 작성 및 댓글 좋아요 기능
5. 댓글 삭제 및 수정 기능

 <img src='https://github.com/Du0Du0/coding-guide-react-ikea/raw/main/12.png?raw=true' width='200%;'>
<br>

### <strong>✔ 점포 안내<strong>

1.  OpenWeather API를 이용한 지점별 지역 온도 및 날씨 조회
2.  react-calendar를 이용한 매장 일정 조회 (오늘 날짜, 휴점, 연장엽업 등)
3.  Email.js를 이용한 폼 메일 전송 기능
4.  Kakao API를 이용한 지점별 지도 조회
5.  지점별 지하철 노선 정보
6.  지점별 버스 노선 정보 (지역버스, 간선버스, 광역버스, 좌석버스 등)

<img src='https://github.com/Du0Du0/coding-guide-react-ikea/raw/main/13.png?raw=true' width='200%'>
