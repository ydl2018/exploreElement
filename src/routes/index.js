const routes = [
    {
        path: '/button',
        component: () => import('@/components/dl-button')
    },
    {
        path: "",
        redirect: "/button"
    }, {
        path: '/drag',
        component: () => import('@/features/drag')
    }]
export default routes
