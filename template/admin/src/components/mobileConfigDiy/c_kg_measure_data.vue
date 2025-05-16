<template>
  <div class="mobile-config">
    <div v-for="(item, key) in rCom"
         :key="key">
      <component :is="item.components.name"
                 :configObj="configObj"
                 ref="childData"
                 @getConfig="getConfig"
                 :key="key"
                 :configNme="item.configNme"></component>
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
  name: 'c_kg_measure_data',
  componentsName: 'kg_measure_data',
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
      space: [
        {
          components: toolCom.c_data_input,
          configNme: 'menuConfig',
        },
      ],
    };
  },
  watch: {
    num (nVal) {
      this.configObj = this.$store.state.mobildConfig.defaultArray[nVal];
    },
    configObj: {
      handler (nVal, oVal) {
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
              components: toolCom.c_data_input,
              configNme: 'menuConfig',
            },
          ];
          this.rCom = arr.concat(tempArr);
        } else {
          let tempArr = [
            // {
            //   components: toolCom.c_bg_color,
            //   configNme: 'numColor',
            // },
            // {
            //   components: toolCom.c_bg_color,
            //   configNme: 'titleColor',
            // },
            {
              components: toolCom.c_slider,
              configNme: 'prConfig',
            },
            {
              components: toolCom.c_slider,
              configNme: 'mbCongfig',
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
    // 获取组件参数
    getConfig (data) { },
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

<style scoped></style>
