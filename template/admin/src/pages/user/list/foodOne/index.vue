<template>
  <!--定制食谱 -->
  <div v-loading="loading">

    <el-card :bordered="false"
             shadow="never"
             class="ivu-mt"
             :body-style="{ padding: 0 }">
      <div class="padding-add">
        <el-form ref="userForm"
                 :model="userForm"
                 :rules="userRules"
                 label-width="110px"
                 label-position="right"
                 inline>
          <div class="acea-row search-form">
            <div>
              <el-form-item label="客户身高(cm) :"
                            prop="height">
                <el-input v-model="userForm.height"
                          placeholder="请输入客户身高"
                          class="form_content_width">
                </el-input>
              </el-form-item>
              <el-form-item label="客户体重(kg) :"
                            prop="weight">
                <el-input v-model="userForm.weight"
                          placeholder="请输入客户体重"
                          class="form_content_width">
                </el-input>
              </el-form-item>
              <el-form-item label="客户年龄："
                            prop="age">
                <el-input v-model="userForm.age"
                          placeholder="请输入客户年龄"
                          class="form_content_width">
                </el-input>
              </el-form-item>
              <el-form-item label="客户性别："
                            prop="sex">
                <el-select v-model="userForm.sex"
                           placeholder="请选择客户性别"
                           class="form_content_width">
                  <el-option v-for="(item, index) in sexOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="   ">
                <el-button type="primary"
                           size="small"
                           class="form_content_width"
                           @click="computedMeta">计算基础代谢</el-button>
              </el-form-item>

            </div>
            <div>
				<el-form-item label="   " prop="totalHeat">
					<el-input v-model="userForm.totalHeat"
							  placeholder="请输入"
							  class="form_content_width"
							  :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="总热量控制："
								prop="totalPercent">
					<el-select v-model="userForm.totalPercent"
							   placeholder="请选择总热量代谢百分比"
							   class="form_content_width"
							   @change="handleSelectChange">
					    <el-option v-for="(item, index) in precentOptions"
								 :key="index"
								 :label="item.label"
								 :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" prop="heat">
					<el-input v-model="userForm.heat"
			              placeholder=""
			              class="form_content_width"
			              :disabled="isDisabled"></el-input>
			    </el-form-item>
                <el-form-item label="早："
                            prop="morningPercent">
					<el-select v-model="userForm.morningPercent"
                           placeholder="请选择早餐代谢百分比"
                           class="form_content_width">
						<el-option v-for="(item, index) in morningPercents"
                             :key="index"
                             :label="item.label"
                             :value="item.value"></el-option>
					</el-select>
                </el-form-item>
				<el-form-item label="午："
				              prop="noonPercent">
				    <el-select v-model="userForm.noonPercent"
				             placeholder="请选择午餐代谢百分比"
				             class="form_content_width">
						<el-option v-for="(item, index) in noonPercents"
				               :key="index"
				               :label="item.label"
				               :value="item.value"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="晚："
				              prop="nightPercent">
				    <el-select v-model="userForm.nightPercent"
				             placeholder="请选择晚餐代谢百分比"
				             class="form_content_width">
						<el-option v-for="(item, index) in nightPercents"
				               :key="index"
				               :label="item.label"
				               :value="item.value"></el-option>
				    </el-select>
				</el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </el-card>
    <el-card :bordered="false"
             shadow="never"
             class="ivu-mt mt_16"
             :body-style="{ padding: 0 }">
      <div class="padding-add">
        <el-form ref="foodForm"
                 :rules="foodRules"
                 :model="foodForm"
                 label-width="100px">
          <el-form-item label="食谱天数："
                        prop="day">
            <el-radio-group v-model="foodForm.day">
              <el-radio v-for="(item,index) in dayOptions"
                        :key="index"
                        :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="适应阶段："
                        prop="stage">
            <div class="stageBox">
				<el-radio-group v-model="foodForm.stage">
				  <el-radio v-for="(item,index) in stageOptions"
				            :key="index"
				            :label="item.value">{{item.label}}</el-radio>
				</el-radio-group>
            </div>
            <div class="tableBox"
                 v-show="foodForm.stage=='第二阶段'">
              <ul class="tableHeader">
                <li></li>
                <li>阶段</li>
                <li>初始值(g)</li>
                <li>每日添加值(g)</li>
                <li>最高值(g)</li>
              </ul>

              <el-radio-group v-model="radio"
                              style="width: 100%;">
                <ul class="bottomBorder">
                  <li> <el-radio :label="1"></el-radio></li>
                  <li>1-7天内</li>
                  <li><el-input v-model="oneStageObj['initVal']"
                              class="countWidth"></el-input></li>
                  <li><el-input v-model="oneStageObj['dayVal']"
                              class="countWidth"></el-input></li>
                  <li><el-input v-model="oneStageObj['heightVal']"
                              class="countWidth"></el-input></li>
                </ul>
                <ul class="bottomBorder">
                  <li> <el-radio :label="2"></el-radio></li>
                  <li>8-14天内</li>
                  <li><el-input v-model="twoStageObj['initVal']"
                              class="countWidth"></el-input></li>
                  <li><el-input v-model="twoStageObj['dayVal']"
                              class="countWidth"></el-input></li>
                  <li><el-input v-model="twoStageObj['heightVal']"
                              class="countWidth"></el-input></li>
                </ul>
                <ul>
                  <li> <el-radio :label="3"></el-radio></li>
                  <li>15天以上</li>
                  <li class="moreLiBox"><span>主食添加量：</span>
                    <el-input v-model="threeStageObj['mainVal']"
                              style="display: inline-block; width: 200px;">
                      <i slot="suffix">g</i>
                    </el-input>
                  </li>

                </ul>

              </el-radio-group>

            </div>
          </el-form-item>
          <el-form-item label="辣度选择："
                        prop="spicy">
				<el-radio-group v-model="foodForm.spicy">
				  <el-radio v-for="(item,index) in spicyOptions"
							:key="index"
							:label="item.value">{{item.label}}</el-radio>
				</el-radio-group>
