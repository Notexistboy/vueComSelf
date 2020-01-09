<!--
* Echarts-Dashboard 仪表盘
* Seong Han
* 2019.07.25
-->
<template>
  <div v-if="showState" style="width:calc(100%); height:calc(100%);">
    <div ref="dashboardChart" style="width:calc(100%); height:calc(100%); z-index:1"></div>  
  </div>
  <div v-else class="picture"></div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name: 'dashboardChart',
    props: {
      value: String,
      title: String,
      min: Number,
      max: Number,

    },
    data () {
      return {
        myChartOption:{},
        myChart: null,
        showState:true,
      }
    },
    mounted() {
			window.onresize = () => {
				return (() => {
					this.getNext()
				})();
			};
		},
		updated: function () {
			this.$nextTick(function () {
				this.myChart.resize()
			})
  	},
    methods: {
      getMyChart() {
        this.myChartOption = {
          title: [{
              x: "center",
              y:"65%",
              //bottom: 100,
              text: this.title,
              textStyle: {
                  fontWeight: 'normal',
                  fontSize: 14,
                  color: "#fff"
              },
          }],
          series : [
              {
                  name:'速度',
                  type:'gauge',
                  min: this.min,
                  max: this.max,
                  //center: ['20%', '30%'], // 默认全局居中
                  //splitNumber:11,
                  radius: "90%",
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: [[0.25, '#28affd'],[0.5, '#ffea00'],[0.75, '#ff9000'],[1, 'red']],
                          width: 5,
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  axisLabel: {            // 坐标轴小标记
                      textStyle: {       // 属性lineStyle控制线条样式
                          fontWeight: 'bolder',
                          color: '#000',
                          //shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  axisTick: {            // 坐标轴小标记
                      length :15,        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto',
                          width:3,
                          //shadowColor : '#fff', //默认透明
                          //shadowBlur: 10
                      }
                  },
                  splitLine:{//橙色分割线
                      length:25,
                      lineStyle:{
                          width:3,
                          color:'#FCD209',
                      }
                  },
                  itemStyle:{//指针颜色
                      color:'#1e90ff',
                  },
                  pointer:{//指针长短
                      length:75
                  },
                  detail: {
                    formatter:'{value}',
                    fontSize: 19,
                    color:'#000',
                    fontWeight:"700"
                  },
                  data:[{value: this.value}]
          }]
        }
      },
      getData() {
      },
      getNext() {
        let _that = this
				_that.$nextTick(() => {
					_that.myChart = echarts.init(_that.$refs.dashboardChart)
					_that.myChart.setOption(_that.myChartOption,true)
					_that.myChart.resize()
					_that.myChart.on('click', function(params) {
            _that.$emit('echartsClick', params.name)
          });
				})
      },
      getRAD() {
        this.myChart.dispose()
        this.myChart = echarts.init(this.$refs.dashboardChart)
        this.myChart.setOption(this.myChartOption,true)
        this.myChart.resize()
        this.myChart.on('click', function(params) {
          this.$emit('echartsClick', params.name)
        });
    	}
    },
    computed: {

    },
    watch: {
			value: {
				immediate: true,
				handler: function(val, oldval) {
					if ( val != "" ) {
						this.getData()
						this.getMyChart()
						this.getNext()
					  this.showState = true
          }else{
            this.showState = false
          }
				},
				deep: true //对象内部的属性监听，也叫深度监听
			},
		}
  }
</script>
