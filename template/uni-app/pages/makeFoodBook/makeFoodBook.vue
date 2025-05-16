<template>
	<view class="cookWrap">
		<view class="header_wrap">
			<image src="../../static/images/user/header_back.png" mode="" class="backimage"></image>
			<view class="header_center">
				定制食谱
			</view>
			<image src="../../static/images/user/list_icon.png" mode="" class="shareimage" @click="clickSel"></image>
		</view>
		<view class="cookCard">
			<view class="cookTitleWrap">
				<view class="cookTitleLeft">
					<image src="../../static/images/user/left.png" mode=""></image>
				</view>
				<view class="cookTitleBox">
					减脂食谱推荐
				</view>
				<view class="cookTitleRight">
					<image src="../../static/images/user/right.png" mode=""></image>
				</view>
			</view>
			<view class="cookWeekWrap">
				<CalendarTemp></CalendarTemp>
			</view>

			<view class="foodWrap">
				<view class="foodItem" v-for="(item, index) in foodData" :key="index">
					<view class="foodTop">
						<image src="../../static/images/user/zaocan.png" mode="" v-if="item.type === '早餐'"></image>
						<image src="../../static/images/user/wucan.png" mode="" v-if="item.type === '午餐'"></image>
						<image src="../../static/images/user/wancan.png" mode="" v-if="item.type === '晚餐'"></image>
						<text class="foodType">{{item.type}}</text>
						<text class="foodCount">建议热量{{item.hot}}千卡</text>
					</view>
					<view class="foodCenter" v-for="(m, i) in item.data" :key="i">
						<view class="foodBox">
							<view class="centerLeft">
								<image src="../../static/images/user/bread.webp" mode=""></image>
							</view>
							<view class="centerMiddle">
								<view class="centerName">
									{{m.name}}
								</view>
								<view class="centerNum">
									1个(100克)
								</view>
							</view>
							<view class="centerCount">
								<view class="centerCountVal">
									{{m.count}}千卡
								</view>

								<image src="../../static/images/user/shuaxin.png" mode="" class="refreshImg"></image>
							</view>

						</view>
					</view>
					<view class="foodAdd" @click="clickAdd(item)">
						<image src="../../static/images/user/make_add_icon.png" mode=""></image>
						<text>添加一个菜</text>
					</view>
				</view>

			</view>
			<view class="echartWrap">
				<view class="echartTitle">
					营养元素占比
				</view>
				<view class="echartBox">
					<view class="echartJZ">
						<text>减脂</text>
						<image src="../../static/images/user/jz_bg.png" mode=""></image>

					</view>
					<view class="pieEcharts">
						<view id="echartsDom">
							<ui-echarts ref="chart" :option="option" :height="`182rpx`"></ui-echarts>
						</view>
					</view>
					<view class="echartUl">
						<view class="echartItem" v-for="(item, index) in yyData" :key="index">
							<view class="itemColor" :style="{'background': item.color}">

							</view>
							<view class="itemName">
								{{item.name}}
							</view>
							<view class="itemCount">
								20%~30%
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 筛选弹窗 -->
		<uni-popup ref="popup" background-color="#fff">
			<ScreenPopTemp @closePop="closePop"></ScreenPopTemp>
		</uni-popup>
	</view>
</template>

