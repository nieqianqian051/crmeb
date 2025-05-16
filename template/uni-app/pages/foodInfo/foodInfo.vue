<template>
	<view class="contrainer">
		<view class="bgImg">
			<image src="../../static/images/user/food_info_bg.png" mode=""></image>
		</view>
		<!-- 顶部搜索部分 -->
		<view class="topWrap">
			<view class="statusWrap">
				<uni-icons type="arrow-left" size="30" class="titleText"></uni-icons>
				<text class="titleText">食物详情</text>
			</view>

		</view>
		<!-- 内容 -->
		<view class="page_box">
			<view class="foodBox card_wrap">
				<view class="centerLeft">
					<image src="../../static/images/user/bread.webp" mode=""></image>
				</view>
				<view class="centerMiddle">
					<view class="centerName">
						芹菜炒豆芽
					</view>
					<view class="centerNum">
						半盘(100克)
					</view>
				</view>
				<view class="centerCount">
					<view class="centerCountVal">
						198千卡
					</view>

				</view>

			</view>
			<view class="echartWrap card_wrap">
				<view class="cardTitle">
					营养元素占比
				</view>
				<view class="echartBox">
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
							<view class="itemRate">
								{{item.rate}}
							</view>
							<view class="itemCount">
								{{item.value}}克
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="kgWrap card_wrap">
				<view class="cardTitle">
					重量估算
				</view>
				<view class="kgBox">
					<view class="kgUl kgHeader">
						<view class="kgItem">
							食材
						</view>
						<view class="kgItem">
							重量
						</view>
						<view class="kgItem">
							热量
						</view>
					</view>
					<view class="kgUl kgMain" v-for="(item, index) in kgData" :key="index">
						<view class="kgItem">
							<image src="../../static/images/user/food_info_kg.png" mode="" class="kg_img"></image>
							{{item.name}}
						</view>
						<view class="kgItem">
							{{item.count}}
						</view>
						<view class="kgItem">
							{{item.hot}}
						</view>
					</view>
				</view>
			</view>
			<view class="plWrap card_wrap">
				<view class="cardTitle">
					所需食材配料
				</view>
				<view class="plLabel">
					主要原料
				</view>
				<view class="plLi" v-for="(item, index) in pLData" :key="index">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				option: {},
				kgData: [{
						name: '芹菜',
						count: '125',
						hot: '129'
					},
					{
						name: '芹菜',
						count: '125',
						hot: '129'
					},
				],
				pLData: [{
						name: '芹菜',

					},
					{
						name: '豆芽',

					},
				]
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

		}
	}
</script>

<style lang="scss" scoped>
	.contrainer {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		padding-bottom: 50rpx;
		background: #F7F7F7;
		position: relative;
	}

	.card_wrap {
		padding: 37rpx 30rpx;
		background: #FFFFFF;
		border-radius: 27rpx;
		margin-bottom: 21rpx;
	}

	.page_box {
		width: 100%;
		height: calc(100vh - 220rpx);
		overflow: auto;
		padding: 0 32rpx;
		position: absolute;
		top: 200rpx;

		.plWrap {
			width: 100%;

			.plLabel {
				font-family: Source Han Sans CN;
				font-weight: 400;
				font-size: 26rpx;
				color: #999999;
			}

			.plLi {
				padding: 30rpx 0;
				font-family: Source Han Sans CN;
				font-weight: 400;
				font-size: 26rpx;
				color: #2B2B2B;
			}
		}

		.kgWrap {
			width: 100%;

			.kgBox {
				width: 100%;

				.kgHeader {
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 26rpx;
					color: #2B2B2B;
				}

				.kgMain {
					font-family: Source Han Sans CN;
					font-weight: 400;
					font-size: 26rpx;
					color: #757575;

					&:nth-of-type(even) {
						background: #F9F9F9;
						border-radius: 4rpx;
					}
				}

				.kgUl {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.kgItem {
						flex: 1;
						padding: 31rpx 10rpx;
						text-align: center;

						.kg_img {
							width: 16rpx;
							height: 16rpx;
							margin-right: 20rpx;
							vertical-align: middle;
						}

						&:not(:last-of-type) {
							margin-right: 20rpx;
						}
					}
				}
			}
		}

		.echartWrap {
			width: 100%;


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

					.itemRate {
						width: 20%;
						text-align: center;
					}

					.itemCount {
						width: 20%;
						text-align: right;
					}
				}
			}


		}


		.cardTitle {
			font-family: Source Han Sans CN;
			font-weight: 400;
			font-size: 28rpx;
			color: #000000;
			margin-bottom: 35rpx;
		}

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

		}

	}

	.bgImg {
		width: 100%;
		height: 378rpx;
		position: absolute;
		top: 0;
		left: 0;

		image {
			width: 100%;
		}
	}

	.topWrap {
		width: 100%;
		height: 120rpx;
		padding: 56rpx 35rpx 0;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		// background: url('../../static/images/user/food_info_bg.png')no-repeat;


		.topBgImg {
			width: 100%;
			height: 378rpx;

		}

		.statusWrap {
			font-weight: 400;
			font-size: 36rpx;
			color: #000000;

			.titleText {
				vertical-align: middle;
			}
		}

		.searchWrap {
			width: 100%;
			padding-top: 50rpx;

			.uni-input {
				height: 69rpx;
				background: pink;
				border-radius: 34rpx;
				margin-top: 29rpx;
			}
		}

		.topTitle {
			width: calc(100% - 70rpx);
			font-family: Source Han Sans CN;
			font-weight: 400;
			font-size: 32rpx;
			color: #333333;
			margin-top: 39rpx;
			text-align: center;

			.activeText {
				color: #BBD345;
			}
		}


	}
</style>