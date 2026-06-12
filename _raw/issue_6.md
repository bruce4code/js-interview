# 006题：Array.prototype.push的理解

[视频解析请戳我 @.@](https://www.bilibili.com/video/BV1aE411C7pt?p=19)

## 题目也是经典的面试题

```js
let obj = {
 2 : 3,
 3 : 4,
 length: 2,
 push : Array.prototype.push
}

obj.push(1)
obj.push(2)
console.log(obj)
```

### 各位看官，来先给自己20秒，能写出答案吗？

### 首先这里考察是我们对Array.prototype.push 的理解

在 [Array.prototype.push--MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 给出的解释：

push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

### 我们试着写出push的实现

```js
Array.prototype.push = function myPush(val){
      this[this.length] = val  // 我是 9567 记住我，下面面会提到
     // this.length 在原来的基础上加一
     console.log(val,'val')
     console.log(this.length,'this.length')
      return this.length
}
```

### 所以题目中的

```
obj.push(1) => myPush(1) =>this:obj=> obj[obj.length] = 1  => obj[2] = 1 => obj.length =3

obj.push(2) => myPush(2) =>this:obj=> obj[obj.length] = 2  => obj[2] = 1  => obj.length =4
```

### 我们打印下我们的结果，看看是不是和上面的推出的结果一致？

```js
console.log(obj)

{2: 1, 3: 2, length: 4, push: ƒ}
2: 1
3: 2
length: 4
push: ƒ push()
```