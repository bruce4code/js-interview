## Promise 的简单实现

```js
class myPromise {
    static PENDING = '待定';
    static FULFILLED = '成功';
    static REJECTED = '失败';

    constructor(func){
        this.status = myPromise.PENDING;
        this.result = null;
        this.resolveCallbacks = [];   // 处理 then 里面也是异步函数，即处于 pending 状态的函数，保存回调的函数
        this.rejectCallbacks = [];
        try {
            func(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(result){
        setTimeout(() => {
            if(this.status === myPromise.PENDING){
                this.status = myPromise.FULFILLED;
                this.result = result
            }
            this.resolveCallbacks.forEach(callback => {
                callback(result)
            })
        })
    }

    reject(result){
        setTimeout(() => {
            if(this.status === myPromise.PENDING){
                this.status = myPromise.REJECTED;
                this.result = result
            }
            this.rejectCallbacks.forEach(callback => {
                callback(result)
            })
        })
    }

    then(onFULFILLED, onREDJECTED){
        return new myPromise((resolve, reject) => {
            onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {};
            onREDJECTED = typeof onREDJECTED === 'function' ? onREDJECTED : () => {};
            
            if(this.status === myPromise.PENDING){
                this.resolveCallbacks.push(onFULFILLED)
                this.rejectCallbacks.push(onREDJECTED)
            }
            if(this.status === myPromise.FULFILLED){
                setTimeout(() => {
                    onFULFILLED(this.result)
                })
            }
            if(this.status === myPromise.REJECTED){
                setTimeout(() => {
                    onREDJECTED(this.result)
                })
            }
        })
    }
}
```

### 面试常考点

- 从如何停掉 Promise 链说起
- 实现有并行限制的 Promise 调度器
- 维护一个放 promise 的 queue 队列
- 实现 `Promise.all` 方法（count 记录执行成功的数量，与传入的 promise 列表长度一致时为成功输出）

参考：
- [视频 - B站](https://www.bilibili.com/video/BV1RR4y1p7my/)
- [https://github.com/xieranmaya/blog/issues/5](https://github.com/xieranmaya/blog/issues/5)
- [https://juejin.im/post/6854573217013563405](https://juejin.im/post/6854573217013563405)
- [https://juejin.cn/post/7069805387490263047](https://juejin.cn/post/7069805387490263047)