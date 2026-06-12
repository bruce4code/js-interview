export interface ArticleMeta {
  id: string
  title: { zh: string; en: string }
  category: { zh: string; en: string }
  categoryId: string
  order: number
}

export const categories = [
  { id: '01-js-basics', name: { zh: 'JS 基础', en: 'JS Fundamentals' } },
  { id: '02-es6-plus', name: { zh: 'ES6+ 语法', en: 'ES6+ Syntax' } },
  { id: '03-handwrite', name: { zh: '手写实现', en: 'Handwriting' } },
  { id: '04-array-object', name: { zh: '数组/对象操作', en: 'Array & Object' } },
  { id: '05-dom-browser', name: { zh: 'DOM/浏览器', en: 'DOM & Browser' } },
]

export const articles: ArticleMeta[] = [
  // ── JS 基础 ──
  { id: '01', title: { zh: '作用域与变量提升', en: 'Scope & Hoisting' }, categoryId: '01-js-basics', category: categories[0].name, order: 1 },
  { id: '02', title: { zh: 'this 指向', en: 'this Keyword' }, categoryId: '01-js-basics', category: categories[0].name, order: 2 },
  { id: '03', title: { zh: '箭头函数 vs 普通函数', en: 'Arrow vs Regular Functions' }, categoryId: '01-js-basics', category: categories[0].name, order: 3 },
  { id: '04', title: { zh: 'new 与 instanceof 实现原理', en: 'new & instanceof' }, categoryId: '01-js-basics', category: categories[0].name, order: 4 },
  { id: '05', title: { zh: '原型继承与 class 继承', en: 'Prototype & Class Inheritance' }, categoryId: '01-js-basics', category: categories[0].name, order: 5 },
  { id: '06', title: { zh: 'typeof null 为什么是 object', en: 'Why typeof null === "object"' }, categoryId: '01-js-basics', category: categories[0].name, order: 6 },
  { id: '07', title: { zh: 'undefined == null 为 true？', en: 'Why undefined == null is true' }, categoryId: '01-js-basics', category: categories[0].name, order: 7 },
  { id: '08', title: { zh: 'typeof/indexOf 等原生 API 的缺点', en: 'Limitations of typeof, indexOf' }, categoryId: '01-js-basics', category: categories[0].name, order: 8 },
  { id: '09', title: { zh: 'a==1&&a==2&&a==3 成立？', en: 'How a==1&&a==2&&a==3 works' }, categoryId: '01-js-basics', category: categories[0].name, order: 9 },
  { id: '10', title: { zh: '函数柯里化与重载', en: 'Currying & Overloading' }, categoryId: '01-js-basics', category: categories[0].name, order: 10 },

  // ── ES6+ ──
  { id: '11', title: { zh: '解构赋值', en: 'Destructuring' }, categoryId: '02-es6-plus', category: categories[1].name, order: 1 },
  { id: '12', title: { zh: 'ES6 数组新增方法', en: 'ES6 Array Methods' }, categoryId: '02-es6-plus', category: categories[1].name, order: 2 },

  // ── 手写实现 ──
  { id: '13', title: { zh: '(5).add(3).minus(2)', en: 'Number Prototype Extension' }, categoryId: '03-handwrite', category: categories[2].name, order: 1 },
  { id: '14', title: { zh: 'setTimeout 模拟 setInterval', en: 'setTimeout vs setInterval' }, categoryId: '03-handwrite', category: categories[2].name, order: 2 },
  { id: '15', title: { zh: 'map(parseInt) + 实现 map/call', en: 'map(parseInt) + Implement map & call' }, categoryId: '03-handwrite', category: categories[2].name, order: 3 },
  { id: '16', title: { zh: 'call/apply/bind 实现', en: 'Implement call/apply/bind' }, categoryId: '03-handwrite', category: categories[2].name, order: 4 },
  { id: '17', title: { zh: 'bind 完整实现', en: 'Full bind Implementation' }, categoryId: '03-handwrite', category: categories[2].name, order: 5 },
  { id: '18', title: { zh: '节流与防抖', en: 'Throttle & Debounce' }, categoryId: '03-handwrite', category: categories[2].name, order: 6 },
  { id: '19', title: { zh: 'Promise 简单实现', en: 'Simple Promise Implementation' }, categoryId: '03-handwrite', category: categories[2].name, order: 7 },
  { id: '20', title: { zh: '深拷贝', en: 'Deep Clone' }, categoryId: '03-handwrite', category: categories[2].name, order: 8 },
  { id: '21', title: { zh: '倒计时', en: 'Countdown' }, categoryId: '03-handwrite', category: categories[2].name, order: 9 },
  { id: '22', title: { zh: 'Promise 封装 Ajax', en: 'Promise-wrapped Ajax' }, categoryId: '03-handwrite', category: categories[2].name, order: 10 },
  { id: '23', title: { zh: 'Event Emit', en: 'Event Emitter' }, categoryId: '03-handwrite', category: categories[2].name, order: 11 },
  { id: '24', title: { zh: 'forEach 与 async/await', en: 'forEach & async/await' }, categoryId: '03-handwrite', category: categories[2].name, order: 12 },

  // ── 数组/对象 ──
  { id: '25', title: { zh: '数组合并排序', en: 'Array Merge & Sort' }, categoryId: '04-array-object', category: categories[3].name, order: 1 },
  { id: '26', title: { zh: 'push 的理解', en: 'Understanding push' }, categoryId: '04-array-object', category: categories[3].name, order: 2 },
  { id: '27', title: { zh: '递归与尾递归', en: 'Recursion & Tail Call' }, categoryId: '04-array-object', category: categories[3].name, order: 3 },
  { id: '28', title: { zh: '数组扁平化', en: 'Array Flattening' }, categoryId: '04-array-object', category: categories[3].name, order: 4 },
  { id: '29', title: { zh: '类数组转数组', en: 'Array-like to Array' }, categoryId: '04-array-object', category: categories[3].name, order: 5 },
  { id: '30', title: { zh: '数组去重', en: 'Array Deduplication' }, categoryId: '04-array-object', category: categories[3].name, order: 6 },
  { id: '31', title: { zh: '变量对调', en: 'Swap Variables' }, categoryId: '04-array-object', category: categories[3].name, order: 7 },
  { id: '32', title: { zh: '排序算法', en: 'Sorting Algorithms' }, categoryId: '04-array-object', category: categories[3].name, order: 8 },
  { id: '33', title: { zh: '合并对象', en: 'Object Merge' }, categoryId: '04-array-object', category: categories[3].name, order: 9 },
  { id: '34', title: { zh: '深浅拷贝方法', en: 'Shallow & Deep Copy' }, categoryId: '04-array-object', category: categories[3].name, order: 10 },
  { id: '35', title: { zh: '遍历方法', en: 'Iteration Methods' }, categoryId: '04-array-object', category: categories[3].name, order: 11 },

  // ── DOM/浏览器 ──
  { id: '36', title: { zh: '事件捕获与冒泡', en: 'Event Capture & Bubbling' }, categoryId: '05-dom-browser', category: categories[4].name, order: 1 },
  { id: '37', title: { zh: 'Object.defineProperty', en: 'Object.defineProperty' }, categoryId: '05-dom-browser', category: categories[4].name, order: 2 },
]

export function getArticlesByCategory(categoryId: string) {
  return articles.filter((a) => a.categoryId === categoryId).sort((a, b) => a.order - b.order)
}

export function getArticleById(id: string) {
  return articles.find((a) => a.id === id)
}