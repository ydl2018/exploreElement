
const routes = [{
    path:"/tree",
    name:"tree",
    component:()=>import('@/components/tree')
},
    {
    path:"/",
    redirect:"/tree"
}]
export default routes
