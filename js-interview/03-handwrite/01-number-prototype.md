## 实现函数 (5).add(3).minus(2)

视频解析：[传送门](https://www.bilibili.com/video/BV1aE411C7pt?p=2)

```js
Number.prototype.add = function(num){
   num = Number(num)
   if(isNaN(num)){
    // throw new Error(`must be a number`)
       num = 0
   }
   console.log(this)
   return this + num
}

Number.prototype.minus = function(num){
   num = Number(num)
   if(isNaN(num)){
       throw new Error(`must be a number`)
       return
   }
   return this - num
}

console.log((6).add('8').minus(1))
```