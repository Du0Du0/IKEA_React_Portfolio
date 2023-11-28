<div align="center">
<h2>[2023] IKEA Renewal Company Site </h2> 
  기존 IKEA 기업 사이트의 디자인 변경 및 새로운 기능들을 추가하여 리뉴얼했습니다.
</div>
<br>

<img src='/client/public/img/readme1.png' width='200%;'>
<br>

## 개요

- 프로젝트 인원 및 이름 : 1인 프로젝트 / 김도현
- 프로젝트 기간 : 2023.07.11~2023.08.13
  <br>

## 배포 주소

- 서비스 URL: https://ergonomics.co.kr
  <br>

## 시작 가이드

### **Requirements**

For building and running thr application you need:

- <a href=''> React 17.0.2 </a>
- <a href=''> React-router-dom 5.3.4 </a>
- <a href=''> Node 16.14.0 </a>
- <a href=''> Npm 9.6.5 </a>

### **Installation**

```
$ git clone https://github.com/Du0Du0/IKEA_React_Portfolio.git
$ cd IKEA_React_Portfolio
```

#### **Frontend**

```
$ cd client
$ npm i
$ npm start
```

#### **Backend**

```
$ cd server
$ npm i && npm i nodemon
$ nodemon server.js
```

<br>

## Stacks

#### **✔️ Front-end**

<table>
  <tr>
    <td><img src='/client/public/img/javascript.svg' alt='javascript icon'/></td>
    <td><img src='/client/public/img/react.svg' alt='react icon'/></td>
      <td align="center"> <img src='/client/public/img/redux.svg'  width='80px;'  alt='redux icon'/></td>
      <td><img src='/client/public/img/query.svg'  width='100px;'  alt='react query icon'/></td>
      <td><img src='/client/public/img/sass.svg'  width='100px;'  alt='sass icon'/></td>
      <td align="center"><img src='/client/public/img/styledComponents.svg'  width='80px;'  alt='styled components icon'/></td>
  </tr>
  <tr align="center">
    <td> JavaScript </td>
    <td>React</td>
    <td>Redux & Redux Toolkit</td>
    <td>React query</td>
    <td>Sass</td>
    <td>Styled components</td>
  </tr>
</table>

#### **✔️ Back-end**

<table>
  <tr>
    <td><img src='/client/public/img/nodejs.svg' width='100px;'  alt='node.js icon'/></td>
    <td><img src='/client/public/img/swagger.svg' width='100px;' alt='swagger icon'/></td>
    <td><img src='/client/public/img/nginx.png' width='100px;' alt='nginx icon'/></td>
    <td><img src='/client/public/img/aws.svg' width='80px;' alt='aws icon'/></td>
    <td><img src='/client/public/img/pm2.png' width='100px;' alt='pm2 icon'/></td>
  </tr>
  <tr align="center">
    <td>Node </td>
     <td>Swagger </td>
     <td>Nginx </td>
     <td>AWS EC2 </td>
     <td>PM2 </td>
  </tr>
</table>

#### **✔️ DB**

<table>
  <tr>
    <td><img src='/client/public/img/mongo.svg'  width='100px;' alt='mongoDB icon'/></td>
  </tr>
  <tr align="center">
    <td>MongoDB </td>
  </tr>
</table>

#### **✔️ CI/CD**

<table>
  <tr>
    <td ><img src='/client/public/img/actions.png'  width='100px;' alt='github actions icon'/></td>
  </tr>
  <tr align="center">
    <td>Github Actions</td>
  </tr>
</table>
<br>

## 기술적 의사결정

