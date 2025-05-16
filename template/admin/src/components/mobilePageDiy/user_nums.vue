<template>
  <div class="mobile-page"
       :style="{ padding: '0 ' + prConfig + 'px' }">
    <div class="user_nums"
         :class="bgStyle === 0 ? 'bargainOn' : ''"
         :style="{
        marginTop: `${mTop}px`,
      }">
      <div class="user_item"
           v-for="(item, index) in numList"
           :key="index">
        <div class="user_val"
             :style="{color: numColor}">{{item.val}}</div>
        <div class="user_label"
             :style="{color: titleColor}">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'user_nums',
  cname: '用户互动数量',
  icon: 'iconkanjia1',
  configName: 'c_user_nums',
  type: 1, // 0 基础组件 1 营销组件 2工具组件
  defaultName: 'user_nums', // 外面匹配名称
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
      numList: [
        {
          label: '点赞',
          val: '1.25k'
        },
        {
          label: '热评',
          val: '1.25k'
        },
        {
          label: '粉丝',
          val: '1.25k'
        },
        {
          label: '关注',
          val: '1.25k'
        },
      ],
      // 默认初始化数据禁止修改
      defaultConfig: {
        name: 'user_nums',
        timestamp: this.num,
        setUp: {
          tabVal: 1,
        },
        numColor: {
          title: '数量颜色',
          name: 'numColor',
          default: [
            {
              item: '#000000',
            },
          ],
          color: [
            {
              item: '#000000',
            },
          ],
        },
        titleColor: {
          title: '标签颜色',
          name: 'txtColor',
          default: [
            {
              item: '#8D8D8D',
            },
          ],
          color: [
            {
              item: '#8D8D8D',
            },
          ],
        },
        bgStyle: {
          title: '背景样式',
          name: 'bgStyle',
          type: 1,
          list: [
            {
              val: '直角',
              icon: 'iconPic_square',
            },
            {
              val: '圆角',
              icon: 'iconPic_fillet',
            },
          ],
        },
        prConfig: {
          title: '背景边距',
          val: 10,
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
      numColor: '',
      priceShow: true,
      bntShow: true,
      pageData: {},
      bgStyle: 1,
      prConfig: 0,
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
        this.titleColor = data.titleColor.color[0].item;
        this.numColor = data.numColor.color[0].item;
        this.prConfig = data.prConfig.val;
        this.bgStyle = data.bgStyle.type;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.bargainOn {
  border-radius: 0 !important;
}
.user_nums {
  width: 100%;
  display: flex;
  background: #ffffff;
  border-radius: 12px 12px 0 0;
  .user_item {
    flex: 1;
    text-align: center;
    padding: 20px 0;
    .user_val {
      font-family: Source Han Sans CN;
      font-weight: 500;
      font-size: 16px;
      color: #000000;
    }
    .user_label {
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 11px;
      color: #8d8d8d;
    }
  }
}
</style>
