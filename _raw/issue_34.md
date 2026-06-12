# 034-event emit 实现

## 事件中心（参考Vue源码）

### vm.$on

```js
Vue.prototype.$on = function (event, fn) {
    const vm = this
    if (Array.isArray(event)) {
        for (let i = 0, l = event.length; i < l; i++) {
            this.$on(event[i], fn)
        }
    } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn)
    }
    return vm
}
```

### vm.$emit

```js
Vue.prototype.$emit = function (event) {
    const vm = this
    let cbs = vm._events[event]
    if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs
        const args = toArray(arguments, 1)
        for (let i = 0, l = cbs.length; i < l; i++) {
            try {
                cbs[i].apply(vm, args)
            } catch (e) {
                handleError(e, vm, `event handler for "${event}"`)
            }
        }
    }
    return vm
}
```

### vm.$off

```js
Vue.prototype.$off = function (event, fn) {
    const vm = this
    // all
    if (!arguments.length) {
        vm._events = Object.create(null)
        return vm
    }
    // array of events
    if (Array.isArray(event)) {
        for (let i = 0, l = event.length; i < l; i++) {
            this.$off(event[i], fn)
        }
        return vm
    }
    // specific event
    const cbs = vm._events[event]
    if (!cbs) {
        return vm
    }
    if (!fn) {
        vm._events[event] = null
        return vm
    }
    if (fn) {
        let cb
        let i = cbs.length
        while (i--) {
            cb = cbs[i]
            if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1)
                break
            }
        }
    }
    return vm
}
```

### vm.$once

```js
Vue.prototype.$once = function (event, fn) {
    const vm = this
    function on () {
        vm.$off(event, on)
        fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    return vm
}
```

参考: https://vue-js.com/learn-vue/instanceMethods/event.html