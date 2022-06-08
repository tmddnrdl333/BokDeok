# 🏡 최종 관통 프로젝트



<img src="./img/logo.png" width="300" height="200">



## 🤝 팀원 소개

- 팀원1 : [김하연](https://lab.ssafy.com/kng06325) 👩

- 팀원2 : [정승욱](https://lab.ssafy.com/tmddnrdl333) 👨



## 🍔 구현한 기능



### (1) 기본 기능



#### 0. 메인 화면

- 메인 화면은 스크롤 스냅 모듈을 사용해, 제공되는 서비스를 소개하고, 개발자 정보, 연락처를 제공함.



<img src="./img/Main.PNG" width="500" height="300">

<img src="./img/MainInfo.PNG" width="500" height="300">



#### 1. 회원관리

- 우 상단의 "회원관리" 아이콘을 통해 접근.
- 회원가입, 로그인, 로그아웃, 회원정보 확인 기능 구현.

<img src="./img/MemberSignup.PNG" width="500" height="300">

<img src="./img/MemberLogin.PNG" width="500" height="300">

<img src="./img/MemberInfo.PNG" width="500" height="300">



#### 2. 공지사항

- 좌측 네비게이션 바의 "공지사항" 아이콘을 통해 접근.
- 일반 유저 : 공지사항 목록 조회, 상세 조회 가능.
- 관리자 : 공지사항 목록 조회, 상세 조회, 신규 등록, 수정/삭제 가능.

<img src="./img/NoticeList.PNG" width="500" height="300">

<img src="./img/NoticeDetail.PNG" width="500" height="300">

<img src="./img/NoticeRegist.PNG" width="500" height="300">



#### 3. QnA

- 좌측 네비게이션 바의 "QnA" 아이콘을 통해 접근.
- 일반 유저 : QnA 목록 조회, 상세 조회, 신규 등록, 수정/삭제 가능.
- 관리자 : QnA 목록 조회, 상세 조회, 신규 등록, 수정/삭제 가능.
  - QnA 게시글의 경우 수정 권한은 작성자에게만 있고, 삭제 권한은 작성자와 관리자에게 있음.


<img src="./img/QnaList.PNG" width="500" height="300">

<img src="./img/QnaDetail.PNG" width="500" height="300">

<img src="./img/QnaRegist.PNG" width="500" height="300">

<img src="./img/QnaAnswer.PNG" width="500" height="300">





### (2) 추가 기능



#### 1. 아파트 실거래가 조회

- 좌측 네비게이션 바의 "아파트" 아이콘을 통해 접근.
- 좌 상단의 검색기능을 통해 법정동 정보를 검색할 수 있음.
- 동이 선택되면, 해당 동 모든 아파트 정보가 표시됨. 좌측에는 아파트 리스트, 맵에는 마커와 함께 아파트의 위치가 표시됨.
- 맵에서, 혹은 목록에서 아파트를 선택하면, 마커가 하이라이트되며, 아파트 상세 정보를 조회할 수 있음.
  - 건축 연도, 최근 거래가, 역대 거래가 차트로 표시.
  - 역대 거래가 목록으로 표시.
  - 주변 복지시설(노인 복지 시설, 아동 복지 시설, 장애인 복지 시설) 정보를 해당 아파트와의 거리가 가까운 순서로 3개씩 표시함.

<img src="./img/AptMain.PNG" width="500" height="300">

<img src="./img/AptList.PNG" width="500" height="300">

<img src="./img/AptDetail1.PNG" width="500" height="300">

<img src="./img/AptDetail2.PNG" width="500" height="300">



#### 2. 관심 아파트 추가/제거

- 아파트 상세보기 화면에서, 우 상단 "☆" 표시를 토글하여 관심아파트로 추가/제거할 수 있음.
  - (관심 아파트 관련 기능은 심화 기능에서 계속)





### (3) 심화 기능



#### 1. 관심 아파트 비교

- 등록한 관심 아파트들을 목록으로 표시.
- 주변 복지시설들과의 거리 정보를 통해 별점(점수)을 계산하여 비교할 수 있게 표시.
- 아파트 선택 시 주변 모든 복지시설과 학교, 병원들을 거리정보와 함께 맵에 마커로 표시.

<img src="./img/InterestMain.PNG" width="500" height="300">

<img src="./img/InterestDetail.PNG" width="500" height="300">

#### 2. 관심 아파트 제거

- 등록했던 관심 아파트를 선택적으로 제거할 수 있음.



## 🍟 Diagrams



### (1) Usecase Diagram

<img src="./img/Diagrams/QnaNoticeUml.PNG" width="300" height="400">

<img src="./img/Diagrams/HouseInterestUml.PNG" width="300" height="400">



### (2) ERD

<img src="./img/Diagrams/ERD.PNG" width="500" height="300">



### (3) Class Diagram

![001.png](./img/Diagrams/ClassDiagram/Member.PNG)

![001.png](./img/Diagrams/ClassDiagram/Notice.PNG)

![001.png](./img/Diagrams/ClassDiagram/Qna.PNG)

![001.png](./img/Diagrams/ClassDiagram/DongSearch.PNG)

![001.png](./img/Diagrams/ClassDiagram/HouseMap.PNG)

![001.png](./img/Diagrams/ClassDiagram/House.PNG)

![001.png](./img/Diagrams/ClassDiagram/Interest.PNG)





## 🥤 개발 후기...



하연 : 그 동안 배운 기술 이외에 스스로 찾아보고 적용하면서 많이 배울 수 있었다. 시간이 촉박한 만큼 아쉬움도 남지만, 의미있는 경험이었다.



승욱 : 어렵게 느껴졌던 공공데이터에 도전해서 결국 데이터를 잘 받아올 수 있어서 보람찼고, Kakao map API의 여러 기능을 사용해본 것도 좋은 경험이 된 것 같다. 그리고...

나를 죽이지 못하는 고통은 나를 더 강하게 만들 뿐이다... - 니체