|         기술         | 사용 이유                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|        redux         | 컨포넌트 내에서 상태관리 함에 있어서 페이지 이동 하면서 데이터를 유지하기 어려워 전역으로 데이터 저장하는 방법으로 react-redux선택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|    redux toolkit     | 쓰는 기능에 비해서 react-redux가 무거워 대신 client-side-state전역 관리로 redux-toolkit을 사용함.<br/>리덕스보다 action을 정의하지 않고 작성할 수 있어 코드가 간결해지고 immer부분이 내장되어 있어 편하게 사용할 수 있음. 또한 비동기를 수월하게 할 수 있는 thunk도 함께 사용할 수 있어서 선택하게 됨<br/><br/> **일부 페이지 반영 (*redux -> *redux toolkit)**<br/> - 메인 유튜브페이지(Youtube API):<br/> [mainYoutubeSlice.js](https://gist.github.com/Du0Du0/f201db87916947056bc5a3066f416c0c) / [Vids.js](https://gist.github.com/Du0Du0/f201db87916947056bc5a3066f416c0c)<br/> - 갤러리페이지(Flickr API): <br/>[flickerSlice.js](https://gist.github.com/Du0Du0/948b27c95d2fb1d6c047f9526dd4c5c7) / [Gallery.js](https://gist.github.com/Du0Du0/948b27c95d2fb1d6c047f9526dd4c5c7)                                                                                                                                          |
|     React query      | 리액트 쿼리 사용 시 캐싱 처리를 이용하거나 데이터 변경 시 get api를 자동 실행하는 등 최적화와 효율적인 코드 작성을 위해 선정함. 실시간 변동하는 Flicker API와 Youtube API 데이터를 실시간으로 가져올 수 있음<br/><br/> **일부 페이지 반영 (*redux toolkit -> *React query)**<br/> - 메인 유튜브페이지(Youtube API):<br/> [ useMainYoutubeQuery.js](https://gist.github.com/Du0Du0/7a72db64adb26890649ac10c5d9e3dfa) / [Vids.js](https://gist.github.com/Du0Du0/473764ec8e8a0dc6a3597fe068d2c423) <br/>- 서브 유튜브페이지(Youtube API):<br/> [useSubYoutubeQuery.js](https://gist.github.com/Du0Du0/99718e64685f2fb7a509a26b57cd7b55) / [Youtube.js](https://gist.github.com/Du0Du0/883bd42189868b6d27f63ef83eb11bb2)<br/> - 갤러리페이지(Flickr API): <br/>[useFlickerQuery.js](https://gist.github.com/Du0Du0/22d8b1daabc2405f4bff8dd969dc1b67) / [Gallery.js](https://gist.github.com/Du0Du0/c61aab6b2fd308a8c07a93004d8016a2) |
|        Axios         | API를 연동하기 위해서 fetch나 axios 등으로 활용할 수 있는데 axios를 사용하게 된 이유는 자동으로 JSON 데이터 형식으로 변환이 가능하고 XSRF의 보호를 받는다는 점에서 fetch대신 axios를 선택함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|       Firebase       | 구현 중이던 회원가입 기능에서 차선택으로 Firebase Authentication을 이용해 이메일/비밀번호 입력 로그인 방식 채택함. 카카오, 네이버 로그인과 연동하여 회원관리함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|   React router dom   | UI를 url에 따라 분기 처리하여 렌더링하기 위해서 선정                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| React kakao maps sdk | 기존의 html + js로 구성되어있는 kakao maps 레퍼런스를 리액트와 jsx에 맞게 함수형 컴포넌트 코드로 작성하기 위해 선정                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| react daum postcode  | 회원가입 폼에 필요한 우편번호, 도로명주소, 동 주소가 필요했고 상세 주소를 찾을수 있도록 도와주는 상세 주소검색창을 띄워주기 때문에 선택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

<br>

## 프로젝트 아키텍쳐

<img src='/client/public/img/readme2.png' width='100%;'>
<br>

### **Directory Structure**

<img src='/client/public/img/readme3.png' width='200%;'>
<br>

## 화면 구성 / API 주소

### **1️⃣ Main Page**

<img src='/client/public/img/readme4.png' width='200%;'>
<img src='/client/public/img/readme5.png' width='200%;'>
<br>

### **2️⃣ Login Process**

### **✔ 소셜 로그인**

1. 카카오, 네이버 id와 pw를 입력
2. 카카오, 네이버 서버에서 유저 닉네임 및 이메일을 가져와 Firebase, MongoDB에 회원목록 추가
3. Redux dispatch로 전역 데이터를 관리 - 로그인 및 로그아웃 상태 확인

### **✔ 일반 로그인**

<img src='/client/public/img/readme7.png' width='200%;'>
<br>

### **3️⃣ Sub Page**

<img src='/client/public/img/readme6.png' width='200%;'>
<br>

### **✔ 회원 가입**

1. 사용자가 입력할 때 마다 상태값이 변하면서 리렌더링이 될 것이고, 예외 처리를 하는 함수가 그 때마다 호출된다면 굉장히 비효율적이기 때문에 특정 시간이 지난 후 예외 처리를 한 번만 실행하도록 debounce를 적용

<img src='/client/public/img/readme8.png' width='200%;'>
<br>

### **✔ API Specification**

주요 기능에 따라 도메인 나누고 리스트업:

- FAQ게시판 (/faq)
- 회원 정보 (/user)

[API 명세서 바로가기(Swagger)](https://ikeacompany.com/api-docs/)

| Index | Method |                    URI                     |      Description      |
| :---: | :----: | :----------------------------------------: | :-------------------: |
|   1   |  GET   |         <a href=''>/faq/lists </a>         | FAQ 모든 글 목록 조회 |
|   2   |  GET   | <a href=''>/faq/detail/{communityNum} </a> |    상세페이지 조회    |
|   3   |  GET   |        <a href=''>/user/{uid} </a>         |      작성자 조회      |
|   4   | DELETE |   <a href=''>/delete/{communityNum} </a>   |      게시물 삭제      |
|   5   |  PUT   |        <a href=''>/faq/update </a>         |      게시물 수정      |
|   6   |  POST  |         <a href=''>/faq/write </a>         |      게시물 작성      |
|   7   |  POST  |         <a href=''>/user/join</a>          |       회원 가입       |

<br>

### **✔ 익명 게시판**

1. Localstorage를 이용한 익명게시판
2. 게시물 조회 / 게시물 추가 / 게시물 수정 / 삭제
3. 게시물 비밀번호 설정 -> 비밀번호 인증 후 글 수정 가능

<img src='/client/public/img/readme9.png' width='200%;'>
<br>
<br>

4. 댓글 작성 및 댓글 좋아요 기능
5. 댓글 삭제 및 수정 기능

 <img src='/client/public/img/readme10.png' width='200%;'>
 <img src='/client/public/img/readme11.png' width='200%;'>
<br>

### **✔ 점포 안내**

1.  OpenWeather API를 이용한 지점별 지역 온도 및 날씨 조회
2.  react-calendar를 이용한 매장 일정 조회 (오늘 날짜, 휴점, 연장엽업 등)
3.  Email.js를 이용한 폼 메일 전송 기능
4.  Kakao API를 이용한 지점별 지도 조회
5.  지점별 지하철 노선 정보
6.  지점별 버스 노선 정보 (지역버스, 간선버스, 광역버스, 좌석버스 등)

<img src='/client/public/img/readme12.png' width='200%'>
<br/>

## 회고

[회고록 바로가기](https://wobbly-galette-5e2.notion.site/075f8e6da59048b5ae46d31cac06c283?pvs=4)
