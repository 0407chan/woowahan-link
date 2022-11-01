# woowahan-link
- 사내 구성원을 위한 링크 큐레이팅 서비스 입니다.
- 업무를 하는데 필요한 링크를 편하게 등록하고, 편하게 검색 할 수 있는 서비스입니다.
- 다른 구성원을 위해 업무하면서 필요했던 링크들을 등록해주세요!

## 주요 기능
- 검색을 여러 단어에 걸쳐서 할 수 있다.
- 입력한 검색어 중 가장 많은 키워드에 걸린 링크 순서대로 노출된다.
- 링크를 등록 할 수 있다.


## 실행 방법
```
yarn       // install package

yarn dev   // proejct start
```

## 환경변수

```
.env
# google-spreadsheet 용
REACT_APP_GOOGLE_SHEETS_ID = 
REACT_APP_CLIENT_EMAIL= 
REACT_APP_PRIVATE_KEY= 

# google Athentication 용
REACT_APP_CLIENT_ID= 

# Firebase env
REACT_APP_FIREBASE_API_KEY =
REACT_APP_FIREBASE_AUTH_DOMAIN =
REACT_APP_FIREBASE_PROJECT_ID =
REACT_APP_FIREBASE_STORAGE_BUCKET =
REACT_APP_FIREBASE_MESSGING_SENDER_ID = 
REACT_APP_FIREBASE_APP_ID =
REACT_APP_FIREBASE_MEASUREMENT_ID = 
```
