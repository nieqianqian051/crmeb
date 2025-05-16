<template>
  <div class="mobile-page"
       :style="{ padding: '14px ' + prConfig + 'px', marginTop: `${mTop}px` }">
    <div class="kg_target">
      <div class="kg_title">体重目标</div>
      <div class="kg_item kg_bg_one">
        <div class="kg_active kg_one"
             :style="`width: ${oneVal}%;`"></div>
        <div class="imgBox"
             :style="`left: ${oneVal - 3}%;`">
          <img src="../../assets/images/diy/jichudaixiekg.png"
               alt="">
        </div>
        <div class="kg_inside_text"
             :style="`left: ${oneVal - 12}%;`">{{oneVal}}%</div>
      </div>
      <div class="kg_text">
        <div class="text_left">58.2kg</div>
        <div class="text_right">45kg</div>
      </div>
      <!-- 天数 -->
      <div class="kg_item kg_bg_two">
        <div class="kg_active kg_two"
             :style="`width: ${oneVal}%;`"></div>
        <div class="imgBox"
             :style="`left: ${oneVal - 3}%;`">
          <img src="../../assets/images/diy/jichudaixieday.png"
               alt="">
        </div>
        <div class="kg_inside_text"
             :style="`left: ${oneVal - 16}%; top: -2px;`">第10天</div>
      </div>
      <div class="kg_text">
        <div class="text_left">2024-06-01</div>
        <div class="text_right">2024-09-01</div>
      </div>
      <div class="kg_color">
        <div class="color_item"
             style="margin-right: 30px;"
             v-if="priceShow">
          <div class="color_label">期望减肥</div>
          <div class="color_value">12.2kg</div>
        </div>
        <div class="color_item"
             v-if="bntShow">
          <div class="color_label">还需减肥</div>
          <div class="color_value">12.2kg</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'kg_target',
  cname: '体重目标',
  icon: 'iconkanjia1',
  configName: 'c_kg_target',
  type: 1, // 0 基础组件 1 营销组件 2工具组件
  defaultName: 'kg_target', // 外面匹配名称
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
      oneVal: '80',
      // 默认初始化数据禁止修改
      defaultConfig: {
        name: 'kg_target',
        timestamp: this.num,
        setUp: {
          tabVal: 0,
        },
        priceShow: {
          title: '是否显示期望减肥',
          val: 1,
        },
        bntShow: {
          title: '是否显示还需减肥',
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
  .kg_target {
    width: 100%;
    height: 238px;
    background: #ffffff;
    border-radius: 10px;
    padding: 20px 15px;
    .kg_color {
      width: 100%;
      height: 59px;
      display: flex;
      justify-content: space-around;
      .color_item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &:first-of-type {
          background: #dcf7e4;
          border-radius: 5px;

          .color_value {
            color: #5dba81;
          }
        }
        &:last-of-type {
          background: #d9f3f2;
          border-radius: 5px;
          .color_value {
            color: #5dba81;
          }
        }
        .color_label {
          font-weight: 500;
          font-size: 12px;
          color: #666666;
          margin-bottom: 5px;
        }
        .color_value {
          font-weight: 500;
          font-size: 15px;
        }
      }
    }
    .kg_text {
      width: 100%;
      display: flex;
      margin: 10px 0 20px;
      font-weight: 500;
      font-size: 12px;
      color: #838282;
      .text_left {
        flex: 1;
        text-align: left;
      }
      .text_right {
        flex: 1;
        text-align: right;
      }
    }
    .kg_bg_one {
      background: #d4ead9;
    }
    .kg_bg_two {
      background: #cbeaed;
    }
    .kg_item {
      width: 100%;
      height: 12px;
      border-radius: 6px;
      position: relative;

      .kg_inside_text {
        position: absolute;
        top: 0px;
        font-weight: 400;
        font-size: 11px;
        color: #ffffff;
      }
      .kg_active {
        position: absolute;
        top: 0;
        left: 0;
        height: 12px;
        border-radius: 6px;
      }
      .kg_one {
        background: linear-gradient(90deg, #59d584, #81dea1);
      }
      .kg_two {
        background: linear-gradient(90deg, #39bece, #75d3de);
      }
      .imgBox {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #ffffff;
        position: absolute;
        top: -6px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 13px;
          height: 17px;
        }
      }
    }
    .kg_title {
      font-family: PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #000000;
      margin-bottom: 15px;
    }
  }
}
</style>