<!--            <el-rate v-model="foodForm.spicy"
                     :texts="['不辣','微辣','中辣','重辣','特辣']"
                     show-text
                     :text-color="'#666666'"
                     :colors="rateColors">
            </el-rate> -->
          </el-form-item>
		  <el-form-item label="难易程度："
		                prop="difficultyLevel">
				<el-radio-group v-model="foodForm.difficultyLevel">
				  <el-radio v-for="(item,index) in difficultyLevelOptions"
							:key="index"
							:label="item.value">{{item.label}}</el-radio>
				</el-radio-group>
	<!-- 	    <el-rate v-model="foodForm.difficultyLevel"
					 :texts="['易','中','难']"
					 show-text
					 :max="3"
		             :colors="rateColors">
		    </el-rate> -->
		  </el-form-item>
          <el-form-item label="早餐几个菜："
                        prop="morningFood">
            <el-radio-group v-model="foodForm.morningFood">
              <el-radio v-for="(item,index) in fCountOptions"
                        :key="index"
                        :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="午餐几个菜："
                        prop="noonFood">
            <el-radio-group v-model="foodForm.noonFood">
              <el-radio v-for="(item,index) in fCountOptions"
                        :key="index"
                        :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="晚餐几个菜： "
                        prop="nightFood">
            <el-radio-group v-model="foodForm.nightFood">
              <el-radio v-for="(item,index) in fCountOptions"
                        :key="index"
                        :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="不常用食材：">
            <el-input type="textarea"
                      :rows="5"
                      placeholder="请输入内容(推荐使用英文分号区分)"
                      style="width: 800px;"
                      v-model="foodForm.ingredient">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       @click.native="nextSave">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo, userAdviceHeat, searchRecipe } from "@/api/user";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: 'user_foodOne',
  data () {
    const validateSpicy = (rule, value, callback) => {
      if (value === null || value === 0) {
        callback(new Error('请选择辣度'));
      } else {
        callback();
      }
    };
    const validateEconomy = (rule, value, callback) => {
      if (value === null || value === 0) {
        callback(new Error('请选择经济度'));
      } else {
        callback();
      }
    };
	const validateEconomy1 = (rule, value, callback) => {
	  if (value === null || value === 0) {
	    callback(new Error('请选择难易程度'));
	  } else {
	    callback();
	  }
	};
    return {
      isDisabled: true,
      loading: false,
      userForm: {
			userId: '',
			height: '',
			weight: '',
			age: '',
			sex: 0,
			totalHeat: '',
			heat: '',
			totalPercent: "1",
			morningPercent: "0.3",
			noonPercent: "0.4",
			nightPercent: "0.3",
      },
	  spicyOptions: [
	  	{value: 1,label:'不辣'},
	  	{value: 2,label:'辣'}
	  ],
	  difficultyLevelOptions: [
	  	{value: 1,label:'易'},
	  	{value: 2,label:'难'}
	  ],
      sexOptions: [{ label: '男', value: 1 }, { label: '女', value: 0 }],
      precentOptions: [
			{
			  label: '60%',
			  value: "0.6"
			},
			{
			  label: '65%',
			  value: "0.65"
			},
			{
			  label: '70%',
			  value: "0.7"
			},
			{
			  label: '75%',
			  value: "0.75"
			},
			{
			  label: '80%',
			  value: "0.8"
			},
			{
			  label: '85%',
			  value: "0.85"
			},
			{
			  label: '90%',
			  value: "0.9"
			},
			{
			  label: '95%',
			  value: "0.95"
			},
			{
			  label: '100%',
			  value: "1"
			},
      ],
	  morningPercents: [
		  {
		    label: '20%',
		    value: "0.2"
		  },
		  {
		    label: '25%',
		    value: "0.25"
		  },
		  {
		    label: '30%',
		    value: "0.3"
		  },
		  {
		    label: '35%',
		    value: "0.35"
		  },
		  {
		    label: '40%',
		    value: "0.4"
		  },
		  {
		    label: '45%',
		    value: "0.45"
		  },
		  {
		    label: '50%',
		    value: "0.5"
		  },
		  {
		    label: '55%',
		    value: "0.55"
		  },
		  {
		    label: '60%',
		    value: "0.6"
		  }
	  ],
	  noonPercents: [
		  {
		    label: '30%',
		    value: "0.3"
		  },
		  {
		    label: '35%',
		    value: "0.35"
		  },
		  {
		    label: '40%',
		    value: "0.4"
		  },
		  {
		    label: '45%',
		    value: "0.45"
		  },
		  {
		    label: '50%',
		    value: "0.5"
		  },
		  {
		    label: '55%',
		    value: "0.55"
		  },
		  {
		    label: '60%',
		    value: "0.6"
		  }
	  ],
	  nightPercents: [
		  {
		    label: '20%',
		    value: "0.2"
		  },
		  {
		    label: '25%',
		    value: "0.25"
		  },
		  {
		    label: '30%',
		    value: "0.3"
		  },
		  {
		    label: '35%',
		    value: "0.35"
		  },
		  {
		    label: '40%',
		    value: "0.4"
		  },
		  {
		    label: '45%',
		    value: "0.45"
		  },
		  {
		    label: '50%',
		    value: "0.5"
		  },
		  {
		    label: '55%',
		    value: "0.55"
		  },
		  {
		    label: '60%',
		    value: "0.6"
		  }
	  ],
      foodForm: {
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
      dayOptions: [
			{
			  label: '3天',
			  value: 3
			},
			{
			  label: '4天',
			  value: 4
			},
			{
			  label: '5天',
			  value: 5
			},
			{
			  label: '6天',
			  value: 6
			},
			{
          label: '一周',
          value: 7
        },
      ],
      foodOptions: [
			{
          label: '3',
          value: 3
        },
      ],
      fCountOptions: [
			{
			  label: '1个菜',
			  value: 1
			},
			{
          label: '2个菜',
          value: 2
        },
      ],
      stageOptions: [
			{
			  label: '一阶段',
			  value: '第一阶段'
			},
			{
			  label: '二阶段',
			  value: '第二阶段'
			},
      ],
      rateColors: ['#F7DB4D', '#F7DB4D', '#F7DB4D', '#F7DB4D', '#F7DB4D'],
      userRules: {
			height: [
			  { required: true, message: '请输入客户身高', trigger: 'blur' },
			],
			weight: [
			  { required: true, message: '请输入客户体重', trigger: 'blur' },
			],
			age: [
			  { required: true, message: '请输入客户年龄', trigger: 'blur' },
			],
			sex: [
			  { required: true, message: '请输入客户性别', trigger: 'change' },
			],
			totalPercent: [
			  { required: true, message: '请选择总热量代谢百分比', trigger: 'blur' },
			],
			morningPercent: [
			  { required: true, message: '请选择早餐代谢百分比', trigger: 'blur' },
			],
			noonPercent: [
			  { required: true, message: '请选择午餐代谢百分比', trigger: 'blur' },
			],
			nightPercent: [
			  { required: true, message: '请选择晚餐代谢百分比', trigger: 'blur' },
			],
      },
      foodRules: {
			day: [
			  { required: true, message: '请选择食谱天数', trigger: 'change' },
			],
			stage: [
			  { required: true, message: '请选择适应阶段', trigger: 'change' },
			],
			spicy: [
			  { required: true, message: '请选择辣度', trigger: 'change' },
			  { validator: validateSpicy, required: true, message: "请选择辣度", trigger: "change" }
			],
			difficultyLevel: [
				{ required: true, message: '请选择难易程度', trigger: 'change' },
				{ validator: validateEconomy1, required: true, message: "请选择难易程度", trigger: "change" }
			],
			morningFood: [
			  { required: true, message: '请选择早餐菜品数量', trigger: 'change' },
			],
			noonFood: [
			  { required: true, message: '请选择午餐菜品数量', trigger: 'change' },
			],
			nightFood: [
			  { required: true, message: '请选择晚餐菜品数量', trigger: 'change' },
			],
      },
      radio: '',
      oneStageObj: {
			initVal: 20,
			dayVal: 5,
			heightVal: 50,
      },
      twoStageObj: {
			initVal: 20,
			dayVal: 5,
			heightVal: 50,
      },
      threeStageObj: {
			mainVal: 20,
      },
    };
  },

  watch: {
	'$route': {
		handler (n, o) {
		  if (n) {
		    this.userForm.userId = this.$route.query.userId
		  }
		},
		deep: true,
		immediate: true,
	},
	getFoodForm: {
		handler (n, o) {
		  if (n) {
		    this.foodForm = this.getFoodForm
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
	getOneStageObj: {
		handler (n, o) {
		  if (n) {
		    this.oneStageObj = this.getOneStageObj
		  }
		},
		deep: true,
		immediate: true,
	},
	getTwoStageObj: {
		handler (n, o) {
		  if (n) {
		    this.twoStageObj = this.getTwoStageObj
		  }
		},
		deep: true,
		immediate: true,
	},
	getThreeStageObj: {
		handler (n, o) {
		  if (n) {
		    this.threeStageObj = this.getThreeStageObj
		  }
		},
		deep: true,
		immediate: true,
	}
  },

  computed: {
    ...mapGetters([
      'getUserForm',
      'getFoodForm',
      'getOneStageObj',
      'getTwoStageObj',
      'getThreeStageObj'
    ]),
  },
  created () {
	  this.oneStageObj={
	  			initVal: 20,
	  			dayVal: 5,
	  			heightVal: 50,
	  }
	  this.twoStageObj= {
	  			initVal: 20,
	  			dayVal: 5,
	  			heightVal: 50,
	  }
	  this.threeStageObj= {
	  			mainVal: 20,
	  }
  },
  mounted () {
    this.userForm.userId = this.$route.query.userId
    if (this.userForm.userId) {
      getUserInfo(this.userForm.userId).then(async (res) => {
        this.userForm = {
          ...res.data.userInfo,
		  totalPercent: '1',
		  morningPercent: "0.3",
		  noonPercent: "0.4",
		  nightPercent: "0.3",
        }
		this.computedMeta();
      }).catch((err) => {
        this.$message.error(err);
      });
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
    computedMeta () {
      let data = {
        userId: this.userForm.userId,
        sex: this.userForm.sex,
        height: this.userForm.height,
        weight: this.userForm.weight,
        age: this.userForm.age
      }
      if (!this.userForm.userId) {
        return this.$message.error("客户身份标识不存在");
      }
      if (!this.userForm.height) {
        return this.$message.error("请输入客户身高");
      }
      if (!this.userForm.weight) {
        return this.$message.error("请输入客户体重");
      }
      if (!this.userForm.age) {
        return this.$message.error("请输入客户年龄");
      }
	  console.log(this.userForm.sex)
      if (this.userForm.sex == null) {
        return this.$message.error("请选择客户性别");
      }
      if (!this.validateHeight(this.userForm.height)) {
        return this.$message.error("客户身高只能是大于50cm且小于250cm，并且只能保留一位小数");
      }
      if (!this.validateWeight(this.userForm.weight)) {
        return this.$message.error("客户体重只能是大于30kg且小于200kg，并且只能保留一位小数");
      }
      if (!this.validateAge(this.userForm.age)) {
        return this.$message.error("客户年龄只能是大于10岁且小于140岁之间，并且只能是正整数");
      }
      userAdviceHeat(data).then(async (res) => {
        if (res.code == 200) {
          this.isDisabled = false;
          setTimeout(() => {
            this.userForm.totalHeat = res.data.day
			this.userForm.heat = this.userForm.totalHeat
            this.isDisabled = true;
          }, 1000)
        } else {
          this.$message.error("计算基础代谢");
        }
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    validateHeight (value) {
      if (/^-?\d+(\.\d+)?$/.test(value)) {
        if (Number(value) > 50 && Number(value) < 250) {
          return /^([5-9]|\d{2,})(\.\d)?$/.test(value)
        }
      }
      return false;
    },
    validateWeight (value) {
      if (/^-?\d+(\.\d+)?$/.test(value)) {
        if (Number(value) > 30 && Number(value) < 200) {
          return /^([5-9]|\d{2,})(\.\d)?$/.test(value)
        }
      }
      return false;
    },
    validateAge (value) {
      if (/^-?\d+(\.\d+)?$/.test(value)) {
        if (Number(value) > 10 && Number(value) < 140) {
          return /^([0-9]{1,2}|140)$/.test(value)
        }
      }
      return false;
    },
    nextSave () {
      if (!this.userForm.totalHeat) {
        this.$message.error('请先计算基础代谢');
        return false;
      }
      let flag = false;
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
          return false;
        }
      })
      this.$refs['foodForm'].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
          return false;
        }
      })
      if (flag) {
        this.loading = true;
        let data = {
		  userId: this.userForm.userId,
          totalHeat: parseFloat(this.userForm.totalHeat),
          totalPercent: parseFloat(this.userForm.totalPercent),
          morningPercent: parseFloat(this.userForm.morningPercent),
          noonPercent: parseFloat(this.userForm.noonPercent),
          nightPercent: parseFloat(this.userForm.nightPercent),
          day: Number(this.foodForm.day),
          stage: this.foodForm.stage,
          spicy: this.foodForm.spicy,
          economy: this.foodForm.economy,
          morningFood: this.foodForm.morningFood,
          noonFood: this.foodForm.noonFood,
          nightFood: this.foodForm.nightFood,
          ingredient: this.foodForm.ingredient,
		  difficultyLevel: this.foodForm.difficultyLevel,
		  radio: this.radio,
		  oneStageObj: {
		  	...this.oneStageObj
		  },
		  twoStageObj: {
		  	...this.twoStageObj
		  },
		  threeStageObj: {
		  	...this.threeStageObj
		  }
        }
		if(this.foodForm.stage === "第二阶段"){
			if(this.radio === "" || this.radio === undefined ){
				 this.$message.error('请选择阶段天数');
				return false
			}
		}
        searchRecipe(data).then(async (res) => {
          if (res.code == 200) {
            this.loading = false;
            this.setRecipeDayList(res.data);
            this.setUserForm(this.userForm);
            this.setFoodForm(this.foodForm);
            this.setOneStageObj(this.oneStageObj);
            this.setTwoStageObj(this.twoStageObj);
            this.setThreeStageObj(this.threeStageObj);
            this.$emit('handleFunc', true)
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        }).catch((err) => {
          this.$message.error(err);
          this.loading = false;
        });
      }
    },
	handleSelectChange(value){
		this.userForm.heat =parseFloat((Number(this.userForm.totalHeat) * Number(this.userForm.totalPercent)).toFixed(2)).toString() 
	}
  },
};
</script>
<style lang="scss" scoped>
::v-deep.el-radio-group {
  font-size: 14px;
}
::v-deep .el-rate__icon {
  font-size: 27px;
}
.mr_15 {
  margin-right: 15px;
}
.mt_16 {
  margin-top: 16px;
}
.form_content_width {
  width: 132px;
}
.tableBox {
  width: 700px;
  border: 1px solid #dbdde4;
  .tableHeader {
    font-weight: 600;
    font-size: 14px;
    color: #2a2a2a;
    background: #f8f8f8;
  }
  .bottomBorder {
    border-bottom: 1px solid #dbdde4;
  }
  ul {
    width: 100%;
    height: 53px;
    line-height: 53px;
    display: flex;
    list-style-type: none;
    text-align: center;

    li {
      &:first-of-type {
        width: 12%;
      }
      &:nth-of-type(2) {
        width: 22%;
      }
      &:nth-of-type(3) {
        width: 22%;
      }
      &:nth-of-type(4) {
        width: 22%;
      }
      &:nth-of-type(5) {
        width: 22%;
      }
    }
    .moreLiBox {
      width: 66% !important;
    }
  }
  .countWidth {
    width: 80px;
  }
}
</style>