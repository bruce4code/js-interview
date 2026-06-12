# 005题：['1','2','3'].map(parseInt) 一道题，综合扩展实现map()与call()

[视频详解-点我吧@.@](https://www.bilibili.com/video/BV1s54y1X7XF/?spm_id_from=autoNext)

老铁们，我们通过下面的调用，来大概理解下map的默认输入参数

```js
[1,2,3].map(console.log)

// 1 0 (3) [1, 2, 3]
// 2 1 (3) [1, 2, 3]
// 3 2 (3) [1, 2, 3]
```

也就是说map的默认输入的参数 item, index, arr (也就是放在arguments里)

[parseInt 解析 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

而 parseInt(string, radix) 需要的两个参数，在此例子parseInt没有传入参数，所以 string, radix 分别对应的map 中的item，index

| parseInt(string, radix) | string | radix | 输出 |
|---|---|---|---|
| parseInt(1, 0) | 1 | 0 | 1 |
| parseInt(2, 1) | 2 | 1 | NaN |
| parseInt(3, 2) | 3 | 2 | NaN |

综上所述 ['1','2','3'].map(parseInt) 等价于

```js
[1,2,3].map(function(item,index,arr){
  return parseInt(item,index,arr)
})
// [1, NaN, NaN]
```

老铁们，看完上面的答案，为了能让我们更加深刻理解map是如何实现的，下面就让我们来实现一个map。

### 方式1

```js
Array.prototype.myMap = function(cb,thisArgs){
     var innerArgs, res, count;
        if(this == null){
            throw new TypeError('this is null or not defined')
        }
    // 1. 将O赋值为调用map方法的数组
    var O = Object(this);
    // 2. 将len赋值为数组O的长度
    var len = O.length >>> 0;
       //3. 判断下cb是不是function
      if(Object.prototype.toString.call(cb)!= '[object Function]'){
        throw new TypeError(cb + 'is not a function!')
      }
   // 4.如果参数thisArgs有值，则将 innerArgs 赋值为thisArgs，否则为undefined
    if(thisArgs){
        innerArgs = thisArgs
    }
    // 5.创建新数组 res 长度为原数组的O的长度lan
     res= new Array(len)
    // 6.将count赋值为0
     count= 0
      // 7.当k<len 是则执行循环
    while(count<len){
        var kVal, mappedVal;
        if(count in O){
            // kVal 为索引 count 对应的值
            kVal = O[count];
            // 执行cb，this指向 innerArgs ，参数有3个，分别是kVal：值，k：索引 O 原数组
            mappedVal = cb.myCall(innerArgs, kVal,count,O);  // 为了更加清晰的理解map，此处的call，我们也实现一个myCall
            // 返回值添加到新数组A中
            res[count] = mappedVal;
        }
        count++;
    }
    // 8返回处理后新数组
    return res
}
```

### 方式2 用Array.prototype.reduce 来实现map

对reduce不熟练的朋友们 [点这里,reduce-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

```js
Array.prototype.myMap = function(cb,thisArgs){
     return this.reduce( function(acc,pre,index,arr){
                console.log(acc,'===',pre)
                acc[index] = cb.call(thisArgs, pre, index, arr)
      return acc
       },[])
}
```

上面的call，我们自己也可以实现一个

```js
Function.prototype.myCall =function(obj){
   //1. obj 值检验
    obj = obj ? Object(obj) : window;
    var args = [];
    const fn = Symbol('fn')
    obj[fn] = this
    console.log(this,'this')
    console.log(arguments,'arguments')
    // 把类数组转换为数组
    args =  [...arguments].slice(1)
    var res = obj[fn](...args)
    delete obj.fn
    console.log(res,'res')
    return res
}

// 来吧，试一试，调试着看，有助于更加了解思路哦~~~
[1,2,3].myMap(parseInt)

VM6753:7 ƒ parseInt() { [native code] } "this"
VM6753:8 Arguments(4) [Window, 1, 0, Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ] "arguments"
VM6753:12 1 "res"
VM6753:7 ƒ parseInt() { [native code] } "this"
VM6753:8 Arguments(4) [Window, 2, 1, Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ] "arguments"
VM6753:12 NaN "res"
VM6753:7 ƒ parseInt() { [native code] } "this"
VM6753:8 Arguments(4) [Window, 3, 2, Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ] "arguments"
VM6753:12 NaN "res"
(3) [1, NaN, NaN]
```

```js
[1,2,3].myMap(console.log)
VM6895:7 ƒ log() { [native code] } "this"
VM6895:8 Arguments(4) [Window, 1, 0, Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ] "arguments"
VM6895:11 1 0 (3) [1, 2, 3]
VM6895:13 undefined "res"
VM6895:7 ƒ log() { [native code] } "this"
VM6895:8 Arguments(4) [Window, 2, 1, Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ] "arguments"
VM6895:11 2 1 (3) [1, 2, 3]
VM6895:13 undefined "res"
VM6895:7 ƒ log() { [native code] } "this"
VM6895:8 Arguments(4) [Window, 3, 2, Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ] "arguments"
VM6895:11 3 2 (3) [1, 2, 3]
VM6895:13 undefined "res"
(3) [undefined, undefined, undefined]
```