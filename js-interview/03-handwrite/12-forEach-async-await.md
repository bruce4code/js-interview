## forEach 实现及与 async/await 的配合

视频解析：[传送门](https://www.bilibili.com/video/BV1m7411L7YW)

> 要在循环里面使用 async/await，用 for 循环或 for...of 循环。
>
> 如果使用 promise 或 async 函数作为 `forEach()` 等类似方法的 callback 参数，最好对造成的执行顺序影响多加考虑，否则容易出现错误。

### forEach 实现

根据 MDN 的 Polyfill 版本实现：

```js
Array.prototype.myForEach = function(callback, thisArg) {
    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    if (arguments.length > 1) {
      T = thisArg;
    }

    k = 0;

    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
};
```

内部实现中，callback 并没有用到 async/await，也就是没有等待处理结果，所以异步执行还是会有顺序问题。

```js
function test() {
    let arr = [3, 2, 1]
    arr.myForEach(async item => {
        const res = await fetch(item)
        console.log(res)
    })
    console.log('end')
}

function fetch(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x)
        }, 1000 * x)
    })
}
test()
```

### 用 for...of 中使用 async/await

```js
async function test2(){  
    for (let item of arr){
        let res = await fetch(item)
        console.log(res)
    }
    console.log('end')
}

function fetch(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x)
        }, 1000 * x)
    })
}
test2()
```

为什么 `for...of` 内部就能让 `await` 生效？因为 `for...of` 内部处理的机制和 `forEach` 不同，`forEach` 是直接调用回调函数，`for...of` 是通过迭代器的方式去遍历。

```js
async function test() {
    let arr = [3, 2, 1]
    const iterator = arr[Symbol.iterator]()
    let res = iterator.next()
    while (!res.done) {
        const value = res.value
        const res1 = await fetch(value)
        console.log(res1)
        res = iterator.next()
    }
    console.log('end')
}
```

参考：
- [https://juejin.cn/post/6844903860079738887](https://juejin.cn/post/6844903860079738887)
- [https://juejin.cn/post/6844903824751067150](https://juejin.cn/post/6844903824751067150)
- [https://juejin.cn/post/6844903824453271559](https://juejin.cn/post/6844903824453271559)