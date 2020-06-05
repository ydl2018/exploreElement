import Vue from "vue"
import App from "../app"
import VueRouter from "vue-router"
import '@/directives'
import routes from "@/routes"
Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'hash',
    routes: routes
});
// router.beforeEach((to,from,next)=>{
//     console.log(to);
//     next()
// })

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app');
