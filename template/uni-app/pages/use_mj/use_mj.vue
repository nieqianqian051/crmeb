<template>
	<view class="page_wrap">
		<view class="page_box">
			是否使用过麦吉减肥法？
		</view>
		<view class="btn_bottom">
			<view class="btn_item" @click="clickBtn(1)">
				否
			</view>
			<view class="btn_item active_btn" @click="clickBtn(2)">
				是
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
			clickBtn(type) {
				if (type === 2) {
					uni.navigateTo({
						url: 'pages/sex_birth/sex_birth'
					});
				}

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
		padding: 100rpx 80rpx;
		position: relative;

		.page_box {
			width: 100%;
			height: 65vh;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: PingFang SC;
			font-weight: 600;
			font-size: 37rpx;
			color: #333333;
		}

		.mt_ {
			margin-top: 91rpx;
		}





		.btn_bottom {
			width: 100%;
			padding: 0 80rpx;
			display: flex;
			position: absolute;
			bottom: 70rpx;
			left: 0;

			.btn_item {
				flex: 1;
				height: 81rpx;
				line-height: 81rpx;
				text-align: center;
				border-radius: 39rpx;
				border: 1px solid #C4D867;
				font-family: Source Han Sans CN;
				font-weight: 500;
				font-size: 26rpx;
				color: #C3D765;

				&:first-of-type {
					margin-right: 69rpx;
				}
			}

			.active_btn {
				background: linear-gradient(90deg, #C3D765, #C4D867) !important;
				color: #ffffff !important;
			}

		}
	}
</style>