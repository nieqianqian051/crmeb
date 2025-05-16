<template>
  <div class="user-info">
    <div class="section">
      <div class="section-hd">基本信息</div>
      <div class="section-bd">
        <div class="item">
          <div>用户ID：</div>
          <div class="value">{{ psInfo.userId }}</div>
        </div>
        <div class="item">
          <div>真实姓名：</div>
          <div class="value">{{ psInfo.realName || '-' }}</div>
        </div>
        <div class="item">
		  <div>手机号：</div>
          <div class="value" v-if="psInfo && psInfo.appUser && psInfo.appUser.tel">{{ psInfo.appUser.tel || '已注销' }}</div>
          <div class="value" v-else>{{ '已注销' }}</div>
        </div>
        <div class="item">
          <div>生日：</div>
          <div class="value">{{ psInfo.birth | dateFormatter(psInfo.birth,"yyyy-mm-dd") }}</div>
        </div>
        <div class="item">
          <div>性别：</div>
          <div class="value">{{ psInfo.sex === 0 ?  '女' : '男' }}</div>
        </div>
        <div class="item">
          <div>身份证号：</div>
          <div class="value">{{ psInfo.idCard || '-' }}</div>
        </div>
        <div class="item">
          <div>原始体重：</div>
          <div class="value" v-if="psInfo.weight">{{ psInfo.weight + ' kg' || '-' }}</div>
          <div class="value" v-else>{{"-"}}</div>
        </div>
        <div class="item">
          <div>目标体重：</div>
          <div class="value" v-if="psInfo.targetWeight">{{ psInfo.targetWeight + ' kg' || '-' }}</div>
          <div class="value" v-else>{{"-"}}</div>
        </div>
        <div class="item">
          <div>用户身高：</div>
          <div class="value" v-if="psInfo.height">{{ psInfo.height + ' cm' || '-' }}</div>
          <div class="value" v-else>{{"-"}}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-hd">密码</div>
      <div class="section-bd">
        <div class="item">
          <div>登录密码：</div>
          <div class="value" v-if="psInfo && psInfo.appUser && psInfo.appUser.pwd">********</div>
          <div v-else class="value">未设置</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-hd">用户概况</div>
      <div class="section-bd">
<!--        <div class="item">-->
<!--          <div>推广资格：</div>-->
<!--          <div class="value">{{ psInfo.spread_open ? '开启' : '关闭' }}</div>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <div>用户状态：</div>-->
<!--          <div class="value">{{ psInfo.status ? '开启' : '锁定' }}</div>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <div>用户等级：</div>-->
<!--          <div class="value">{{ psInfo.vip_name || '-' }}</div>-->
<!--        </div>-->
        <div class="item">
          <div>用户标签：</div>
          <div class="value">{{ psInfo.label_list || '-' }}</div>
        </div>
        <div class="item">
          <div>用户分组：</div>
          <div class="value">{{ psInfo.group_name || '-' }}</div>
        </div>
        <div class="item">
          <div>分销码：</div>
          <div class="value" v-if="psInfo && psInfo.appUser && psInfo.appUser.distributionNum">{{ psInfo.appUser.distributionNum || '-' }}</div>
          <div class="value" v-else>{{ '-' }}</div>
        </div>
        <div class="item">
          <div>推广人：</div>
          <div class="value" v-if="psInfo && psInfo.appUser && psInfo.appUser.pidCount">{{ psInfo.appUser.pidCount || '0' }}</div>
          <div class="value" v-else>{{ '0' }}</div>
        </div>
        <div class="item">
          <div>注册时间：</div>
          <div class="value">{{ psInfo.regDate }}</div>
        </div>
<!--        <div class="item">-->
<!--          <div>登录时间：</div>-->
<!--          <div class="value">{{ psInfo.last_time | timeFormat }}</div>-->
<!--        </div>-->
<!--        <div v-if="psInfo.is_money_level" class="item">-->
<!--          <div>付费会员：</div>-->
<!--          <div class="value">-->
<!--            {{-->
<!--              psInfo.is_ever_level == 1 ? '永久会员' : psInfo.overdue_time ? `${psInfo.overdue_time} 到期` : '已过期'-->
<!--            }}-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
    <div class="section">
      <div class="section-hd">用户备注</div>
      <div class="section-bd">
        <div class="item">
          <div>备注：</div>
          <div class="value">{{ psInfo.address || '-' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'userInfo',
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
  computed: {
    hasExtendInfo() {
      //   return this.psInfo.extend_info.some((item) => item.value);
    },
  },
  created() {
  	console.log(this.psInfo)
  }
};
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
