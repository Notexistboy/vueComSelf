import Index from '../pages/index.vue'

export default[
    {
        path: '/index',
        component: Index
    },
    {
        path:'/',
        redirect:'/index'
    }
]