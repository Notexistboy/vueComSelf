// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//全局引入
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
//import echarts from "echarts";

import router from './router'
import annularChart from './components/Echarts/annularChart.vue'//环形图
import barChart from './components/Echarts/barChart.vue'//柱状图
import fanChart from './components/Echarts/fanChart.vue'//扇形图
import curveChart from './components/Echarts/curveChart.vue'//折线图
import pieChart from './components/Echarts/pieChart.vue'//饼状图
import upload from './components/Ele/upload.vue'//饼状图
Vue.config.productionTip = false
//按需引入
import { Upload,Dialog,Button,Row,Col,Icon,Message,MessageBox,Loading } from 'element-ui';
Vue.component(Upload.name, Upload);
Vue.component(Dialog.name, Dialog);
Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Icon.name, Icon);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;//绑定在原型对象上
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
//全局配置
//Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
//注册全局组件
Vue.component('annularChart',annularChart)
Vue.component('barChart',barChart)
Vue.component('curveChart',curveChart)
Vue.component('fanChart',fanChart)
Vue.component('pieChart',pieChart)
Vue.component('upload',upload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
