// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
//全局引入
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from "echarts";

//引入组件
import annularChart from './components/Echarts/annularChart.vue'//环形图
import barChart from './components/Echarts/barChart.vue'//柱状图
import dashboardChart from './components/Echarts/dashboardChart.vue'//柱状图
import fanChart from './components/Echarts/fanChart.vue'//扇形图
import curveChart from './components/Echarts/curveChart.vue'//折线图
import pieChart from './components/Echarts/pieChart.vue'//饼状图
import upload from './components/Ele/upload.vue'//Ele-ui上传
import cupload from './components/Ele/c-upload.vue'//Ele-ui上传
import eleTable from './components/Ele/table.vue'//Ele-ui表格
import dropdown from './components/Ele/dropdown.vue'//Ele-ui表格
import cTree from './components/Ele/tree.vue'//Ele-ui表格
import newTree from './components/Ele/newTree.vue'//Ele-ui表格
import uploader from './components/Vant/uploader.vue'//vant上传
Vue.config.productionTip = false


Vue.use(Element);
Vue.use(Element, { size: 'small', zIndex: 3000 });

//vant按需引入
/* import { Button,Uploader,Notify,SwipeCell,Cell,CellGroup,Dialog } from 'vant';
//vant注册
Vue.use(Button)
Vue.use(Uploader)
Vue.use(Notify)
Vue.use(SwipeCell)
Vue.use(Dialog)
Vue.use(Cell).use(CellGroup) */
//注册全局组件
Vue.component('annularChart',annularChart)
Vue.component('barChart',barChart)
Vue.component('dashboardChart',dashboardChart)
Vue.component('curveChart',curveChart)
Vue.component('fanChart',fanChart)
Vue.component('pieChart',pieChart)
Vue.component('upload',upload)
Vue.component('cupload',cupload)
Vue.component('eleTable',eleTable)
Vue.component('uploader',uploader)
Vue.component('cTree',cTree)
Vue.component('newTree',newTree)

Vue.component('dropdown',dropdown)
Vue.prototype.$EventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
