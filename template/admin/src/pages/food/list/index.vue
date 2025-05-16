<template>
	<div>
		<el-card :bordered="false" shadow="never" class="ivu-mt" :body-style="{ padding: 0 }">
			<div class="padding-add">
				<el-form
					ref="foodForm"
					:model="foodForm"
					label-width="100px"
					label-position="right"
					@submit.native.prevent
					inline
				>
					<div class="acea-row search-form">
						<div>
							<el-form-item label="食材分类：" label-for="typeLabelIds">
							  <el-cascader
							    v-model="foodForm.typeLabelIds"
							    size="small"
							    :options="treeSelect"
							    :props="{ multiple: true, emitPath: false, checkStrictly: true }"
							    clearable
							    class="form_content_width"
							  ></el-cascader>
							</el-form-item>
							<el-form-item label="食材名称：" label-for="name">
								<el-input
									v-model="foodForm.name"
									placeholder="食材名称或别名关键字"
									style="width: 240px;"
									class="form_content_width"
								>
								</el-input>
							</el-form-item>
						</div>
						<el-form-item class="search-form-sub">
							<el-button type="primary" @click="recipeSearchs">搜索</el-button>
							<el-button class="ResetSearch" @click="reset('recipeFrom')">重置</el-button>
						</el-form-item>
					</div>
				
				</el-form>
			</div>
		</el-card>
		<el-card :bordered="false" shadow="never" class="ivu-mt mt16" :body-style="{ padding: '0 20px 20px' }">
			<el-tabs v-model="labelId" @tab-click="onClickTab">
			  <el-tab-pane label="全部" name="全部"/>
			  <el-tab-pane label="推荐" name="e8a88718dc465265626552d46cc16123"/>
			  <el-tab-pane label="第一阶段" name="57142cf72651433590d4724aeaa5a307"/>
			  <el-tab-pane label="第二阶段" name="e8a88718dcb44004aba992d46cc16c5d"/>
			</el-tabs>
			<el-row :gutter="24" justify="space-between">
				<el-col :span="24">
					<router-link v-auth="['admin-food-save']" :to="$routeProStr + '/food/add_food'">
						<el-button type="primary">添加食材</el-button>
					</router-link>
				</el-col>
				<el-col :span="24" class="userAlert" v-if="selectionList.length">
					<el-alert show-icon>
						<template slot="title">
							已选择<i class="userI"> {{ selectionList.length }} </i>项
						</template>
					</el-alert>
				</el-col>
		    </el-row>
			<el-table
				:data="foodList"
				class="mt16"
				ref="table"
				highlight-current-row
				v-loading="loading"
				empty-text="暂无数据"
				no-filtered-userFrom-text="暂无筛选结果"
			>
				<el-table-column type="selection" :selectable="isSel" fixed width="55"> </el-table-column>
				<el-table-column label="主图" width="65">
					<template slot-scope="scope">
					  <div class="tabBox_img" v-viewer>
						<img v-lazy="scope.row.imgData && scope.row.imgData.smallUrl" width="45" height="45"/>
					  </div>
					</template>
				</el-table-column>
				<el-table-column label="食材名称" prop="name" width="165" show-overflow-tooltip/>
				<el-table-column label="食材别名" prop="alias" width="160" show-overflow-tooltip/>
				<el-table-column label="食材描述" prop="description" width="180" show-overflow-tooltip/>
				<el-table-column label="注意事项" prop="remark" width="150" show-overflow-tooltip/>
				<el-table-column label="上传时间" prop="inTime" width="180"/>
				<el-table-column label="操作" fixed="right" min-width="150">
				    <template v-slot="{ row, index }">
						<a @click="foodDetail(row)">详情</a>
						<!-- <el-divider direction="vertical"></el-divider> -->
				<!-- 		<a v-clipboard="copyText" @success="copySuccess"
						   @click="getCustomAttribute(this,row.webUrl)" href="javascript:void(0);"
						   type="success" size="small">复制</a> -->
						<el-divider direction="vertical"></el-divider>
						<a @click="delFood(row, '删除食材', index)">删除</a>
				    </template>
				</el-table-column>
			</el-table>
			<div class="acea-row row-right page">
				<pagination
					v-if="total"
					:total="total"
					:page.sync="foodForm.page"
					:limit.sync="foodForm.limit"
					@pagination="pageChange"
				/>
			</div>
		</el-card>
		<food-details ref="foodDetails"></food-details>
	</div>
