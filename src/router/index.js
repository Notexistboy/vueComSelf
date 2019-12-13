import Vue from 'vue'
import Router from 'vue-router'
//import routes from './routes'
import Index from '@/pages/index1.vue'
//import voTablePush from '@/pages/voTablePush.vue'
Vue.use(Router)
const routes =  [
    {
        path: '/index',
        component: Index
    },
/*     {
        path: '/voTablePush',
        component: voTablePush
    }, */
    {
        path:'/',
        redirect:'/index'
    }
  ]
export default new Router({
  mode: 'history',
  routes
})
