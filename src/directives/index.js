import Vue from 'vue'
Vue.directive('demo',{
    bind(el,binding,vnode){
        const s = JSON.stringify;
        el.innerHTML = `
        name: ${s(binding.name)}
        value: ${s(binding.value)}
        expression:${s(binding.expression)}
        argument:${s(binding.arg)}
        modifiers:${s(binding.modofiers)}
        vnode keys:${s(Object.keys(vnode).join('\n'))}
        `
    }
})
