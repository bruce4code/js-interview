## 手写倒计时

> **English**: Countdown — Implementing a countdown timer with `setTimeout` and `setInterval`, including time drift correction.

### 使用 setTimeout 实现

```js
function countdown(seconds, onTick, onComplete) {
    let remaining = seconds
    
    function tick() {
        if (remaining >= 0) {
            onTick(remaining)
            remaining--
            setTimeout(tick, 1000)
        } else {
            onComplete && onComplete()
        }
    }
    
    tick()
}

// 使用示例
countdown(10, 
    (remaining) => {
        console.log(`剩余: ${remaining}秒`)
        // 更新UI显示
    },
    () => {
        console.log('倒计时结束！')
    }
)
```

### 使用 setInterval 实现

```js
function countdown(seconds, onTick, onComplete) {
    let remaining = seconds
    
    const timer = setInterval(() => {
        if (remaining >= 0) {
            onTick(remaining)
            remaining--
        } else {
            clearInterval(timer)
            onComplete && onComplete()
        }
    }, 1000)
    
    return timer // 返回 timer 以便外部可以清除
}
```

### 注意事项

1. `setTimeout`/`setInterval` 的时间精确度问题（可能有几毫秒的延迟）
2. 可以使用 `Date.now()` 来计算实际已过去的时间来提高精度
3. 页面不可见时浏览器可能会降低定时器优先级