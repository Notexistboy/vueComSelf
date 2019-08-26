<template>
  <div>
    <div ref="dashboardChart" style="width:100%; height:100%; z-index:1"></div>
  </div>
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
      }
    },
    mounted() {
      const { value, title, min, max } = this
      let myChart = echarts.init(this.$refs.dashboardChart)
      myChart.setOption({
        title: [{
            x: "center",
            y:"65%",
            //bottom: 100,
            text: title,
            textStyle: {
                fontWeight: 'normal',
                fontSize: 20,
                color: "#000"
            },
        }],
        series : [
            {
                name:'速度',
                type:'gauge',
                min,
                max,
                //center: ['20%', '30%'], // 默认全局居中
                //splitNumber:11,
                radius: '50%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.1, '#ff4500'],[0.8, '#4EE3FF'],[1, 'lime']],
                        width: 5,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
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
                    length:110
                },
                detail: {formatter:'{value}%'},
                data:[{value: value}]
            },
          ]
        })
    },
    methods: {

    },
    computed: {

    }
  }
</script>

<style>

</style>
