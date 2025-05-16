<template>
  <div class="hot_imgs">
    <div class="list-box">
      <draggable class="dragArea list-group"
                 :list="configData.list"
                 group="peoples"
                 handle=".move-icon">
        <div class="item"
             v-for="(item, index) in configData.list"
             :key="index">
          <div class="delect-btn"
               @click.stop="bindDelete(item, index)"
               v-if="!configData.isCube">
            <span class="iconfont-diy icondel_1"></span>
          </div>
          <div class="move-icon">
            <span class="iconfont-diy icondrag"></span>
          </div>
          <div class="info">
            <div class="info-item"
                 v-for="(infos, key) in item.info"
                 :key="key">
              <span>{{ infos.title }}</span>
              <div class="input-box">
                <el-input v-model="infos.value"
                          :placeholder="infos.tips"
                          :maxlength="infos.max" />

              </div>
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <template v-if="configData.list">
      <div class="add-btn"
           v-if="configData.list.length < configData.maxList">
        <el-button type="primary"
                   ghost
                   style="width: 100%; height: 40px; border-color: var(--prev-color-primary); color: var(--prev-color-primary)"
                   @click="addBox">添加板块</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable';
import uploadPictures from '@/components/uploadPictures';
import linkaddress from '@/components/linkaddress';
import settings from '@/setting';
export default {
  name: 'c_data_input',
  props: {
    configObj: {
      type: Object,
    },
    configNme: {
      type: String,
    },
    index: {
      type: null,
    },
  },
  components: {
    draggable: vuedraggable,
    linkaddress,
    uploadPictures,
  },
  data () {
    return {
      defaults: {},
      configData: {},
      menus: [],
      list: [
        {
          title: 'aa',
          val: '',
        },
      ],
      modalPic: false,
      isChoice: '单选',
      gridBtn: {
        xl: 4,
        lg: 8,
        md: 8,
        sm: 8,
        xs: 8,
      },
      gridPic: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12,
      },
      activeIndex: 0,
      indexLast: 0,
      lastObj: {},
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.defaults = this.configObj;
      this.configData = this.configObj[this.configNme];
    });
  },
  watch: {
    configObj: {
      handler (nVal, oVal) {
        this.defaults = nVal;
        this.configData = nVal[this.configNme];
      },
      deep: true,
    },
  },
  methods: {

    addBox () {
      if (this.configData.list.length == 0) {
        this.lastObj.img = '';
        this.lastObj.info[0].value = '';
        this.lastObj.info[1].value = '';
        this.configData.list.push(this.lastObj);
      } else {
        let obj = JSON.parse(JSON.stringify(this.configData.list[this.configData.list.length - 1]));
        obj.img = '';
        obj.info[0].value = '';
        obj.info[1].value = '';
        this.configData.list.push(obj);
      }
    },


    onBlur () {
      let data = this.defaults.menuConfig;
      this.defaults.picStyle.picList[this.defaults.picStyle.tabVal].link = data.list[0].info[0].value;
    },
    // 删除
    bindDelete (item, index) {
      if (this.configData.list.length == 1) {
        this.lastObj = this.configData.list[0];
      }
      this.configData.list.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="stylus">
.hot_imgs
  margin-bottom 20px
  // border-top 1px solid rgba(0,0,0,0.05)
  .title
    padding 0 0 13px 0
    color #999
    font-size 12px
    border-bottom 1px solid rgba(0, 0, 0, 0.05)
  .list-box
    .item
      position relative
      display flex
      margin-top 14px
      border-bottom 1px solid #eee
      padding-bottom 10px
      .move-icon
        display flex
        align-items center
        justify-content center
        width 30px
        height 80px
        cursor move
      .info
        flex 1
        margin-left 22px
        .info-item
          display flex
          align-items center
          margin-bottom 10px
          span
            width 40px
            font-size 13px
          .input-box
            flex 1
          ::v-deep .ivu-input
            font-size 13px !important
      .delect-btn
        position absolute
        right -7px
        top -12px
        z-index 99
        .iconfont-diy
          font-size 25px
          color #999
  .add-btn
    margin-top 10px
.upload-box
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  background #ccc
.iconfont-diy
  color #DDDDDD
  font-size 28px
</style>
