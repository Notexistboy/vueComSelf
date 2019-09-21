<!--
* Echarts-Bar
* Seong Han
* 2019.07.23
-->
<template>
  <div style="width:100%; height:100%; position:relative; display:block">
    <div ref="barChartContainer" style="width:100%; height:100%; position:absolute; top:0; left:0; z-index:1"></div>
    <div ref="barChartShadow" style="width:100%; height:100%; position:absolute;  top:0; left:0;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
	props: {
    barData:Object,//数据
    descript: Boolean,//是否共用一个坐标轴
    title: String,//标题
    legend: String,//横坐标
	},
  data() {
    return {
			legendData:[],
      xAxisDatas: [],
      yAxisData: [],
      seriesData: [],
      seriesDataShadow: [],
      myChartOption: {},
      myShadowOption: {},
		};
  },
  mounted() {

  },
  methods: {
	  getMyChart() {
      const { title,legend,legendData,xAxisDatas,yAxisData,seriesData } = this
      let xAxisData = [ ...new Set( xAxisDatas ) ]
      this.myChartOption = {
        title: {
          text: title 
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          orient: "horizontal",
          top:"5%",
          data: legendData
        },
        grid : {
          top : "20%",    //距离容器上边界40像素
        },
        lable: true,
        xAxis: [
          {
            type: "category",
            data: xAxisData,
            axisTick: { show: false }
          }
        ],
        yAxis: yAxisData,
        series: seriesData,
      }
    },
    getMyShadow() {
      const { title,legend,legendData,xAxisDatas,yAxisData,seriesDataShadow,myShadowOption } = this
      let xAxisData = [ ...new Set( xAxisDatas ) ]
      this.myShadowOption = {
        title: {
          text: ""
        },
        legend: {
          orient: "horizontal",
          top:"5%",
          data: legendData
        },
        grid : {
          top : "20%",    //距离容器上边界40像素
        },
        xAxis: {
          type: "category",
          data: null,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: seriesDataShadow
      }
    },
    getNext() {
      let that = this
      that.$nextTick(() => {
        let myChart = echarts.init(that.$refs.barChartContainer)
        let myShadow = echarts.init(that.$refs.barChartShadow)
        myChart.setOption(that.myChartOption)
        myShadow.setOption(that.myShadowOption)
      })
    }
	},
	computed: {
		getData(){
      debugger
			let colorA = ['#009bee','#fd8a6c','#c03', '#609','#703','#0fc']
      let colorB = ['#00c9f8','#e96341','#c03', '#609','#703','#0fc']
      const { barData,descript,legend,legendData,xAxisDatas,yAxisData,seriesData,seriesDataShadow } = this
			let values= []
      for(let key in barData){
        legendData.push(key);   
        values.push(barData[key])//取得value
        for(let item in barData[key]){
          xAxisDatas.push(item)
        }
      }
      //遍历y轴,legendData对应y轴名称
			//遍历value中的数据
      let obj={}
      let dataShadow = []
      let offset = 0
      let yMaxArr = []
      let yMinArr = []
      let yMax
      let yMin
      let itemLength
      values.map((item,index) => {
        obj["data_"+index]=[]
        for(let it in values[index]){
          obj["data_"+index].push(values[index][it])
        }
        //obj["data_"+index].length
        //ymax = obj["data_"+index].Math(...obj["data_"+index])
        //Ymax 值可能不同 单位不同 无法公用一个
        yMaxArr.push(Math.max.apply(null, obj["data_"+index]))
        yMinArr.push(Math.min.apply(null, obj["data_"+index]))
        yMax = Math.max.apply(null, yMaxArr)
        yMin = Math.min.apply(null, yMaxArr)
        itemLength = obj["data_"+index].length
        if(!descript){
          if(index==2){
            offset = 25;
          }else if(index>2){
            offset = 25+(index*25);
          }
          yAxisData.push({
            type: 'value',
            name: legendData[index],
            mix: Math.min.apply(null, obj["data_"+index]),
            max: Math.max.apply(null, obj["data_"+index]),
            interval: Math.ceil((Math.max.apply(null, obj["data_"+index]))/ 5),//刻度均匀分
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                  color: colorA[index]
              }
            },
            offset:offset
          })
        }
        seriesData.push({
          name: legendData[index],
          type: "bar",
          barWidth: "20%",
          data: obj["data_"+index],
          itemStyle: {
            normal: {
              barBorderRadius: 3, // 柱条边线圆角，单位px，默认为0
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colorA[index] },
                { offset: 1, color: colorB[index] }
              ])
            },
            emphasis: {
              barBorderRadius: 3,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colorA[index] },
                { offset: 1, color: colorB[index] }
              ])
            },
          },
        })
      })
      //Y轴遍历 是同类，只有1个y轴
      if(descript){
        yAxisData.push({
          type: 'value',
          name: legend,
          mix: yMin,
          max: yMax,
          axisLabel: {
            formatter: '{value}'
          },
        })
      }else{
        seriesData.forEach((item,index) => {
          item['yAxisIndex']  = index
        })
      }
      //阴影部分
      for(let index=0; index<values.length; index++){
        const itemLength = obj["data_"+index].length
        if(dataShadow.length < itemLength){
          //i不能混用 下面还要用i
          for (let j = 0; j < itemLength; j++) {
            dataShadow.push(yMax)
          }
        }
        seriesDataShadow.push({
          // For shadow
          type: "bar",
          itemStyle: {
            normal: { color: "rgba(0,0,0,0.05)" }
          },
          name: legendData[index],
          barWidth: "20%",
          barCategoryGap: "-150%",
          data: dataShadow, //会显示出来
          animation: false,
        })
      }
      console.log(yAxisData)
			return {legendData,xAxisDatas,yAxisData,seriesData,seriesDataShadow }
		}
  },
  watch: {
    barData:{
      handler:function(val,oldval){
        this.getData
        this.getMyChart()
        this.getMyShadow()
        this.getNext()
      },
      deep:true//对象内部的属性监听，也叫深度监听
    },
  }
};
</script>

<style>
/* #echartContainer{
  z-index: auto 
} */
</style>
