## 节流（throttle）与防抖（debounce）

> **English**: Throttle & Debounce — Implementing throttling (timestamp vs timer) and debouncing (leading/trailing) for performance optimization.

<!-- zh -->
### 防抖 debounce

```js
function debounce(fn,time){
   let timer = null
   return function(){
      if(timer){
         clearTimeout(timer)
      }else{
         timer = setTimeout(function(){
             fn.apply(this,arguments)
        },time)
      }
   }
}
```

**应用场景：** 防止用户多次点击按钮提交表单。

### 节流 throttle

```js
function throttle(fn,time){
    let flag = true;
    return function(){
      if (!flag) return
      flag = false
      setTimeout(() => {
        fn.apply(this, arguments)
        flag = true
       }, time)
    }
}
```

**应用场景：** 监听 scroll 事件，触发次数控制。

防抖和节流都使用闭包的机制（保护、保存）来实现。
<!-- /zh -->

<!-- en -->
### Debounce

```js
function debounce(fn,time){
   let timer = null
   return function(){
      if(timer){
         clearTimeout(timer)
      }else{
         timer = setTimeout(function(){
             fn.apply(this,arguments)
        },time)
      }
   }
}
```

**Use case:** Preventing users from clicking a button multiple times to submit a form.

### Throttle

```js
function throttle(fn,time){
    let flag = true;
    return function(){
      if (!flag) return
      flag = false
      setTimeout(() => {
        fn.apply(this, arguments)
        flag = true
       }, time)
    }
}
```

**Use case:** Listening to scroll events, controlling the number of triggers.

Both debounce and throttle use the closure mechanism (protection, preservation) for implementation.
<!-- /en -->