# 037- undefined == null 为true？

undefined 和 null 的语义和场景不同，它们都表示的是一个无效的值。因此在JS中对这类值访问属性时，都会得到异常的结果。

ECMAScript 规范认为，既然 null 和 undefined 的行为很相似，并且都表示一个无效的值，那么它们所表示的内容也具有相似性，即有：

```js
undefined == null; //true
```

不要试图通过转换数据类型来解释这个结论，因为：

```js
Number(null);      // 0
Number(undefined); // NaN
```

在比较相等性之前，null 没有被转换为其他类型：

```js
null == 0 ; //false
```

但 === 会返回 false，因为全等操作 === 在比较相等性的时候，不会主动转换分项的数据类型，而两者又不属于同一种类型：

```js
undefined === null; //false，类型不相同
undefined !== null; //true, 类型不相同
```

## 总结

用一句话总结两者的区别就是：undefined 表示一个变量自然的、最原始的状态值，而 null 则表示一个变量被人为的设置为空对象，而不是原始状态。所以，在实际使用过程中，为了保证变量所代表的语义，不要对一个变量显式的赋值 undefined，当需要释放一个对象时，直接赋值为 null 即可。