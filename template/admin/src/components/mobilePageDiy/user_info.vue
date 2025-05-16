<template>
  <div class="mobile-page"
       :style="{ padding: '0 ' + prConfig + 'px' }">
    <div class="user_info"
         :class="bgStyle === 0 ? 'bargainOn' : ''"
         :style="{
        marginBottom: `${mTop}px`,
      }">
      <div class="user_tool">
        <img src="../../assets/images/diy/back_icon.png"
             alt=""
             class="backImg">
        <el-divider direction="vertical"></el-divider>
        <img src="../../assets/images/diy/zhuye.png"
             alt=""
             class="zyImg">
      </div>
      <div class="user_box">
        <div class="user_header">
          <img src="../../assets/images/diy/header.webp"
               alt=""
               class="headerImg">
          <div class="sex_box"
               v-if="sexShow">
            <img src="../../assets/images/diy/nv.png"
                 alt="">
            <!-- <img src="../../assets/images/diy/nan.png"
                 alt=""> -->
          </div>
        </div>
        <div class="user_name">
          <span :style="{'color': titleColor}">春暖花开的bo</span>
          <div class="user_tips"
               v-if="stageShow">一阶段</div>
        </div>
        <div class="user_desc">
          写一个有趣的介绍...
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'user_info',
  cname: '个人信息',
  icon: 'iconkanjia1',
  configName: 'c_user_info',
  type: 1, // 0 基础组件 1 营销组件 2工具组件
  defaultName: 'user_info', // 外面匹配名称
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
        console.log('监听改变usrinfo', nVal)
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
        name: 'user_info',
        timestamp: this.num,
        setUp: {
          tabVal: 0,
        },
        sexShow: {
          title: '是否显示性别',
          val: 1,
        },
        stageShow: {
          title: '是否显示阶段',
          val: 1,
        },
        titleColor: {
          title: '标题颜色',
          name: 'txtColor',
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
        bgColor: {
          title: '背景颜色',
          name: 'bgColor',
          default: [
            {
              item: '#FDDBB2',
            },
            {
              item: '#FDEFC6',
            },
          ],
          color: [
            {
              item: '#FDDBB2',
            },
            {
              item: '#FDEFC6',
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
          val: 0,
          min: 0,
        },
        mbCongfig: {
          title: '页面间距',
          val: 0,
          min: 0,
        },
      },
      bgColor: '',
      mTop: '',
      txtColor: '',
      titleColor: '',
      sexShow: true,
      stageShow: true,
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
        console.log('userinfo---', data)
        this.bgColor = data.bgColor.color;
        this.mTop = data.mbCongfig.val;
        this.titleColor = data.titleColor.color[0].item;
        this.sexShow = data.sexShow.val;
        this.prConfig = data.prConfig.val;
        this.bgStyle = data.bgStyle.type;
        this.stageShow = data.stageShow.val;
        console.log('改变----', this.sexShow, this.stageShow)
      }
    },
  },
};
</script>

<style scoped lang="scss">
.mobile-page {
  .bargainOn {
    border-radius: 0 !important;
  }
  .user_info {
    position: relative;
    width: 100%;
    height: 270px;
    padding: 12px;
    background: url('../../assets/images/diy/user_bg.png') no-repeat;
    background-size: 100% 100%;
    border-radius: 12px;
    .user_box {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .user_desc {
        width: 100%;
        text-align: center;
        font-weight: 400;
        font-size: 13px;
        color: #8d8d8d;
      }
      .user_name {
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 19px 0 13px;
        span {
          font-weight: 500;
          font-size: 17px;
          color: #000000;
        }
        .user_tips {
          width: 27px;
          height: 13px;
          background: #c0df17;
          border-radius: 3px;
          font-weight: 400;
          font-size: 8px;
          color: #000000;
          margin-left: 3px;
        }
      }
      .user_header {
        width: 93px;
        height: 93px;
        position: relative;
        margin-top: 32px;
        .sex_box {
          width: 17px;
          height: 17px;
          background: #c0df17;
          border-radius: 50%;
          border: 1px solid #ffffff;
          position: absolute;
          right: 3px;
          bottom: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 9px;
            height: 9px;
          }
        }
        .headerImg {
          width: 93px;
          height: 93px;
          border-radius: 50%;
        }
      }
    }
    .user_tool {
      width: 78px;
      height: 29px;
      background: #000000;
      border-radius: 15px;
      border: 1px solid #ffffff;
      opacity: 0.24;
      display: flex;
      align-items: center;
      justify-content: center;
      .backImg {
        width: 8px;
        height: 14px;
        margin-right: 7px;
      }
      .zyImg {
        width: 16px;
        height: 14px;
        margin-left: 7px;
      }
    }
  }
}
</style>
