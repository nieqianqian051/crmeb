<template>
	<view class="page_wrap">
		<view class="sex_wrap">
			<view :class="sexInd===1? 'sex_item active_sex' : 'sex_item'" @click="clickSex(1)">
				<view class="sex_top">
					<image src="../../static/images/user/nan_bai.png" mode="" v-if="sexInd===1"></image>
					<image src="../../static/images/user/nan_gray.png" mode="" v-else></image>
				</view>
				<view class="sex_text">
					我是男生
				</view>
			</view>
			<view :class="sexInd===2? 'sex_item active_sex' : 'sex_item'" @click="clickSex(2)">
				<view class="sex_top">
					<image src="../../static/images/user/nv_bai.png" mode="" v-if="sexInd===2"></image>
					<image src="../../static/images/user/nv_gray.png" mode="" v-else></image>
				</view>
				<view class="sex_text">
					我是男生
				</view>
			</view>
		</view>
		<view class="birth_wrap">
			<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
			</picker-view>
		</view>
		<view class="btn_bottom" @click="clickNext()">
			<image src="../../static/images/user/sanjiaoxing.png" mode=""></image>
			<view class="btn_text">
				还差三步了
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: function() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],
				visible: true,
				indicatorStyle: `height: 50px;`,
				sexInd: null,
			}
		},
		methods: {
			clickNext() {
				uni.navigateTo({
					url: 'pages/cm_kg/cm_kg'
				});
			},
			clickSex(type) {
				this.sexInd = type;
			},
			bindChange: function(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page_wrap {
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
		padding: 100rpx 80rpx 69rpx;
		position: relative;

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

		.birth_wrap {
			margin-top: 200rpx;
		}

		.picker-view {
			width: 100%;
			height: 400rpx;
			margin-top: 20rpx;
		}

		.item {
			line-height: 80rpx;
			text-align: center;
		}

		.sex_wrap {
			width: 100%;
			height: 128rpx;
			display: flex;
			justify-content: space-around;

			.active_sex {
				.sex_top {
					background: #C6DE4B !important;
				}

				.sex_text {
					color: #000000 !important;
				}
			}

			.sex_item {
				flex: 1;
				text-align: center;

				.sex_top {
					width: 128rpx;
					height: 128rpx;
					background: #EEEEEE;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 auto;

					image {
						width: 55rpx;
						height: 59rpx;
					}
				}

				.sex_text {
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #999999;
					margin-top: 17rpx;
				}
			}
		}
	}
</style>