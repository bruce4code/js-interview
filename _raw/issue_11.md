# 011题：节流（throttle）防抖（debounce）

## 防抖 debounce

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

应用场景: 防止用户多次点击按钮提交表单.

## 节流 throttle

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

应用场景: 监听scroll事件，触发次数控制。

防抖，节流都使用闭包的机制（保护，保存）来实现的。