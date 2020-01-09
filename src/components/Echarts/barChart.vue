<!--
* Echarts-Bar 柱状图
* Seong Han
* 2019.07.23
-->
<template>
  <div v-if="showState" style="width:calc(100%); height:calc(100%); display:block">
    <div id="centerEcharts1" ref="barChartContainer" style="width:calc(100%); height:calc(100%); z-index:1"></div>
    <div id="centerEcharts2" ref="barChartShadow" style="width:calc(100%); height:calc(100%);"></div>
  </div>
  <div v-else class="picture" :class="picSize"></div>
</template>

<script>
import echarts from "echarts";
export default {
	props: {
    barData:Object,//数据
    descript: Boolean,//是否共用一个坐标轴
    title: String,//标题
    legend: String,//横坐标
    legendState: Boolean,//是否显示legend
    yLabel:Boolean,//柱状图上方显示数量
    xAxisCut:Boolean,//截取x轴5个字符显示
	},
  data() {
    return {
      legendData:[],//Y轴文本
      xAxisDatas: [],
      yAxisData: [],
      seriesData: [],
      xAxis:[],
      seriesDataShadow: [],
      myChartOption: {},
      myShadowOption: {},
      myChart: null,
      myShadow: null,
      showState:true,
      picSize: '',
		};
  },
  created() {

  },
  mounted() {
    if(this.$parent.$el){
      if(this.$parent.$el.clientHeight < 500){
        this.picSize = 'smaPic'
      }else if(this.$parent.$el.clientHeight < 750){
        this.picSize = 'midPic'
      }else if(this.$parent.$el.clientHeight < 1000){
        this.picSize = 'bigPic'
      }
    }
    window.onresize = () => {
      return (() => {
        this.getNext()
      })();
    };
  },
  methods: {
    getData(){
			let colorA = ['#009bee','#fd8a6c','#c03', '#0fc','#f8b551','#ec6941','#76b1f9','#80c269','#009bee','#fd8a6c','#c03', '#0fc','#f8b551','#ec6941','#76b1f9','#80c269','#009bee','#fd8a6c','#c03', '#0fc','#f8b551','#ec6941','#76b1f9','#80c269',]
      let colorB = ['#009bee','#fd8a6c','#c03', '#0fc','#f8b551','#ec6941','#76b1f9','#80c269','#009bee','#fd8a6c','#c03', '#0fc','#f8b551','#ec6941','#76b1f9','#80c269','#009bee','#fd8a6c','#c03', '#0fc','#f8b551','#ec6941','#76b1f9','#80c269',]
      const { barData,descript,legend } = this
      this.legendData= []
      this.xAxisDatas = []
      this.yAxisData = []
      this.seriesData = []
      this.seriesDataShadow = []
      let values= []
      let barWidth = '10%'
      let rotate = '0'
      for(let key in this.barData){
        this.legendData.push(key);
        values.push(this.barData[key])//取得value
        for(let item in this.barData[key]){
          this.xAxisDatas.push(item)
          this.xAxisDatas = [...new Set(this.xAxisDatas)]
        }
      }
      if(this.xAxisDatas.length > 10){
        rotate = '45'
      }else{
        rotate = '0'
      }
      if(this.legendData.length < 5){
        barWidth = '12%'
      }else if(this.legendData.length < 10){
        barWidth = '8%'
      }else if(this.legendData.length < 15){
        barWidth = '6%'
      }else if(this.legendData.length < 20){
        barWidth = '4%'
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
        yMax = parseFloat(Math.max.apply(null, yMaxArr))
        yMin = parseFloat(Math.min.apply(null, yMinArr))
        itemLength = obj["data_"+index].length
        if(!descript){
          if(index==2){
            offset = 25;
          }else if(index>2){
            offset = 25+(index*25);
          }
          let ymax = 0
          let maxInterval = 0
          if(Math.max.apply(null, obj["data_"+index]) >= 10){
            ymax = Math.ceil(Math.max.apply(null, obj["data_"+index])/10)*10
            maxInterval = Math.ceil(ymax/ 5)
          }else if(Math.max.apply(null, obj["data_"+index]) <= 1){
            ymax = 1
            maxInterval = 0.2
          }else{
            ymax = Math.ceil(Math.max.apply(null, obj["data_"+index])/5)*5
            maxInterval = Math.ceil(ymax/ 5)
          }
          this.yAxisData.push({
            type: 'value',
            name: this.legendData[index],
            max: ymax,
            interval: maxInterval,//刻度均匀分
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
        this.seriesData.push({
          name: this.legendData[index],
          type: "bar",
          barWidth,
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
        //let ymax = Math.ceil(Math.max.apply(null, obj["data_"+index])/10)*10
        let ymax = 0
        let maxInterval = 0
        if(yMax >= 10){
          ymax = Math.ceil(yMax/10)*10
          maxInterval = Math.ceil(ymax/ 5)
        }else if(yMax < 1){
          ymax = 1
          maxInterval = 0.2
        }else{
          ymax = Math.ceil(yMax/5)*5
          maxInterval = Math.ceil(ymax/ 5)
        }
        this.yAxisData.push({
          type: 'value',
          name: legend,
          max: ymax,
          interval: maxInterval,//刻度均匀分
          axisLabel: {
            formatter: '{value}'
          },
        })
      }else{
        this.seriesData.forEach((item,index) => {
          item['yAxisIndex']  = index
        })
      }
      this.xAxis =  [
        {
          type: "category",
          data: [ ...new Set( this.xAxisDatas ) ],
          axisTick: { show: false },
          axisLabel: {
            rotate,
            show: true,
            textStyle: {
              fontSize: '12',//设置横坐标轴文字颜大小
            }
          }
        }
      ]
      this.xAxis.forEach((item, index)=> {
        Object.assign(item.axisLabel, {
          formatter: function(value){
            if(value.length>6){
              value = value.substr(0,5)+".."
            }
            return value
          },
        })
      })
      //阴影部分
      for(let index=0; index<values.length; index++){
        const itemLength = obj["data_"+index].length
        let yMaxData = Math.max.apply(null, obj["data_"+index])
        if(yMaxData >= 10){
          yMaxData = Math.ceil(yMaxData/10)*10
        }else if(yMaxData <= 1){
          yMaxData = 1
        }else{
          yMaxData = Math.ceil(yMaxData/5)*5
        }
        if(dataShadow.length < itemLength){
          //i不能混用 下面还要用i
          for (let j = 0; j < itemLength; j++) {
            dataShadow.push(yMaxData)
          }
        }
        this.seriesDataShadow.push({
          // For shadow
          type: "bar",
          itemStyle: {
            normal: { color: "rgba(0,0,0,0.05)" }
          },
          name: this.legendData[index],
          barWidth,
          barCategoryGap: "-150%",
          data: dataShadow, //会显示出来
          animation: false,
        })
      }
		},
	  getMyChart() {
      let { title,legendData,xAxisDatas,yAxisData,seriesData } = this
      this.myChartOption = {}
      this.myChartOption = {
        title: {
          text: title,
          textAlign: 'left',
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          type:'scroll',
          orient: "horizontal",
          top:"5%",
          data: this.legendData
        },
        grid : {
          top : "20%" ,  //距离容器上边界40像素
          bottom:"25%"
        },
        lable: true,
        xAxis: this.xAxis,
        yAxis: yAxisData,
        series: seriesData,
      }
    },
    getMyShadow() {
      let { legendData,xAxisDatas,yAxisData,seriesDataShadow } = this
      this.myShadowOption = {}
      let xAxisData = [ ...new Set( xAxisDatas ) ]
      this.myShadowOption = {
        title: {
          text: ""
        },
        legend: this.legend,
        grid : {
          top : "20%" ,  //距离容器上边界40像素
          bottom:"25%"
        },
        xAxis: {
          type: "category",
          data: null,
          axisTick: {
            show: false
          },
          axisLabel: {//横坐标类目文字
          show: true,
          textStyle: {
            fontSize: '14',//设置横坐标轴文字颜大小
            },
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: yAxisData,
        series: seriesDataShadow
      }
    },
    getNext() {
      let _that = this
      _that.$nextTick(() => {
        _that.myChart = echarts.init(_that.$refs.barChartContainer)
        _that.myShadow = echarts.init(_that.$refs.barChartShadow)
        _that.myChart.setOption(_that.myChartOption,true)
        _that.myShadow.setOption(_that.myShadowOption,true)
        _that.myChart.resize()
        _that.myShadow.resize()
        _that.myChart.on('click', function (params) {
          _that.$emit("echartsClick",params.name )
        });
      })
    },
    //resizeanddispose
    getRAD() {
        this.myChart.dispose()
        this.myShadow.dispose()
        this.myChart = echarts.init(this.$refs.barChartContainer)
        this.myShadow = echarts.init(this.$refs.barChartShadow)
        this.myChart.setOption(this.myChartOption,true)
        this.myShadow.setOption(this.myShadowOption,true)
        this.myChart.resize()
        this.myShadow.resize()
        this.myChart.on('click', function (params) {
          this.$emit("echartsClick",params.name )
        });
    }
	},
	computed: {
  },
  watch: {
    barData:{
      immediate:true,
      handler:function(val,oldval){
        if(Object.keys(val).length > 0){
          this.getData()
          this.getMyChart()
          this.getMyShadow()
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
/* #echartContainer{
  z-index: auto
} */
 #centerEcharts1{
    width: 100%;
    height: 100%;
    box-sizing:border-box;
  }
  #centerEcharts2{
     width: 100%;
     height: 100%;
     box-sizing:border-box;
   }
</style>
