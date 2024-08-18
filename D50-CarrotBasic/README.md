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

## D61-ImOptimistic

- [x] /tweets/[id] 페이지에서 유저가 트윗에 답글을 추가할 수 있어야 하며 트윗에 좋아요 표시할 수 있어야 합니다.
- [x] 프리즈마에서 Response 모델을 만들고 서버 액션, Zod 유효성 검사, revalidatePath 및 useOptimistic을 사용합니다.
- [x] 좋아요와 트윗 답글은 useOptimistic 으로 처리해야 합니다.

### Issue

- [x] unstable_cache 안에서 cookie 를 사용하는것은 nextjs@14.2.5 에서는 허용 되지 않는다. 임시로 14.1.4 로 내려서 사용중이지만 개선 방법을 찾아야한다.

```sh
Error: Route /tweets/5 used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: [https://nextjs.org/docs/app/api-reference/functions/unstable_cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)
```

- [x] React 버전이 올라서인지 useOptimistic.reducerFn 을 사용하려면 startTransition 으로 감싸야한다.

```ts
startTransition(() => {
  reducerFn(undefined);
});
```

- useOptimistic 쓰면 await 응답이 왔을 때 컴포넌트가 미세하게 떨리는 게 보인다.
- useOptimistic.reducerFn(formData) 형태로 사용할 때 zod validation 을 두 번하게 되는데 통합 할 방법이 필요하다
- useOptimistic.reducerFn 이후에 loading 처리 필요? 바로 렌더링을 하더라도 계속 반복 호출해버리면 아래 에러 발생

```
An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.
  at async dislikeTweet (./app/tweets/[id]/actions.ts:113:5)
```

or

```
Unique constraint failed on the fields: (`userId`,`tweetId`)
```
