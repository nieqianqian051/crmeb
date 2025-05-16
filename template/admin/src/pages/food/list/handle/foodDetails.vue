<template>
	<div style="width: 100%;padding:25px">
		<el-drawer :visible.sync="modals" :title="activeName" 
		:wrapperClosable="false" :size="1100" 
		destroy-on-close @close="draChange" v-loading="loading">
			<div class="acea-row head">
				<div class="edit-btn">
					<el-button type="primary" @click="editSave">保存</el-button>
				</div>
			</div>
			<el-row>
				<el-form ref="foodFrom" :model="food" 
				label-width="100px" label-position="right">
				    <el-row>
				        <el-col :span="24" ref="left">
				            <el-form-item label="食材名称" prop="name" 
							:rules="[{required: 'true', message: '食材名称不能为空'}]">
				                <el-input v-model="food.name" placeholder="请输入食材名称"/>
				            </el-form-item>
 				            <el-form-item label="食材别名" v-for="(alias, index) in aliases" :key="index">
				                <el-input v-model="aliases[index]" placeholder="请输入食材别名">
				                    <template slot="append">
				                        <el-tooltip content="增加别名" placement="top" effect="light">
				                            <el-button @click="aliases.push('')">
												<i class="el-icon-plus"/></el-button>
				                        </el-tooltip>
				                        <el-tooltip content="减少别名" 
										placement="top" effect="light" v-show="aliases.length > 1">
				                            <el-button @click="aliases.splice(index, 1)">
												<i class="el-icon-minus"/></el-button>
				                        </el-tooltip>
				                    </template>
				                </el-input>
				            </el-form-item>
				          <el-form-item label="食材主图" prop="mainImageId" 
						  :rules="[{required: 'true', message: '食材主图不能为空'}]">
				                <span style="color: gray;">建议图片尺寸：345 * 345</span>
				                <el-upload action="" list-type="picture-card" :limit="1"
				                           :http-request="addFoodMainImage"
				                           :file-list="foodMainImage? [foodMainImage]: []"
				                           :on-exceed="() => $message.warning(`只能上传1张食材主图`)">
				                    <el-button size="small" type="primary">点击上传</el-button>
				                </el-upload>
				            </el-form-item>
				             <el-form-item label="食材分类" prop="typeLabelId" 
							 :rules="[{required: 'true', message: '食材分类不能为空'}]">
				                <el-cascader 
									v-model="cascader" 
									:options="foodTypes" 
									placeholder="试试搜索: 请选择食材分类"
									style="width: 100%;"
									:filterable="true"
									:filter-method="handleFilterMethod"/>
				            </el-form-item>
				            <el-form-item label="关联商品">
				                <el-button plain type="info"
								@click="relevantGoodsShowChange(true)"
				                           style="width: 100%; margin-bottom: 10px;">
										   <i class="el-icon-plus"/></el-button>
				                <el-table stripe :data="relevantGoodsTable"
				                          :show-header="true"
										  v-show="relevantGoodsTable.length != 0"
				                          :header-cell-style="{backgroundColor: '#DCDFE6'}"
				                          :cell-style="{paddingTop: '7px', paddingBottom: 0}">
				                    <el-table-column label="主图" width="65">
				                        <template slot-scope="scope">
				                            <img :src="scope.row.mainImage.url" width="45" height="45"/>
				                        </template>
				                    </el-table-column>
				                    <el-table-column label="商品名称" width="115"
				                                     prop="name"
				                                     show-overflow-tooltip/>
				                    <el-table-column label="库存数量" width="90"
				                                     :formatter="(row) => row.stockVolume + ' 件'"/>
				                    <el-table-column label="现价格" width="80"
				                                     :formatter="(row) => row.presentPrice + ' 元'"/>
				                    <el-table-column label="操作" min-width="80">
				                        <template slot-scope="scope">
				                            <el-button type="danger" size="small"
				                                       >
				                                取消
				                            </el-button>
				                        </template>
				                    </el-table-column>
				                </el-table>
				            </el-form-item>
				            <el-form-item label="麦吉阶段">
				              <el-checkbox-group v-model="food.maijiStageLabelIds" style="width: 350px;">
				                <el-checkbox v-for="(label,index) in allMaijiStageLabels" 
								:key="index" :label="label.uuId">{{label.name}}</el-checkbox>
				              </el-checkbox-group>
				            </el-form-item>
				            <el-form-item label="食材标签">
				              <el-checkbox-group v-model="food.foodLabelIds" style="width: 350px;">
				                <el-checkbox v-for="(label,index) in foodLabels" 
								:key="index" :label="label.uuId">{{label.name}}</el-checkbox>
				               <!-- <el-button icon="el-icon-plus" circle size="mini" 
								 style="margin-left: 20px;"></el-button> -->
				              </el-checkbox-group>
				            </el-form-item>
							<el-form-item label="食材热量" prop="heat" 
							:rules="[{required: 'true', message: '食材热量不能为空'}]">
							  <el-input placeholder="请输入食材热量" v-model="food.heat">
							    <!-- <template slot="append">千卡</template> -->
								 <template slot="append">千卡/100克</template>
							  </el-input>
							</el-form-item>
							<div v-for="(nc, index) in ncs">
							  <el-form-item label="营养元素">
							    <el-autocomplete v-model="ncs[index].element" 
								:fetch-suggestions="querySearch"
							                     placeholder="请输入元素名称" style="width: 100%;">
							      <template slot="prepend">名称</template>
							      <template slot="append">
							        <el-tooltip content="增加营养元素" placement="top" effect="light">
							          <el-button @click="ncs.push({element: '',value: ''})"><i class="el-icon-plus"/>
							          </el-button>
							        </el-tooltip>
							        <el-tooltip content="减少营养元素" placement="top" 
									effect="light" v-show="ncs.length > 1">
							          <el-button @click="ncs.splice(index, 1)"><i class="el-icon-minus"/></el-button>
							        </el-tooltip>
							        <br/>
							      </template>
							    </el-autocomplete>
							    <el-input v-model="ncs[index].value" placeholder="请输入元素含量"
							              style="width: 100%; margin-top: 10px;">
							      <template slot="prepend">含量</template>
							      <template slot="append">克/100克</template>
							    </el-input>
							  </el-form-item>
							</div>
							<el-form-item label="食材简介">
							  <el-input type="textarea" :rows="2" v-model="food.description" placeholder="请输入食材简介"/>
							</el-form-item>
							<el-form-item label="注意事项">
							  <el-input type="textarea" :rows="2" v-model="food.remark" placeholder="请输入食材注意事项"/>
							</el-form-item>
				        </el-col>
				    </el-row>
				</el-form>
			</el-row>
        </el-drawer>
    </div>
