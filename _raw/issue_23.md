# 023题-promise的简单实现

## Promise 简易实现

```js
class myPromise {
    static PENDING = '待定';
    static FULFILLED = '成功';
    static REJECTED = '失败';

    constructor(func){
        this.status = myPromise.PENDING;
        this.result = null;
        this.resolveCallbacks = [];   // 处理then里面也是异步函数，也就是处于pending状态的函数，保存回调的函数
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

参考: https://www.bilibili.com/video/BV1RR4y1p7my/

## 面试常考点

- 从如何停掉 Promise 链说起
- 实现有并行限制的Promise调度器
- 维护一个放promise的queue队列
- 实现promise.all 方法（count 记录执行成功的数量 与传入的promise列表长度一致 为成功输出）

参考：
- https://github.com/xieranmaya/blog/issues/5
- https://juejin.im/post/6854573217013563405
- https://juejin.cn/post/7069805387490263047