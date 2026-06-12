# 015题: 去重的几种方式

## 方式1 ES6新语法 Set

还记得我们在 [#13](https://github.com/bruce4code/js-interview/issues/13) 提到的吗？

#### 过滤出网页中不重复的html标签 结合去重知识点考查

```
[...new Set([...document.querySelectorAll('*')].map(v=>v.tagName))]
```

```js
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}, Symbol(1), Symbol(1)]

function getUni(arr){
    return Array.from(new Set(arr))
}
// 调用输出接口 发现有2个Symbol(1) 他们是不相等的, 所以这个去重方式还是可以的
getUni(arr)
// [1, "1", 17, true, false, "true", "a", {…}, {…}, Symbol(1), Symbol(1)]
// 空{}对象没有去重 (因为两个对象引用不一样, 所以也是不一样的)
```

那么此方式可以对对象去重吗？

```js
const b={a:2}
let arr1 = [{a:1}, b, b, {a:3}];
let set1 = new Set(arr1);
let newArr1 = Array.from(set1);
console.log(newArr1); // [{a:1},{a:2},{a:3}]

// 无法对象去重：
let arr2 = [{a:1}, {a:2}, {a:2}, {a:3}];
let set2 = new Set(arr2);
let newArr2 = Array.from(set2);
console.log(newArr2); // [{a:1},{a:2},{a:2},{a:3}]
```

## 方式2 遍历 利用filter

```js
const unique = arr => {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index
    })
}
// 使用 includes, indexOf 的思路大致一样都是判断是否存在, 没有就添加
// 使用filter+indexOf的方式, 对象也没有去重
```

## 方式3 使用 new Map() + for循环

```js
const unique1 = arr => {
    const map = new Map()
    const res = []
    for(let i = 0; i < arr.length; i++){
        if(!map.has(arr[i])){
            map.set(arr[i], true)
            res.push(arr[i])
        }
    }
    return res;
}
```

请注意！为Map设置对象属性也是可以的，但是可能引起大量的混乱。

为Map设置对象属性方式

```js
let wrongMap = new Map()
wrongMap['bla'] = 'blaa'
wrongMap['bla2'] = 'blaaa2'

console.log(wrongMap)  // Map { bla: 'blaa', bla2: 'blaaa2' }
// 但是，这样做的话，它的行为会不符合预期:
wrongMap.has('bla')    // false
wrongMap.delete('bla') // false
console.log(wrongMap)  // Map { bla: 'blaa', bla2: 'blaaa2' }
```

正确的方式

```js
let myMap = new Map()
myMap.set('bla','blaa')
myMap.set('bla2','blaa2')
console.log(myMap)  // Map { 'bla' => 'blaa', 'bla2' => 'blaa2' }
myMap.has('bla')    // true
myMap.delete('bla') // true
console.log(myMap)  // Map { 'bla2' => 'blaa2' }
```

## 方式4 利用 hasOwnProperty

```js
const unique4 = (arr) => {
    let obj = {}
    return arr.filter((item, curIndex, arr) => {
        let tempFlag
        if(typeof(item) === 'symbol'){
            tempFlag = typeof(item) + typeof(item)
        } else if(typeof(item) === 'object'){
            tempFlag = typeof(item) + JSON.stringify(item)
        } else {
            tempFlag = typeof(item) + item
        }
        console.log(`tempFlag:${tempFlag}`)
        return obj.hasOwnProperty(tempFlag) ? false : obj[tempFlag] = true;
    })
}
// 这里利用给obj添加属性来去重。是根据类型去重的，也就是说 Symbol(1), Symbol(666) 或 {}, {} 也只会保留一个。
```

参考：https://www.lodashjs.com/docs/lodash.unionWith