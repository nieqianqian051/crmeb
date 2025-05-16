<template>
  <div>
    <!-- -->
    <el-card :bordered="false"
             shadow="never"
             class="ivu-mt"
             :body-style="{ padding: 0 }">
      <div class="padding-add">
        <div class="stepBox">
          <el-steps :space="200"
                    :active="stepsIndex"
                    finish-status="success">
            <el-step title="食谱概述"
                     @click.native="clickSteps(0)"></el-step>
            <el-step title="食谱原理"
                     @click.native="clickSteps(1)"></el-step>
            <el-step title="遵循原则"
                     @click.native="clickSteps(2)"></el-step>
            <el-step title="注意事项"
                     @click.native="clickSteps(3)"></el-step>
          </el-steps>
        </div>
        <div class="editorBox">
          <WangEditor style="width: 90%"
                      :content="content"
                      @editorContent="getEditorContent"></WangEditor>
        </div>
        <div class="btnBox">
          <el-button :disabled="disabled"
					 type="default"
                     @click="clickPre">上一步</el-button>
          <el-button type="primary"
                     @click="saveFood"
                     v-if="stepsIndex==3">生成食谱</el-button>
        </div>
      </div>
    </el-card>
    <!-- 点击生成食谱弹窗 -->
    <foodLinkDialog :isShow="isShow"
					:qrCode="qrCode"
					:link="link"
                    @closeFood="closeFood"></foodLinkDialog>
  </div>
</template>

