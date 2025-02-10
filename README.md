# 프로젝트 개요

이 프로젝트는 Next.js와 React를 기반으로 한 웹 애플리케이션입니다. 회원가입 및 로그인 기능을 포함하고 있으며, 각 기능에 대한 테스트가 포함되어 있습니다.

## 폴더 구조

```
src/
├── app/
│ ├── globals.css
│ ├── layout.tsx
│ ├── member/
│ │ ├── login/
│ │ │ ├── login.d.ts
│ │ │ ├── page.test.tsx
│ │ │ └── page.tsx
│ │ └── register/
│ │ ├── page.test.tsx
│ │ ├── page.tsx
│ │ └── register.d.ts
│ └── page.tsx
├── entities/
│ ├── form/
│ │ ├── button.tsx
│ │ ├── checkBox.tsx
│ │ └── input.tsx
│ ├── popup/
│ │ ├── Alert.tsx
│ │ └── dialog.tsx
│ └── text/
│ ├── subtitle.tsx
│ └── title.tsx
├── shared/
│ ├── hooks/
│ │ ├── next-router-provider-mock.tsx
│ │ └── useToggle.tsx
│ ├── store/
│ │ └── user.ts
│ └── utils/
│ ├── prevent.ts
│ └── validatation.ts
└── package.json
```

## 테스트 항목

### 회원가입 테스트 (`src/app/member/register/page.test.tsx`)

- 회원가입 페이지 렌더링 확인
- 필수 입력 사항 미입력 시 가입 버튼 비활성화 확인
- 아이디 중복 확인 기능 테스트
- 핸드폰 번호 입력 제한 및 포맷 확인
- 비밀번호 불일치 시 경고 메시지 확인
- 핸드폰 번호 길이 제한 확인
- 이메일 형식 확인
- 전체 동의 체크박스 기능 확인
- 개별 체크박스 기능 확인
- 필수 사항 입력 시 가입 성공 확인

### 로그인 테스트 (`src/app/member/login/page.test.tsx`)

- 로그인 페이지 렌더링 및 포커스 이동 확인
- 필수 입력 사항 미입력 시 로그인 버튼 비활성화 확인
- 아이디 입력 후 엔터 시 비밀번호 입력창 포커스 이동 확인
- 아이디와 비밀번호 입력 시 로그인 버튼 활성화 확인
- 비밀번호 유효성 검사 및 경고 메시지 확인
- 로그인 성공 시 토큰 저장 및 페이지 이동 확인

## 테스트 실행 방법

테스트는 `jest`를 사용하여 실행됩니다. 다음 명령어를 통해 테스트를 실행할 수 있습니다.
