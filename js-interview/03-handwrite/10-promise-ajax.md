## 用 Promise 封装 Ajax

> **English**: Promise-wrapped Ajax — Wrapping `XMLHttpRequest` in a Promise for cleaner async HTTP requests.

<!-- zh -->
使用 Promise 封装 XMLHttpRequest。

### 基础封装

```js
function ajaxPromise(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    resolve(xhr.responseURL)
                } else {
                    reject(new Error(xhr.statusText))
                }
            }
        }
        xhr.send(null)
    })
}
```

### 更加通用的封装

```js
const ajax = url => {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("POST", url, true);
        req.onload = () => {
            if(req.readyState === 4 && req.status === 200){
                resolve(req.response);
            } else {
                reject(req.statusText);
            }
        }
        req.onerror = () => {
            reject(Error("网络异常"));
        }
        req.send();
    })
}
```

参考：
- [MDN - 使用 XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
- [B站视频](https://www.bilibili.com/video/BV1jv411P7Hp/)
<!-- /zh -->

<!-- en -->
Wrapping XMLHttpRequest with Promise.

### Basic wrapper

```js
function ajaxPromise(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    resolve(xhr.responseURL)
                } else {
                    reject(new Error(xhr.statusText))
                }
            }
        }
        xhr.send(null)
    })
}
```

### More general wrapper

```js
const ajax = url => {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("POST", url, true);
        req.onload = () => {
            if(req.readyState === 4 && req.status === 200){
                resolve(req.response);
            } else {
                reject(req.statusText);
            }
        }
        req.onerror = () => {
            reject(Error("Network error"));
        }
        req.send();
    })
}
```

References:
- [MDN - Using XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
- [Bilibili video](https://www.bilibili.com/video/BV1jv411P7Hp/)
<!-- /en -->