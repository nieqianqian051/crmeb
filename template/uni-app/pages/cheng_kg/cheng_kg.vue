<template>
	<view class="page_wrap">
		<view class="page_text">
			在体重数值稳定前，请不要乱动哦～
		</view>
		<view class="kg_wrap">
			<image src="../../static/images/user/cheng_bg.png" mode="" class="bgImg"></image>
			<view class="kg_val">
				58.6
			</view>
			<view class="f">
				体重(kg)
			</view>
		</view>
		<view class="circle_wrap1">

		</view>
		<view class="circle_wrap2">

		</view>
		<view class="circle_wrap3">

		</view>
		<image src="../../static/images/user/cheng.png" mode="" class="chengImg"></image>
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
		padding: 100rpx 140rpx;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;


		.circle_wrap1 {
			width: 32rpx;
			height: 32rpx;
			background: #C8E53F;
			border-radius: 50%;
			margin-bottom: 16rpx;
		}

		.circle_wrap2 {
			width: 20rpx;
			height: 20rpx;
			background: #C8E53F;
			border-radius: 50%;
			opacity: 0.68;
			margin-bottom: 16rpx;
		}

		.circle_wrap3 {
			width: 12rpx;
			height: 12rpx;
			background: #C8E53F;
			border-radius: 50%;
			opacity: 0.51;
			margin-bottom: 177rpx;
		}


		.kg_wrap {
			width: 471rpx;
			height: 468rpx;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin: 63rpx 0;

			.bgImg {
				width: 471rpx;
				height: 468rpx;
				position: absolute;
				top: 0;
				left: 0;
			}

			.kg_val {
				font-family: Reeji-CloudZongYi- GBK;
				font-weight: 400;
				font-size: 110rpx;
				color: #262626;
			}

			.kg_label {
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #262626;
				margin-top: 32rpx;
			}
		}

		.page_text {
			font-family: PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #333333;
			margin-top: 60rpx;

		}

		.chengImg {
			width: 385rpx;
			height: 34rpx;
		}
	}
</style>