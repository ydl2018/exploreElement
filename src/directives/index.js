import Vue from 'vue'

// 所有的节点都被赋予 el，binding, vnode,oldVnode
Vue.directive('loading',{
    bind(el,binding,vnode){
        const {value} = binding;
        if(value){
            const loadingTextDom = document.createElement('span');
            loadingTextDom.innerText = '加载中'
            el.appendChild(loadingTextDom)
        }
       
    },
    inserted(el,binding,vnode){  // 当节点插入父节点时调用，不能保证已经挂载到根实例上去了1
        console.log(vnode);

    }, 
    update(el,binding,vnode){  //  
     
    },
    componentUpdated(){

    },
    unbind(){
        
    }
})
