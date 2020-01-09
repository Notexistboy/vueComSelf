<!--
* Echarts-Annular
* Seong Han
* 2019.07.22
-->
<template>
  <div style="width:100%; height:100%;">
    <div ref="annularDashChartContainer" style="width:100%; height:100%; z-index:1"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    annularDashData: [String, Number],
    annularDashLabel: [String, Number],
    subTitle: [String, Number],
  },
  data() {
    return {
      legendData: [],
      listData: [],
      arrayData: [],
      myChartOption: {}
    };
  },
  mounted() {},
  methods: {
    getMyChart() {
      let value
      if(this.annularDashData > 100){
        value = 100
      }else{
        value = this.annularDashData
      }
      this.myChartOption = {
        title: {
          text: `${this.annularDashLabel}`,
          subtext: this.subTitle,
          left: "center",
          top: "center", //top待调整
          textStyle: {
            color: "#000",
            fontSize: 14,
          },
          subtextStyle: {
            color: "#ff5000",
            fontSize: 12,
            top: "center"
          },
          itemGap: 5 //主副标题间距
        },
        xAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            type: 'pie',
            clockWise: true,
            avoidLabelOverlap: false,
            hoverAnimation: false, 
            radius: ["70%", "63%"],
            center: ["50%", "50%"],
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: value,
                itemStyle: {
                    normal: {
                        borderWidth: 10,
                        borderColor: {
                            colorStops: [{
                                offset: 0,
                                color: '#7940FE' || '#00cefc' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#2A69EC' || '#367bec' // 100% 处的颜色
                            }]
                        },
                        color: { // 完成的圆环的颜色
                            colorStops: [{
                                offset: 0,
                                color: '#7940FE' || '#00cefc' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#2A69EC' || '#367bec' // 100% 处的颜色
                            }]
                        },
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    },
                }
              },
              {
                value: 100-value,
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0.1)',
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 0,
                    }
                },
              }
            ]
          },
        ]
      }
      
    },
    getNext() {
      let that = this;
      that.$nextTick(() => {
        let myChart = echarts.init(that.$refs.annularDashChartContainer)
        myChart.clear()
        myChart.setOption(that.myChartOption, true)
        myChart.resize()
        
      })
    }
  },
  computed: {},
  watch: {
    annularDashData: {
      immediate: true,
      handler: function(val, oldval) {
        this.getMyChart();
        this.getNext();
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
    annularDashLabel: {
      immediate: true,
      handler: function(val, oldval) {
        this.getMyChart();
        this.getNext();
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
  }
};
</script>

<style></style>
