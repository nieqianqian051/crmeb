<template>
  <div class="mobile-page"
       :style="{ padding: '14px ' + prConfig + 'px', marginTop: `${mTop}px` }">
    <div class="mj_stage">
      <img src="../../assets/images/diy/mj_header.png"
           alt=""
           class="headImg">
      <span :style="{color: titleColor,}">麦吉一阶段第3天</span>
      <img src="../../assets/images/diy/jiantou.png"
           alt=""
           class="jtImg">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'mj_stage',
  cname: '麦吉阶段',
  icon: 'iconkanjia1',
  configName: 'c_mj_stage',
  type: 1, // 0 基础组件 1 营销组件 2工具组件
  defaultName: 'mj_stage', // 外面匹配名称
  props: {
    index: {
      type: null,
    },
    num: {
      type: null,
    },
  },
  computed: {
    ...mapState('mobildConfig', ['defaultArray']),
  },
  watch: {
    pageData: {
      handler (nVal, oVal) {
        this.setConfig(nVal);
      },
      deep: true,
    },
    num: {
      handler (nVal, oVal) {
        let data = this.$store.state.mobildConfig.defaultArray[nVal];
        this.setConfig(data);
      },
      deep: true,
    },
    defaultArray: {
      handler (nVal, oVal) {
        let data = this.$store.state.mobildConfig.defaultArray[this.num];
        this.setConfig(data);
      },
      deep: true,
    },
  },
  data () {
    return {
      // 默认初始化数据禁止修改
      defaultConfig: {
        name: 'mj_stage',
        timestamp: this.num,
        titleColor: {
          title: '内容颜色',
          name: 'txtColor',
          default: [
            {
              item: '#AFC92A',
            },
          ],
          color: [
            {
              item: '#AFC92A',
            },
          ],
        },
        prConfig: {
          title: '背景边距',
          val: 25,
          min: 0,
        },
        mbCongfig: {
          title: '页面间距',
          val: 0,
          min: 0,
        },
      },
      mTop: '',
      txtColor: '',
      listRight: '',
      titleColor: '',
      pageData: {},
      prConfig: 0,
      isStart: false,
      isCollect: false,
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.pageData = this.$store.state.mobildConfig.defaultArray[this.num];
      this.setConfig(this.pageData);
    });
  },
  methods: {
    setConfig (data) {
      if (!data) return;
      if (data.mbCongfig) {
        this.mTop = data.mbCongfig.val;
        console.log('data----', data)
        this.titleColor = data.titleColor.color[0].item;
        this.prConfig = data.prConfig.val;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.mobile-page {
  .mj_stage {
    display: flex;
    .headImg {
      width: 30px;
      height: 30px;
    }
    span {
      margin: 9px 10px;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #afc92a;
    }
    .jtImg {
      width: 5px;
      height: 10px;
      margin-top: 13px;
    }
  }
}
</style>
