<template>
  <div>
    <div id="curveChartContainer" style="width:500px; height:500px; z-index:1"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    curveData:Object
	},
  data() {
    return {
      legendData:[],
      seriesData: [],
      xAxisDatas: [],
    };
  },
  mounted() {
    this.getData;
    const { legendData,xAxisDatas,seriesData } = this;
    let xAxisData = [ ...new Set( xAxisDatas ) ];
    var myChart = echarts.init(document.getElementById("curveChartContainer"));
    myChart.setOption({
      title: {
        text: "某站点用户访问来源",
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
      yAxis: {
        type: "value"
      },
      series: seriesData
    });
  },
  methods: {},
  computed: {
    getData(){
      var color = ['#08c','#fa5','#c03', '#609','#703','#0fc'];
      const { curveData,legendData,seriesData,xAxisDatas } = this;
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
      for(var i=0; i<values.length; i++){
        obj["data_"+i]=[]
        for(var item in values[i]){
          obj["data_"+i].push(values[i][item])
        }
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

<style lang='stylus' rel='stylesheet/stylus'></style>
