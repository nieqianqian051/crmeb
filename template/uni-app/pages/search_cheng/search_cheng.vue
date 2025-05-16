<template>
	<view class="page_wrap">
		<view class="circle_wrap1">
			<view class="circle_wrap2"></view>
			<view class="circle_wrap3"></view>
			<view class="text_1">
				正在搜索设备...
			</view>
			<view class="text_2">
				请先把秤踩亮保持屏幕长亮
			</view>
			<image src="../../static/images/user/pm_cheng.png" mode="" class="pmImg"></image>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.page_wrap {
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
		padding: 100rpx 0;
		position: relative;

		.text_1 {
			position: absolute;
			top: 50rpx;
			left: 50%;
			transform: translateX(-50%);
			font-family: PingFang SC;
			font-weight: 500;
			font-size: 32rpx;
			color: #000000;
		}

		.text_2 {
			position: absolute;
			top: 220rpx;
			left: 50%;
			transform: translateX(-50%);
			font-family: PingFang SC;
			font-weight: 500;
			font-size: 26rpx;
			color: #BBD345;
		}

		.circle_wrap1 {
			width: 880rpx;
			height: 880rpx;
			border-radius: 50%;
			border: 1px solid #BBD345;
			// opacity: 0.36;
			position: relative;
			left: -65rpx;

		}

		.circle_wrap2 {
			width: 550rpx;
			height: 550rpx;
			border-radius: 50%;
			border: 1px solid #BBD345;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}

		.circle_wrap3 {
			width: 320rpx;
			height: 320rpx;
			border-radius: 50%;
			border: 1px solid #BBD345;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}

		.pmImg {
			width: 441rpx;
			height: 250rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>