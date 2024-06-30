Challenge goals:
classes 그리고 interfaces 를 활용하여, 아래 API를 위한 '미니' 버전을 구현하세요.

LocalStorage API
Geolocation API

LocalStorage API:
Use abstract classes and generics.
추상화 클래스와 제네릭을 사용하세요.
Usage:

```ts
localStorage.setItem(<key>, <value>)
localStorage.getItem(<key>)
localStorage.clearItem(<key>)
localStorage.clear()
```

Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Storage

Geolocation API:
overloading을 사용하세요.

```ts
geolocation.getCurrentPosition(successFn);
geolocation.getCurrentPosition(successFn, errorFn);
geolocation.getCurrentPosition(successFn, errorFn, optionsObj);
geolocation.watchPosition(success);
geolocation.watchPosition(success, error);
geolocation.watchPosition(success, error, options);
geolocation.clearWatch(id);
```

Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
