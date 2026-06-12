## 事件捕获与冒泡

### 事件 DOM0 级与事件 DOM2 级

#### addEventListener 语法

```js
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);
```

- `type`：事件类型
- `listener`：事件处理函数
- `useCapture`：可选，布尔值，默认 `false`（冒泡阶段），`true`（捕获阶段）

### 事件流

事件流包括三个阶段：

1. **捕获阶段**：事件从 `window` 对象向下传播到目标节点的父节点
2. **目标阶段**：事件到达目标节点
3. **冒泡阶段**：事件从目标节点的父节点向上传播到 `window` 对象

### 事件捕获

事件从最外层元素开始传递，直到最内层元素（目标元素），这个过程叫做事件捕获。

```js
// 捕获阶段触发
element.addEventListener('click', handler, true);
```

### 事件冒泡

事件从最内层元素开始传递，直到最外层元素，这个过程叫做事件冒泡。

```js
// 冒泡阶段触发（默认）
element.addEventListener('click', handler, false);
// 或
element.addEventListener('click', handler);
```

### 阻止事件传播

- `event.stopPropagation()` — 阻止事件进一步传播（捕获和冒泡）
- `event.stopImmediatePropagation()` — 阻止事件传播，并且阻止同一元素上的其他同类事件处理函数执行

### 参考

- <https://www.bilibili.com/video/BV1m7411L7YW>
- <https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener>