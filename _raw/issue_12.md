# 012题：数组扁平化的几种方式

## 方式1：利用 toString + split

这里split 返回的是字符串，所以需要用map 转换成 number

```js
let arr = [1, [2, [3, [4, 5]]], 6]
let res = arr.toString().split(",").map(Number)
// 其中 Array.map(函数), 就会执行里面的函数
```

## 方式2：递归思想

判断是不是数组，是的话继续递归展开

```js
function flatten(arr){
   var res = []
   for(var i = 0; i < arr.length; i++){
       if(Array.isArray(arr[i])){
           res = res.concat(flatten(arr[i]))
       } else {
           res.push(arr[i])
       }
   }
   return res
}
```

## 方式3：使用 reduce

```js
function flatten(arr){
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}
```

## 方式4：扩展运算符

```js
function flatten(arr){
    while(arr.some(item => Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr
}
```

## 方式5：使用 flat

```js
let arr = [1, [2, [3, [4, 5]]], 6]
let res = arr.flat(Infinity)
```