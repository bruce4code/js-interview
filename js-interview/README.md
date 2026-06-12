# JS 面试知识库

> 通过面试题来巩固 JavaScript 知识。  
> 原始内容来自 [bruce4code/js-interview](https://github.com/bruce4code/js-interview)，从 GitHub Issues 整理为结构化知识库。

---

## 目录结构

```
js-interview/
├── 01-js-basics/          # JS 基础 — 类型、作用域、this、原型、闭包等
├── 02-es6-plus/           # ES6+ 语法 — 解构、数组新方法
├── 03-handwrite/          # 手写实现 — Promise、深拷贝、节流防抖、Event Emit 等
├── 04-array-object/       # 数组/对象操作 — 去重、扁平化、排序、合并等
└── 05-dom-browser/        # DOM/浏览器 — 事件、Object.defineProperty
```

---

## 01 - JS 基础

| # | 题目 | 关键词 |
|---|------|--------|
| 1 | [作用域与变量提升](./01-js-basics/01-scope-hoisting.md) | 作用域链、变量提升、函数提升、优先级 |
| 2 | [this 指向](./01-js-basics/02-this-keyword.md) | 默认绑定、隐式绑定、显式绑定、new绑定、箭头函数 |
| 3 | [箭头函数 vs 普通函数](./01-js-basics/03-arrow-vs-regular.md) | this指向、arguments、new、原型 |
| 4 | [new 与 instanceof 实现原理](./01-js-basics/04-new-instanceof.md) | 原型链、构造函数返回值、instanceof原理 |
| 5 | [原型继承与 class 继承](./01-js-basics/05-prototype-class-extends.md) | 原型链、组合继承、寄生组合继承、class |
| 6 | [typeof null 为什么是 'object'](./01-js-basics/06-typeof-null.md) | 底层类型标记、JS 设计遗留问题 |
| 7 | [undefined == null 为 true？](./01-js-basics/07-undefined-null.md) | 抽象相等比较、语义区别 |
| 8 | [typeof/indexOf 等原生 API 的缺点](./01-js-basics/08-typeof-indexof-limits.md) | 类型检测局限、Array.isArray、Object.prototype.toString |
| 9 | [a==1&&a==2&&a==3 成立？](./01-js-basics/09-loose-equal-trick.md) | toString/valueOf、defineProperty、Proxy |
| 10 | [函数柯里化与重载](./01-js-basics/10-curry-overload.md) | 闭包、参数复用、JS 重载模拟 |

## 02 - ES6+ 语法

| # | 题目 | 关键词 |
|---|------|--------|
| 1 | [解构赋值](./02-es6-plus/01-destructuring.md) | 数组解构、对象解构、默认值、嵌套解构 |
| 2 | [ES6 数组新增方法](./02-es6-plus/02-es6-array-methods.md) | Array.from、find、flat、includes、at 等 |

## 03 - 手写实现

| # | 题目 | 关键词 |
|---|------|--------|
| 1 | [(5).add(3).minus(2)](./03-handwrite/01-number-prototype.md) | Number.prototype 扩展、链式调用 |
| 2 | [setTimeout 模拟 setInterval](./03-handwrite/02-settimeout-interval.md) | 递归 setTimeout、清除定时器 |
| 3 | [map(parseInt) + 实现 map/call](./03-handwrite/03-map-parseint-call.md) | 参数传递、手写 map、手写 call |
| 4 | [call/apply/bind 实现](./03-handwrite/04-call-apply-bind.md) | 隐式绑定、Symbol 属性、参数处理 |
| 5 | [bind 完整实现](./03-handwrite/05-bind-implement.md) | 柯里化、new 优先级、原型保留 |
| 6 | [节流与防抖](./03-handwrite/06-throttle-debounce.md) | 时间戳、定时器、leading/trailing |
| 7 | [Promise 简单实现](./03-handwrite/07-promise.md) | 状态机、then 链式、resolve/reject |
| 8 | [深拷贝](./03-handwrite/08-deep-clone.md) | 递归、循环引用、特殊类型、JSON 局限 |
| 9 | [倒计时](./03-handwrite/09-countdown.md) | setTimeout/setInterval、时间差校正 |
| 10 | [Promise 封装 Ajax](./03-handwrite/10-promise-ajax.md) | XMLHttpRequest、Promise 包装 |
| 11 | [Event Emit](./03-handwrite/11-event-emitter.md) | 发布订阅、on/emit/off/once |
| 12 | [forEach 与 async/await](./03-handwrite/12-forEach-async-await.md) | forEach 实现、串行/并行异步、reduce 替代 |

## 04 - 数组/对象操作

| # | 题目 | 关键词 |
|---|------|--------|
| 1 | [数组合并排序](./04-array-object/01-array-merge-sort.md) | concat、扩展运算符、sort、自定义排序 |
| 2 | [push 的理解](./04-array-object/02-push-understand.md) | 类数组 push、length 属性、V8 优化 |
| 3 | [递归与尾递归](./04-array-object/03-recursion-tail-call.md) | 调用栈、栈溢出、尾调用优化 |
| 4 | [数组扁平化](./04-array-object/04-array-flatten.md) | flat、reduce+递归、toString、扩展运算符 |
| 5 | [类数组转数组](./04-array-object/05-arraylike-to-array.md) | Array.from、Array.prototype.slice、扩展运算符 |
| 6 | [数组去重](./04-array-object/06-array-unique.md) | Set、filter+indexOf、Map、双重循环 |
| 7 | [变量对调](./04-array-object/07-swap-variables.md) | 临时变量、解构赋值、加减法、位运算 |
| 8 | [排序算法](./04-array-object/08-sorting-algorithms.md) | 冒泡排序、插入排序、快速排序 |
| 9 | [合并对象](./04-array-object/09-object-merge.md) | Object.assign、扩展运算符、深合并 |
| 10 | [深浅拷贝方法](./04-array-object/10-shallow-deep-copy.md) | 展开运算符、JSON.parse、structuredClone、递归 |
| 11 | [遍历方法](./04-array-object/11-iteration-methods.md) | forEach/map/filter/reduce/some/every、for...of/for...in |

## 05 - DOM/浏览器

| # | 题目 | 关键词 |
|---|------|--------|
| 1 | [事件捕获与冒泡](./05-dom-browser/01-event-capture-bubble.md) | addEventListener、事件流、stopPropagation |
| 2 | [Object.defineProperty](./05-dom-browser/02-define-property.md) | getter/setter、数据描述符、存取描述符、Vue 响应式 |

---

## 学习建议

- **按顺序学**：建议从 `01-js-basics` 开始 → `02-es6-plus` → `03-handwrite` → `04-array-object` → `05-dom-browser`
- **动手实践**：每个手写实现都建议自己敲一遍代码
- **关联知识点**：比如 #3 map(parseInt) 同时涉及 #4 call/apply/bind 和 #12 forEach