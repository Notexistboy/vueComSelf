<!--
* Echarts-Pie
* Seong Han
* 2019.07.26
-->
<template>
  <div>
    <div ref="pieChartContainer" style="width:500px; height:500px; z-index:1"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    props: {
      pieData: Object,//数据
      title: String,//标题
    },
    data() {
      return {
        legendData:[],
        listData: [],
        seriesData: [],
        arrayData:[]
      };
    },
    mounted() {
      this.getData
      const { title,legendData,arrayData,listData } = this
      let myChart = echarts.init(this.$refs.pieChartContainer)
      myChart.setOption({
        title: { 
          text: title,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          top:"10%",
          data: legendData
        },
        grid: {
          top: "20%",    //距离容器上边界40像素
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            itemStyle: {
              normal: {
                  label: {
                      show: false
                  },
                  labelLine: {
                      show: false
                  }
              }
            },
            hoverAnimation: false, 
            data: listData,
          }
        ]
      })
    },
    methods: {},
    computed: {
      getData(){
        const { pieData,legendData,arrayData,listData } = this
        for (var key in pieData){
          legendData.push(key)
          arrayData.push(pieData[key])
        }
        var color= ['#08c','#fa5','#c03', '#609','#703','#0fc']
        //datalist遍历
        for(var i=0; i<legendData.length; i++){
          listData.push({
            value: arrayData[i], name: legendData[i],
            itemStyle: {
                  normal: {
                      color: { // 完成的圆环的颜色
                          colorStops: [{offset: 0,color: '#fff' // 0% 处的颜色
                          }, {offset: 1,color: color[i] // 100% 处的颜色
                          }]
                      },
                      label: {
                          show: false
                      },
                      labelLine: {
                          show: false
                      }
                  } 
              }
          })
        }
        return{ legendData,arrayData,listData }
      }
    },
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'></style>
