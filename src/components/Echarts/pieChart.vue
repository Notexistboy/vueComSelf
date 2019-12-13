<!--
* Echarts-Pie
* Seong Han
* 2019.07.26
-->
<template>
  <div v-if="showState" style="width:calc(100%); height:calc(100%); z-index:1">
    <div id="pieChartContainer" ref="pieChartContainer" style="width:calc(100%); height:calc(100%); z-index:1"></div>
  </div>
  <div v-else class="picture"></div>
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
        arrayData:[],
        myChartOption:{},
        myChart: null,
        paramsName: '',
        showState:true,
      };
    },
    mounted() {
      window.onresize = () => {
				return (() => {
					this.getNext()
				})();
      };
    },
    methods: {
      getData() {
        let _that = this
        this.legendData = []
        this.listData = []
        this.seriesData = []
        this.arrayData = []
        for (var key in _that.pieData){
          _that.legendData.push(key)
          _that.arrayData.push(_that.pieData[key])
        }
        var colorA= ['#0059a9','#95de64','#7030a0', '#ffc000','#703','#0fc','#f8b551','#ec6941','#cdad75','#80c269','#595959','#76b1f9','#4c93ff','#f00','#7030a0','#fed225','#0059a9','#95de64','#7030a0', '#ffc000','#703','#0fc','#f8b551','#ec6941','#cdad75','#80c269','#595959','#76b1f9','#4c93ff','#f00','#7030a0','#fed225']
        var colorB= ['#0059a9','#95de64','#7030a0', '#ffc000','#703','#0fc','#f8b551','#ec6941','#cdad75','#80c269','#595959','#76b1f9','#4c93ff','#f00','#7030a0','#fed225','#0059a9','#95de64','#7030a0', '#ffc000','#703','#0fc','#f8b551','#ec6941','#cdad75','#80c269','#595959','#76b1f9','#4c93ff','#f00','#7030a0','#fed225']
        //datalist遍历
        
        for(var i=0; i<_that.legendData.length; i++){
          _that.listData.push({
            value: _that.arrayData[i], name: _that.legendData[i],
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{offset: 0,color: colorB[i] // 0% 处的颜色
                  }, {offset: 1,color: colorA[i] // calc(100%) 处的颜色
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
      },
      getMyChart() {
        let _that = this
        this.myChartOption = {}
        this.myChartOption = {
          title: {
            text: this.title,
          },
          tooltip: {
            trigger: "item",
            formatter: function(params, tickets, callback) {
              if( _that.paramsName != params.name ){
                _that.paramsName = params.name
                _that.$emit('hover',params)
              }
              return params.name+" : "+params.value+" ("+params.percent+"%)";
            }
          },
          legend: {
          	type: 'scroll',
            orient: "horizontal",
            top:"10%",
            data: this.legendData
          },
          grid: {
            top: "20%",    //距离容器上边界40像素
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "40%",
              center: ["50%", "50%"],
              itemStyle: {
              normal: {
                  label: {
                      show: false
                  },
                  labelLine: {
                      show: false
                  }
              },
              animation: true,
              },
              hoverAnimation: false,
              data: this.listData,
            }
          ]
        }
        
      },
      getNext() {
        let _that = this
				_that.$nextTick(() => {
          _that.myChart = echarts.init(_that.$refs.pieChartContainer)
					_that.myChart.setOption(_that.myChartOption,true)
					_that.myChart.resize()
					_that.myChart.on('click', function(params) {
            _that.$emit('echartsClick', params.name)
          });
				})
      },
      getRAD() {
        this.myChart.dispose()
        this.myChart = echarts.init(this.$refs.pieChartContainer)
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
			pieData: {
				immediate: true,
				handler: function(val, oldval) {
					if (Object.keys(val).length > 0) {
            
						this.getData()
						this.getMyChart()
            this.getNext()
            this.showState = true
					}else{
            this.showState = false
          }
				},
				deep: true //对象内部的属性监听，也叫深度监听
			},
		}
  };
</script>

<style>
.picture{
  height: 100%;
  width: 100%;
  background: url('./nodata.png') no-repeat center center;
  background-size: 30%;
}
</style>
