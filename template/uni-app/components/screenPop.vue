<template>
	<view class="popup_wrap">
		<view class="popup_title_wrap">
			<view class="popup_title_main">
				筛选
			</view>
			<view class="popup_title_close" @click="closePop">
				<image src="../static/images/user/close_mark.png" mode=""></image>
			</view>
		</view>
		<view class="popup_box">
			<view class="popup_stage_wrap">
				<view class="popup_stage_left">
					适应阶段
				</view>
				<view class="popup_stage_right">
					<text>二阶段</text>
					<image src="../static/images/user/arrow_top.png" mode=""></image>
				</view>
			</view>
			<view class="popup_day_wrap">
				<view class="popup_day_item" :class="dayInd===index?'popup_day_active':''"
					v-for="(item, index) in dayData" :key="index" @click="clickDay(index)">
					{{item.name}}
				</view>
			</view>
			<view class="popup_add_wrap">
				<view class="popup_add_item">
					<view class="add_label">
						初始添加(g):
					</view>
					<view class="add_val">

						<uni-easyinput v-model="addObj.firstAdd" placeholder="请输入" :inputBorder="false"></uni-easyinput>
					</view>
				</view>
				<view class="popup_add_item">
					<view class="add_label">
						每日添加(g):
					</view>
					<view class="add_val">

						<uni-easyinput v-model="addObj.dayAdd" placeholder="请输入" :inputBorder="false"></uni-easyinput>
					</view>
				</view>
				<view class="popup_add_item">
					<view class="add_label">
						最高值(g):
					</view>
					<view class="add_val">

						<uni-easyinput v-model="addObj.heightAdd" placeholder="请输入"
							:inputBorder="false"></uni-easyinput>
					</view>
				</view>
			</view>
			<view class="popup_list">
				<view class="popup_item">
					<view class="popup_item_left">
						热量调整
					</view>
					<view class="popup_item_right">
						<text>请选择</text>
						<image src="../static/images/user/right.png" mode="" class="sel_img"></image>
					</view>
				</view>
				<view class="popup_item">
					<view class="popup_item_left">
						辣度选择
					</view>
					<view class="popup_item_right">
						<uni-rate size="25" :value="5" :margin="5" color="#FFE342" />
					</view>
				</view>
				<view class="popup_item">
					<view class="popup_item_left">
						经济度
					</view>
					<view class="popup_item_right">
						<uni-rate size="25" :value="5" :margin="5" color="#FFE342" />
					</view>
				</view>
				<view class="popup_item">
					<view class="popup_item_left">
						制作难度
					</view>
					<view class="popup_item_right">
						<uni-rate size="25" :value="3" :margin="5" color="#FFE342" />
					</view>
				</view>
				<view class="popup_item">
					<view class="popup_item_left">
						早餐菜品数量
					</view>
					<view class="popup_item_right">
						<view class="popup_item_btn" :class="zaoInd===index?'popup_item_btn_active': ''"
							v-for="(item, index) in numData" @click="clickFood('zao', index)">
							{{item.label}}
						</view>
					</view>
				</view>
				<view class="popup_item">
					<view class="popup_item_left">
						午餐菜品数量
					</view>
					<view class="popup_item_right">
						<view class="popup_item_btn" :class="wuInd===index?'popup_item_btn_active': ''"
							v-for="(item, index) in numData" @click="clickFood('wu', index)">
							{{item.label}}
						</view>
					</view>
				</view>
				<view class="popup_item">
					<view class="popup_item_left">
						晚餐菜品数量
					</view>
					<view class="popup_item_right">
						<view class="popup_item_btn" :class="wanInd===index?'popup_item_btn_active': ''"
							v-for="(item, index) in numData" @click="clickFood('wan', index)">
							{{item.label}}
						</view>
					</view>
				</view>
				<view class="popup_item_ver">
					<view class="popup_item_label">
						常用食材
					</view>
					<view class="popup_item_area">
						<uni-easyinput type="textarea" v-model="foods" placeholder="请输入常用食材" :inputBorder="false"
							:styles="styles" class="area_wrap"></uni-easyinput>
					</view>
				</view>
			</view>
			<view class="popup_btn" @click="save">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "screenPop",
		data() {
			return {
				dayData: [{
						name: '1-7天内',
						val: 1
					},
					{
						name: '8-14天内',
						val: 2
					},
					{
						name: '15天以上',
						val: 3
					},
				],
				dayInd: null,
				addObj: {
					firstAdd: '',
					dayAdd: '',
					heightAdd: ''
				},
				numData: [{
						label: '一个',
						val: 1,
					},
					{
						label: '两个',
						val: 2,
					},
				],
				zaoInd: null,
				wuInd: null,
				wanInd: null,
				foods: '',
				styles: {
					backgroundColor: '#F7F7F7',
					padding: 10,
				}
			};
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			save() {
				this.$emit('closePop')
			},
			clickFood(type, index) {
				if (type === 'zao') {
					this.zaoInd = index;
				} else if (type === 'wu') {
					this.wuInd = index;
				} else {
					this.wanInd = index;
				}
			},
			clickDay(index) {
				this.dayInd = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.area_wrap {
		background-color: #F7F7F7;
		font-family: PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #CCCCCC;
	}

	.popup_wrap {
		width: 100%;
		height: 80vh;
		overflow: hidden;
		padding: 38rpx 30rpx;

		.popup_btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background: linear-gradient(90deg, #BED84F, #BFD952);
			border-radius: 39rpx;
			font-family: PingFang SC;
			font-weight: 500;
			font-size: 28rpx;
			color: #FFFFFF;
			text-align: center;
		}

		.popup_list {
			width: 100%;

			.popup_item_ver {
				width: 100%;
				margin-bottom: 60rpx;

				.popup_item_area {
					width: 100%;


				}

				.popup_item_label {
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #333333;
					margin-bottom: 30rpx;
				}
			}

			.popup_item {
				width: 100%;
				display: flex;
				margin-bottom: 60rpx;

				.popup_item_left {
					width: 40%;
					margin-right: 5%;
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #333333;
				}

				.popup_item_right {
					width: 55%;
					display: flex;
					justify-content: flex-end;

					.popup_item_btn_active {
						background: #F9FFE0 !important;
						border: 1px solid #B8E000 !important;
						color: #9DBF02 !important;
					}

					.popup_item_btn {
						width: 181rpx;
						height: 69rpx;
						line-height: 69rpx;
						border-radius: 12rpx;
						border: 1px solid #DDDDDD;
						font-family: PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #383838;
						text-align: center;

						&:not(:last-of-type) {
							margin-right: 22rpx;
						}
					}

					text {
						font-family: PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #CCCCCC;

					}

					.sel_img {
						width: 13rpx;
						height: 24rpx;
						margin-left: 18rpx;
					}
				}
			}
		}

		.popup_add_wrap {
			width: 100%;
			padding: 26rpx 15rpx;
			background: #F3F3F3;
			display: flex;
			margin-bottom: 61rpx;

			.popup_add_item {
				flex: 1;

				&:not(:last-of-type) {
					margin-right: 15rpx;
				}

				.add_label {
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #000000;
					margin-bottom: 15rpx;
				}
			}

		}

		.popup_day_wrap {
			width: 100%;
			display: flex;
			margin: 48rpx 0 25rpx;

			.popup_day_active {
				background: #F9FFE0 !important;
				border: 1px solid #B8E000 !important;
				color: #9DBF02 !important;
			}

			.popup_day_item {
				flex: 1;
				height: 69rpx;
				line-height: 69rpx;
				background: #F3F3F3;
				border-radius: 12rpx;
				border: 1px solid #F3F3F3;
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #383838;
				text-align: center;

				&:not(:last-of-type) {
					margin-right: 15rpx;
				}
			}
		}

		.popup_stage_wrap {
			width: 100%;
			display: flex;

			.popup_stage_left {
				width: 50%;
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #333333;
			}

			.popup_stage_right {
				width: 50%;
				text-align: right;
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #333333;

				text {
					vertical-align: middle;
				}

				image {
					width: 24rpx;
					height: 13rpx;
					margin-left: 12rpx;
					vertical-align: middle;
				}
			}
		}

		.popup_box {
			height: calc(100% - 45rpx);
			overflow: auto;
			padding-bottom: 60rpx;
		}

		.popup_title_wrap {
			height: 45rpx;
			display: flex;
			margin-bottom: 59rpx;

			.popup_title_main {
				width: calc(100% - 20rpx);
				text-align: center;
				font-family: PingFang SC;
				font-weight: 600;
				font-size: 34rpx;
				color: #000000;
			}

			.popup_title_close {
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