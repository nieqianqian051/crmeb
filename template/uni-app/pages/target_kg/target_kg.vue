<template>
	<view class="page_wrap">
		<view class="page_title">
			目标体重
		</view>
		<view class="page_text mt_">
			{{kgGlucose}} <text class="page_unit">kg</text>
		</view>
		<view class="page_item ">
			<x-calliper @scroll="kgScroll" :scrollStart="30" :scrollEnd="200" :scrollLeft="kgGlucose" :maginL="10"
				:is-int="false"></x-calliper>
		</view>
		<view class="btn_bottom" @click="clickNext()">
			<image src="../../static/images/user/sanjiaoxing.png" mode=""></image>
			<view class="btn_text">
				还差一步了
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kgGlucose: 45.1,
			}
		},
		methods: {
			clickNext() {
				uni.navigateTo({
					url: 'pages/sex_birth/sex_birth'
				});
			},
			kgScroll(val) {
				this.kgGlucose = val;
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .middleLine {
		background: #C6DE4B;
	}

	.page_wrap {
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
		padding: 100rpx 0rpx;
		position: relative;

		.page_title {
			font-family: PingFang SC;
			font-weight: 600;
			font-size: 34rpx;
			color: #000000;
			padding: 0 47rpx;
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

		.page_item {
			padding: 50rpx 0 0rpx;
			background: #F9F9F9;
		}

		.btn_bottom {
			width: 100%;
			position: absolute;
			bottom: 70rpx;
			left: 0;
			text-align: center;

			image {
				width: 34rpx;
				height: 25rpx;
				margin-bottom: 33rpx;
			}

			.btn_text {
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #2A2A2A;
			}
		}
	}
</style>