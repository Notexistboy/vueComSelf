// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
//全局引入
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
//import echarts from "echarts";

//引入组件
import annularChart from './components/Echarts/annularChart.vue'//环形图
import barChart from './components/Echarts/barChart.vue'//柱状图
import fanChart from './components/Echarts/fanChart.vue'//扇形图
import curveChart from './components/Echarts/curveChart.vue'//折线图
import pieChart from './components/Echarts/pieChart.vue'//饼状图
import upload from './components/Ele/upload.vue'//Ele-ui上传
import uploader from './components/Vant/uploader.vue'//vant上传
Vue.config.productionTip = false
//Ele-ui按需引入
/* import { Button,Dialog,Upload,Row,Col,Icon,Message,MessageBox,Loading } from 'element-ui';
//Ele-ui注册
Vue.component(Upload.name, Upload);
Vue.component(Dialog.name, Dialog);
Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Icon.name, Icon);
Vue.use(Loading.directive);
//全局配置
//Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
//Ele-ui绑定属性
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;//绑定在原型对象上
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm; */
//vant按需引入
import { Button,Uploader,Notify,SwipeCell,Cell,CellGroup,Dialog } from 'vant';
//vant注册
Vue.use(Button)
Vue.use(Uploader)
Vue.use(Notify)
Vue.use(SwipeCell)
Vue.use(Dialog)
Vue.use(Cell).use(CellGroup)
//注册全局组件
Vue.component('annularChart',annularChart)
Vue.component('barChart',barChart)
Vue.component('curveChart',curveChart)
Vue.component('fanChart',fanChart)
Vue.component('pieChart',pieChart)
Vue.component('upload',upload)
Vue.component('uploader',uploader)
Vue.prototype.$EventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
