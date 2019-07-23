<template>
  <div style="position:relative; display:block">
    <div id="barChartContainer" style="width:500px; height:500px; z-index:1" @click="change"></div>
    <div id="barChartShadow" style="width:500px; height:500px; position:absolute;  top:0; left:0;"  @click="change"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
	props: {
		barData:Object
	},
  data() {
    return {
			legendData:[],
      xAxisDatas: [],
      yAxisData: [],
      seriesData: [],
      seriesDataShadow: [],
		};
  },
  mounted() {
		this.getData
    const { legendData,xAxisDatas,yAxisData,seriesData,seriesDataShadow } = this
    let xAxisData = [ ...new Set( xAxisDatas ) ]
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("barChartContainer"))
    var myShadow = echarts.init(document.getElementById("barChartShadow"))
    var data = [10, 30, 50, 70, 90, 110, 130]
    
    //如何拿到最高点
    // 绘制图表
    myChart.setOption({
      title: { text: "信息" },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
				orient: "horizontal",
        top:"10%",
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
    })
    myShadow.setOption({
      title: {
        text: ""
      },
      legend: {
				orient: "horizontal",
        top:"10%",
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
    })
  },
  methods: {
		change: function () {
			console.log('change')
      this.$emit('change')//把a标签的点击事件分发
    }
	},
	computed:{
		getData(){
			var color = ['#08c','#fa5','#c03', '#609','#703','#0fc']
      const { barData,legendData,xAxisDatas,yAxisData,seriesData,seriesDataShadow } = this
      
			let values= []
      for(var key in barData){
        legendData.push(key);   
        values.push(barData[key])//取得value
        for(var item in barData[key]){
          xAxisDatas.push(item)
        }
      }
      //遍历y轴,legendData对应y轴名称
			//遍历value中的数据
      var obj={}
      var dataShadow = []
      for(var i=0; i<values.length; i++){
        debugger
        obj["data_"+i]=[]
        for(var item in values[i]){
          obj["data_"+i].push(values[i][item])
        }
        //obj["data_"+i].length
        //ymax = obj["data_"+i].Math(...obj["data_"+i])
        var yMax = Math.max.apply(null, obj["data_"+i])
        debugger
        const itemLength = obj["data_"+i].length
        if(dataShadow.length < itemLength){
          //i不能混用 下面还要用i
          for (var j = 0; j < itemLength; j++) {
            dataShadow.push(yMax)
          }
        }
        debugger
        yAxisData.push({
          type: 'value',
          name: legendData[i],
          mix: 0,
          max: 100,
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
                lineStyle: {
                    color: color[i]
                }
            },
        })
        debugger
        seriesData.push({
          itemStyle: {
            normal: {
              barBorderRadius: 3, // 柱条边线圆角，单位px，默认为0
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: color[i] },
                { offset: 1, color: "#fff" }
              ])
            },
            emphasis: {
              barBorderRadius: 3,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: color[i] },
                { offset: 1, color: "#fff" }
              ])
            },
          },
          name: legendData[i],
          type: "bar",
          barWidth: "20%",
          data: obj["data_"+i],
        })
        seriesDataShadow.push({
          // For shadow
          type: "bar",
          itemStyle: {
            normal: { color: "rgba(0,0,0,0.05)" }
          },
          name: legendData[i],
          barWidth: "20%",
          barCategoryGap: "-150%",
          data: dataShadow, //会显示出来
          animation: false,
        })
      }
			return {legendData,xAxisDatas,yAxisData,seriesData,seriesDataShadow }
		}
	}
};
</script>

<style>
/* #echartContainer{
  z-index: auto 
} */
</style>
