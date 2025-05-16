<template>
  <div class="mobile-page"
       :style="{ padding: '14px ' + prConfig + 'px', marginTop: `${mTop}px` }">
    <div class="kg_target">
      <div class="kg_title">体重测量数据</div>
      <div class="kg_wrap">
        <div class="kg_item"
             v-for="(item, index) in nameList"
             :key="index">
          <div class="kg_text1">{{item.label}}</div>
          <div class="kg_text2">
            <span class="kg_val">{{item.value}}</span>
            <div class="kg_tips"
                 v-if="item.label==='BMI'">
              <img src="../../assets/images/diy/zhishuxiajiang.png"
                   alt="">
              <span>{{item.tipVal}}</span>
            </div>
            <span class="kg_unit"
                  v-else>{{item.unit}}</span>
          </div>
          <div class="kg_text3">
            {{item.text}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'kg_measure_data',
  cname: '体重测量数据',
  icon: 'iconkanjia1',
  configName: 'c_kg_measure_data',
  type: 1, // 0 基础组件 1 营销组件 2工具组件
  defaultName: 'kg_measure_data', // 外面匹配名称
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
        name: 'kg_measure_data',
        timestamp: this.num,
        setUp: {
          tabVal: 0,
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
        menuConfig: {
          maxList: 20,
          list: [
            {
              info: [
                {
                  title: '标题',
                  value: 'BMI',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '21.3',
                  tips: '请输入',
                },
                {
                  title: '下降值',
                  value: '1.3',
                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '%',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '标准',
                  tips: '请输入',
                },
              ],
            },
            {
              info: [
                {
                  title: '标题',
                  value: '脂肪率',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '27.2',

                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '%',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '标准',
                  tips: '请输入',
                },
              ],
            },
            {
              info: [
                {
                  title: '标题',
                  value: '骨骼肌量',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '21.3',
                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '公斤',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '标准',
                  tips: '请输入',
                },
              ],
            },
            {
              info: [
                {
                  title: '标题',
                  value: '内脏脂肪等级',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '4.0',
                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '级',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '标准 (健康)',
                  tips: '请输入',
                },
              ],
            },
            {
              info: [
                {
                  title: '标题',
                  value: '身体类型',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '标准型',
                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '',
                  tips: '请输入',
                },
              ],
            },
            {
              info: [
                {
                  title: '标题',
                  value: '基础代谢率',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '1159',
                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '千卡/日',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '标准',
                  tips: '请输入',
                },
              ],
            },
            {
              info: [
                {
                  title: '标题',
                  value: '水分率',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '51.6',
                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '%',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '标准',
                  tips: '请输入',
                },
              ],
            },
            {
              info: [
                {
                  title: '标题',
                  value: '骨盐量',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '21.3',
                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '公斤',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '标准',
                  tips: '请输入',
                },
              ],
            },
            {
              info: [
                {
                  title: '标题',
                  value: '蛋白质',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '21.3',
                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '%',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '标准',
                  tips: '请输入',
                },
              ],
            },
            {
              info: [
                {
                  title: '标题',
                  value: '去脂体重',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '21.3',
                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '公斤',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '标准',
                  tips: '请输入',
                },
              ],
            },
            {
              info: [
                {
                  title: '标题',
                  value: '身体年龄',
                  tips: '请输入',
                },
                {
                  title: '数值',
                  value: '32',
                  tips: '请输入',
                },
                {
                  title: '单位',
                  value: '岁',
                  tips: '请输入',
                },
                {
                  title: '程度',
                  value: '标准',
                  tips: '请输入',
                },
              ],
            },
          ],
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
      prConfig: 0,
      isStart: false,
      isCollect: false,
      nameList: [
        // {
        //   label: 'BMI',
        //   value: 21.3,
        //   tipVal: 1.8,
        //   text: '标准',
        // },
        // {
        //   label: '脂肪率',
        //   value: 21.3,
        //   unit: '%',
        //   text: '标准',
        // },
        // {
        //   label: '骨骼肌量',
        //   value: 21.3,
        //   unit: '公斤',
        //   text: '标准',
        // },
        // {
        //   label: '内脏脂肪等级',
        //   value: 21.3,
        //   unit: '级',
        //   text: '标准 (健康)',
        // },
        // {
        //   label: '身体类型',
        //   value: '标准型',
        //   unit: '',
        //   text: '',
        // },
        // {
        //   label: '基础代谢率',
        //   value: 21.3,
        //   unit: '千卡/日',
        //   text: '标准',
        // },
        // {
        //   label: '水分率',
        //   value: 21.3,
        //   unit: '%',
        //   text: '标准',
        // },
        // {
        //   label: '骨盐量',
        //   value: 21.3,
        //   unit: '公斤',
        //   text: '标准',
        // },
        // {
        //   label: '蛋白质',
        //   value: 21.3,
        //   unit: '%',
        //   text: '标准',
        // },
        // {
        //   label: '去脂体重',
        //   value: 21.3,
        //   unit: '公斤',
        //   text: '标准',
        // },
        // {
        //   label: '身体年龄',
        //   value: 32,
        //   unit: '岁',
        //   text: '标准',
        // },
      ]
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.pageData = this.$store.state.mobildConfig.defaultArray[this.num];
      this.setConfig(this.pageData);
    });
  },
  methods: {
    // 对象转数组
    objToArr (data) {
      let obj = Object.keys(data);
      let m = obj.map((key) => data[key]);
      return m;
    },
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
        this.nameList = [];
        this.mTop = data.mbCongfig.val;
        this.titleColor = data.titleColor.color[0].item;
        this.numColor = data.numColor.color[0].item;
        this.prConfig = data.prConfig.val;
        let list = this.objToArr(data.menuConfig.list);
        console.log('list----', list);
        list && list.forEach(v => {
          const obj = {};
          v.info.forEach(item => {
            if (item.title === '标题') {
              obj.label = item.value
            } else if (item.title === "数值") {
              obj.value = item.value
            } else if (item.title === "下降值") {
              obj.tipVal = item.value
            } else if (item.title === "单位") {
              obj.unit = item.value
            } else if (item.title === "程度") {
              obj.text = item.value
            }
          })
          this.nameList.push(obj)
        })
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
    height: 369px;
    background: #ffffff;
    border-radius: 10px;
    padding: 20px 15px;
    .kg_wrap {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .kg_item {
        width: 31%;
        height: 69px;
        background: #ffffff;
        margin-bottom: 8px;
        box-shadow: 0px 2px 7px 0px rgba(195, 195, 195, 0.19);
        border-radius: 10px;
        padding: 10px 9px;
        box-sizing: border-box;
        &:not(:nth-of-type(3n)) {
          margin-right: 3.5%;
        }
        .kg_text1 {
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 11px;
          color: #656268;
        }
        .kg_text2 {
          margin: 1px 0;
          .kg_val {
            font-family: Arial;
            font-weight: 400;
            font-size: 17px;
            color: #040404;
          }
          .kg_tips {
            display: inline-block;
            margin-left: 5px;
            img {
              display: inline-block;
              width: 8px;
              height: 10px;
              vertical-align: middle;
            }
            span {
              font-family: Arial;
              font-weight: 400;
              font-size: 11px;
              color: #656268;
              vertical-align: middle;
            }
          }
          .kg_unit {
            font-family: Arial;
            font-weight: 400;
            font-size: 12px;
            color: #000000;
            margin-left: 5px;
          }
        }
        .kg_text3 {
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 11px;
          color: #c6de4b;
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
