<template>
	<view class="page_wrap">
		<view class="top_wrap">
			<view class="top_handle">
				<image src="../../static/images/user/money_icon.png" mode=""></image>
				<image src="../../static/images/user/search_icon.png" mode=""></image>
				<image src="../../static/images/user/message_icon.png" mode=""></image>
			</view>
			<view class="top_start">
				<text>开启麦吉之旅</text>
				<image src="../../static/images/user/right-arrow.png" mode=""></image>
			</view>
			<view class="top_box">
				<view class="top_left">
					<view class="top_label">
						当前体重(kg)
					</view>
					<view class="top_val">
						56.5
					</view>
				</view>
				<view class="top_center">
					<l-circularProgress :boxWidth="120" :boxHeight="120" bgColor="#EDF5EF" progressColor="#C0DF17"
						:lineWidth="6" :fontShow="false" gradualColor="#C0DF17" :percent="90" style="z-index:1;">

					</l-circularProgress>
					<view class="progress_text">
						<view class="text_val">2.5</view>
						<view class="text_label">已减体重(kg)</view>
					</view>
				</view>
				<view class="top_right">
					<view class="top_label">
						目标体重(kg)
					</view>
					<view class="top_val">
						56.5
					</view>
				</view>
			</view>
			<view class="top_botton" @click="clicKg()">
				<text>记录体重</text>
				<image src="../../static/images/user/jiantou-11.png" mode=""></image>
			</view>
		</view>
		<view class="page_box">
			<view class="tzc_wrap">
				<view class="tzc_left">
					<image src="../../static/images/user/tzc_icon.png" mode=""></image>
				</view>
				<view class="tzc_center">
					<view class="tzc_label">
						立即绑定体脂秤
					</view>
					<view class="tzc_val">
						你还没有绑定体脂秤，快去绑定吧~
					</view>
				</view>
				<view class="tzc_right" @click="clickBind()">
					<image src="../../static/images/user/right_jt.png" mode=""></image>
				</view>
			</view>
			<view class="ys_wrap">
				<view class="ys_top_wrap">
					<image src="../../static/images/user/ysjl_icon.png" mode="" class="top_icon"></image>
					<view class="ys_top_label">
						饮食记录
					</view>
					<view class="ys_top_right" @click="clickBind()">
						<image src="../../static/images/user/right_jt.png" mode=""></image>
					</view>
				</view>
				<view class="ys_box">
					<view class="ys_item">
						<view class="ys_item_label">
							已摄入
						</view>
						<view class="ys_item_val">
							428 <text class="ys_item_unit">cal</text>
						</view>
					</view>
					<view class="ys_item">
						<view class="ys_item_label">
							建议摄入
						</view>
						<view class="ys_item_val ys_gray">
							1733 <text class="ys_item_unit">cal</text>
						</view>
					</view>
					<view class="ys_item ys_item_two">
						<l-circularProgress :boxWidth="80" :boxHeight="80" bgColor="#EDF5EF" progressColor="#C0DF17"
							:lineWidth="6" gradualColor="#C0DF17" :percent="90" fontColor="#484848" :fontSize="18"
							style="z-index:1;">

						</l-circularProgress>
					</view>
				</view>
			</view>
			<view class="tzc_wrap">
				<view class="tzc_left">
					<image src="../../static/images/user/jkda_icon.png" mode=""></image>
				</view>
				<view class="tzc_center">
					<view class="tzc_label">
						健康档案
					</view>
					<view class="tzc_val">
						上次记录
						<text>
							6天前
						</text>

					</view>
				</view>
				<view class="tzc_right" @click="clickBind()">
					<image src="../../static/images/user/right_xia.png" mode=""></image>
				</view>
			</view>
			<view class="title_text">
				热门瘦身计划
			</view>
			<!-- scroll-x="true" scroll-left="120" -->
			<scroll-view class="hot_wrap" scroll-x="true" scroll-left="120">
				<view class="hot_one">

					<image src="../../static/images/user/ss_text1.png" mode="" class="hot_one_img"></image>
					<view class="hot_one_text">
						减肥达人必看
					</view>
					<image src="../../static/images/user/ss_play.png" mode="" class="hot_one_play"></image>
				</view>
				<view class="hot_two">
					<image src="../../static/images/user/hot_two.png" mode="" class="hot_two_bg"></image>
					<view class="hot_message">
						<image src="../../static/images/user/hot_message.png" mode="" class="hot_message_bg"></image>
						<text>新消息 99+</text>
					</view>
					<view class="hot_two_text">
						<text>进入群聊</text>
						<image src="../../static/images/user/two_right.png" mode=""></image>
					</view>
					<view class="hot_two_num">
						<image src="../../static/images/user/hot_people.png" mode=""></image>
						<text>286人热聊中</text>
					</view>
				</view>
				<view class="hot_two">
					<image src="../../static/images/user/hot_three.png" mode="" class="hot_two_bg"></image>
					<view class="hot_message">
						<image src="../../static/images/user/hot_message.png" mode="" class="hot_message_bg"></image>
						<text>新消息 99+</text>
					</view>
					<view class="hot_two_text" style="background: rgba(159,83,20,0.1);">
						<text style="color: #9F5314;">进入群聊</text>
						<image src="../../static/images/user/three_right.png" mode=""></image>
					</view>
					<view class="hot_two_num">
						<image src="../../static/images/user/hot_people.png" mode=""></image>
						<text>286人热聊中</text>
					</view>
				</view>
				<view class="hot_two">
					<image src="../../static/images/user/hot_fore.png" mode="" class="hot_two_bg"></image>
					<view class="hot_message">
						<image src="../../static/images/user/hot_message.png" mode="" class="hot_message_bg"></image>
						<text>新消息 99+</text>
					</view>
					<view class="hot_two_text" style="background: rgba(126,95,0,0.1);">
						<text style="color: #7E5F00;">进入群聊</text>
						<image src="../../static/images/user/fore_right.png" mode=""></image>
					</view>
					<view class="hot_two_num">
						<image src="../../static/images/user/hot_people.png" mode=""></image>
						<text>286人热聊中</text>
					</view>
				</view>
			</scroll-view>
			<!-- </scroll-view> -->

			<view class="title_text">
				减肥知识库
			</view>
			<view class="card_wrap">
				<view class="card_item" v-for="(item, index) in cardData" :key="index">
					<view class="card_left">
						<image :src="item.icon" mode=""></image>
					</view>
					<view class="card_right">
						<view class="card_label">
							{{item.label}}
						</view>
						<view class="card_val">
							{{item.val}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 记录体重 -->
		<uni-popup ref="popup" type="bottom" background-color="#fff" border-radius="20px 20px 0 0" @change="change">
			<markKgVue @closePop="closePop"></markKgVue>
		</uni-popup>
	</view>
</template>

<script>
	import markKgVue from '../../components/markKg.vue';
	const sszs = require('../../static/images/user/sszs_icon.png');
	const sccx = require('../../static/images/user/sccx_icon.png');
	const gfjf = require('../../static/images/user/gfjf_icon.png');
	const ssdr = require('../../static/images/user/ssdr_icon.png');
	export default {
		components: {
			markKgVue,
		},
		data() {
			return {
				cardData: [{
					icon: sszs,
					label: '瘦身知识',
					val: '麦吉减肥库'
				}, {
					icon: sccx,
					label: '食材查询',
					val: '卡路里挑选必备'
				}, {
					icon: gfjf,
					label: '官方减肥餐',
					val: '跟着吃就能瘦'
				}, {
					icon: ssdr,
					label: '瘦身达人',
					val: '减肥里不平凡的你'
				}, ],

			}
		},
		methods: {
			closePop() {
				this.$refs.popup.close()
			},
			clicKg() {
				console.log('点击记录体重---')
				this.$refs.popup.open('bottom')
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			clickBind() {}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .middleLine {
		background: #C6DE4B;
	}

	.page_wrap {
		width: 100%;
		height: 100%;
		background-color: #F6F6F6;
		position: relative;

		.page_box {
			margin: 0 32rpx;
		}

		.hot_wrap {
			width: 100%;
			white-space: nowrap;


			.hot_two {
				display: inline-block;
				width: 250rpx;
				height: 308rpx;
				background: rgba(252, 243, 216, 0.39);
				border-radius: 28rpx;
				padding: 32rpx 28rpx;
				position: relative;
				margin-right: 24rpx;
				vertical-align: top;

				.hot_message {
					position: absolute;
					top: 0;
					right: 0;
					width: 145rpx;
					height: 47rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 22rpx;
						color: #FFFFFF;
						z-index: 99;
					}

					.hot_message_bg {
						width: 145rpx;
						height: 47rpx;
						position: absolute;
						top: 0;
						right: 0;


					}

				}

				.hot_two_num {
					position: absolute;
					bottom: 30rpx;

					text {
						font-family: Source Han Sans CN;
						font-weight: 400;
						font-size: 29rpx;
						color: #2D7452;
						margin-left: 12rpx;
					}

					image {
						width: 29rpx;
						height: 21rpx;
					}
				}

				.hot_two_text {
					width: 144rpx;
					height: 44rpx;
					background: rgba(45, 116, 82, 0.1);
					border-radius: 5rpx;
					position: absolute;
					top: 170rpx;
					padding-left: 12rpx;


					text {
						font-family: Source Han Sans CN;
						font-weight: 400;
						font-size: 24rpx;
						color: #2D7452;
					}

					image {
						width: 15rpx;
						height: 15rpx;
						margin-left: 10rpx;
					}
				}

				.hot_two_bg {
					width: 250rpx;
					height: 308rpx;
					position: absolute;
					top: 0;
					left: 0;
				}
			}

			.hot_one {
				display: inline-block;
				width: 250rpx;
				height: 308rpx;
				background: rgba(252, 243, 216, 0.39);
				border-radius: 28rpx;
				padding: 32rpx 28rpx;
				margin-right: 24rpx;
				vertical-align: top;

				.hot_one_img {
					width: 194rpx;
					height: 90rpx;
				}

				.hot_one_text {
					font-family: Source Han Sans CN;
					font-weight: 400;
					font-size: 22rpx;
					color: #666666;
					margin: 9rpx 0 16rpx;
				}

				.hot_one_play {
					width: 90rpx;
					height: 90rpx;
				}
			}
		}

		.card_wrap {
			width: 100%;
			display: flex;
			flex-wrap: wrap;




			.card_item {
				width: 49%;
				padding: 35rpx 28rpx;
				background: #ffffff;
				border-radius: 24rpx;
				margin-bottom: 24rpx;
				display: flex;

				&:nth-of-type(odd) {
					margin-right: 2%;
				}

				.card_left {
					width: 76rpx;
					height: 76rpx;
					margin-right: 20rpx;

					image {
						width: 76rpx;
						height: 76rpx;
					}
				}

				.card_right {
					width: calc(100% - 96rpx);

					.card_label {
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 28rpx;
						color: #484848;
						line-height: 45rpx;
					}

					.card_val {
						font-family: Source Han Sans CN;
						font-weight: 400;
						font-size: 22rpx;
						color: #999999;
					}
				}
			}
		}

		.title_text {
			font-family: Source Han Sans CN;
			font-weight: 500;
			font-size: 32rpx;
			color: #484848;
			line-height: 60rpx;
			margin: 36rpx 0;
		}

		.ys_wrap {
			width: 100%;
			padding: 28rpx;
			background: #ffffff;
			border-radius: 28rpx;
			margin-top: 24rpx;

			.ys_box {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.ys_item_two {
					display: flex;
					justify-content: flex-end;
				}

				.ys_item {
					flex: 1;

					.ys_item_label {
						font-family: Source Han Sans CN;
						font-weight: 400;
						font-size: 22rpx;
						color: #666666;
						margin-bottom: 11rpx;
					}

					.ys_gray {
						color: #666666 !important;
					}

					.ys_item_val {
						font-family: DINPro-Medium;
						font-weight: 400;
						font-size: 52rpx;
						color: #484848;

						.ys_item_unit {
							font-family: Source Han Sans CN;
							font-weight: 400;
							font-size: 24rpx;
							color: #484848;
						}
					}
				}
			}

			.ys_top_wrap {
				width: 100%;
				display: flex;
				margin-bottom: 47rpx;

				.top_icon {
					width: 32rpx;
					height: 32rpx;
					margin-right: 16rpx;
					margin-top: 6rpx;
				}

				.ys_top_label {
					width: calc(100% - 72rpx);
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 28rpx;
					color: #484848;
				}

				.ys_top_right {
					width: 24rpx;

					image {
						width: 24rpx;
						height: 24rpx;
					}
				}
			}
		}

		.tzc_wrap {
			width: 100%;
			padding: 28rpx;
			background: #ffffff;
			border-radius: 28rpx;
			display: flex;
			align-items: center;
			margin-top: 24rpx;

			.tzc_left {
				width: 90rpx;
				margin-right: 20rpx;

				image {
					width: 90rpx;
					height: 90rpx;
				}
			}

			.tzc_center {
				width: calc(100% - 154rpx);
				margin-right: 20rpx;

				.tzc_label {
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 28rpx;
					color: #484848;
					line-height: 39rpx;
				}

				.tzc_val {
					font-family: Source Han Sans CN;
					font-weight: 400;
					font-size: 22rpx;
					color: #999999;
					line-height: 39rpx;

					text {
						margin-left: 20rpx;
					}
				}
			}

			.tzc_right {
				width: 24rpx;

				image {
					width: 24rpx;
					height: 24rpx;
				}
			}
		}

		.top_wrap {
			width: 100%;
			padding: 116rpx 37rpx 60rpx;
			background: #ffffff;
			border-radius: 28rpx;

			.top_botton {
				width: 212rpx;
				height: 82rpx;
				background: linear-gradient(186deg, #BDDD0E, #C0DF17);
				box-shadow: 0rpx 14rpx 21rpx 0rpx rgba(199, 229, 68, 0.16);
				border-radius: 15rpx;
				margin: 30rpx auto 0;
				text-align: center;
				line-height: 82rpx;

				text {
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 28rpx;
					color: #323232;
				}

				image {
					width: 25rpx;
					height: 17rpx;
					margin-left: 8rpx;
				}
			}

			.top_box {
				width: 100%;
				display: flex;

				.top_left,
				.top_right {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.top_label {
						font-family: PingFangSC;
						font-weight: 400;
						font-size: 24rpx;
						color: #333333;
						margin-bottom: 6rpx;
					}

					.top_val {
						font-family: PingFangSC;
						font-weight: 400;
						font-size: 48rpx;
						color: #333333;
					}
				}

				.top_center {
					width: 270rpx;
					height: 270rpx;
					border-radius: 50%;
					border: 2rpx dashed #EDF5EF;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;

					.progress_text {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);

						.text_label {
							font-family: PingFangSC;
							font-weight: 400;
							font-size: 22rpx;
							color: #333333;
							margin-bottom: 20rpx;
						}

						.text_val {
							font-weight: 400;
							font-size: 72rpx;
							color: #333333;
						}
					}
				}
			}

			.top_start {
				width: 212rpx;
				height: 57rpx;
				background: #F6F9DE;
				border-radius: 0 30rpx 30rpx 0;
				font-family: Source Han Sans CN;
				font-weight: 400;
				font-size: 24rpx;
				color: #A4C108;
				text-align: center;
				line-height: 57rpx;
				margin-left: -37rpx;

				image {
					width: 10rpx;
					height: 19rpx;
					margin-left: 12rpx;
				}
			}

			.top_handle {
				width: 100%;
				display: flex;
				justify-content: flex-end;

				image {
					width: 42rpx;
					height: 42rpx;

					&:not(:last-of-type) {
						margin-right: 30rpx;
					}
				}
			}
		}
	}
</style>