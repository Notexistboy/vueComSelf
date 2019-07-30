<template>
  <div>
    <div ref="curveChartContainer" style="width:500px; height:500px; z-index:1"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    curveData: Object,
    descript: Boolean,
    title: String,
    legend: String,
	},
  data() {
    return {
      legendData:[],
      xAxisDatas: [],
      yAxisData: [],
      seriesData: [],
    };
  },
  mounted() {
    this.getData;
    const { title,legend,legendData,xAxisDatas,seriesData,yAxisData } = this;
    let xAxisData = [ ...new Set( xAxisDatas ) ]
    let myChart = echarts.init(this.$refs.curveChartContainer)
    myChart.setOption({
      title: {
        text: title,
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
        data: xAxisData
      },
      yAxis: yAxisData,
      series: seriesData,
    })
  },
  methods: {},
  computed: {
    getData(){
      var color = ['#08c','#fa5','#c03', '#609','#703','#0fc'];
      const { curveData,legend,descript,legendData,xAxisDatas,yAxisData,seriesData } = this;
      //判断传入数据是几个
      //循环遍历数据
      let values= [];
      for(var key in curveData){
        legendData.push(key);    
        values.push(curveData[key]);//取得value
        for(var item in curveData[key]){
          xAxisDatas.push(item)
        }
      };
      //遍历value中的数据
      var obj={}
      let offset = 0
      let yMaxArr = []
      let yMinArr = []
      let yMax
      let yMin
      let itemLength
      values.map((item,index) =>{
        obj["data_"+index]=[]
        for(var it in values[index]){
          obj["data_"+index].push(values[index][it])
        }
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
            interval: Math.ceil(Math.max.apply(null, obj["data_"+index])/ 5),//刻度均匀分
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
        if(values.length<2){
          seriesData.push({
            name: legendData[index],
            data: obj["data_"+index],
            type: "line",
            itemStyle : { 
              normal : { 
                color:color[index], //改变折线点的颜色
                lineStyle:{ 
                  color:color[index] //改变折线颜色
                },
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "#fff" },
                  { offset: 0, color: color[index] }
                ])
              }
            },//控制阴影部分
          })
          } else {
          seriesData.push({
            name: legendData[index],
            data: obj["data_"+index],
            type: "line",
            yAxisIndex: null,//多Y轴情况下显示右侧y轴刻度
            itemStyle : { 
              normal : { 
                color:color[index], //改变折线点的颜色
                lineStyle:{ 
                  color:color[index] //改变折线颜色
                },
              }
            },
          })
        }
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
          debugger
          item['yAxisIndex']  = index //多Y轴情况下显示右侧y轴刻度
        })
      }
      return {legendData,xAxisDatas,yAxisData,seriesData };
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'></style>
