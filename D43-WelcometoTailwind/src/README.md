# D43-Welcome to Tailwind

- group-hover: 하나의 element를 hover 하더라도 다른 element에도 hover에 대한 style 적용

```html
<span class="flex gap-2 items-center hover:text-white group cursor-pointer">
  <p
    class="group-hover:bg-white bg-black text-[#FEE501] size-6 flex justify-center items-center rounded-full text-xs"
  >
    V
  </p>
  <h1>Vancouver</h1>
</span>
```
