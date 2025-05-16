<template>
	<view class="contrainer">
		<!-- 顶部搜索部分 -->
		<view class="topWrap">
			<view class="statusWrap">
				<uni-icons type="arrow-left" size="30" class="titleText"></uni-icons @click="backPage()">
				<text class="titleText">添加食物</text>
			</view>
			<view class="searchWrap">
				<uni-easyinput prefixIcon="search" v-model="keywords" placeholder="搜索食物"
					style='borderColor:transparent;'>
				</uni-easyinput>
			</view>

		</view>
		<view class="foodBox">
			<view class="foodItem" v-for="(item, index) in foodList" :key="index">
				<view class="foodLeft">
					<image src="../../static/images/user/bread.webp" mode=""></image>
				</view>
				<view class="foodCenter">
					<view class="foodName">
						{{item.name}}
					</view>
					<view class="foodCount">
						{{item.count}}
					</view>
				</view>
				<view class="foodRight">
					<view class="foodBtn" @click="clickSel(item)">
						选择
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords: '',
				foodList: [{
						name: '全麦面包',
						count: '1个'
					},
					{
						name: '黄油面包',
						count: '1个'
					},
					{
						name: '热狗面包',
						count: '1个'
					},
					{
						name: '草莓面包',
						count: '1个'
					},
					{
						name: '奶酪面包',
						count: '1个'
					},
					{
						name: '黄面包',
						count: '1个'
					},
					{
						name: '草莓面包',
						count: '1个'
					},
					{
						name: '奶酪面包',
						count: '1个'
					},
					{
						name: '黄面包',
						count: '1个'
					},
				]
			}
		},
		methods: {
			backPage() {
				uni.navigateBack();
			},
			clickSel(val) {
				console.log('点击选择', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .is-input-border {
		border-radius: 30px;
	}

	::v-deep .uniui-search {
		color: #BBD345 !important;
	}

	.contrainer {
		width: 100%;
		height: 100vh;
		background: #F7F7F7;
	}

	.topWrap {
		width: 100%;
		height: 330rpx;
		padding: 56rpx 35rpx 0;
		box-sizing: border-box;
		position: relative;



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

	.foodBox {
		width: calc(100% - 96rpx);
		height: calc(100vh - 438rpx);
		background: #ffffff;
		border-radius: 27rpx;
		padding: 18rpx 20rpx;
		margin: 0 32rpx;
		overflow: auto;

		.foodItem {
			width: 100%;
			display: flex;
			padding: 28rpx 0;
			border-bottom: 2rpx solid #F6F6F6;

			.foodLeft {
				width: 86rpx;
				margin-right: 33rpx;

				image {
					width: 86rpx;
					height: 86rpx;
					border-radius: 28rpx;
				}
			}

			.foodCenter {
				width: calc(100% - 236rpx);

				.foodName {
					width: 100%;
					height: 58rpx;
					font-weight: 500;
					font-size: 28rpx;
					line-height: 58rpx;
					color: #000000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.foodCount {
					width: 100%;
					height: 32rpx;
					font-weight: 400;
					font-size: 24rpx;
					color: #666666;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.foodRight {
				width: 117rpx;
				display: flex;
				align-items: center;

				.foodBtn {
					width: 117rpx;
					height: 54rpx;
					line-height: 54rpx;
					background: #FAFFE3;
					border-radius: 27rpx;
					color: #2A2A2A;
					font-size: 24rpx;
					text-align: center;
				}
			}
		}
	}
</style>