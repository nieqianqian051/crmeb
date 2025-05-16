<template>
  <div class="mobile-page"
       :style="{ padding: '14px ' + prConfig + 'px', marginTop: `${mTop}px` }"
       :class="bgStyle === 0 ? 'bargainOn' : ''">
    <div class="user_article">
      <div class="article_top_wrap">
        <div class="top_left">
          <img src="../../assets/images/diy/header.webp"
               alt="">
        </div>
        <div class="top_center">
          <div class="center_name">春暖花开的bo <div class="name_tips">官方发布</div>
          </div>
          <div class="center_time">2024-05-21 09:20:30</div>
        </div>
        <div class="top_right">
          <img src="../../assets/images/diy/dian.png"
               alt="">
        </div>
      </div>
      <div class="article_main">
        <div class="tag_wrap">
          <img src="../../assets/images/diy/huati_diy.png"
               alt="">
          <span>话题标签</span>
        </div>
        <span :style="{color: titleColor}">
          放眼欧洲，西班牙、爱尔兰、挪威为何能走在本轮承认巴勒斯坦国的队伍前列？综合舆论观点，历史因素或从中发挥很大作用。
        </span>
      </div>
      <div class="article_media">
        <!-- 图片最多显示两个 -->
        <img :src="item"
             alt=""
             v-for="(item, index) in numList"
             :key="index"
             :class="numList.length>1?'twoImg':'oneImg'" />
        <!-- 也可能是视频 -->
        <!-- <video class="fullscreenvideo"
               muted="muted">
          <source src=""
                  type="video/mp4" />
        </video> -->
      </div>
      <div class="article_handle">
        <div class="handle_left"
             :style="{color: numColor}">
          <img src="../../assets/images/diy/zhuanfa.png"
               alt=""
               @click="clickHandle(1)">
          <span>11</span>
          <img src="../../assets/images/diy/pinglun.png"
               alt=""
               @click="clickHandle(2)">
          <span>11</span>
          <img src="../../assets/images/diy/dianzan.png"
               alt=""
               @click="clickHandle(3)"
               v-if="!isStart">
          <img src="../../assets/images/diy/dianzai_xuanzhong.png"
               alt=""
               @click="clickHandle(3)"
               v-else>
          <span>11</span>
          <img src="../../assets/images/diy/shoucang.png"
               alt=""
               @click="clickHandle(4)"
               v-if="!isCollect">
          <img src="../../assets/images/diy/shoucang_xuanzhong.png"
               alt=""
               @click="clickHandle(4)"
               v-else>
          <span>11</span>
        </div>
        <div class="handle_right"
             v-if="priceShow">
          <div class="header_wrap">
            <img src="../../assets/images/diy/header.webp"
                 alt="">
            <img src="../../assets/images/diy/header.webp"
                 alt="">
            <img src="../../assets/images/diy/header.webp"
                 alt="">
            <img src="../../assets/images/diy/header.webp"
                 alt="">
          </div>
          <div class="header_nums"
               :style="{color: numColor}">12人</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const img1 = require('../../assets/images/diy/sports.png')
export default {
  name: 'user_article',
  cname: '用户动态',
  icon: 'iconkanjia1',
  configName: 'c_user_article',
  type: 1, // 0 基础组件 1 营销组件 2工具组件
  defaultName: 'user_article', // 外面匹配名称
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
        name: 'user_article',
        timestamp: this.num,
        setUp: {
          tabVal: 0,
        },
        priceShow: {
          title: '是否显示点赞人数',
          val: 1,
        },
        btnShow: {
          title: '是否显示阶段',
          val: 1,
        },
        numColor: {
          title: '数量颜色',
          name: 'numColor',
          default: [
            {
              item: '#b2b2b2',
            },
          ],
          color: [
            {
              item: '#b2b2b2',
            },
          ],
        },
        titleColor: {
          title: '内容颜色',
          name: 'txtColor',
          default: [
            {
              item: '#2A2A2A',
            },
          ],
          color: [
            {
              item: '#2A2A2A',
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
      numColor: '',
      priceShow: true,
      bntShow: true,
      pageData: {},
      bgStyle: 1,
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
        this.priceShow = data.priceShow.val;
        this.prConfig = data.prConfig.val;
        this.bgStyle = data.bgStyle.type;
        this.bntShow = data.bntShow.val;
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
  border-radius: 12px;
  background: #ffffff;
}
.user_article {
  width: 100%;

  .article_handle {
    width: 100%;
    display: flex;
    .handle_left {
      width: calc(100% - 110px);
      color: #b2b2b2;
      img {
        display: inline-block;
        vertical-align: middle;
        width: 15px;
        height: 15px;
      }
      span {
        font-weight: 400;
        font-size: 12px;

        margin-left: 4px;
        margin-right: 20px;
      }
    }
    .handle_right {
      width: 100px;
      margin-left: 10px;
      margin-top: -3px;
      display: flex;
      justify-content: space-around;
      .header_wrap {
        width: 57px;
        position: relative;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: absolute;
          top: 0;
          &:first-of-type {
            left: 0;
          }
          &:nth-of-type(2) {
            left: 13px;
          }
          &:nth-of-type(3) {
            left: 23px;
          }
          &:nth-of-type(4) {
            left: 33px;
          }
        }
      }
      .header_nums {
        width: 43px;
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
        color: #b2b2b2;
        text-align: center;
      }
    }
  }
  .article_media {
    display: flex;
    overflow: hidden;
    margin: 18px 0;
    .oneImg {
      max-width: 100%;
    }
    .twoImg {
      width: 128px;
      border-radius: 8px;
      &:first-of-type {
        margin-right: 10px;
      }
    }
    video {
      max-width: 100%;
    }
  }
  .article_main {
    width: 100%;
    margin-top: 15px;
    font-weight: 400;
    font-size: 13px;
    color: #2a2a2a;
    .tag_wrap {
      display: inline-block;
      padding: 5px 7px;
      background: #f1f2f9;
      border-radius: 4px;
      margin-right: 8px;
      img {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 3px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        font-weight: 400;
        font-size: 11px;
        color: #424659;
      }
    }
  }
  .article_top_wrap {
    width: 100%;
    display: flex;
    .top_left {
      width: 47px;
      height: 47px;
      margin-right: 11px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .top_center {
      width: calc(100% - 98px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .center_name {
        font-family: Source Han Sans CN;
        font-weight: bold;
        font-size: 15px;
        color: #2a2a2a;
        .name_tips {
          display: inline-block;
          padding: 3px 5px;
          font-weight: 400;
          font-size: 8px;
          color: #000000;
          background: #c0df17;
          border-radius: 3px;
          vertical-align: middle;
        }
      }
      .center_time {
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 12px;
        color: #a8a8a8;
      }
    }
    .top_right {
      width: 30px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 3px;
        height: 16px;
      }
    }
  }
}
</style>
