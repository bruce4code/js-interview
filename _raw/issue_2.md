# 002题:数组1 ['A1','A2','B1','B2'], 数组2 ['A','B'], 合成数组3 ['A1','A2','A','B1','B2','B']

[MDN-localeCompare](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)

```js
const  a = ['A1','A2','B1','B2'] 
const b = ['A','B'] 
//把b组装 
let b2 = b.map(i => i+='Z')
//b2 = ['AZ','BZ'] 
var arr = a.concat(b2) 
var res = arr.sort((a,b)=>a.localeCompare(b)) 
res.map(item=>{
   if(item.indexOf('Z')==1){
     item = item.replace(/Z/,'')
   }
   return item 
})
```