const routes = [
    {
        path: '/button',
        component: () => import('@/components/button/example')
    },
    {
        path: '/loading',
        component: () => import('@/components/loading/example')
    },
    {
        path: "",
        redirect: "/button"
    }, {
        path: '/drag',
        component: () => import('@/features/drag')
    }]
export default routes
