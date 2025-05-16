<template>
	<view class="page_wrap">
		<view class="header_wrap">
			<image src="../../static/images/user/header_back.png" mode="" class="backimage"></image>
			<view class="header_center">
				动态详情
			</view>
			<image src="../../static/images/user/header_share.png" mode="" class="shareimage"></image>
		</view>
		<view class="page_main">
			<view class="top_info">

				<view class="user_wrap">
					<image src="../../static/images/user/header.webp" mode="" class="user_left"></image>
					<view class="user_center">
						<view class="user_name">
							春暖花开的bo
						</view>
						<view class="user_time">
							2024-05-21 09:20:30
						</view>
					</view>
					<view class="user_right">
						关注
					</view>
				</view>
				<view class="user_article">
					<view class="article_main">
						<view class="tag_wrap">
							<image src="../../static/images/user/huati_diy.png" alt="">
								<text>话题标签</text>
						</view>
						<text>
							放眼欧洲，西班牙、爱尔兰、挪威为何能走在本轮承认巴勒斯坦国的队伍前列？综合舆论观点，历史因素或从中发挥很大作用。
						</text>
					</view>
					<view class="article_media">
						<!-- 图片最多显示两个 -->
						<image :src="item" alt="" v-for="(item, index) in numList" :key="index"
							:class="numList.length>1?'twoimage':'oneimage'" />
						<!-- 也可能是视频 -->
						<!-- <video class="fullscreenvideo"
			               muted="muted">
			          <source src=""
			                  type="video/mp4" />
			        </video> -->
					</view>
					<view class="article_handle">
						<view class="handle_left">
							<image src="../../static/images/user/zhuanfa.png" alt="" @click="clickHandle(1)">
								<text>11</text>
								<image src="../../static/images/user/pinglun.png" alt="" @click="clickHandle(2)">
									<text>11</text>
									<image src="../../static/images/user/dianzan.png" alt="" @click="clickHandle(3)"
										v-if="!isStart">
										<image src="../../static/images/user/dianzai_xuanzhong.png" alt=""
											@click="clickHandle(3)" v-else>
											<text>11</text>
											<image src="../../static/images/user/shoucang.png" alt=""
												@click="clickHandle(4)" v-if="!isCollect">
												<image src="../../static/images/user/shoucang_xuanzhong.png" alt=""
													@click="clickHandle(4)" v-else>
													<text>11</text>
						</view>

					</view>
				</view>
			</view>
			<view class="chat_info">
				<view class="chat_top">
					<view class="chat_top_left">
						全部评论
					</view>
					<view class="chat_top_right">
						<view class="header_top_wrap">
							<!-- 只显示前8人 -->
							<image src="../../static/images/user/header.webp" alt="">
								<image src="../../static/images/user/header.webp" alt="">
									<image src="../../static/images/user/header.webp" alt="">
										<image src="../../static/images/user/header.webp" alt="">
						</view>
						<view class="header_nums" :style="{color: numColor}">12点赞</view>
					</view>
				</view>
				<!-- 评论列表 -->
				<view class="chat_box">
					<commentChatVue></commentChatVue>
				</view>
			</view>
		</view>
		<!-- 底部操作栏 -->
		<view class="handle_wrap">
			<view class="handle_item">
				<image src="../../static/images/user/zhuanfa.png" alt="" @click="clickAllHandle(1)">
					<text>11</text>
			</view>
			<view class="handle_item">
				<image src="../../static/images/user/pinglun.png" alt="" @click="clickAllHandle(2)">
					<text>11</text>
			</view>
			<view class="handle_item">
				<image src="../../static/images/user/dianzan.png" alt="" @click="clickAllHandle(3)" v-if="!isAllStart">
					<image src="../../static/images/user/dianzai_xuanzhong.png" alt="" @click="clickAllHandle(3)"
						v-else>
						<text>11</text>
			</view>
			<view class="handle_item">
				<image src="../../static/images/user/shoucang.png" alt="" @click="clickAllHandle(4)"
					v-if="!isAllCollect">
					<image src="../../static/images/user/shoucang_xuanzhong.png" alt="" @click="clickAllHandle(4)"
						v-else>
						<text>11</text>
			</view>
		</view>
	</view>
</template>