<script>
import { addRecipe,getQrCode } from "@/api/user";
import foodLinkDialog from './foodLinkDialog.vue';
import WangEditor from '@/components/wangEditor/index.vue';
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: 'user_foodContxt',
  components: {
    foodLinkDialog,
    WangEditor
  },
  data () {
    return {
	  disabled: false,
      userId: '',
      weekData: [],
	  userForm: {
		userId: '',
	    height: '',
	    weight: '',
	    age: '',
	    sex: 0,
	    totalHeat: '',
	    totalPercent: "1",
	    morningPercent: "0.3",
	    noonPercent: "0.4",
	    nightPercent: "0.3",
	  },
      foodForm: {
        one: '',
        two: "<p><font face='Medium'>相比传统的节食、运动或药物减肥，我们的方法更注重饮食的调整，让您在减肥过程中享受更丰盛的饮食。它的核心在于通过低碳水化合物饮食，使身体转换为更高效的脂肪供能模式。</font></p><p><font face='Medium'>首先我们要有一个认知：减肥是一定要分阶段，不同的阶段搭配不同的饮食结构。要不然肯定会反弹的。</font></p><p><font face='Medium'>我们呢，把整个减肥周期，分了三个阶段：无糖速效期，持续减重期，体重保持期。</font></p><p><font face='Medium'>第一阶段是无糖速效期。建议执行14天，可减掉自身体重的6%-10%（每个人的体质不同，减重效果会有差异）。</font></p><p><font face='Medium'><br/></font></p><p><font face='Medium'><b>食谱的原理:</b><b></b></font></p>"
			+"<p><font face='Medium'>这是一份第一阶段的食谱，这一阶段的目标是通过限制碳水化合物的摄入，使身体进入脂肪燃烧状态，在这种状态下，身体将开始更多地燃烧脂肪以获得能量，从而帮助用户有效减少体重。</font></p><p><font face='Medium'>，摄入足够的蛋白质和脂肪以保持身体的正常运作。所以，这份食谱中的每一餐都包含足够的蛋白质来源，如鸡肉猪肉和牛肉等。同时，鸡蛋也是蛋白质的良好来源，并且脂肪含量适中</font></p><p><font face='Medium'>此外，每餐还包括一种或多种低碳水化合物的蔬菜，如生菜、白菜、西兰花和黄瓜等。这些蔬菜不仅可以为身体提供必要的维生素和矿物质，还可以增加饱腹感，帮助防止过度饮食。</font></p>",
        three: "<p><font face='Medium'><b>食谱的设计遵循以下原则:</b><b></b></font></p><p><font face='Medium'>符合一阶段的饮食要求: 在第一阶段，食物的碳水化合物含量要求不超过 6%，并且需要消除所有淀粉类食物。因此，食谱中的食材选择严格控制了碳水化合物的摄入。</font></p><p><font face='Medium'>保证充足的能量摄入: 根据填写的问卷信息，建议您每天吃够自身基础代谢量，不要刻意节食或者少吃。"
			+"食谱设计时考虑到保持适当的能量摄入，避免饥饿感和能量不足</font></p><p><font face='Medium'>保证蛋白质摄入:蛋白质在身体组织的构建和修复、免疫功能、维持饱腹感等方面都具有重要作用。因此，每餐均包含了充足的蛋白质。</font></p><p><font face='Medium'>增加膳食纤维的摄入: 膳食纤维能帮助维护消化系统的健康，减少饥饿感，控制饮食量。食谱中包含了富含纤维的蔬菜。</font></p>",
        fore: '<p style="line-height:1.6;"><b><font face="Medium">一阶段注意事项：</font></b></p><p style="line-height:1.6;"><font face="Medium">1.一阶段拒绝一切糖和淀粉的摄入，任何水果和主食类都是不可以吃的。</font></p><p style="line-height:1.6;"><font face="Medium">2、日常调料选择无糖无淀粉无小麦的调料，执行前一定要确认好使用的调味品，建议提前和营养师沟通。</font></p><p style="line-height:1.6;"><font face="Medium">3.三餐一半肉一半菜，一定要吃够基础代谢，不要有任何形式的节食；烹饪方式推荐选择煎炒炸，少吃水煮；不要吃勾芡的食物：不要喝汤。</font>'
			+ '</p><p style="line-height:1.6;"><font face="Medium">4.白天多喝水，小口小口喝，至少喝够 2000ml，减肥期间脂肪燃烧需要水的参与。</font></p><p style="line-height:1.6;"><span style="color: var(--prev-color-text-primary);"><font face="Medium">5.不要熬夜，建议 22:00 前睡觉，晚上代谢的黄金时间是 23：00-1：00，一定要保持充足的睡眠。</font></span></p><p style="line-height:1.6;"><span style="color: var(--prev-color-text-primary);"><font face="Medium">6.方便的话提前准备尿酮试纸，方便检测脂肪燃烧程度。</font></span></p><p style="line-height:1.6;"><span style="color: var(--prev-color-text-primary); font-family: Medium;"><br/></span></p><p style="line-height:1.6;"><span style="color: var(--prev-color-text-primary); font-family: Medium;"><br/></span></p>'
      },
	  two: "<p><font face='Medium'><span style='color: var(--prev-color-text-primary);'>相比传统的节食、运动或药物减肥，我们的方法更注重饮食的调整，让您在减肥过程中享受更丰盛的饮食。它的核心在于通过低碳水化合物饮食，使身体转换为更高效的脂肪供能模式。</span><br/></font></p><p><font face='Medium'>首先我们要有一个认知：减肥是一定要分阶段，不同的阶段搭配不同的饮食结构。要不然肯定会反弹的。</font></p><p><font face='Medium'>我们呢，把整个减肥周期，分了三个阶段：无糖速效期，持续减重期，体重保持期。"
		+ "</font></p><p><font face='Medium'>第二阶段是持续减重期。建议执行1到3个月</font></p><p><span style='color: var(--prev-color-text-primary); font-size: 14px;'><font face='Medium'></font></span><b><font face='Medium'>从第二阶段开始执行饮食，逐步增加健康低GI碳水化合物的摄入量，以确保营养的均衡和可持续性。</font></b><b></b></p>",
	  three: '<p><font face="Medium"><b>食谱的设计遵循以下原则:</b><b></b></font></p><p><font face="Medium">1.营养均衡：确保每餐含有蛋白质、脂肪和碳水化合物，以满足身体基本需求并促进新陈代谢。</font></p><p><font face="Medium">2.控制血糖波动：选择低血糖指数（GI）的碳水化合物，可以稳定血糖水平，减少饥饿感，避免血糖急剧波动导致的能量崩溃。</font></p><p><font face="Medium">3.增加饱腹感：高纤维食物可以增加饱腹感，减少总体热量摄入。</font></p><p><font face="Medium">4.促进肠道健康：蔬菜和全谷物中的纤维有助于肠道健康，促进消化系统正常运作。</font></p><p><font face="Medium">5.维持肌肉量：适量的蛋白质有助于维持肌肉量，保持身体代谢活力。</font></p><p><font face="Medium">6.避免营养不足：合理搭配食物类型和营养素，以防止长期减重导致的营养不足。</font></p>',
	  fore: "<p style='line-height:1.6;'><font face='Medium'><b>执行期间注意事项</b><b>:</b></font></p><p style='line-height:1.6;'><font face='Medium' style='color: var(--prev-color-text-primary);'>1.&nbsp;二阶段添加低gi值，对血糖影响小的主食，(主食选择藜麦、糙米、荞麦等低升糖的) 。</font>"
			+ "</p><p style='line-height:1.6;'><font face='Medium' style='color: var(--prev-color-text-primary);'>2.&nbsp;日常调料选择无糖无淀粉无小麦的调料，执行前一定要确认好使用的调味品，建议提前和营养师沟通。</font></p><p style='line-height:1.6;'><font face='Medium' style='color: var(--prev-color-text-primary);'>3.根茎类蔬菜还是不能吃，比如胡萝卜，山药，土豆等。</font></p><p style='line-height:1.6;'><font face='Medium' style='color: var(--prev-color-text-primary);'>4.二阶段刚开始水果牛奶坚果先不要着急添加,主食加满体重稳定下降之后再添加，每天只选择一种。</font></p><p style='line-height:1.6;'><font face='Medium' style='color: var(--prev-color-text-primary);'>5.建议您每天抽出20分钟左右的时间来运动一下。</font>"
			+ "</p><p style='line-height:1.6;'><font face='Medium' style='color: var(--prev-color-text-primary);'>6.三餐一定要吃够基础代谢，不要有任何形式的节食；烹饪方式推荐选择煎炒炸，少吃水煮；不要吃勾芡的食物：不要喝汤。</font></p><p style='line-height:1.6;'><font face='Medium' style='color: var(--prev-color-text-primary);'>7.白天多喝水，小口小口喝，至少喝够 2000ml，减肥期间脂肪燃烧需要水的参与；</font></p><p style='line-height:1.6;'><span style='color: var(--prev-color-text-primary);'><font face='Medium'>8.不要熬夜，建议 22:00 前睡觉，晚上代谢的黄金时间是 23：00-1：00，一定要保持充足的睡眠。</font></span></p><p style='line-height:1.6;'><span style='color: var(--prev-color-text-primary); font-family: Medium;'><br/></span></p>",
	  food: {
		  day: 0,
		  stage: '',
		  spicy: 0,
		  economy: 0,
		  morningFood: '',
		  noonFood: '',
		  nightFood: '',
		  ingredient: '',
		  difficultyLevel: 0,
	  },
	  qrCode: '',
	  link: '',
      isShow: false,
      content: '',
      stepsIndex: 0,
    };
  },

  computed: {
    ...mapGetters([
      'getRecipeDayList',
	  'getUserForm',
	  'getFoodForm'
    ]),
  },
  watch: {
    getRecipeDayList: {
      handler (n, o) {
        if (n) {
          this.weekData = this.getRecipeDayList
        }
      },
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
	getUserForm: {
		handler (n, o) {
		  if (n) {
		    this.userForm = this.getUserForm
		  }
		},
		deep: true,
		immediate: true,
	},
	getFoodForm: {
		handler (n, o) {
		  if (n) {
		    this.food = this.getFoodForm
			if(this.food.stage === '第二阶段'){
				 this.foodForm['two'] = this.two;
				 this.foodForm['three'] = this.three;
				 this.foodForm['fore'] = this.fore;
			}
			if(this.food.stage === '第一阶段'){
				 this.foodForm['two'] = this.foodForm.two;
				 this.foodForm['three'] = this.foodForm.three;
				 this.foodForm['fore'] = this.foodForm.fore;
			}
		  }
		},
		deep: true,
		immediate: true,
	},
  },
  mounted () {
    this.userId = this.$route.query.userId
    this.weekData = this.getRecipeDayList
	this.userForm = {
		...this.getUserForm
	}
	this.food = {
		...this.getFoodForm
	} 
	if(this.food.stage === '第二阶段'){
		 this.foodForm['two'] = this.two;
		 this.foodForm['three'] = this.three;
		 this.foodForm['fore'] = this.fore;
	}
	if(this.food.stage === '第一阶段'){
		 this.foodForm['two'] = this.foodForm.two;
		 this.foodForm['three'] = this.foodForm.three;
		 this.foodForm['fore'] = this.foodForm.fore;
	}
  },

  methods: {
	  ...mapMutations([
	    'setRecipeDayList',
	    'setUserForm',
	    'setFoodForm',
	    'setOneStageObj',
	    'setTwoStageObj',
	    'setThreeStageObj']),
    clickSteps (index) {
      if (index > this.stepsIndex) {
        if (!this.content) {
          this.$message.error('请填写内容!');
          return;
        }
      }

      switch (index) {
        case 0:
          if (this.foodForm['one']) {
			  this.content = this.foodForm['one']
          }
          break;
        case 1:
          if (this.foodForm['two']) {
			  console.log(this.food.stage)
			if(this.food.stage === '第一阶段'){
			  this.content = this.foodForm['two']
			}else{
			  this.content = this.two
			}
          } else {
            this.content = '';
          }

          break;
        case 2:
          if (this.foodForm['three']) {
			if(this.food.stage === '第一阶段'){
			  this.content = this.foodForm['three']
			}else{
			  this.content = this.three
			}
          } else {
            this.content = '';
          }
          break;
        default:
          if (this.foodForm['fore']) {
			  if(this.food.stage === '第一阶段'){
				this.content = this.foodForm['fore']
			  }else{
				this.content = this.fore
			  }
          } else {
            this.content = '';
          }
          break;

      }
      this.stepsIndex = index;
    },
    getEditorContent (data) {
	  this.content = data;
      if (this.stepsIndex === 0) {
		  this.foodForm['one'] = this.content;
      } else if (this.stepsIndex === 1) {	
		  if(this.food.stage === '第一阶段'){
			  this.foodForm['two'] = this.content;
		  }else{
			  this.foodForm['two'] = this.two;
		  }
      } else if (this.stepsIndex === 2) {
		  if(this.food.stage === '第一阶段'){
		  	this.foodForm['three'] = this.content;
		  }else{
			this.foodForm['three'] = this.three;
		  }
      } else {
		  if(this.food.stage === '第一阶段'){
		  	this.foodForm['fore'] = this.content;
		  }else{
			this.foodForm['fore'] = this.fore;
		  }
        
      }
    },
    clickPre () {
	  this.$emit('handleThree', 'pre')
    },
    saveFood () {
      if (this.stepsIndex == 3) {
        if (this.foodForm['fore']) {
          this.content = this.foodForm['fore']
        } else {
          this.content = '';
        }
        if (!this.content) {
          this.$message.error('请填写内容!');
          return;
        }
		let data = {
			totalHeat: this.userForm.totalHeat,
			totalPercent: this.userForm.totalPercent,
			morningPercent: this.userForm.morningPercent,
			noonPercent: this.userForm.noonPercent,
			nightPercent: this.userForm.nightPercent,
			userId: this.userId,
			summary: this.foodForm['one'],
			principle: this.foodForm['two'],
			tenet: this.foodForm['three'],
			note: this.foodForm['fore'],
			dayNum: this.weekData.length,
			customs: this.weekData.map(x=>x.customs),
			stage: this.food.stage
		}
		addRecipe(data).then(async (res) => {
		  if (res.code == 200) {
			  this.isShow = true;
			  this.qrCode = "";
			  getQrCode(res.data.qrCode).then(r=>{
				// 将ArrayBuffer转换为Base64编码的字符串
				const buffer = new Uint8Array(r);
				const base64String = btoa(
				  buffer.reduce((data, byte) => data + String.fromCharCode(byte), "")
				);
				this.qrCode = "data:image/png;base64," + base64String;
			  })
			  this.link = res.data.link
			  this.setRecipeDayList([]);
			  this.setUserForm({});
			  this.setFoodForm({});
			  this.setOneStageObj({});
			  this.setTwoStageObj({});
			  this.setThreeStageObj({});
			  this.disabled = true;
		  }
		})
      }
    },
    closeFood () {
      this.isShow = false;
	  this.qrCode = "";
	  this.setRecipeDayList([]);
	  this.setUserForm({});
	  this.setFoodForm({});
	  this.setOneStageObj({});
	  this.setTwoStageObj({});
	  this.setThreeStageObj({});
	  this.$store.dispatch("tagsView/delView", this.$route);
	  this.$router.go(-1);
    }
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-steps {
  justify-content: center;
}
.stepBox {
  margin-bottom: 20px;
}
.editorBox {
  display: flex;
  justify-content: center;
}
.btnBox {
  width: 100%;
  margin-top: 30px;
  text-align: center;
}
</style>