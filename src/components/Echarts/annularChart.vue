<!--
* Echarts-Annular 圆环图
* Seong Han
* 2019.07.22
-->
<template>
	<div v-if="showState"  style="width:calc(calc(100%)); height:calc(100%);">
		<div ref="annularChartContainer" style="width:calc(100%); height:calc(100%); z-index:1"></div>
	</div>
	<div v-else class="picture" :class="picSize"></div>
</template>

<script>
	import echarts from "echarts";
	export default {
		props: {
			annularData: Object, //数据
			anName: String,
			title: String, //标题
			defaultColor: String,
		},
		data() {
			return {
				name: [],
				legendData: [],
				listData: [],
				arrayData: [],
				myChartOption: {},
				myChart: null,
				graphicSrt: '',
				showState:true,
				resizeTimer: null,
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
		updated: function () {
			this.$nextTick(function () {
				this.myChart.resize()
			})
  	},
		methods: {
			getData() {
				for (var key in this.annularData) {
					this.legendData.push(key)
					this.arrayData.push(this.annularData[key])
				}
				//datalist遍历
				for (var i = 0; i < this.legendData.length; i++) {
					this.graphicSrt =this.graphicSrt +'\n'+ this.legendData[i] + ':' +this.arrayData[i]
					this.listData.push({
						value: this.arrayData[i],
						name: this.legendData[i],
						itemStyle: {
								normal: {
										color: { // 完成的圆环的颜色
												colorStops: [{offset: 0,color: this.annularColor[i] // 0% 处的颜色
												}, {offset: 1,color: this.annularColor[i] // calc(100%) 处的颜色
												}]
										},
										label: {
												show: false
										},
										labelLine: {
												show: false
										}
								}
						},
						label: {
								normal: {
									position: 'center',
									show: true,
									textStyle: {
										fontSize: '0',
										color: '#fff',
									},
								},
							},
					})
				}
			},
			getMyChart() {
				let _that = this
				this.myChartOption = {
					title: {
						text: this.title,
					},
          // legend:{
          //   orient: 'vertical',
          //   x: 'left',
          //   data:this.legendData
          // },
					grid: {
						left: 10,
						top: 50,
						bottom: 10,
						right: 10,
						containLabel: true
					},
					tooltip: {
						trigger: "item",
						formatter: function(params, tickets, callback) {
              /* if( _that.paramsName != params.name ){
                _that.paramsName = params.name
                _that.$emit('itemClick',params)
              } */
              return params.name+" : "+params.value+" ("+params.percent+"%)";
            }
					},
					calculable: true,
					series: [{
						stack: 'a',
						type: "pie",
            startAngle:270,
						radius: ["76%", "54%"],
						avoidLabelOverlap: true,
						label: {
							normal: {
								show: true,
								formatter: "{b}:{c}",
								textStyle: {
									fontSize: 16,
									fontWeight: 700,
								},
								position: 'outside'
							},
							emphasis: {
								show: true
							}
						},
						labelLine: {
							normal: {
								show: true,
								length: 15,
								length2: 25
							},
							emphasis: {
								show: false
							}
						},
						hoverAnimation: false,
						data: this.listData
					}]
				}
			},

			getNext() {
				let _that = this
				_that.$nextTick(() => {
					_that.myChart = echarts.init(_that.$refs.annularChartContainer)
					_that.myChart.setOption(_that.myChartOption,true)
					_that.myChart.resize()
          // window.onresize = _that.myChart.resize;

          window.addEventListener('resize', function () {
            if (_that.resizeTimer) clearTimeout(_that.resizeTimer);
            _that.resizeTimer = setTimeout(function () {
              _that.myChart.resize();
            }, 100)
          })

					_that.myChart.on('click', function(params) {
											_that.$emit('itemClick', params)
										});
				})
			},
			getRAD() {
        this.myChart.dispose()
        this.myChart = echarts.init(this.$refs.annularChartContainer)
        this.myChart.setOption(this.myChartOption,true)
				this.myChart.resize()
        window.onresize = this.myChart.resize;
				this.myChart.on('click', function(params) {
					this.$emit('onClick', params.name)
				});
    	}
		},
		computed: {
			annularColor() {
				let color = ['#009bee','#f39800','#c03', '#0fc','#f8b551','#ec6941','#76b1f9','#80c269','#009bee','#fd8a6c','#c03', '#0fc','#f8b551','#ec6941','#76b1f9','#80c269','#009bee','#fd8a6c','#c03', '#0fc','#f8b551','#ec6941','#76b1f9','#80c269',]
				 if ( this.defaultColor != '' ) {
				 	color.splice(0,1,this.defaultColor);
				 }
				return color
			}
		},
		watch: {
			annularData: {
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

