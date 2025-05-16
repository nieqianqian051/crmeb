<template>
	<div class="user-info">
		<div class="section">
			<div class="section-hd">调查问卷信息</div>
			<div class="section-bd">
			<div class="item">
				<div>微信呢称：</div>
				<div class="value" v-if="psInfo.nickName">{{ psInfo.nickName || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
			<div class="item">
				<div>性别：</div>
				<div class="value">{{ psInfo.sex === 1 ? '男' : '女' }}</div>
			</div>
			<div class="item">
				<div>出生日期：</div>
				<div class="value">{{ psInfo.birth | dateFormatter(psInfo.birth,"yyyy-mm-dd") }}</div>
			</div>
			<div class="item">
				<div>身高：</div>
				<div class="value" v-if="psInfo.height">{{ psInfo.height + ' cm' || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
		    </div>
			<div class="item">
				<div>体重：</div>
				<div class="value" v-if="psInfo.weight">{{ psInfo.weight + ' kg' || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
			<div class="item">
				<div>目标体重：</div>
				<div class="value" v-if="psInfo.targetWeight">{{ psInfo.targetWeight + ' kg' || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
		    <div class="item">
		    	<div>民族：</div>
		    	<div class="value" v-if="psInfo.nation">{{ psInfo.nation || '-' }}</div>
		    	<div class="value" v-else>{{"-"}}</div>
		    </div>
			<div class="item">
				<div>职业：</div>
				<div class="value" v-if="psInfo.vocation">{{ psInfo.vocation || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
			<div class="item">
				<div>每天的饮食规律：</div>
				<div class="value" v-if="psInfo.dietRule">{{ psInfo.dietRule || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
			<div class="item">
				<div>是否有过减肥经历：</div>
				<div class="value">{{ psInfo.isUse===0?"否":"是" }}</div>
			</div>
			<div class="item">
				<div>尝试过减肥方式：</div>
				<div class="value" v-if="psInfo.lossMode">{{ JSON.parse(psInfo.lossMode).join('、') || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
			<div class="item">
				<div>每天的饮水量：</div>
				<div class="value" v-if="psInfo.water">{{ psInfo.water || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
			<div class="item">
				<div>睡眠习惯：</div>
				<div class="value" v-if="psInfo.sleepPattern">{{ psInfo.sleepPattern || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
			<div class="item">
				<div>健康状况：</div>
				<div class="value" v-if="psInfo.healthCondition">{{ JSON.parse(psInfo.healthCondition).join('、') || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
			<div class="item">
				<div>需要那些帮助：</div>
				<div class="value" v-if="psInfo.assist">{{ JSON.parse(psInfo.assist).join('、') || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
			<div class="item">
				<div>备注（所在地区、喜欢的口味及菜系）：</div>
				<div class="value" v-if="psInfo.address">{{ psInfo.address || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
			<div class="item">
				<div>填写问卷时间：</div>
				<div class="value" v-if="psInfo.questionTime">{{ psInfo.questionTime || '-' }}</div>
				<div class="value" v-else>{{"-"}}</div>
			</div>
		</div>
	    </div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
export default {
	name: 'questionNaire',
	props: {
	  psInfo: Object,
	},
	filters: {
	  timeFormat(value, birthday) {
	    let i = birthday ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
	    if (!value) {
	      return '-';
	    }
	    return dayjs(value * 1000).format(i);
	  },
	  dateFormatter (datetime, time) {
	    if(datetime) {
	      datetime = new Date(datetime);
	      let y = datetime.getFullYear() + '-'
	      let yue = datetime.getMonth()+1;
	      let mon = yue < 10 ? '0'+yue+'-' : yue+'-'
	      let d = datetime.getDate() < 10 ? '0'+datetime.getDate() : datetime.getDate()
	      let hours = datetime.getHours() < 10 ? '0' + datetime.getHours() + ':' : datetime.getHours() + ':'
	      let minutes = datetime.getMinutes() < 10 ? "0" +datetime.getMinutes()+":" : datetime.getMinutes()+":"
	      let seconds = datetime.getSeconds() < 10 ? "0"+datetime.getSeconds() : datetime.getSeconds()
	      if (time = "yyyy-mm-dd") return y + mon + d
	      else if (time = "hh:mm:ss") return hours + minutes + seconds
	      else return y + mon + d + '\n' + hours + minutes + seconds
	    }
	    return '—'
	  },
	  gender(value) {
	    if (value === 1) {
	      return '男';
	    } else if (value === 0) {
	      return '女';
	    } else {
	      return '未知';
	    }
	  },
	},
}
</script>

<style lang="scss" scoped>
.width-add {
  width: 40px;
}
.mr30 {
  margin-right: 30px;
}

.user-info {
  .section {
    padding: 25px 0;
    border-bottom: 1px dashed #eeeeee;

    &-hd {
      padding-left: 10px;
      border-left: 3px solid var(--prev-color-primary);
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: #303133;
    }

    &-bd {
      display: flex;
      flex-wrap: wrap;
    }

    .item {
      flex: 0 0 calc((100% - 60px) / 3);
      display: flex;
      margin: 16px 30px 0 0;
      font-size: 13px;
      color: #666;

      &:nth-child(3n + 3) {
        margin: 16px 0 0;
      }
    }

    .value {
      flex: 1;
    }
    .avatar {
      width: 60px;
      height: 60px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
