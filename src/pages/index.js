import Vue from "vue"
import App from "../app"
import VueRouter from "vue-router"
import 'element-ui/lib/theme-chalk/index.css';
import elementUi from "element-ui"
import routes from "@/routes"
Vue.use(VueRouter);
Vue.use(elementUi)

const router = new VueRouter({
    mode: 'hash',
    routes: routes,

    scrollBehavior(to, from, savedPositon) {
        // savedPositon 指的是浏览器是通过导航操作返回时，返回的{x:x,y:y}
        return new Promise(resolve => {
            setTimeout(() => resolve({ x: 0, y: 0 }), 0)
        })
    }
});
// router.beforeEach((to,from,next)=>{
//     console.log(to);
//     next()
// })

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app');
