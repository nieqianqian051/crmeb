<template>
  <div>
    <!-- -->
    <div class="mb15">
      <el-radio-group v-model="stepVal"
                      size="small">
        <el-radio-button :label="1">第一步</el-radio-button>
        <el-radio-button :label="2"
                         :disabled="!isOneYet">第二步</el-radio-button>
        <el-radio-button :label="3"
                         :disabled="!isTwoYet">第三步</el-radio-button>
      </el-radio-group>
    </div>

    <OneFood v-show="stepVal===1"
             @handleFunc="handleFunc"></OneFood>
    <TwoFood v-show="stepVal===2"
             @handleTwo="handleTwo"></TwoFood>
    <ThreeFood v-show="stepVal===3"
			   @handleThree="handleThree"></ThreeFood>
  </div>
</template>

<script>
import OneFood from '../foodOne/index.vue';
import TwoFood from '../weekFood/index.vue';
import ThreeFood from '../foodContxt/index.vue';
import { mapGetters } from "vuex";
export default {
  name: 'user_makeFood',
  components: {
    OneFood,
    TwoFood,
    ThreeFood
  },
  data () {
    return {
	  weekData: [],
	  userId: '',
      stepVal: 1,
      isOneYet: false, // 第一步是否完成
      isTwoYet: false, // 第二步是否完成
    };
  },

 computed: {
    ...mapGetters([
      'getRecipeDayList',
    ]),
  },
  
  mounted () {
	this.userId = this.$route.query.userId
  },
  watch: {
    getRecipeDayList: {
      handler (n, o) {
        if (n) {
          this.weekData = this.getRecipeDayList
        }
      },
	  deep: true,
      immediate: true,
    },
	'$route': {
		handler (n, o) {
		  if (n) {
		    this.userId = this.$route.query.userId
		  }
		},
		deep: true,
		immediate: true,
	},
  },
  methods: {
    handleFunc (val) {
      if (val) {
		this.weekData = this.getRecipeDayList
        this.isOneYet = true;
        this.stepVal = 2;
      }
    },
    handleTwo (val) {
      if (val === 'pre') {
        this.stepVal = 1;
      } else {
        this.stepVal = 3;
        this.isTwoYet = true;
      }
    },
	handleThree(val) {
		if (val == 'pre') {
		  this.stepVal = 2;
		  this.isOneYet = true;
		} 
	}
  },
};
</script>
<style lang="scss" scoped>
.mb15 {
  margin-bottom: 15px;
}
</style>