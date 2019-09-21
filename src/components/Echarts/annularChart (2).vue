<!--
* Echarts-Annular
* Seong Han
* 2019.07.22
-->
<template>
  <div style="width:100%; height:100%;">
    <div ref="annularChartContainer" style="width:100%; height:100%; z-index:1"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    annularData: Object,//数据
    anName: String,
    title: String,//标题
	},
  data() {
    return {
      legendData:[],
      listData: [],
      arrayData:[],
      myChartOption: {},
    };
  },
  mounted() {
    this.getData
    this.getMyChart()
    this.getNext()
  },
  methods: {
    getMyChart() {
      const { title,legendData,arrayData,listData,anName } = this
      this.myChartOption = {
        color: ['#ffac2e','#4f6efa','#69c0fe', '#199d95','#d0e3fe'],
        title: {
          text: title,
        },
        grid: {
          left: -100,
          top: 50,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vartical",
          // x: "right",
          top: "center",
          right: "15",
          // bottom: "0%",
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 16,
          textStyle: {
            color: '#A3E2F4',
            fontSize: 12,
            fontWeight: 0
          },
          data: legendData
        },
        grid : {
          top : "40%",    //距离容器上边界40像素
        },
        calculable: true,
        series: [
          {
            stack: 'a',
            type: "pie",
            radius: ["40%", "55%"],
            roseType: 'radius',//area
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                formatter: "{c}",
                textStyle: {
                  fontSize: 12,
                },
                position: 'outside'
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 55
              },
              emphasis: {
                show: false
              }
            },
            hoverAnimation: false, 
            data: listData,
          }
        ]
      }
    },
    getNext() {
      let that = this
      that.$nextTick(() => {
        let myChart = echarts.init(that.$refs.annularChartContainer)
        myChart.setOption(that.myChartOption)
      })
    }
  },
  computed: {
    getData(){
      const { annularData,legendData,arrayData,listData } = this
      for (var key in annularData){
        legendData.push(key)
        arrayData.push(annularData[key])
      }
      //datalist遍历
      for(var i=0; i<legendData.length; i++){
        listData.push({
          value: arrayData[i], name: legendData[i],
        })
      }
      debugger
      return{ legendData,arrayData,listData }
    }
  },
  watch: {
    annularData:{
      handler:function(val,oldval){
        this.getData
        this.getMyChart()
        this.getNext()
      },
      deep:true//对象内部的属性监听，也叫深度监听
    },
  }
};
</script>

<style></style>
