<!--
* Echarts-Curve 曲线图/折线图
* Seong Han
* 2019.07.24
-->
<template>
  <div v-if="showState" style="width:calc(100%); height:calc(100%); z-index:1;">
    <div id="centerEcharts" ref="curveChartContainer" style="width:calc(100%); height:calc(100%); z-index:1;"></div>  
  </div>
  <div v-else class="picture"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    curveData: Object,//数据点
    descript: Boolean,//是否共用一个纵坐标
    title: String,//标题文字
    legend: String,//横坐标文字
    smooth: Boolean,//是否平滑
    xAxisCut: Boolean,
	},
  data() {
    return {
      legendData:[],
      xAxisDatas: [],
      yAxisData: [],
      seriesData: [],
      xAxis:[],
      myChartOption: {},
      myChart: null,
      showState:true,
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.getNext()
      })();
    };
    window.addEventListener('resize',function(){
      this.myChart.resize();
    })
  },
  updated: function () {
    this.$nextTick(function () {
      this.myChart.resize()
    })
  },
  methods: {
    getData(){
      let color = ['#009bee','#fd8a6c','#c03', '#609','#703','#0fc']
      const { curveData,legend,descript,smooth} = this;
      this.legendData = []
      this.xAxisDatas = []
      this.yAxisData = []
      this.seriesData = []
      //判断传入数据是几个
      //循环遍历数据
      let values= [];
      for(var key in curveData){
        this.legendData.push(key);
        values.push(curveData[key]);//取得value
        for(var item in curveData[key]){
          this.xAxisDatas.push(item)
        }
      };
      if(this.xAxisCut){
        this.xAxis.forEach((item, index)=> {
          Object.assign(item.axisLabel, {
            formatter: function(value){
              if(value.length>4){
                value = value.substr(0,4)+"..."
              }
              return value
            },
          })
        })
      }
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
          let ymax = Math.ceil(Math.max.apply(null, obj["data_"+index])/10)*10

          this.yAxisData.push({
            type: 'value',
            name: this.legendData[index],
            max: ymax,
            interval: Math.ceil(ymax/ 5),//刻度均匀分//刻度均匀分
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
          this.seriesData.push({
            name: this.legendData[index],
            data: obj["data_"+index],
            type: "line",
            smooth,
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
          this.seriesData.push({
            name: this.legendData[index],
            data: obj["data_"+index],
            type: "line",
            smooth,
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
        let ymax = Math.ceil(yMax/10)*10
        this.yAxisData.push({
          type: 'value',
          name: legend,
          mix: yMin,
          max: yMax,
          interval: Math.ceil(yMax/5),//刻度均匀分
          axisLabel: {
            formatter: '{value}'
          },
        })
      }else{
        this.seriesData.forEach((item,index) => {
          item['yAxisIndex']  = index //多Y轴情况下显示右侧y轴刻度
        })
      }
    },
    getMyChart() {
      const { title,legend,legendData,xAxisDatas,seriesData,yAxisData } = this;
      let xAxisData = [ ...new Set( xAxisDatas ) ]
      this.myChartOption = {
        title: {
          text: title,
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: "horizontal",
          top:"5%",
          data: legendData
        },
        grid : {
          top : "20%" ,  //距离容器上边界40像素
          bottom:"20%"
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisTick: { show: false },
          /* axisLabel: {
            formatter: function(value){
              if(value.length>6){
                value = value.substr(0,5)+"..."
              }
              return value
            }
          } */
        },
        yAxis: yAxisData,
        series: seriesData
      }
    },
    getNext() {
      let _that = this
      _that.$nextTick(() => {
        _that.myChart = echarts.init(_that.$refs.curveChartContainer)
        _that.myChart.setOption(_that.myChartOption,true)
        _that.myChart.resize()
        _that.myChart.on('click', function (params) {
          _that.$emit("echartsClick",params )
        });
      })
    },
    getRAD() {
      this.myChart.dispose()
      this.myChart = echarts.init(this.$refs.curveChartContainer)
      this.myChart.setOption(this.myChartOption,true)
      this.myChart.resize()
      this.myChart.on('click', function (params) {
        this.$emit("echartsClick",params.name )
      });
    }
  },
  computed: {
  },
  watch: {
    curveData:{
      immediate:true,
      handler:function(val,oldval){
        if(Object.keys(val).length > 0){
          this.getData()
          this.getMyChart()
          this.getNext()
          this.showState = true
        }else{
          this.showState = false
        }
      },
      deep:true//对象内部的属性监听，也叫深度监听
    },

  }
};
</script>

<style>
  #centerEcharts{
    width: 100%;
    height: 100%;
    box-sizing:border-box;
  }
  .picture{
    height: 100%;
    width: 100%;
    background: url('./nodata.png') no-repeat center center;
    background-size: 30%;
  }
</style>
