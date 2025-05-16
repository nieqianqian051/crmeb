<!-- Calendar.vue -->
<template>
	<view class="calendar">
		<view class="weekdays">
			<!-- 显示星期几 -->
			<view v-for="(day, index) in weekdays" :key="index" class="weekday">
				{{ day }}
			</view>
		</view>
		<view class="days">
			<!-- 显示一周的日期 activeDay-->
			<view v-for="(date, index) in weekDates" :key="index" :class="isCurrent(date)?'activeDay day':'day'"
				@click="clickDay(date)">
				{{ formatDate(date) }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 星期几的名称
				weekdays: ['日', '一', '二', '三', '四', '五', '六'],
				// 当前日期
				currentDate: new Date(),
				// 一周的日期数组
				weekDates: []
			};
		},
		mounted() {
			this.calculateWeekDates();
		},
		methods: {
			clickDay(date) {
				this.currentDate = date;
			},
			isCurrent(date) {
				const date_ = this.formatDate(date, 'date');
				const current_ = this.formatDate(this.currentDate, 'date');
				const isFlag = date_ === current_ ? true : false;
				return isFlag;
			},
			// 计算一周的日期
			calculateWeekDates() {
				const today = new Date();
				const startOfWeek = new Date(today);
				startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

				const dates = [];
				for (let i = 0; i < 7; i++) {
					const date = new Date(startOfWeek);
					date.setDate(date.getDate() + i);
					dates.push(date);
				}

				this.weekDates = dates;
			},
			// 格式化日期，如 date 2024-07-25
			formatDate(date, type = 'day') {
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				let data_ = type === 'day' ? `${day}` : `${year}-${month}-${day}`
				return data_;
			},

		}
	};
</script>

<style scoped>
	.calendar {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 10px;
	}

	.weekdays {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 23rpx;
	}

	.weekday {
		width: 47rpx;
		height: 47rpx;
		line-height: 47rpx;
		font-weight: 500;
		font-size: 28rpx;
		color: #888888;
		text-align: center;
	}

	.days {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.day {
		width: 47rpx;
		height: 47rpx;
		line-height: 47rpx;
		font-weight: 500;
		font-size: 26rpx;
		color: #2A2A2A;
		text-align: center;
	}

	.activeDay {
		width: 47rpx;
		height: 47rpx;
		line-height: 47rpx;
		background: #C6DE4B;
		border-radius: 50%;
		text-align: center;

	}
</style>