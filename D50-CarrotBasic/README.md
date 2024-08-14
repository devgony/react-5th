# Carrot basic

## D54-Authentication

- Zod, 서버 액션, 미들웨어, 테일윈드, 프리즈마, iron-session 및 bcrypt를 사용하여 유저 인증을 구현합니다.
  - [x] 3가지 페이지를 구현합니다: /create-account, /log-in, /profile.
  - [x] /create-account 및 /log-in양식은 Zod를 사용하여 유효성을 검사하고 오류를 표시해야 합니다.
  - [x] 유저는 로그인한 후에만 /profile을 볼 수 있어야 합니다.
  - [x] /profile 페이지에는 유저 프로필이 표시되어야 합니다.

## D57-Tweets

- [x] / 페이지를 구현합니다.
- [x] 로그인한 유저만 / 페이지로 이동할 수 있습니다.
- [x] / 페이지에는 데이터베이스에 있는 모든 트윗의 목록이 표시되어야 합니다.
- [x] 유저가 다음 페이지로 이동하거나 이전 페이지로 돌아갈 수 있도록 화살표를 표시하는 페이지네이션(pagination)을 구현합니다.
- [x] 유저가 트윗을 클릭하면 `/tweets/[id]` 페이지로 이동하여 해당 트윗의 상세 보기를 볼 수 있어야 합니다

## D59-CreateTweet

- [x] <AddTweet /> 컴포넌트를 만들어 / 페이지 상단에 배치합니다.
- [x] <AddTweet /> 에는 트윗을 업로드하는 폼이 있어야 합니다.
- [x] 폼을 처리하는 서버 액션을 구현하고, Zod로 유효성 검사를 수행한 다음, Prisma로 트윗을 DB에 저장합니다.
- [x] useFormState 및 useFormStatus 사용합니다.
