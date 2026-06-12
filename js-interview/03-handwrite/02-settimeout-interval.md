## 用 setTimeout 模拟实现 setInterval

> **English**: setTimeout vs setInterval — Using recursive `setTimeout` to simulate `setInterval` and comparing their behaviors.

<!-- zh -->
视频传送门：[点我](https://www.bilibili.com/video/BV1DA411Y7Xe)

首先是浏览器之间的差异，在浏览器中，`setTimeout()`/`setInterval()` 每调用一次定时器的最小间隔是 4ms，这通常是由于函数嵌套导致（嵌套层级达到一定深度），或者是由于已经执行的 `setInterval` 的回调函数阻塞导致的。

`setTimeout()` 的时间是指把函数推入执行队列，执行队列为空的时候。

```js
const mySetTimeout = (callback, delay) => {
      let start = 0;
      const implement = (timestamp) => {
        if (timestamp >= delay) {
          callback();
        } else {
          window.requestAnimationFrame(implement);
        }
      };
      console.log('delay',delay)
      window.requestAnimationFrame(implement);
    };

function newInterval (func,time,...args){
    console.log('args',args)
    console.log('newInterval--time',time)
    function insideFn(){
        console.log('insideFn--time',time)
        func()
        mySetTimeout(insideFn,time)
    }
    mySetTimeout(insideFn,time)
}

function like(count){
   console.log('like...')
   console.time('like')
   for(let i= 0;i<30;i++){
        const span =  document.createElement('span')
        document.body.appendChild(span)
   }
     console.timeEnd('like')
}

newInterval(like,1000,11)
```

### requestAnimationFrame 使用

```js
const element = document.getElementById('some-element-you-want-to-animate');
let start;

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  // 这里使用 `Math.min()` 确保元素刚好停在 200px 的位置
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  if (elapsed < 2000) { // 在两秒后停止动画
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

参考：
- [MDN - requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
<!-- /zh -->

<!-- en -->
Video link: [Click me](https://www.bilibili.com/video/BV1DA411Y7Xe)

First, there are differences between browsers. In browsers, the minimum interval for each call to `setTimeout()`/`setInterval()` is 4ms, which is usually caused by function nesting (when the nesting level reaches a certain depth) or by blocking from already executed `setInterval` callbacks.

The time in `setTimeout()` refers to when the function is pushed into the execution queue, when the execution queue is empty.

```js
const mySetTimeout = (callback, delay) => {
      let start = 0;
      const implement = (timestamp) => {
        if (timestamp >= delay) {
          callback();
        } else {
          window.requestAnimationFrame(implement);
        }
      };
      console.log('delay',delay)
      window.requestAnimationFrame(implement);
    };

function newInterval (func,time,...args){
    console.log('args',args)
    console.log('newInterval--time',time)
    function insideFn(){
        console.log('insideFn--time',time)
        func()
        mySetTimeout(insideFn,time)
    }
    mySetTimeout(insideFn,time)
}

function like(count){
   console.log('like...')
   console.time('like')
   for(let i= 0;i<30;i++){
        const span =  document.createElement('span')
        document.body.appendChild(span)
   }
     console.timeEnd('like')
}

newInterval(like,1000,11)
```

### Using requestAnimationFrame

```js
const element = document.getElementById('some-element-you-want-to-animate');
let start;

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  // Using `Math.min()` to ensure the element stops exactly at 200px
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  if (elapsed < 2000) { // Stop animation after 2 seconds
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

References:
- [MDN - requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
<!-- /en -->