<script>
	import CalendarTemp from '../../components/calendarTemp.vue';
	import ScreenPopTemp from '../../components/screenPop.vue';
	export default {
		components: {
			CalendarTemp,
			ScreenPopTemp
		},
		data() {
			return {
				foodData: [{
						type: '早餐',
						hot: '318kcal',
						data: [{
								name: '全麦面包',
								count: '60',
								scData: [{
										name: '面包',
										num: '125',
										hot: '89'
									},
									{
										name: '面粉',
										num: '125',
										hot: '89'
									},
								]
							},
							{
								name: '纯牛奶(低脂)',
								count: '200毫升',
								scData: [{
										name: '面包',
										num: '125',
										hot: '89'
									},
									{
										name: '面粉',
										num: '125',
										hot: '89'
									},
								]
							},
						],
					},
					{
						type: '午餐',
						hot: '318kcal',
						data: [{
								name: '全麦面包',
								count: '面包60g',
								scData: [{
										name: '面包',
										num: '125',
										hot: '89'
									},
									{
										name: '面粉',
										num: '125',
										hot: '89'
									},
								]
							},
							{
								name: '纯牛奶(低脂)',
								count: '200毫升',
								scData: [{
										name: '面包',
										num: '125',
										hot: '89'
									},
									{
										name: '面粉',
										num: '125',
										hot: '89'
									},
								]
							},
						],
					},
					{
						type: '晚餐',
						hot: '318kcal',
						data: [{
								name: '全麦面包',
								count: '面包60g',
								scData: [{
										name: '面包',
										num: '125',
										hot: '89'
									},
									{
										name: '面粉',
										num: '125',
										hot: '89'
									},
								]
							},
							{
								name: '纯牛奶(低脂)',
								count: '200毫升',
								scData: [{
										name: '面包',
										num: '125',
										hot: '89'
									},
									{
										name: '面粉',
										num: '125',
										hot: '89'
									},
								]
							},
						],

					}
				],
				yyData: [{
						name: '蛋白质',
						rate: '20%',
						value: '7.9',
						color: '#FFCC97'
					},
					{
						name: '脂肪',
						rate: '25%',
						value: '7.9',
						color: '#FF8C8A'
					},
					{
						name: '碳水化合物',
						rate: '25%',
						value: '7.9',
						color: '#AAACFF'
					},
					{
						name: '膳食纤维',
						rate: '30%',
						value: '7.9',
						color: '#F6E97B'
					},
				],
				option: {}
			}
		},
		onReady() {
			this.option = {
				color: ['#FFCC97', '#FF8C8A', '#AAACFF', '#F6E97B'],
				grid: {
					right: 'center'
				},
				title: {
					text: `{v|1048}\n{n|大卡}`,
					x: 'center',
					y: 'center',
					textStyle: {
						rich: {
							v: {
								fontFamily: 'Alibaba PuHuiTi',
								fontWeight: 500,
								fontSize: 21,
								color: '#313233',
							},
							n: {
								fontFamily: 'Source Han Sans CN',
								fontWeight: 400,
								fontSize: 12,
								color: '#666666',
							}
						}
					}
				},
				series: [{
					name: '营养元素占比',
					type: 'pie',
					radius: ['70%', '90%'],
					avoidLabelOverlap: false,
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: false,
							fontSize: 40,
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: this.yyData,
				}]
			}
		},
		methods: {
			clickAdd(data) {
				console.log('跳转添加菜品', data)
				uni.navigateTo({
					url: '/pages/addFood/addFood'
				});
			},
			closePop() {
				this.$refs.popup.close();
			},
			clickSel() {
				this.$refs.popup.open('bottom')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.area_wrap {
		background: #F7F7F7;
		font-family: PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #CCCCCC;
	}

	.cookWrap {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;

		.header_wrap {
			display: flex;
			width: 100%;
			padding: 116rpx 37rpx 30rpx;
			position: fixed;
			top: 0;
			left: 0;

			.backimage {
				width: 18rpx;
				height: 30rpx;
				margin-top: 8rpx;
				margin-right: 16rpx;
			}

			.header_center {
				width: calc(100% - 40rpx);
				text-align: left;
				font-family: PingFang SC;
				font-weight: 600;
				font-size: 34rpx;
				color: #000000;
			}

			.shareimage {
				width: 26rpx;
				height: 31rpx;
				margin-top: 15rpx;
			}
		}



		.cookCard {
			width: 100%;
			height: calc(100vh - 200rpx);
			overflow: auto;
			margin: 220rpx auto 0;
			padding: 0rpx 30rpx 69rpx;

			.cookTitleWrap {
				width: 100%;
				display: flex;
				margin-bottom: 20rpx;

				.cookTitleLeft,
				.cookTitleRight {
					width: 43rpx;
					height: 43rpx;
					line-height: 43rpx;
					text-align: center;

					image {
						width: 14rpx;
						height: 26rpx;
					}
				}

				.cookTitleBox {
					width: calc(100% - 86rpx);
					text-align: center;
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 32rpx;
					color: #202020;
				}
			}

			.echartWrap {
				width: 100%;
				margin-top: 22rpx;
				background: #FFFFFF;
				border-radius: 27rpx;
				padding: 30rpx;
				position: relative;

				.echartJZ {
					width: 94rpx;
					height: 45rpx;
					position: absolute;
					top: 0;
					right: 0;

					image {
						position: absolute;
						top: 0;
						right: 30rpx;
						width: 94rpx;
						height: 45rpx;
					}

					text {
						position: absolute;
						top: 8rpx;
						z-index: 99;
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 22rpx;
						color: #B5CF2D;
					}
				}


				.echartBox {
					width: 100%;
					display: flex;

					.pieEcharts {
						width: 40%;
						margin-right: 3%;

						.echartsDom {
							width: 100%;
							height: 182rpx;
						}
					}

					.echartUl {
						width: 57%;
					}

					.echartItem {
						width: 100%;
						display: flex;
						font-family: Source Han Sans CN;
						font-weight: 400;
						font-size: 23rpx;
						color: #666666;
						margin-bottom: 20rpx;

						.itemColor {
							width: 11rpx;
							height: 11rpx;
							background: #FFCC97;
							border-radius: 50%;
							margin-top: 10rpx;
							margin-right: 12rpx;
						}

						.itemName {
							width: calc(60% - 23rpx);
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}



						.itemCount {
							width: 40%;
							text-align: right;
						}
					}
				}

				.echartTitle {
					font-family: Source Han Sans CN;
					font-weight: 400;
					font-size: 28rpx;
					color: #000000;
					margin-bottom: 35rpx;
				}
			}

			.cookWeekWrap {
				width: 100%;
			}

			.foodWrap {
				width: 100%;

				.foodItem {
					padding: 35rpx 30rpx;
					background: #FFFFFF;
					border-radius: 27rpx;
					margin-bottom: 22rpx;


					.foodTop {
						margin-bottom: 50rpx;

						image {
							width: 38rpx;
							height: 38rpx;
							margin-right: 16rpx;
							vertical-align: middle;
						}

						.foodType {
							font-family: Source Han Sans CN;
							font-weight: 400;
							font-size: 32rpx;
							color: #000000;
							margin-right: 12rpx;
						}

						.foodCount {
							font-weight: 400;
							font-size: 26rpx;
							color: #BBBBBB;
							line-height: 30rpx;
						}
					}

					.foodAdd {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						padding-top: 32rpx;
						border-top: 1rpx solid #EBEBEB;

						image {
							width: 22rpx;
							height: 22rpx;
						}

						text {
							font-family: Source Han Sans CN;
							font-weight: 400;
							font-size: 28rpx;
							color: #B4CD34;
						}
					}

					.foodCenter {
						padding-bottom: 32rpx;

						.foodBox {
							display: flex;
						}



						.centerLeft {
							width: 83rpx;
							height: 83rpx;
							margin-right: 20rpx;

							image {
								width: 83rpx;
								height: 83rpx;
								border-radius: 28rpx;
							}
						}

						.centerMiddle {
							width: calc(100% - 283rpx);
							margin-right: 20rpx;

							.centerName {
								width: 100%;
								font-family: Source Han Sans CN;
								font-weight: 500;
								font-size: 28rpx;
								color: #000000;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								margin-bottom: 9rpx;
							}

							.centerNum {
								width: 100%;
								font-family: Source Han Sans CN;
								font-weight: 400;
								font-size: 24rpx;
								color: #666666;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}

						.centerCount {
							width: 160rpx;
							height: 83rpx;
							line-height: 83rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							font-size: 26rpx;
							color: #666666;
							text-align: right;
							display: flex;

							.centerCountVal {
								width: 140rpx;
								margin-right: 9rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.refreshImg {
								width: 31rpx;
								height: 28rpx;
								margin-top: 28rpx;
							}
						}
					}


				}
			}
		}
	}
</style>