<template>
  <div class="mobile-page"
       :style="{ padding: '14px ' + prConfig + 'px', marginTop: `${mTop}px` }">
    <div class="body_info">
      <div class="body_card"
           v-if="priceShow">
        <div class="body_left">
          <div class="img_wrap">
            <img src="../../assets/images/diy/iconsg.png"
                 alt="">
          </div>
        </div>
        <div class="body_right">
          <div class="body_name"
               :style="{color:titleColor}">身高</div>
          <div class="body_val">
            <span :style="{color:numColor}">165</span>
            cm
          </div>
        </div>
      </div>
      <div class="body_card"
           v-if="bntShow">
        <div class="body_left">
          <div class="img_wrap">
            <img src="../../assets/images/diy/tizhong.png"
                 alt="">
          </div>
        </div>
        <div class="body_right">
          <div class="body_name"
               :style="{color:titleColor}">体重</div>
          <div class="body_val">
            <span :style="{color:numColor}">65</span>
            kg
          </div>
        </div>
      </div>
      <div class="body_card"
           v-if="jcShow">
        <div class="body_left">
          <div class="img_wrap">
            <img src="../../assets/images/diy/jichudaixieshuai.png"
                 alt="">
          </div>
        </div>
        <div class="body_right">
          <div class="body_name"
               :style="{color:titleColor}">基础代谢</div>
          <div class="body_val">
            <span :style="{color:numColor}">1265</span>
            千卡
          </div>
        </div>
      </div>
      <div class="body_card"
           v-if="tzShow">
        <div class="body_left">
          <div class="img_wrap">
            <img src="../../assets/images/diy/tizhishuai.png"
                 alt="">
          </div>
        </div>
        <div class="body_right">
          <div class="body_name"
               :style="{color:titleColor}">体脂率</div>
          <div class="body_val">
            <span :style="{color:numColor}">21.3</span>
            BMI
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const img1 = require('../../assets/images/diy/sports.png')
export default {
  name: 'body_info',
  cname: '身体信息',
  icon: 'iconkanjia1',
  configName: 'c_body_info',
  type: 1, // 0 基础组件 1 营销组件 2工具组件
  defaultName: 'body_info', // 外面匹配名称
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
        img1,
        img1,
      ],
      // 默认初始化数据禁止修改
      defaultConfig: {
        name: 'body_info',
        timestamp: this.num,
        setUp: {
          tabVal: 0,
        },
        priceShow: {
          title: '是否显示身高',
          val: 1,
        },
        bntShow: {
          title: '是否显示体重',
          val: 1,
        },
        jcShow: {
          title: '是否显示基础代谢',
          val: 1,
        },
        tzShow: {
          title: '是否显示体脂率',
          val: 1,
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
          title: '标题颜色',
          name: 'txtColor',
          default: [
            {
              item: '#999999',
            },
          ],
          color: [
            {
              item: '#999999',
            },
          ],
        },
        prConfig: {
          title: '背景边距',
          val: 16,
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
      jcShow: true,
      tzShow: true,
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
    clickHandle (type) {
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
    setConfig (data) {
      if (!data) return;
      if (data.mbCongfig) {
        this.mTop = data.mbCongfig.val;
        console.log('data----', data)
        this.titleColor = data.titleColor.color[0].item;
        this.numColor = data.numColor.color[0].item;
        this.prConfig = data.prConfig.val;
        this.priceShow = data.priceShow.val;
        this.bntShow = data.bntShow.val;
        this.tzShow = data.tzShow.val;
        this.jcShow = data.jcShow.val;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.bargainOn {
  border-radius: 0 !important;
}
.mobile-page {
  .body_info {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    .body_card {
      width: 48.5%;
      padding: 21px 20px;
      display: flex;
      background: #ffffff;
      box-shadow: 1px 1px 7px 0px rgba(107, 107, 107, 0.04);
      border-radius: 11px;
      margin-bottom: 11px;
      &:nth-of-type(odd) {
        margin-right: 3%;
      }

      .body_left {
        width: 21px;
        margin-right: 11px;
        .img_wrap {
          width: 25px;
          height: 25px;
          background: #c6de4b;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 8px;
          img {
            width: 14px;
            height: 16px;
          }
        }
      }
      .body_right {
        width: calc(100% - 33px);
        .body_name {
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 13px;
          color: #999999;
          margin-bottom: 5px;
        }
        .body_val {
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 13px;
          color: #000000;
          span {
            display: inline-block;
            font-family: PingFang SC;
            font-weight: 600;
            font-size: 20px;
            color: #000000;
            min-width: 30px;
          }
        }
      }
    }
  }
}
</style>
