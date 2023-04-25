# Window clone

## 목차

### [0. vercel 배포 링크](#vercel-배포-링크)

### [1. 프로젝트 소개 및 목적](#1-프로젝트-소개-및-목적)

### [2. 설치 방법](#2-설치-방법)

### [3. 사용 방법](#3-사용-방법)

### [4. 사용 기술](#4-사용-기술)

### [5. 주요 기능](#5-주요-기능)

### [6. 문제 해결](#6-문제-해결)

### [7. 폴더 구조](#7-폴더-구조)

---

## vercel 배포 링크

### [vercel 배포 바로가기](https://window-clone.vercel.app/)

---

## 1. 프로젝트 소개 및 목적

- 윈도우 바탕화면의 기능을 클론하는 프로젝트입니다.
- 윈도우의 바탕화면 내에서의 기능들을 웹사이트로 구현해보고자 하였습니다.
- 또한, 여러 기능을 프로그램 형식으로 넣어 다양한 시도를 해 볼 수 있을 것 같아, 윈도우 클론을 선택하였습니다.

---

## 2. 설치 방법

```
npm i
```

---

## 3. 사용 방법

```
npm run build
npm run preview
```

---

## 4. 사용 기술

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/reduxsaga-999999?style=for-the-badge&logo=reduxsaga&logoColor=white">

---

## 5. 주요 기능

- 완성된 기능은 체크 표시하였습니다.

<details>
  <summary>✅  소개화면</summary>
  <div markdown="1">

- ✅ 스크롤에 맞춰 글, 그림 <br />
- ✅ 체험하기 버튼 누르면 윈도우 클론 서비스로 이동 <br />
- ✅ 윈도우로 이동 누를 시 윈도우 로딩 띄우기 <br />

</div>
</details>

<details>
<summary>✅  로그인</summary>
<div markdown="1">

- ✅ 회원가입 <br />
  - ✅ 이메일, 비밀번호, 닉네임 유효성 검사 <br />
  - ✅ 이메일, 닉네임 중복 방지 <br />
- ✅ 로그인 <br />
- ✅ 체험용 로그인 기능 <br />
  - ✅ 체험용 로그인 했을 시 닉네임 'guest 숫자' 형식으로 부여 <br />
- ✅ 로그아웃 <br />

</div>
</details>

<details>
<summary>✅ 단일 파일 선택</summary>
<div markdown="1">

- ✅ 드래그앤 드랍 <br />
- ✅ 삭제 <br />
- ✅ 이름 바꾸기 <br />

</div>
</details>

<details>
<summary>⬜ 복수 파일 선택</summary>
<div markdown="1">

- ⬜ 드래그앤 드랍 <br />
- ⬜ 삭제 <br />

</div>
</details>

<details>
<summary>✅ 작업 표시줄</summary>
<div markdown="1">

- ✅ 날짜 표시 <br />
- ✅ 현재 실행된 프로그램 표시 <br />
- ✅ 창 최소화된 프로그램 클릭 시 프로그램 창 다시 띄우기 <br />
- ✅ 창 최소화 되지 않은 프로그램 클릭 시 프로그램 창 최소화 <br />
- ✅ 현재 실행되는 프로그램 색 다르게 표시 <br />

</div>
</details>

<details>
<summary>✅ 프로그램 창</summary>
<div markdown="1">

- ✅ 여러 프로그램 동시 실행 가능하게 하기 <br />
- ✅ 드래그 해서 이동 기능 <br />
- ✅ 프로그램 창 클릭시 해당 프로그램을 제일 최상단으로 옮기기 <br />

</div>
</details>

<details>
<summary>✅ 채팅</summary>
<div markdown="1">

- ✅ 현재 데이터 베이스에 저장된 유저 목록 가져오기 <br />
- ✅ 과거 자신이 채팅했던 목록 불러오기 <br />
- ✅ 실시간 채팅(채팅 입력 시 실시간 반영) <br />

</div>
</details>

<details>
<summary>✅ 게시판</summary>
<div markdown="1">

- ✅ 데이터 베이스에 저장된 게시판 글 목록 가져오기 <br />
- ✅ 게시판 글 조회하기 <br />
- ✅ 작성된 글 실시간 반영 (바로 조회 가능하게끔) <br />
- ✅ 댓글 조회 <br />
- ✅ 댓글 작성 <br />
- ✅ 댓글 작성 실시간 반영 <br />

