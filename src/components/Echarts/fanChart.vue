<!--
* Echarts-Fan
* Seong Han
* 2019.07.25
-->
<template>
  <div>
    <div ref="fanChartContainer" style="width:500px; height:500px; z-index:1"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    props: {
      fanData: Array,//数据
      title: String,//标题
    },
    data () {
      return {
        titleData: [],
        seriesData: [],
        listData:[],
      }
    },
    mounted(){
      this.percentNum
      this.getData
      const { titleData,seriesData } = this
      let myChart = echarts.init(this.$refs.fanChartContainer)
      myChart.setOption({
        title:titleData,
        series: seriesData
      })
    },
    methods: {},
    computed: {
      getData(){
        const { fanData,titleData,listData,seriesData } = this
        var color = ['#08c','#fa5','#c03', '#609','#703','#0fc']
        fanData.forEach(function(item, index){
          titleData.push({
            text: item.name,
            left: index * 30 + 24 + '%',
            top: '65%',
            textAlign: 'center',
            textStyle: {
                fontWeight: 'normal',
                fontSize: '16',
                color: color[index],
                textAlign: 'center',
            },
          });
          seriesData.push({
              name: item.name,
              type: 'pie',
              clockWise: false,
              radius: [60, 70],
              itemStyle:  {
                normal: {
                  //barBorderRadius: 10, // 柱条边线圆角，单位px，默认为0
                  barBorderRadius: 10,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: color[index] },
                    { offset: 0, color: "#fff" }
                  ]),
                  shadowColor: color[index],
                  shadowBlur: 0,
                  label: {
                      show: false
                  },
                  labelLine: {
                      show: false
                  },
                }
              },
              hoverAnimation: false,
              center: [index * 30 + 25 + '%', '50%'],
              data: [
                {
                  value: listData[index],
                  itemStyle: {
                    normal: {
                      barBorderRadius: 5
                    }
                  },
                  label: {
                      normal: {
                          formatter: function(params){
                              return params.value;
                          },
                          position: 'center',
                          show: true,
                          textStyle: {
                              fontSize: '20',
                              fontWeight: 'bold',
                              color: color[index]
                          }
                      }
                  },
                },{
                  value: 100-listData[index],
                  name: 'invisible',
                  itemStyle: {
                      normal: {
                          color: '#eee'
                      },
                      emphasis: {
                          color: '#eee'
                      }
                  }
                }]
            })
          })
        return { titleData,seriesData }
      },
      percentNum(){
        const { fanData,listData } = this
        fanData.forEach((v,i,a) => {//分别对应：数组元素，元素的索引，数组本身，后两个可根据需要缺省
          listData.push(Math.round(v.value / v.common * 10000) / 100.00)
        })
        return listData
      },
    },
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>

</style>
