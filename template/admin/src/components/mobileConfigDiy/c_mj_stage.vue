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
  name: 'c_mj_stage',
  componentsName: 'mj_stage',
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
          components: toolCom.c_bg_color,
          configNme: 'titleColor',
        },
        {
          components: toolCom.c_slider,
          configNme: 'prConfig',
        },
        {
          components: toolCom.c_slider,
          configNme: 'mbCongfig',
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
