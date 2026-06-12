## ['1','2','3'].map(parseInt) + 实现 map/call

> **English**: map(parseInt) + Implement map & call — Understanding why `['1','2','3'].map(parseInt)` returns `[1, NaN, NaN]`, plus handwriting `map()` and `call()`.

<!-- zh -->
视频详解：[传送门](https://www.bilibili.com/video/BV1s54y1X7XF/?spm_id_from=autoNext)

通过下面的调用，来大概理解 map 的默认输入参数：

```js
[1,2,3].map(console.log)

// 1 0 (3) [1, 2, 3]
// 2 1 (3) [1, 2, 3]
// 3 2 (3) [1, 2, 3]
```

也就是说 map 默认传入的参数为 `item, index, arr`（即放在 arguments 里）。

[parseInt 解析 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

而 `parseInt(string, radix)` 需要的两个参数，在此例子中 parseInt 没有显式传入参数，所以 `string`, `radix` 分别对应 map 中的 `item`, `index`。

| parseInt(string, radix) | string | radix | 输出 |
|---|---|---|---|
| parseInt(1, 0) | 1 | 0 | 1 |
| parseInt(2, 1) | 2 | 1 | NaN |
| parseInt(3, 2) | 3 | 2 | NaN |

综上所述 `['1','2','3'].map(parseInt)` 等价于：

```js
[1,2,3].map(function(item,index,arr){
  return parseInt(item,index,arr)
})
// [1, NaN, NaN]
```

### 实现 map

#### 方式 1

```js
Array.prototype.myMap = function(cb,thisArgs){
     var innerArgs, res, count;
        if(this == null){
            throw new TypeError('this is null or not defined')
        }
    // 1. 将 O 赋值为调用 map 方法的数组
    var O = Object(this);
    // 2. 将 len 赋值为数组 O 的长度
    var len = O.length >>> 0;
       // 3. 判断 cb 是不是 function
      if(Object.prototype.toString.call(cb)!= '[object Function]'){
        throw new TypeError(cb + 'is not a function!')
      }
   // 4. 如果参数 thisArgs 有值，则将 innerArgs 赋值为 thisArgs，否则为 undefined
    if(thisArgs){
        innerArgs = thisArgs
    }
    // 5. 创建新数组 res，长度为原数组 O 的长度 len
     res= new Array(len)
    // 6. 将 count 赋值为 0
     count= 0
      // 7. 当 k < len 时则执行循环
    while(count<len){
        var kVal, mappedVal;
        if(count in O){
            // kVal 为索引 count 对应的值
            kVal = O[count];
            // 执行 cb，this 指向 innerArgs，参数有 3 个：kVal（值）、k（索引）、O（原数组）
            mappedVal = cb.myCall(innerArgs, kVal,count,O);  // 为了更加清晰理解 map，此处 call 我们也实现一个 myCall
            // 返回值添加到新数组 A 中
            res[count] = mappedVal;
        }
        count++;
    }
    // 8. 返回处理后新数组
    return res
}
```

#### 方式 2：用 Array.prototype.reduce 实现 map

对 reduce 不熟练的朋友们 [点这里 - reduce MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

```js
Array.prototype.myMap = function(cb,thisArgs){
     return this.reduce( function(acc,pre,index,arr){
                console.log(acc,'===',pre)
                acc[index] = cb.call(thisArgs, pre, index, arr)
      return acc
       },[])
}
```

### 实现 call

```js
Function.prototype.myCall =function(obj){
   // 1. obj 值检验
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

// 试一试，调试着看有助于更加了解思路
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
<!-- /zh -->

<!-- en -->
Video explanation: [Link](https://www.bilibili.com/video/BV1s54y1X7XF/?spm_id_from=autoNext)

Through the following call, we can roughly understand the default input parameters of map:

```js
[1,2,3].map(console.log)

// 1 0 (3) [1, 2, 3]
// 2 1 (3) [1, 2, 3]
// 3 2 (3) [1, 2, 3]
```

That is, the default parameters passed to map are `item, index, arr` (i.e., placed in arguments).

[parseInt - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

And `parseInt(string, radix)` requires two parameters. In this example, parseInt is not explicitly passed any parameters, so `string` and `radix` correspond to `item` and `index` in map respectively.

| parseInt(string, radix) | string | radix | Output |
|---|---|---|---|
| parseInt(1, 0) | 1 | 0 | 1 |
| parseInt(2, 1) | 2 | 1 | NaN |
| parseInt(3, 2) | 3 | 2 | NaN |

In summary, `['1','2','3'].map(parseInt)` is equivalent to:

```js
[1,2,3].map(function(item,index,arr){
  return parseInt(item,index,arr)
})
// [1, NaN, NaN]
```

### Implementing map

#### Approach 1

```js
Array.prototype.myMap = function(cb,thisArgs){
     var innerArgs, res, count;
        if(this == null){
            throw new TypeError('this is null or not defined')
        }
    // 1. Assign O to the array calling map
    var O = Object(this);
    // 2. Assign len to the length of array O
    var len = O.length >>> 0;
       // 3. Check if cb is a function
      if(Object.prototype.toString.call(cb)!= '[object Function]'){
        throw new TypeError(cb + 'is not a function!')
      }
   // 4. If thisArgs has a value, assign innerArgs to thisArgs, otherwise undefined
    if(thisArgs){
        innerArgs = thisArgs
    }
    // 5. Create a new array res with the same length as the original array O
     res= new Array(len)
    // 6. Set count to 0
     count= 0
      // 7. Loop while k < len
    while(count<len){
        var kVal, mappedVal;
        if(count in O){
            // kVal is the value at index count
            kVal = O[count];
            // Execute cb with this pointing to innerArgs, 3 parameters: kVal (value), k (index), O (original array)
            mappedVal = cb.myCall(innerArgs, kVal,count,O);  // For clearer understanding of map, we also implement myCall here
            // Add return value to new array A
            res[count] = mappedVal;
        }
        count++;
    }
    // 8. Return the processed new array
    return res
}
```

#### Approach 2: Implementing map with Array.prototype.reduce

For those not familiar with reduce [click here - reduce MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

```js
Array.prototype.myMap = function(cb,thisArgs){
     return this.reduce( function(acc,pre,index,arr){
                console.log(acc,'===',pre)
                acc[index] = cb.call(thisArgs, pre, index, arr)
      return acc
       },[])
}
```

### Implementing call

```js
Function.prototype.myCall =function(obj){
   // 1. Check obj value
    obj = obj ? Object(obj) : window;
    var args = [];
    const fn = Symbol('fn')
    obj[fn] = this
    console.log(this,'this')
    console.log(arguments,'arguments')
    // Convert array-like to array
    args =  [...arguments].slice(1)
    var res = obj[fn](...args)
    delete obj.fn
    console.log(res,'res')
    return res
}

// Give it a try, debugging helps understand the approach better
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
<!-- /en -->