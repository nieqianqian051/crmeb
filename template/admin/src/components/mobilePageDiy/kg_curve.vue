<template>
  <div class="mobile-page"
       :style="{ padding: '14px ' + prConfig + 'px', marginTop: `${mTop}px` }">
    <div class="kg_curve">
      <div class="kg_title">体重曲线</div>
      <div class="kg_rili"
           v-if="priceShow">
        <img src="../../assets/images/diy/rili.png"
             alt="">
        <span>体重日历</span>
      </div>
      <div class="kg_time">
        <div :class="timeInd===item.val?'time_item time_bottom':'time_item'"
             @click="clickType(item.val)"
             v-for="(item, index) in timeData"
             :key="index">{{item.label}}</div>
      </div>
      <!-- 折线图 -->
      <div id="echartsLine"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import echarts from 'echarts';
export default {
  name: 'kg_curve',
  cname: '体重曲线',
  icon: 'iconkanjia1',
  configName: 'c_kg_curve',
  type: 1, // 0 基础组件 1 营销组件 2工具组件
  defaultName: 'kg_curve', // 外面匹配名称
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
      timeInd: 1,
      timeData: [
        {
          label: '日',
          val: 1
        },
        {
          label: '周',
          val: 2
        },
        {
          label: '总',
          val: 3
        }
      ],
      // 默认初始化数据禁止修改
      defaultConfig: {
        name: 'kg_curve',
        timestamp: this.num,
        setUp: {
          tabVal: 0,
        },
        priceShow: {
          title: '是否显示体重日历',
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
      xArr: ['2024/6/19', '2024/6/20', '2024/6/21', '2024/6/22', '2024/6/23',],
      yArr: [45, 46, 53, 48, 49],
    };
  },
  mounted () {
    this.initLine();
    this.$nextTick(() => {
      this.pageData = this.$store.state.mobildConfig.defaultArray[this.num];
      this.setConfig(this.pageData);
    });
  },
  methods: {
    initLine () {
      let myEcharts = echarts.init(document.getElementById('echartsLine'));
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%',
          right: '15%',
          bottom: '1%',
          top: '15%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          data: this.xArr,
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#686868", //更改坐标轴文字颜色
              fontSize: "12", //更改坐标轴文字大小
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(72, 99, 118, 0.30)", //更改坐标轴颜色
            },
          },
          axisTick: {
            show: false,
          }, // 去掉刻度线
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              //y洲网格线颜色
              color: "rgba(72, 99, 118, 0.30)",
            },
          },
        },
        yAxis: {

          type: 'value',
          axisLabel: {
            show: false,
            textStyle: {
              color: 'rgba(255,255,255,0.75)', //更改坐标轴文字颜色
              fontSize: "12", //更改坐标轴文字大小
            },
          },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              //y洲网格线颜色
              color: "rgba(72, 99, 118, 0.30)",
            },
          },

        },
        series: [
          {
            name: '数据',
            type: 'line',
            data: this.yArr,
            smooth: true,
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 9,
            areaStyle: {
              opacity: 0.2,
            },
            itemStyle: {
              // 线条颜色为渐变色
              normal: {
                color: "#C6DE4B",
              },
            },
            markPoint: {
              symbol: 'circle',
              symbolSize: 30,
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              label: {
                show: true,

              },
              symbol: 'none',
              data: [{ type: 'average', name: 'Avg' }]
            }
          },


        ]
      };
      myEcharts.setOption(option, true);
    },
    clickType (type) {
      this.timeInd = type;
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
#echartsLine {
  width: 100%;
  height: 160px;
}
.bargainOn {
  border-radius: 0 !important;
}
.mobile-page {
  .kg_curve {
    width: 100%;
    height: 279px;
    background: #ffffff;
    border-radius: 10px;
    padding: 20px 13px;
    .kg_time {
      width: 100%;
      padding: 0 15%;
      display: flex;
      justify-content: space-between;
      margin-top: 43px;
      .time_bottom {
        font-weight: 500 !important;
        color: #000000 !important;
        border-bottom: 2px solid #c6de4b !important;
      }
      .time_item {
        width: 20px;
        padding-bottom: 2px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 13px;
        color: #6e6e6e;
        text-align: center;
      }
    }
    .kg_rili {
      width: fit-content;
      padding: 7px 12px;
      border-radius: 13px;
      border: 1px solid #e2e2e2;
      float: right;
      img {
        display: inline-block;
        width: 13px;
        height: 12px;
        vertical-align: middle;
      }
      span {
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 11px;
        color: #2b2b2b;
      }
    }
    .kg_title {
      font-family: PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #000000;
    }
  }
}
</style>