</div>
</details>

<details>
<summary>⬜ 계산기</summary>
<div markdown="1">

- ⬜ 연산 기능 <br />
- ⬜ 이전 값 저장 <br />

</div>
</details>

<details>
<summary>⬜ 타자 (짧은 글)</summary>
<div markdown="1">

- ⬜ 정확도 표시 <br />
- ⬜ 빠르기 표시 <br />

</div>
</details>

<details>
<summary>⬜ 구글 공룡 미니 게임</summary>
<div markdown="1">

- ⬜ 점프 기능 <br />
- ⬜ 장애물 넘기 판정 <br />
- ⬜ 순위표 <br />

</div>
</details>

---

## 6. 문제 해결

- issue 항목에 작성하였습니다.

---

## 7. 폴더 구조

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜SpoqaHanSansNeo-Bold.ttf
 ┃ ┃ ┣ 📜SpoqaHanSansNeo-Light.ttf
 ┃ ┃ ┣ 📜SpoqaHanSansNeo-Medium.ttf
 ┃ ┃ ┣ 📜SpoqaHanSansNeo-Regular.ttf
 ┃ ┃ ┗ 📜SpoqaHanSansNeo-Thin.ttf
 ┃ ┗ 📜react.svg
 ┣ 📂component
 ┃ ┣ 📜ContextMenu.tsx
 ┃ ┣ 📜IconList.tsx
 ┃ ┣ 📜Loading.tsx
 ┃ ┗ 📜LoginModal.tsx
 ┣ 📂customHook
 ┃ ┣ 📜useChatList.ts
 ┃ ┣ 📜useChatMessages.ts
 ┃ ┣ 📜useContextMenu.ts
 ┃ ┣ 📜useCurrentDate.ts
 ┃ ┣ 📜useGrid.ts
 ┃ ┣ 📜useLoading.ts
 ┃ ┣ 📜useLogin.ts
 ┃ ┣ 📜useModal.ts
 ┃ ┣ 📜useNoticeList.ts
 ┃ ┣ 📜useNoticeView.ts
 ┃ ┣ 📜useProgramDrag.ts
 ┃ ┣ 📜useScrollPostion.ts
 ┃ ┗ 📜useUserList.ts
 ┣ 📂data
 ┃ ┣ 📜icons.tsx
 ┃ ┣ 📜infoData.ts
 ┃ ┗ 📜programs.tsx
 ┣ 📂firebase
 ┃ ┣ 📜firebase.ts
 ┃ ┣ 📜firebaseAuth.ts
 ┃ ┣ 📜firebaseChat.ts
 ┃ ┗ 📜firebaseNotice.ts
 ┣ 📂page
 ┃ ┣ 📂info
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Head.tsx
 ┃ ┃ ┣ 📜Info.tsx
 ┃ ┃ ┣ 📜Main.tsx
 ┃ ┃ ┗ 📜Section.tsx
 ┃ ┗ 📂service
 ┃ ┃ ┣ 📜Clock.tsx
 ┃ ┃ ┣ 📜ProgramList.tsx
 ┃ ┃ ┣ 📜ProgramMenu.tsx
 ┃ ┃ ┣ 📜Service.tsx
 ┃ ┃ ┗ 📜Taskbar.tsx
 ┣ 📂program
 ┃ ┣ 📜Calculator.tsx
 ┃ ┣ 📜Chat.tsx
 ┃ ┣ 📜DinoGame.tsx
 ┃ ┣ 📜Notice.tsx
 ┃ ┣ 📜Test.tsx
 ┃ ┗ 📜Typing.tsx
 ┣ 📂store
 ┃ ┣ 📂saga
 ┃ ┃ ┗ 📜iconSaga.ts
 ┃ ┣ 📂slice
 ┃ ┃ ┣ 📜iconSlice.ts
 ┃ ┃ ┗ 📜programSlice.ts
 ┃ ┣ 📜rootReducer.ts
 ┃ ┣ 📜rootSaga.ts
 ┃ ┗ 📜store.ts
 ┣ 📂types
 ┃ ┗ 📜index.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```
