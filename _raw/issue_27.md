# 027题-用promise封装ajax

使用Promise封装XMLHttpRequest。

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

更加通用的封装：

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
- https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
- https://www.bilibili.com/video/BV1jv411P7Hp/