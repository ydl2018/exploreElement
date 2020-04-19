
const routes = [{
    path:"/tree",
    name:"tree",
    component:()=>import('@/components/tree')
},
    {
    path:"/",
    redirect:"/tree"
},{
    path:'/drag',
    component:()=>import('@/features/drag')
}]
export default routes