</template>

<script>
	import foodDetails from './handle/foodDetails.vue';
	import {foodList,findAllFoodTypes,deleteFood} from '@/api/food';
	export default {
		name: 'food_list',
		components: {
			foodDetails
		},
		data() {
			return {
				copyText: '这是要复制的文本内容',
				foodList: [],
				selectionList: [],
				labelId: '全部',
				foodForm: {
					name: "",
					labelIds: [],
					typeLabelIds: [],
					page: 1,
					limit: 15,
				},
				treeSelect: [],
			    loading: false,
				total: 0,
				modals: false
			}
		},
		watch: {
		    labelId: function (value) {
		        if (value == '全部') this.foodForm.labelIds = []
		        else this.foodForm.labelIds = [value]
		    }
		},
		computed: {
	    },
		mounted() {
		    this.findAllFoodTypes()
		},
		created() {
			this.getList(); 
		},
		methods: {
			getCustomAttribute(that,webUrl) {
				let chat_content = this.$(that).text();
				console.log('copy_text----chat_content==', chat_content);
				console.log(this.$("#talkwords").val(webUrl));
				document.execCommand('copy');
				this.$message.success("复制成功")
			},
			// 获取所有食材分类
			findAllFoodTypes() {
			    findAllFoodTypes().then(async (res) => {
					if (res.code == 200){
						this.treeSelect = res.data.map(type => {
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
			// 搜索
			recipeSearchs() {
				this.foodForm.page = 1;
				this.getList();
			},
			getList(){
				this.loading = true;
				if(this.foodForm.labelIds == ["全部"]) this.foodForm.labelIds = []
				foodList(this.foodForm).then(async (res) => {
					let data = res.data;
					this.foodList = data.list;
					this.total = data.count;
					this.loading = false;
					// this.$nextTick(() => {
					// 	this.setChecked();
					// });
				}).catch((res) => {
					this.loading = false;
					this.$message({
						type: "error",
						message: res.msg,
						duration: 1000
					})
				});
			},
			isSel(row) {
				return !!!row.isDel;
			},
			pageChange() {
				this.selectionList = [];
			    this.getList();
			},
			onClickTab() {
				this.foodForm.page = 1;
			    this.foodForm.labelIds = []
				if(this.labelId != '全部') this.foodForm.labelIds = [this.labelId]
			    this.getList();
			},
			reset(name) {
				this.foodForm = {
					name: "",
					typeLabelIds: []
				},
			    this.getList();
			},
			foodDetail(row) {
			    this.$refs.foodDetails.modals = true;
			    this.$refs.foodDetails.getDetails(row.uuId);
				this.$refs.foodDetails.findAllFoodTypes();
			},
			delFood(row, tit, num){
				const h = this.$createElement
				this.$msgbox({
				  title: '提示',
				  message: h('p', null, [
				    h('div', null, `确定要${tit}吗？`),
				    h('div', null, `${''}`)
				  ]),
				  showCancelButton: true,
				  cancelButtonText: '取消',
				  confirmButtonText: '确定',
				  iconClass: 'el-icon-warning',
				  confirmButtonClass: 'btn-custom-cancel'
				}).then(() => {
				  deleteFood({foodId: row.uuId})
					.then((res) => {
					  this.$message.success(res.msg);
					  this.getList();
					})
					.catch((res) => {
					  this.$message.error(res.msg);
					});
				})
			},
			copySuccess() {
				this.$message.success("复制成功");
			}
		}
    }
</script>

<style scoped lang="scss">
::v-deep .el-tabs__item {
  height: 54px !important;
  line-height: 54px !important;
}

.userAlert {
  margin-top: 20px;
}

.userI {
  color: var(--prev-color-primary);
  font-style: normal;
}

.search-form {
  display: flex;
  justify-content: space-between;
  .search-form-box {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }
}
.search-form-sub {
  display: flex;
}
</style>