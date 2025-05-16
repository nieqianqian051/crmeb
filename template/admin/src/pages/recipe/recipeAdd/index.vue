<template>
	<div style="width: 100%;padding:25px" v-loading="spinShow">
		<pages-header
		  ref="pageHeader"
		  :title="$route.params.recipeId ? '编辑食谱' : '添加食谱'"
		  :backUrl="$routeProStr + '/recipe/list'"
		></pages-header>
		<el-card :bordered="false" shadow="never" class="mt16" :body-style="{ padding: '0 20px 20px' }">
			<el-form ref="recipeFrom" style="padding: 20px;" :rules="rules"
			:model="recipe" label-width="100px" label-position="right">
				<el-form-item label="食谱名称" prop="name">
					<el-input size="mini" v-model="recipe.name" placeholder="请输入食谱名称"/>
				</el-form-item>
				<el-form-item label="食谱别名" v-for="(alias, index) in aliases">
					<el-input size="mini" v-model="aliases[index]" placeholder="请输入食谱别名">
						<template slot="append">
							<el-tooltip content="增加别名" placement="top" effect="light">
								<el-button type="primary" size="mini"  @click="aliases.push('')"><i class="el-icon-plus"/></el-button>
							</el-tooltip>
							<el-tooltip content="减少别名" placement="top" effect="light" v-show="aliases.length > 1">
								<el-button type="danger" size="mini"  @click="aliases.splice(index, 1)"><i class="el-icon-minus"/></el-button>
							</el-tooltip>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item label="食谱主图" prop="mainImageId">
					<span style="color: gray;">建议图片尺寸：345 * 345</span>
					<el-upload size="mini" action="" list-type="picture-card" :limit="1"
									:accept="'jpg'"
									:http-request="addRecipeImage"
									:file-list="recipeMainImage? [recipeMainImage]: []"
									:on-exceed="() => $message.warning(`只能上传1张食谱主图`)">
						<el-button size="mini" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
				<div v-for="(food, index) in mainFoods">
					<el-form-item label="食谱主料" size="mini" prop="mainFoodId" required>
						<el-cascader 
							v-model="food.cascader" 
							:options="foodTypes" placeholder="试试搜索: 请选择食谱主料" 
							ref="myMainElCascader"
							@change="value => ElCascaderChange(value, index, true)" 
							style="width: 80%;"
							:filterable="true"
							:filter-method="handleFilterMethod"/>
						<el-tooltip content="增加主料" placement="top" effect="light">
							<el-button type="primary" @click="mainFoods.push({foodId: '',consumption: '', main: true, cascader: []})"><i class="el-icon-plus"/></el-button>
						</el-tooltip>
						<el-tooltip content="减少主料" placement="top" effect="light" v-show="mainFoods.length > 1">
							<el-button type="danger" @click="mainFoods.splice(index, 1)"><i class="el-icon-minus"/></el-button>
						</el-tooltip>
					</el-form-item>
					 <el-form-item label="主料用量" size="mini">
						 <el-autocomplete v-model="mainFoods[index].consumption" :fetch-suggestions="querySearch" placeholder="请输入主料用量" style="width: 80%;"/>
					 </el-form-item>
				</div>
				<div v-for="(food, index) in foods">
					<el-form-item label="食谱配料">
						<el-cascader 
							size="mini" 
							v-model="food.cascader" 
							:options="foodTypes" 
							placeholder="试试搜索: 请选择食谱配料" 
							ref="myElCascader"
							@change="value => ElCascaderChange(value, index, false)" 
							style="width: 80%;"
							:filterable="true"
							:filter-method="handleFilterMethod1"/>
						<el-tooltip size="mini" content="增加配料" placement="top" effect="light">
							<el-button size="mini" type="primary"  @click="foods.push({foodId: '',consumption: '', main: false, cascader: []})"><i class="el-icon-plus"/></el-button>
						</el-tooltip>
						<el-tooltip size="mini" content="减少配料" placement="top" effect="light" v-show="foods.length > 1">
							<el-button size="mini" type="danger" @click="foods.splice(index, 1)"><i class="el-icon-minus"/></el-button>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="配料用量">
						<el-autocomplete size="mini" v-model="foods[index].consumption" :fetch-suggestions="querySearch" placeholder="请输入配料用量" style="width: 80%;"/>
					</el-form-item>
				</div>
				<el-form-item label="食谱地区">
					<el-select  v-model="recipe.areaLabelIds" multiple placeholder="全国范围" size="mini" style="width: 80%;">
						<el-option v-for="(areaLabel,index) in foodAreaLabels" :key="index" :label="areaLabel.name" :value="areaLabel.uuId"/>
					</el-select>
				</el-form-item>
				<el-form-item label="辣度" prop="spicy">
					<el-radio-group v-model="recipe.spicy">
						 <el-radio
						  v-for="item in options"
						  :key="item.value"
						  :value="item.value"
						  :label="item.value"
						>{{item.label}}</el-radio>
					</el-radio-group>							
				</el-form-item>
				<el-form-item label="难易程度" prop="difficultyLevel">
					<el-radio-group v-model="recipe.difficultyLevel">
						 <el-radio
						  v-for="item in options1"
						  :key="item.value"
						  :value="item.value"
						  :label="item.value"
						>{{item.label}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="搭配情况" prop="gear">
					<el-rate  
						v-model="recipe.gear"
						:texts="['纯素','纯荤','荤素搭配']"
						show-text
						:max="3"
						:text-color="'#666666'"
						:colors="rateColorss"
						>
					</el-rate>
				</el-form-item>
				<el-form-item label="三餐归属" prop="threeMeal">
					<el-checkbox-group v-model="recipe.threeMeal" style="width: 350px;" size="mini">
						<el-checkbox v-for="(label,index) in threeMeals" :label="label" :key="index">{{label}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="麦吉阶段" prop="maijiStageLabelIds">
					<el-checkbox-group v-model="recipe.maijiStageLabelIds" style="width: 350px;" size="mini">
						<el-checkbox v-for="(label,index) in allMaijiStageLabels" :label="label.uuId">{{label.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="食谱标签">
					<el-checkbox-group v-model="recipe.recipeLabelIds" style="width: 350px;" size="mini">
						<el-checkbox v-for="(label,index) in foodLabels" :label="label.uuId" :key="index">{{label.name}}</el-checkbox>
						<el-button icon="el-icon-plus" circle size="mini" @click="addLabelShow(true)" style="margin-left: 20px;"></el-button>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="注意事项">
					<el-input type="textarea" v-model="recipe.note" placeholder="请输入食谱的注意事项"/>
				</el-form-item>				
				<el-form-item label="食谱详情" prop="detailsText" label-position="top">
					<WangEditor style="width: 100%" :content="recipe.detailsText" @editorContent="getEditorContent"></WangEditor>
				</el-form-item>
				<el-form-item>
					<el-button
					  type="primary"
					  class="submission"
					  @click="handleSubmit('recipeFrom')"
					  >保存</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import WangEditor from '@/components/wangEditor/index.vue';
	import { labelList,foodList,uploadRecipeImages,addRecipe } from '@/api/recipe';
	import {dealImg} from "@/utils/index"
	export default {
	  name: 'recipeAdd',
	  components: { WangEditor },
	  data() {
	    return {
			spinShow: false,
			foodTypes: [],
			foodAreaLabels: [],
			rateColors: ['#F7DB4D', '#F7DB4D'],
			rateColorss: ['#F7DB4D', '#F7DB4D', '#F7DB4D'],
			threeMeals: ['早餐','午餐','晚餐'],
			options: [
				{value: 1,label:'不辣'},
				{value: 2,label:'辣'}
			],
			options1: [
				{value: 1,label:'易'},
				{value: 2,label:'难'}
			],
			recipe: {
				difficultyLevel: 0,
				name: '',
				alias: '',
				mainImageId: '',
				mainFoodId: '',
				mainFoodConsumption: '',
				foodId: '',
				labels: [],
				foodConsumption: '',
				detailsText: '',
				note: '',
				maijiStageLabelIds: [],
				areaLabelIds: [],
				recipeLabelIds: [],
				spicy: 0,
				economy: 0,
				threeMeal: [],
				gear: 0
			},
			aliases: [''],
			mainFoods: [{
			    foodId: '',
			    foodName: '',
			    consumption: '',
			    main: true,
			    cascaderStr: '',
			    cascader: [],
			}],
			foods: [{
			    foodId: '',
			    foodName: '',
			    consumption: '',
			    main: false,
			    cascaderStr: '',
			    cascader: []
			}],
			allMaijiStageLabels: [],
			foodLabels: [],
			recipeMainImage: null,
			content: '',
			rules: {
				name: [
					{ required: true, message: '食谱名称不能为空', trigger: 'blur' }
			    ],
			    mainImageId: [
					{ required: true, message: '食谱主图不能为空', trigger: 'change' }
			    ],
				mainFoodId: [
					{ required: true, message: '请选择主料食材', trigger: 'change' }
				],
				spicy: [
					{ required: true, message: '请选择辣度', trigger: 'change' }
				],
			    difficultyLevel: [
					{ required: true, message: '请选择难易程度', trigger: 'change' }
			    ],
			    gear: [
					{ required: true, message: '请选择搭配情况', trigger: 'change' }
			    ],
			    threeMeal: [
					{ type: 'array', required: true, message: '请至少选择一个三餐归属', trigger: 'change' }
			    ],
			    maijiStageLabelIds: [
					{ type: 'array', required: true, message: '请至少选择一个食谱麦吉阶段', trigger: 'change' }
			    ],
				detailsText: [
					{ required: true, message: '食谱详情不能为空', trigger: 'blur' }
				]
			}
	    }
	  },
	  created() {
		  labelList({source: "食谱"})
		  .then(async (res) => {
		  	if(res.code === 200){
		  		this.foodAreaLabels = res.data.filter(label => label.listShow == 2).sort((L1, L2) => L1.name.length - L2.name.length)
		  		// console.log(res.data)
		  		this.allMaijiStageLabels = res.data.filter(label => label.listShow == 1).sort((L1, L2) => L1.orderNo - L2.orderNo)
		  		this.foodLabels = res.data.filter(label => label.listShow == 0).sort((L1, L2) => L1.orderNo - L2.orderNo)
		  	}
		  }) 
		  .catch((err) => {
		  	this.$message({
		  		type: "error",
		  		message: err,
		  		duration: 1000
		  	})
		  });
		  foodList({isFindFoods: true})
		  .then(async (res) => {
		     if(res.code === 200){
		  	    this.foodTypes = res.data.map(type => {
		  	       if (type.children && type.children.length >1)
		  	           type.children.sort((c1, c2) =>c1.label.length - c2.label.length)
		  	       return type
		  	    }).sort((t1, t2) => t1.label.length - t2.label.length)
		     }
		  }).catch((err) => {
		    this.$message({
		    	type: "error",
		    	message: err,
		    	duration: 1000
		    })
		  });
		  
	  },
	  mounted() {
		this.draChange();
		this.$refs['recipeFrom'].resetFields();
	  },
	  methods: {
		  draChange(){
		  	this.recipe = {
		  		name: '',
		  		alias: '',
		  		mainImageId: '',
		  		mainFoodId: '',
		  		mainFoodConsumption: '',
		  		foodId: '',
		  		labels: [],
		  		foodConsumption: '',
		  		detailsText: '',
		  		note: '',
		  		maijiStageLabelIds: [],
		  		areaLabelIds: [],
		  		recipeLabelIds: [],
		  		spicy: 0,
		  		economy: 0,
		  		threeMeal: [],
		  		difficultyLevel: 0,
		  		gear: 0
		  	}
		  	this.aliases = ['']
		  	this.recipeMainImage = null
		  	this.mainFoods = [{
		  	    foodId: '',
		  	    foodName: '',
		  	    consumption: '',
		  	    main: true,
		  	    cascaderStr: '',
		  	    cascader: [],
		  	}]
		  	this.foods = [{
		  	    foodId: '',
		  	    foodName: '',
		  	    consumption: '',
		  	    main: false,
		  	    cascaderStr: '',
		  	    cascader: []
		  	}],
			this.content = ''
		  },
		  getEditorContent(data) {
		  	this.content = data;
		  },
		  querySearch(queryString, cb) {
		      const queryArr = [{value: '若干'}, {value: '适量'}, {value: '少许'}, {value: '或输入具体数值(克)'}]
		      const results = queryString? queryArr.filter(query => query.value.includes(queryString)): queryArr
		      cb(results)  // 调用 callback 返回建议列表的数据
		  },
		  async addRecipeImage(param) {
		      const imageData = new FormData()
		      imageData.append('uploadFiles', param.file)
		      const result = await uploadRecipeImages(imageData)
		      if (result.code != 200) this.$message.error(`上传食谱主图失败，请稍后重试！`)
		      this.recipeMainImage = Object.assign(result.data[0], {isMain: 1})
		      this.recipe.mainImageId = this.recipeMainImage.uuId
		  },
		  ElCascaderChange(value, index, isMain) {
		      if (isMain) {
				  // console.log(this.$refs.myMainElCascader[index])
				  // let list = this.$refs.myMainElCascader[index].inputValue;
		          // const foodName = list.get(list.size() - 1).replace(" ","");
		          this.mainFoods[index].foodId = value[2]
		          // this.mainFoods[index].foodName = foodName
		          this.mainFoods[index].cascaderStr = value.join(',')
		          this.recipe.mainFoodId = value[2]
		      } else {
		          // let list = this.$refs.myMainElCascader[index].inputValue;
		          // const foodName = list.get(list.size() - 1).replace(" ","");
		          this.foods[index].foodId = value[2]
		          // this.foods[index].foodName = foodName
		          this.foods[index].cascaderStr = value.join(',')
		          this.recipe.foodId = value[2]
		      }
		  },
		  handleFilterMethod(node,keyword){
			  console.log(node,keyword)
		  	return node.label.indexOf(keyword) !== -1;
		  },
		  handleFilterMethod1(node,keyword){
			    console.log(node,keyword)
		  	return node.label.indexOf(keyword) !== -1;
		  },
		  // 提交
		  handleSubmit(name) {
			this.recipe.detailsText = this.content
		    this.$refs.recipeFrom.validate(async valid => {
			   if (valid) {
				   if(this.recipe.maijiStageLabelIds && this.recipe.maijiStageLabelIds.length>0){
					  this.recipe.maijiStageLabelIds.forEach(item=>{
						  let obj = {
							  labelId: item
						  }
						  this.recipe.labels.push(obj)
					  })
				   }
				   if(this.recipe.areaLabelIds && this.recipe.areaLabelIds.length>0){
					  this.recipe.areaLabelIds.forEach(item=>{
						  let obj = {
							  labelId: item
						  }
						  this.recipe.labels.push(obj)
					  })
				   }
				   if(this.recipe.recipeLabelIds && this.recipe.recipeLabelIds.length>0){
					  this.recipe.recipeLabelIds.forEach(item=>{
						  let obj = {
							  labelId: item
						  }
						  this.recipe.labels.push(obj)
					  })
				   }
				   if (this.aliases != null) this.recipe.alias = this.aliases.join('、')
				   this.recipe.foods = [...this.mainFoods, ...this.foods]
				   let indexToDelete = this.recipe.foods.findIndex(item => item.foodId === "");
				   this.recipe.foods.splice(indexToDelete,1);
				   this.recipe.detailsText = dealImg(this.recipe.detailsText)
				   this.recipe.threeMeal = JSON.stringify(this.recipe.threeMeal)
				   console.log(this.recipe)
				   addRecipe(this.recipe).then(async (res) => {
						if(res.code == 200){
							setTimeout(() => {
							  this.spinShow = false;
							  this.$router.push({ path: this.$routeProStr + '/recipe/list' });
							}, 500);
						}else{
							setTimeout((e) => {
							  this.spinShow = false;
							}, 1000);
							this.$message.error(res.msg);
						}
				   }).catch(err => {
						setTimeout((e) => {
						  this.spinShow = false;
						}, 1000);
						this.$message.error("保存失败");
				   })
			   }
		    })
		  },
	  }
    }
</script>

<style lang="scss" scoped>
    .el-form-item {
        text-align: left;
    }
	.head {
	  position: relative;
	  padding: 0 15px;
	  margin-bottom: 40px;
	  .edit-btn {
	    position: absolute;
	    right: 10px;
	    top: 0px;
	    display: flex;
	    align-items: center;
	  }
	}
</style>