<template>
  <div class="mobile-config">
    <div v-for="(item, key) in rCom"
         :key="key">
      <component :is="item.components.name"
                 :configObj="configObj"
                 ref="childData"
                 :configNme="item.configNme"
                 :key="key"
                 :index="activeIndex"
                 :num="item.num"></component>
    </div>
    <rightBtn :activeIndex="activeIndex"
              :configObj="configObj"></rightBtn>
  </div>
</template>

<script>
import toolCom from '@/components/mobileConfigRightDiy/index.js';
import rightBtn from '@/components/rightBtn/index.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: 'c_banner',
  componentsName: 'home_banner',
  components: {
    ...toolCom,
    rightBtn,
  },
  props: {
    activeIndex: {
      type: null,
    },
    num: {
      type: null,
    },
    index: {
      type: null,
    },
  },
  data () {
    return {
      configObj: {},
      rCom: [
        {
          components: toolCom.c_set_up,
          configNme: 'setUp',
        },
      ],
    };
  },
  watch: {
    num (nVal) {
      let value = JSON.parse(JSON.stringify(this.$store.state.mobildConfig.defaultArray[nVal]));
      this.configObj = value;
    },
    configObj: {
      handler (nVal, oVal) {
        console.log('configObj-banner---', nVal)
        this.$store.commit('mobildConfig/UPDATEARR', { num: this.num, val: nVal });
      },
      deep: true,
    },
    'configObj.setUp.tabVal': {
      handler (nVal, oVal) {
        var arr = [this.rCom[0]];
        if (nVal == 0) {
          let tempArr = [
            {
              components: toolCom.c_menu_list,
              configNme: 'swiperConfig',
            },
          ];
          this.rCom = arr.concat(tempArr);
        } else {
          let tempArr = [
            {
              components: toolCom.c_txt_tab,
              configNme: 'imgConfig',
            },
            {
              components: toolCom.c_txt_tab,
              configNme: 'docConfig',
            },
            {
              components: toolCom.c_txt_tab,
              configNme: 'txtStyle',
            },
            {
              components: toolCom.c_is_show,
              configNme: 'isShow',
            },
            {
              components: toolCom.c_bg_color,
              configNme: 'bgColor',
            },
            {
              components: toolCom.c_bg_color,
              configNme: 'dotColor',
            },
            {
              components: toolCom.c_slider,
              configNme: 'lrConfig',
            },
            {
              components: toolCom.c_slider,
              configNme: 'mbConfig',
            },
          ];
          this.rCom = arr.concat(tempArr);
        }
      },
      deep: true,
    },
  },
  mounted () {
    this.$nextTick(() => {
      let value = JSON.parse(JSON.stringify(this.$store.state.mobildConfig.defaultArray[this.num]));
      this.configObj = value;
    });
  },
  methods: {
    handleSubmit (name) {
      let obj = {};
      obj.activeIndex = this.activeIndex;
      obj.data = this.configObj;
      this.add(obj);
    },
    ...mapMutations({
      add: 'mobildConfig/UPDATEARR',
    }),
  },
};
</script>

<style scoped lang="stylus">
.title-tips
  padding-bottom 10px
  font-size 14px
  color #333
  span
    margin-right 14px
    color #999
</style>
