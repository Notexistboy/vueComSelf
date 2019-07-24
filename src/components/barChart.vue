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
    barData:Object,
    descript: Boolean,
    title: String,
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
    const { title,legendData,xAxisDatas,yAxisData,seriesData,seriesDataShadow } = this
    let xAxisData = [ ...new Set( xAxisDatas ) ]
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("barChartContainer"))
    let myShadow = echarts.init(document.getElementById("barChartShadow"))
    let data = [10, 30, 50, 70, 90, 110, 130]
    
    //如何拿到最高点
    // 绘制图表
    myChart.setOption({
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
			let color = ['#08c','#fa5','#c03', '#609','#703','#0fc']
      const { barData,descript,legendData,xAxisDatas,yAxisData,seriesData,seriesDataShadow } = this
      
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
        debugger
        obj["data_"+index]=[]
        for(let it in values[index]){
          obj["data_"+index].push(values[index][it])
        }
        //obj["data_"+index].length
        //ymax = obj["data_"+index].Math(...obj["data_"+index])
        //Ymax 值可能不同 单位不同 无法公用一个
        yMaxArr.push(Math.max.apply(null, obj["data_"+index]))
        yMax = Math.max.apply(null, yMaxArr)
        itemLength = obj["data_"+index].length
        debugger
        if(index==2){
          offset = 80;
          }else if(index>2){
          offset = 80+(index*30);
        }
        if(!descript){
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
                  color: color[index]
              }
            },
            offset:offset
          })
        }
        debugger
        seriesData.push({
          name: legendData[index],
          type: "bar",
          barWidth: "20%",
          data: obj["data_"+index],
          yAxisIndex: index,//多Y轴情况下显示右侧y轴刻度
          itemStyle: {
            normal: {
              barBorderRadius: 3, // 柱条边线圆角，单位px，默认为0
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: color[index] },
                { offset: 1, color: "#fff" }
              ])
            },
            emphasis: {
              barBorderRadius: 3,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: color[index] },
                { offset: 1, color: "#fff" }
              ])
            },
          },
        })
      })
      //Y轴遍历 是同类，只有1个y轴
      if(descript){
        yAxisData.push({
          type: 'value',
          name: legendData[index],
          mix: yMin,
          max: yMax,
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            lineStyle: {
                color: color[index]
            }
          }
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
        debugger
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
      /* for(let i=0; i<values.length; i++){
        debugger
        obj["data_"+index]=[]
        for(let item in values[index]){
          obj["data_"+index].push(values[index][item])
        }
        //obj["data_"+index].length
        //ymax = obj["data_"+index].Math(...obj["data_"+index])
        let yMax = Math.max.apply(null, obj["data_"+index])
        debugger
        const itemLength = obj["data_"+index].length
        if(dataShadow.length < itemLength){
          //i不能混用 下面还要用i
          for (let j = 0; j < itemLength; j++) {
            dataShadow.push(yMax)
          }
        }
        debugger
        if(i==2){
          offset = 80;
          }else if(i>2){
          offset = 80+(i*30);
        }
        yAxisData.push({
          type: 'value',
          name: legendData[index],
          mix: 0,
          max: 100,
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            lineStyle: {
                color: color[index]
            }
          },
          offset:offset
        })
        debugger
        seriesData.push({
          itemStyle: {
            normal: {
              barBorderRadius: 3, // 柱条边线圆角，单位px，默认为0
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: color[index] },
                { offset: 1, color: "#fff" }
              ])
            },
            emphasis: {
              barBorderRadius: 3,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: color[index] },
                { offset: 1, color: "#fff" }
              ])
            },
          },
          name: legendData[index],
          type: "bar",
          barWidth: "20%",
          data: obj["data_"+index],
        })
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
      } */
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
