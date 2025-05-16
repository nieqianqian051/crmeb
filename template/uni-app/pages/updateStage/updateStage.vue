<template>
	<view class="page_wrap">
		<view class="page_box">
			<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
				<picker-view-column>
					<view class="item" v-for="(item,index) in stageData" :key="index">{{item.label}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in dayData" :key="index">{{item.label}}天</view>
				</picker-view-column>
			</picker-view>
		</view>
		<view class="btn_bottom" @click="clickNext()">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kgGlucose: 45.1,
				indicatorStyle: `height: 50px;`,
				value: [0, 0],
				stageData: [{
						label: '第一阶段',
						value: 1
					},
					{
						label: '第二阶段',
						value: 2
					},
					{
						label: '第三阶段',
						value: 3
					},
				],
				dayData: [{
						label: '1',
						value: 1
					},
					{
						label: '2',
						value: 2
					},
					{
						label: '3',
						value: 3
					},
					{
						label: '4',
						value: 4
					},
					{
						label: '5',
						value: 5
					},
				],
				stageVal: '',
				dayVal: '',
			}
		},
		methods: {
			clickNext() {
				uni.navigateTo({
					url: 'pages/sex_birth/sex_birth'
				});
			},
			bindChange: function(e) {
				const val = e.detail.value
				console.log('改变---0', val)
				this.stageVal = this.stageData[val[0]].value;
				this.dayVal = this.dayData[val[1]].value;
				console.log('改变---0', val, this.stageVal, this.dayVal)
			}
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
			height: 60vh;

			.picker-view {
				width: 100%;
				height: 100%;
			}

			.item {
				line-height: 80rpx;
				text-align: center;
			}
		}

		.mt_ {
			margin-top: 91rpx;
		}





		.btn_bottom {
			width: 367rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background: linear-gradient(90deg, #C3D765, #C4D867);
			border-radius: 39rpx;
			font-family: PingFang SC;
			font-weight: 500;
			font-size: 28rpx;
			color: #FFFFFF;
			margin: 16vh auto 0;
		}
	}
</style>