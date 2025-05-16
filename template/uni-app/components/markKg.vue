<template>
	<view class="mark_wrap">
		<view class="mark_title_wrap">
			<view class="mark_title_main">
				今天
			</view>
			<view class="mark_title_close" @click="closePop">
				<image src="../static/images/user/close_mark.png" mode=""></image>
			</view>
		</view>
		<view class="tzc_wrap">
			<view class="tzc_left">
				<image src="../static/images/user/dianzicheng.png" mode=""></image>
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
				<image src="../static/images/user/jiantouarrowhead7.png" mode=""></image>
			</view>
		</view>
		<view class="calliper_wrap">
			<view class="page_text mt_">
				{{kgGlucose}} <text class="page_unit">kg</text>
			</view>
			<view class="page_item ">
				<x-calliper @scroll="kgScroll" :scrollStart="30" :scrollEnd="200" :scrollLeft="kgGlucose" :maginL="10"
					:is-int="false"></x-calliper>
			</view>
		</view>
		<view class="mark_tips_kg">
			体重记录有缺失，点我去补录
			<image src="../static/images/user/icon_shuangjiantou-you.png" mode=""></image>
		</view>
		<view class="mark_title">
			尿酮检测
		</view>
		<view class="mark_color_wrap">
			<view class="mark_colot_item" :style="{background: item.color}" v-for="(item, index) in colorData"
				:key="index">

			</view>
		</view>
		<view class="sure_btn" @click="saveFunc">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		name: "markKg",
		data() {
			return {
				kgGlucose: 45.1,
				colorData: [{
						color: '#ECCD85'
					},
					{
						color: '#C27652'
					},
					{
						color: '#B45B5C'
					},
					{
						color: '#AD002D'
					},
					{
						color: '#7A1013'
					},
					{
						color: '#5D181F'
					},
				]
			};
		},
		methods: {
			saveFunc() {
				this.$emit('closePop');
			},
			kgScroll(val) {
				this.kgGlucose = val;
			},
			clickBind() {},
			closePop() {
				this.$emit('closePop');
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .middleLine {
		background: #C6DE4B;
	}

	.mark_wrap {
		width: 100%;
		padding: 38rpx 30rpx;

		.sure_btn {
			width: 367rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background: linear-gradient(90deg, #BED84F, #BFD952);
			border-radius: 39rpx;
			font-family: PingFang SC;
			font-weight: 500;
			font-size: 28rpx;
			color: #FFFFFF;
			margin: 0 auto;
		}

		.mark_color_wrap {
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-bottom: 74rpx;

			.mark_colot_item {
				width: 90rpx;
				height: 90rpx;
				background: #ECCD85;
				border-radius: 18rpx;
			}
		}

		.mark_title {
			font-family: PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #000000;
			margin-bottom: 44rpx;
		}

		.mark_tips_kg {
			width: 100%;
			text-align: center;
			margin-bottom: 68rpx;
			font-family: PingFang SC;
			font-weight: 400;
			font-size: 26rpx;
			color: #B5D40D;

			image {
				width: 18rpx;
				height: 17rpx;
				margin-left: 6rpx;
			}
		}

		.calliper_wrap {
			width: 100%;
			margin-bottom: 50rpx;

			.page_item {
				padding: 40rpx 0 0rpx;
			}

			.mt_ {
				margin-top: 91rpx;
			}

			.page_text {
				width: 100%;
				font-family: PingFang SC;
				font-weight: 500;
				font-size: 60rpx;
				color: #C6DE4B;
				text-align: center;
				margin-bottom: 15rpx;

				.page_unit {
					font-size: 34rpx;
					margin-left: 10rpx;
				}
			}
		}

		.tzc_wrap {
			width: 100%;
			padding: 28rpx;
			background: #F9FFE0;
			border-radius: 23rpx;
			display: flex;
			align-items: center;
			margin-bottom: 69rpx;

			.tzc_left {
				width: 88rpx;
				margin-right: 20rpx;

				image {
					width: 88rpx;
					height: 88rpx;
				}
			}

			.tzc_center {
				width: calc(100% - 154rpx);
				margin-right: 20rpx;

				.tzc_label {
					font-family: PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #2A2A2A;
					line-height: 39rpx;
				}

				.tzc_val {
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #868686;
					line-height: 39rpx;

					text {
						margin-left: 20rpx;
					}
				}
			}

			.tzc_right {
				width: 17rpx;

				image {
					width: 17rpx;
					height: 31rpx;
				}
			}
		}



		.mark_title_wrap {
			display: flex;
			margin-bottom: 59rpx;

			.mark_title_main {
				width: calc(100% - 20rpx);
				text-align: center;
				font-family: PingFang SC;
				font-weight: 500;
				font-size: 28rpx;
				color: #363636;
			}

			.mark_title_close {
				width: 20rpx;
				height: 20rpx;

				image {
					width: 20rpx;
					height: 20rpx;
				}
			}
		}
	}
</style>