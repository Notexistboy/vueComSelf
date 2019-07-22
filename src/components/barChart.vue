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
		objData:Object
	},
  data() {
    return {
			legendData:[],
      seriesData: [],
      xAxisDatas: [],
		};
  },
  mounted() {
		this.getlegendData;
    const { objData,legendData,xAxisDatas,seriesData } = this;
    let xAxisData = [ ...new Set( xAxisDatas ) ];
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("barChartContainer"));
    var myShadow = echarts.init(document.getElementById("barChartShadow"));
    var data = [10, 30, 50, 70, 90, 110, 130];
    var yMax = 200;
    var dataShadow = [];
    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
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
          data: xAxisDatas,
          axisTick: { show: false }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "充装量",
          min: 0,
          max: 200,
          interval: 50,
          axisLabel: {
            formatter: "{value} "
          }
        },
        {
          type: "value",
          name: "充装车次",
          min: 0,
          max: 200,
          interval: 50,
          axisLabel: {
            formatter: "{value} "
          }
        }
      ],
      series: [
        {
          itemStyle: {
            normal: {
              barBorderRadius: 3, // 柱条边线圆角，单位px，默认为0
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#009cef" },
                { offset: 0.5, color: "#00b0f3" },
                { offset: 1, color: "#00caf9" }
              ])
            },
            emphasis: {
              barBorderRadius: 3,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00caf9" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#009cef" }
              ])
            }
          },
          name: "Forest",
          type: "bar",
          barWidth: "20%",
          data: [10, 30, 50, 70, 90, 110, 130]
        },
        {
          itemStyle: {
            normal: {
              barBorderRadius: 3, // 柱条边线圆角，单位px，默认为0
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#fe8a6d" },
                { offset: 0.5, color: "#f37454" },
                { offset: 1, color: "#eb6442" }
              ])
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#eb6442" },
                { offset: 0.5, color: "#f37454" },
                { offset: 1, color: "#fe8a6d" }
              ])
            }
          },
          name: "Steppe",
          type: "bar",
          barWidth: "20%",
          barCategoryGap: "-100%",
          data: [20, 40, 60, 80, 100, 120, 140]
        }
      ]
    });
    myShadow.setOption({
      title: {
        text: ""
      },
      legend: {
				orient: "horizontal",
        top:"10%",
        data: ["Forest", "Steppe"]
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
      series: [
        {
          // For shadow
          type: "bar",
          itemStyle: {
            normal: { color: "rgba(0,0,0,0.05)" }
          },
          name: "Forest",
          barWidth: "20%",
          barCategoryGap: "-150%",
          data: dataShadow, //会显示出来
          animation: false
        },
        {
          // For shadow
          type: "bar",
          itemStyle: {
            normal: { color: "rgba(0,0,0,0.05)" }
          },
          name: "Steppe",
          barWidth: "20%",
          barCategoryGap: "-150%",
          data: dataShadow, //会显示出来
          animation: false
        }
      ]
    });
  },
  methods: {
		change: function () {
			console.log('change')
      this.$emit('change');//把a标签的点击事件分发
    },
	},
	computed:{
		getlegendData(){
			var color = ['#08c','#fa5','#c03', '#609','#703','#0fc'];
      const { objData,legendData,seriesData,xAxisDatas } = this;
			let values= [];
      for(var key in objData){
        legendData.push(key);    
        values.push(objData[key]);//取得value
        for(var item in objData[key]){
          xAxisDatas.push(item)
        }
			};
			//遍历y轴
			//遍历value中的数据
      var obj={}
      for(var i=0; i<values.length; i++){
        obj["data_"+i]=[]
        for(var item in values[i]){
          obj["data_"+i].push(values[i][item])
        }
        debugger
        if(values.length<2){
          seriesData.push({
            name: legendData[i],
            data: obj["data_"+i],
            type: "line",
            itemStyle : { 
                normal : { 
                  color:color[i], //改变折线点的颜色
                  lineStyle:{ 
                    color:color[i] //改变折线颜色
                  },
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: "#fff" },
                    { offset: 0, color: color[i] }
                  ])
                }
              },//控制阴影部分
          })
        } else {
          seriesData.push({
            name: legendData[i],
            data: obj["data_"+i],
            type: "line",
            itemStyle : { 
              normal : { 
                color:color[i], //改变折线点的颜色
                lineStyle:{ 
                  color:color[i] //改变折线颜色
                },
              }
            },
          })
        }
      };
			return {legendData,xAxisDatas,seriesData};
		}
	}
};
</script>

<style>
/* #echartContainer{
  z-index: auto 
} */
</style>
