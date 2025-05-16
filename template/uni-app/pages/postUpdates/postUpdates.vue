<template>
	<view class="page_wrap">
		<view class="title_wrap">
			<image src="../../static/images/user/guanbix.png" mode=""></image>
			<view class="title_text">
				发动态
			</view>
			<view class="title_btn btn_active">
				发布
			</view>
		</view>
		<textarea class="textarea" v-model="postObj.content" placeholder="可添加照片、视频、文字记录你的麦吉点滴~"></textarea>
		<view class="upload_wrap">
			<cl-upload v-model="list" :listStyle="{
			    columns: 2,
			    columnGap: '20rpx',
			    rowGap:'20rpx',
			    padding:'10rpx',
			    height:'205rpx',
			    radius:'12rpx'
			}" action="请求地址" @onSuccess="onSuccess" useBeforeDelete useBeforeUpload @beforeDelete="beforeDelete"
				@beforeUpload="beforeUpload">
				<template v-slot:addImg>
					<view class="newAddImg">
						<image src="../../static/images/user/jiahao.png" mode=""></image>
						<text>上传照片/视频</text>
					</view>
				</template>
			</cl-upload>
		</view>
		<view class="huati_wrap">
			<image src="../../static/images/user/huati.png" mode="" class="labelImg"></image>
			<view class="huati_text">
				话题
			</view>
			<view class="huati_box">
				<view class="huati_item" @click="clickHt(item)" v-for="(item, index) in huatiData" :key="index">
					#{{item.name}}
				</view>
			</view>
		</view>
		<view class="huati_wrap">
			<image src="../../static/images/user/dingwei.png" mode="" class="labelImg"></image>
			<view class="huati_text">
				位置
			</view>
			<view class="dw_box" @click="clickDW">
				<image src="../../static/images/user/jiantou.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				postObj: {
					content: '',

				},
				huatiData: [{
						name: '七月你好'
					},
					{
						name: '燃烧卡路里'
					},
					{
						name: '燃烧卡路里2'
					},
					{
						name: '燃烧卡路里3'
					},
				],
				list: [{
						path: '地址1.png',
						// 其他信息
					},
					{
						path: '地址2.mp4',
						poster: '自定义封面.png'
						// 其他信息
					},

				]
			}
		},
		methods: {
			clickDW() {
				console.log('点击定位')
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
			},
			clickHt(val) {
				console.log('点击话题', val);
				this.postObj.content += `#${val.name}`;
			},
			/**
			 * 删除前钩子
			 * @param {Object} item 当前删除的图片或者视频信息
			 * @param {Number} index 当前删除的图片或视频索引
			 * @param {Function} next 调用此函数继续执行组件删除逻辑
			 * */
			beforeDelete(item, index, next) {
				uni.showModal({
					title: '提示信息',
					content: '确定要删除这个文件嘛？',
					success: res => {
						if (res.confirm) {
							// 模拟服务器接口
							setTimeout(() => {
								next();
							}, 1000);
						}
					}
				});
			},
			/**
			 * 上传前钩子
			 * @param {Object} tempFile 当前上传文件信息
			 * @param {Function} next 调用此函数继续执行组件上传逻辑
			 * */
			beforeUpload(tempFile, next) {
				// 自己的上传逻辑
				// 如果不需要走组件的上传逻辑就不用调用next(), 但是上传完要同步到list
			},
			onSuccess(reslut) {
				// 把服务端返回的图片地址添加到list中与组件数据同步
				this.list.push(reslut.url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page_wrap {
		width: 100%;
		min-height: 100vh;
		background-color: #ffffff;
		padding: 0rpx 37rpx;
		position: relative;

		.huati_wrap {
			width: 100%;
			padding: 47rpx 0;
			border-bottom: 1rpx solid #F4F4F4;
			display: flex;

			.labelImg {
				width: 29rpx;
				height: 31rpx;
				margin-right: 26rpx;
				margin-top: 19rpx;
			}

			.huati_text {
				width: 60rpx;
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 26rpx;
				line-height: 60rpx;
				color: #000000;
				margin-right: 24rpx;
			}

			.dw_box {
				width: calc(100% - 134rpx);
				text-align: right;

				image {
					width: 16rpx;
					height: 28rpx;
				}
			}

			.huati_box {
				width: calc(100% - 134rpx);
				white-space: nowrap;
				overflow-x: auto;

				.huati_item {
					display: inline-block;
					padding: 12rpx 18rpx;
					background: #F8F9FA;
					border-radius: 23rpx;
					font-family: PingFang SC;
					font-weight: 500;
					font-size: 24rpx;
					color: #707071;
					margin-right: 12rpx;
				}
			}
		}

		.upload_wrap {
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #F4F4F4;
		}

		.newAddImg {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background: #F9F9F9;
			font-size: 22rpx;
			color: #BBBBBB;

			image {
				width: 34rpx;
				height: 33rpx;
			}
		}

		.textarea {
			width: 100%;
			height: 400rpx;
		}

		.title_wrap {
			width: 100%;
			display: flex;
			padding: 116rpx 0 63rpx;

			image {
				width: 33rpx;
				height: 33rpx;
				margin-top: 8rpx;
			}

			.title_text {
				width: calc(100% - 156rpx);
				text-align: center;
				font-family: PingFang SC;
				font-weight: 600;
				font-size: 34rpx;
				color: #000000;
			}

			.title_btn {
				width: 123rpx;
				height: 57rpx;
				line-height: 57rpx;
				text-align: center;
				background: #C6DE4B;
				border-radius: 28rpx;
				color: #ffffff;
				opacity: 0.68;
			}

			.btn_active {
				opacity: 1 !important;
			}
		}
	}
</style>