</template>

<script>
import { detailsApi,uploadFoodImages,editFood,findAllFoodTypes } from '@/api/food';
import {dealImg} from "@/utils/index"
export default {
  name: 'foodDetails',
  data() {
    return {
		activeName: '食材详情',
		modals: false,
		loading: false,
		foodTypes: [],
		aliases: [''],
		ncs: [{element: '脂肪', value: ''}, {element: '蛋白质', value: ''}, {element: '膳食纤维', value: ''}, {element: '碳水化合物', value: ''}],
		cascader: [],
		food: {
		    uuId: '',
		    name: '',
		    alias: '',
		    mainImageId: '',
		    detailText: '',
		    description: '',
		    remark: '',
		    heat: '',
		    goods: [],
		    typeLabelId: '',
		    cascaderStr: '',
		    maijiStageLabelIds: [],
		    foodLabelIds: [],
		},
		foodMainImage: null,
		foodAreaLabels: [],
		allMaijiStageLabels: [
			{
				uuId: "57142cf72651433590d4724aeaa5a307", 
				name: "第一阶段", 
				orderNo: 1, 
				listShow: 1, 
				source: "食材",
			},
			{
				uuId: "e8a88718dcb44004aba992d46cc16c5d", 
				name: "第二阶段", 
				orderNo: 2, 
				listShow: 1, 
				source: "食材",
			}
		],
		foodLabels: [
			{
				uuId: "e8a88718dc465265626552d46cc16123", 
				name: "推荐", 
				orderNo: 3, 
				listShow: 0, 
				desc: "",
				url: "?uuId=e8a88718dc465265626552d46cc16123"
			},
		],
		relevantGoodsTable: []
    };
  },
  created() {},
  mounted() {
  },
  methods: {
	// 获取所有食材分类
	findAllFoodTypes() {
	    findAllFoodTypes().then(async (res) => {
			if (res.code == 200){
				this.foodTypes = res.data.map(type => {
				    if (type.children && type.children.length >1)
				        type.children.sort((c1, c2) =>c1.label.length - c2.label.length)
				    return type
				}).sort((t1, t2) => t1.label.length - t2.label.length)
			} else {
				this.$message.error(res.msg);
			}
		}).catch((err) => {
			this.$message({
				type: "error",
				message: err.msg,
				duration: 1000
			})
		});
	},
	draChange(){
		this.food = {
		    uuId: '',
		    name: '',
		    alias: '',
		    mainImageId: '',
		    detailText: '',
		    description: '',
		    remark: '',
		    heat: '',
		    goods: [],
		    typeLabelId: '',
		    cascaderStr: '',
		    maijiStageLabelIds: [],
		    foodLabelIds: [],
		}
		this.cascader = []
		this.aliases = ['']
		this.foodMainImage = null
		this.ncs = [{element: '脂肪', value: ''}, {element: '蛋白质', value: ''}, {element: '膳食纤维', value: ''}, {element: '碳水化合物', value: ''}]
		this.relevantGoodsTable = []
	},
	editSave() {
	  this.$refs.foodFrom.validate(async valid => {
	      if (!valid) {
	          return this.$message({
				type: "error",
				message: "编辑食材失败，请确认编辑规范！",
				duration: 1000
			})
	      }	 
		  console.log(this.cascader)
		  this.food.cascaderStr = this.cascader.join(",")
		  this.food.typeLabelId = this.cascader[1]
		  this.food.labels = [...this.food.maijiStageLabelIds, ...this.food.foodLabelIds].map(labelId => Object.assign({labelId}))
		  this.food.alias = this.aliases && this.aliases.join('、')
		  this.food.goods = this.relevantGoodsTable.map(goods => Object.assign({goodsId: goods.uuId}))
		  this.food.ncs = [...this.ncs, {element: '热量', value: this.food.heat}]
		  if (this.food.detailText) this.food.detailText = dealImg(this.food.detailText)
	      this.loading = true
		  editFood(this.food).then(res=>{
			  console.log(res)
			if (res.code == 200) {
			  this.$message.success('保存成功！')
			  setTimeout(()=>{
				  this.getDetails(this.food.uuId);
				  this.loading = false
			  },2000)
			}else{
			  this.loading = false
			  this.$message.error('编辑食材失败！')
			}
		  }).catch(err=>{
			  this.loading = false
			  this.$message.error(err)
		  });
	  })
	},
	getDetails(id) {
		this.draChange();
	    detailsApi(id)
		.then(async (res) => {
	      if (res.code === 200) {
			console.log(res)
			Object.assign(this.food, res.data)
			this.aliases = res.data.alias && res.data.alias.split("、") || ['']
			this.cascader = res.data.cascaderStr.split(",")
			this.foodMainImage = res.data.imgData
			this.food.mainImageId = res.data.imgData && res.data.imgData.uuId
			const maijiStageLabelIds = res.data.labelList.filter(label => label.orderNo && label.orderNo < 3)
			if (maijiStageLabelIds && maijiStageLabelIds.length > 0) this.food.maijiStageLabelIds = maijiStageLabelIds.map(label => label.uuId)
			const foodLabelIds = res.data.labelList.filter(label => label.orderNo > 2)
			if (foodLabelIds && foodLabelIds.length > 0) this.food.foodLabelIds = foodLabelIds.map(label => label.uuId)
			// const result2 = await findAllGoodsByFoodIdAjax(foodId);
			// if (result2.status == "SUCCESS") this.relevantGoodsTableChange(result2.data || [])
			const heatNC = res.data.nutrientContentList.filter(nc => nc.element == '热量')
			if (heatNC.length > 0) this.food.heat = heatNC[0].value
			this.ncs = res.data.nutrientContentList.filter(nc => nc.element != '热量')
	      } else {
			  this.$message({
			  	type: "error",
			  	message: res.msg,
			  	duration: 1000
			  })
	      }
	    })
	    .catch((err) => {
			this.$message({
				type: "error",
				message: err,
				duration: 1000
			})
	    });
	},
	relevantGoodsShowChange(){
		
	},
	querySearch(queryString, cb) {
		const queryArr = [{value: '脂肪'}, {value: '蛋白质'}, {value: '膳食纤维'}, {value: '碳水化合物'}, {value: '或输入自定义'}]
		const results = queryString ? queryArr.filter(query => query.value.includes(queryString)) : queryArr
		cb(results)  // 调用 callback 返回建议列表的数据
	},
	// 上传食材主图
	async addFoodMainImage(param) {
	    const imageData = new FormData()
	    imageData.append('uploadFiles', param.file)
	    const result = await uploadFoodImages(imageData)
	    if (result.code != 200) this.$message.error(`上传食材主图失败，请稍后重试！`)
	    this.foodMainImage = Object.assign(result.data[0], {isMain: 1})
	    this.food.mainImageId = this.foodMainImage.uuId
	},
	handleFilterMethod(node,keyword){
		return node.label.indexOf(keyword) !== -1;
	},
	// ElCascaderChange(value, index, isMain) {
	//     if (isMain) {
	//         const foodName = this.$refs.myMainElCascader[index].getCheckedNodes(true)[0].data.label
	//         this.mainFoods[index].foodId = value[2]
	//         this.mainFoods[index].foodName = foodName
	//         this.mainFoods[index].cascaderStr = value.join(',')
	//         this.recipe.mainFoodId = value[2]
	//     } else {
	//         const foodName = this.$refs.myElCascader[index].getCheckedNodes(true)[0].data.label
	//         this.foods[index].foodId = value[2]
	//         this.foods[index].foodName = foodName
	//         this.foods[index].cascaderStr = value.join(',')
	//         this.recipe.foodId = value[2]
	//     }
	// },
	
  },
};
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

