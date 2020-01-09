<!--
* Echarts-Fan 环形图
* Seong Han
* 2019.07.25
-->
<template>
	<div v-if="showState" style="width:calc(100%); height:calc(100%);">
		<div ref="fanChartContainer" style="width:calc(100%); height:calc(100%); z-index:1"></div>
	</div>
	<div v-else class="picture" :class="picSize"></div>
</template>

<script>
	import echarts from "echarts";
	export default {
		props: {
			fanData: Array, //数据
			title: String, //标题
		},
		data() {
			return {
				titleData: [],
				seriesData: [],
				listData: [],
				myChartOption: {},
				myChart: null,
				showState:true,
				picSize: '',
			};
		},
		created() {

		},
		mounted() {
			if(this.$parent.$el.clientHeight < 500){
				this.picSize = 'smaPic'
			}else if(this.$parent.$el.clientHeight < 750){
				this.picSize = 'midPic'
			}else if(this.$parent.$el.clientHeight < 1000){
				this.picSize = 'bigPic'
			}
			window.onresize = () => {
				return (() => {
					this.getNext()
				})();
			};
		},
		updated: function () {
			this.$nextTick(function () {
				this.myChart.resize()
			})
		},
		methods: {
			getMyChart() {
				this.myChartOption = {
					title: this.titleData,
					series: this.seriesData
				}
			},
			getData() {
				let _that = this;
				var colorA = ['#6f69e5', '#ff5f60', '#5dbaff', '#609', '#703', '#0fc']
				var colorB = ['#87a1fe', '#ff806b', '#13dbff']
				this.fanData.forEach(function(item, index) {
					_that.titleData.push({
						text: item.name,
						left: index * 30 + 20 + '%',
						top: '80%',
						textAlign: 'center',
						textStyle: {
							fontWeight: 'normal',
							fontSize: '16',
							color: colorA[index],
							textAlign: 'center',
						},
					});
					_that.seriesData.push({
						name: item.name,
						type: 'pie',
						clockWise: false,
						radius: [34, 45],
						itemStyle: {
							normal: {
								//barBorderRadius: 10, // 柱条边线圆角，单位px，默认为0
								barBorderRadius: 10,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 1,
										color: colorA[index]
									},
									{
										offset: 0,
										color: colorB[index]
									}
								]),
								shadowColor: colorA[index],
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
						center: [index * 30 + 20 + '%', '50%'],
						data: [{
							value: _that.listData[index],
							itemStyle: {
								normal: {
									barBorderRadius: 5,
								}
							},
							label: {
								normal: {
									formatter: function(params) {
										let value = item.value
										return item.value + "个";
									},
									position: 'center',
									show: true,
									textStyle: {
										fontSize: '20',
										fontWeight: 'bold',
										color: colorA[index]
									}
								},
							},
						}, {
							value: 100 - _that.listData[index],
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
			},
			percentNum() {
				this.fanData.forEach((v, i, a) => { //分别对应：数组元素，元素的索引，数组本身，后两个可根据需要缺省
					this.listData.push(Math.round(v.value / v.common * 10000) / 100.00)
				})
			},
			getNext() {
				let _that = this
				_that.$nextTick(() => {
					_that.myChart = echarts.init(_that.$refs.fanChartContainer)
					_that.myChart.setOption(_that.myChartOption,true)
					_that.myChart.resize()
					_that.myChart.on('click', function(params) {
						_that.$emit('onClick', params.name)
					});
				})
			},
			getRAD() {
        this.myChart.dispose()
        this.myChart = echarts.init(this.$refs.fanChartContainer)
        this.myChart.setOption(this.myChartOption,true)
				this.myChart.resize()
				this.myChart.on('click', function (params) {
          this.$emit("onClick",params.name )
        });
    	}
		},
		computed: {

		},
		watch: {
			fanData: {
				immediate: true,
				handler: function(val, oldval) {
					if (Object.keys(this.fanData).length != 0) {
						this.percentNum()
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
	}
</script>

