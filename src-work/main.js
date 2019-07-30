// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import annularChart from './components/annularChart.vue'//环形图
import barChart from './components/barChart.vue'//柱状图
import fanChart from './components/fanChart.vue'//扇形图
import curveChart from './components/curveChart.vue'//折线图
import pieChart from './components/pieChart.vue'//饼状图
Vue.config.productionTip = false

//注册全局组件
Vue.component('annularChart',annularChart)
Vue.component('barChart',barChart)
Vue.component('curveChart',curveChart)
Vue.component('fanChart',fanChart)
Vue.component('pieChart',pieChart)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
