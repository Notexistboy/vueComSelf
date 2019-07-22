<template>
  <div>
    <div id="pieChartContainer" style="width:500px; height:500px; z-index:1"></div>
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
    var myChart = echarts.init(document.getElementById("pieChartContainer"));

    myChart.setOption({
			color: ['#08c','#fa5','#c03', '#609','#703','#0fc'],
      animation: false, //动画
      hoverAnimation: false, //移入移出动画
      title: { 
        text: "某站点用户访问来源",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
				orient: "horizontal",
				top:"10%",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
			},
      grid: {
        top: "20%",    //距离容器上边界40像素
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "60%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ],
          itemStyle: {
						 normal: {
              barBorderRadius: 3, // 柱条边线圆角，单位px，默认为0
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFF" },
                { offset: 0.5, color: "#00b0f3" },
                { offset: 1, color: "#00caf9" }
              ])
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });
  },
  methods: {}
};
</script>

<style lang='stylus' rel='stylesheet/stylus'></style>