<script>
	import commentChatVue from '../../components/commentChat.vue';
	const img1 = require('../../static/images/user/sports.png')
	export default {
		components: {
			commentChatVue,
		},
		data() {
			return {
				numList: [
					img1,
					img1,
				],
				isStart: false,
				isCollect: false,
				numColor: '',
				isAllStart: false,
				isAllCollect: false,
			}
		},
		methods: {
			clickAllHandle(type) {
				switch (type) {
					case 1:
						break;
					case 2:
						break;
					case 3:
						this.isAllStart = !this.isAllStart;
						break;
					case 4:
						this.isAllCollect = !this.isAllCollect;
						break;
					default:
						break;
				}
			},
			clickHandle(type) {
				switch (type) {
					case 1:
						break;
					case 2:
						break;
					case 3:
						this.isStart = !this.isStart;
						break;
					case 4:
						this.isCollect = !this.isCollect;
						break;
					default:
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page_wrap {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background-color: #F6F6F6;
		position: relative;

		.header_wrap {
			display: flex;
			width: 100%;
			padding: 116rpx 37rpx 60rpx;
			position: fixed;
			top: 0;
			left: 0;
			background: #ffffff;

			.backimage {
				width: 18rpx;
				height: 30rpx;
				margin-top: 8rpx;
			}

			.header_center {
				width: calc(100% - 24rpx);
				text-align: center;
				font-family: PingFang SC;
				font-weight: 600;
				font-size: 34rpx;
				color: #000000;
			}

			.shareimage {
				width: 6rpx;
				height: 31rpx;
				margin-top: 15rpx;
			}
		}

		.page_main {
			width: 100%;
			height: 100%;
			overflow: auto;
			padding-top: 220rpx;
			padding-bottom: 112rpx;
		}

		.handle_wrap {
			width: 100%;
			padding: 37rpx 55rpx;
			box-sizing: border-box;
			background: #ffffff;
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;

			.handle_item {
				flex: 1;
				text-align: center;

				image {
					width: 33rpx;
					height: 32rpx;
					margin-right: 10rpx;
					vertical-align: middle;
				}

				text {
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #B2B2B2;
					vertical-align: middle;
				}

			}
		}

		.chat_info {
			width: 100%;
			padding: 30rpx 37rpx 38rpx;
			box-sizing: border-box;
			background: #ffffff;
			margin-top: 16rpx;

			.chat_top {
				display: flex;
				width: 100%;
				margin-bottom: 40rpx;

				.chat_top_left {
					width: 123rpx;
					height: 40rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					font-size: 26rpx;
					color: #7D7D7D;
					line-height: 40rpx;
				}

				.chat_top_right {
					width: calc(100% - 123rpx);
					margin-left: 20rpx;
					margin-top: -6rpx;
					display: flex;
					justify-content: flex-end;

					.header_top_wrap {
						width: 114rpx;
						position: relative;
						margin-top: 5rpx;
						overflow: hidden;

						image {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							position: absolute;
							top: 0;

							&:first-of-type {
								left: 0;
							}

							&:nth-of-type(2) {
								left: 26rpx;
							}

							&:nth-of-type(3) {
								left: 46rpx;
							}

							&:nth-of-type(4) {
								left: 66rpx;
							}
						}
					}

					.header_nums {
						width: 86rpx;
						font-weight: 400;
						font-size: 24rpx;
						line-height: 54rpx;
						color: #b2b2b2;
						text-align: center;
					}
				}
			}
		}

		.user_article {
			width: 100%;

			.article_handle {
				width: 100%;
				display: flex;

				.handle_left {
					width: calc(100% - 110px);
					color: #b2b2b2;

					image {
						display: inline-block;
						vertical-align: middle;
						width: 30rpx;
						height: 30rpx;
					}

					text {
						font-weight: 400;
						font-size: 24rpx;
						line-height: 24rpx;
						margin-left: 8rpx;
						margin-right: 40rpx;
					}
				}


			}

			.article_media {
				display: flex;
				overflow: hidden;
				margin: 36rpx 0;

				.oneimage {
					max-width: 100%;
				}

				.twoimage {
					width: 329rpx;
					border-radius: 16rpx;

					&:first-of-type {
						margin-right: 20rpx;
					}
				}

				video {
					max-width: 100%;
				}
			}

			.article_main {
				width: 100%;
				margin-top: 30rpx;
				font-weight: 400;
				font-size: 26rpx;
				color: #2a2a2a;

				.tag_wrap {
					display: inline-block;
					padding: 10rpx 14rpx;
					background: #f1f2f9;
					border-radius: 8rpx;
					margin-right: 16rpx;

					image {
						display: inline-block;
						width: 20rpx;
						height: 20rpx;
						margin-right: 6rpx;
						vertical-align: middle;
					}

					text {
						vertical-align: middle;
						font-weight: 400;
						font-size: 22rpx;
						color: #424659;
					}
				}
			}

		}

		.user_wrap {
			width: 100%;
			display: flex;

			.user_left {
				width: 94rpx;
				height: 94rpx;
				border-radius: 50%;
				margin-right: 21rpx;
			}

			.user_center {
				width: calc(100% - 275rpx);

				.user_name {
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-family: Source Han Sans CN;
					font-weight: bold;
					font-size: 30rpx;
					color: #2A2A2A;
					margin-bottom: 20rpx;
				}

				.user_time {
					font-family: Source Han Sans CN;
					font-weight: 400;
					font-size: 24rpx;
					color: #A8A8A8;
				}
			}

			.user_right {
				width: 160rpx;
				height: 52rpx;
				line-height: 52rpx;
				text-align: center;
				background: linear-gradient(90deg, #BED84F, #BFD952);
				border-radius: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #FFFFFF;
			}
		}

		.top_info {
			width: 100%;
			padding: 0rpx 37rpx 38rpx;
			box-sizing: border-box;
			background: #ffffff;
		}


	}
</style>