<template>
  <div>
    <div id="annularChartContainer" style="width:500px; height:500px; z-index:1"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {

	},
  data() {
    return {};
  },
  mounted() {
    var myChart = echarts.init(
      document.getElementById("annularChartContainer")
    );
    myChart.setOption({
			color: ['#08c','#fa5','#c03', '#609','#703','#0fc'],
      title: {
        text: "某站点用户访问来源",
      },
      animation: false, //动画
      hoverAnimation: false, //移入移出动画
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
				orient: "horizontal",
				top:"10%",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
			},
      grid : {
        top : "20%",    //距离容器上边界40像素
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "60%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ]
        }
      ]
    });
  },
  methods: {}
};
</script>

<style lang='stylus' rel='stylesheet/stylus'></style>
