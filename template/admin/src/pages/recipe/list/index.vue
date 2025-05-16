<template>
	<div>
		<el-card :bordered="false" shadow="never" class="ivu-mt" :body-style="{ padding: 0 }">
			<div class="padding-add">
				<el-form
					ref="recipeFrom"
					:model="recipeFrom"
					label-width="100px"
					label-position="right"
					@submit.native.prevent
					inline
				>
					<div class="acea-row search-form">
						<div>
							<el-form-item label="食谱名称：" label-for="name">
								<el-input
									v-model="recipeFrom.name"
									placeholder="食谱名称或别名关键字"
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
			  <el-tab-pane label="美食推荐" name="美食推荐"/>
			  <el-tab-pane label="第一阶段" name="6308160d8ee04bdcb100c4bb5858ef05"/>
			  <el-tab-pane label="第二阶段" name="2dc29ab0c29443a38edd615fafef47510"/>
			</el-tabs>
			<el-row :gutter="24" justify="space-between">
				<el-col :span="24">
					<router-link v-auth="['admin-recipe-save']" :to="$routeProStr + '/recipe/add_recipe'">
						<el-button type="primary">添加食谱</el-button>
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
				:data="recipeList"
				class="mt16"
				ref="table"
				highlight-current-row
				v-loading="loading"
				empty-text="暂无数据"
				no-filtered-userFrom-text="暂无筛选结果"
				@sort-change="sortChanged"
			>
				<el-table-column type="selection" :selectable="isSel" width="55"> </el-table-column>
				<el-table-column label="主图">
					<template slot-scope="scope">
					  <div class="tabBox_img" v-viewer v-if="scope.row.mainImage">
					    <img v-lazy="scope.row.mainImage.smallUrl" v-if="scope.row.mainImage.smallUrl"/>
					  </div>
					</template>
				</el-table-column>
				<el-table-column label="食谱名称" prop="name">
				</el-table-column>
				<el-table-column label="食谱别名" prop="alias">
				</el-table-column>
				<el-table-column label="浏览次数"
				                 prop="look_up_no"
				                 sortable="custom">
					<template slot-scope="scope">
						<span>{{scope.row.lookUpNo}}</span>
					</template>
				</el-table-column>
				<el-table-column label="收藏数量"
				                 prop="collection_no"
				                 sortable="custom">
					<template slot-scope="scope">
						<span>{{scope.row.collectionNo}}</span>
					</template>
				</el-table-column>
				<el-table-column label="点赞数量"
				                 prop="thumbs_up_no"
				                 sortable="custom"
				                 >
					<template slot-scope="scope">
						<span>{{scope.row.thumbsUpNo}}</span>
					</template>
				</el-table-column>
				<el-table-column label="上传时间"
				                 prop="upload_time"
				                 sortable="custom"
				                 >
					<template slot-scope="scope">
						<span>{{scope.row.uploadTime}}</span>
					</template>
				</el-table-column>
				<el-table-column label="修改时间"
				                 prop="update_time"
				                 sortable="custom"
				                 >
					<template slot-scope="scope">
						<span>{{scope.row.updateTime}}</span>
					</template>
				</el-table-column>
				<el-table-column label="美食推荐" fixed="right" v-if="labelId == '美食推荐'">
				    <template slot-scope="scope">
				        <el-tag v-show="scope.row.isRecommend">推荐&nbsp;<i class="el-icon-star-on"/></el-tag>
				        <el-tag type="info" v-show="!scope.row.isRecommend">未推荐</el-tag>
				    </template>
				</el-table-column>
				<el-table-column label="推荐操作" fixed="right" v-if="labelId == '美食推荐'">
				    <template v-slot="{ row, index }">
				        <el-button type="danger" size="small" v-if="row.isRecommend"
				                   @click="cancelRecommendHadle(row, '取消推荐', index)">取消推荐&nbsp;<i class="el-icon-minus"/>
				        </el-button>
				    </template>
				</el-table-column>
				<el-table-column label="操作" fixed="right">
				    <template v-slot="{ row, index }">
						<a @click="recipeDetail(row)">详情</a>
						<!-- <el-divider direction="vertical"></el-divider>
						<a @click="createFood(scope.row)">复制</a> -->
						<el-divider direction="vertical"></el-divider>
						<a @click="delRecipe(row, '删除食谱', index)">删除</a>
				    </template>
				</el-table-column>
			</el-table>
			<div class="acea-row row-right page">
				<pagination
					v-if="total"
					:total="total"
					:page.sync="recipeFrom.page"
					:limit.sync="recipeFrom.limit"
					@pagination="pageChange"
				/>
			</div>
		</el-card>
		<recipe-details ref="recipeDetails"></recipe-details>
	</div>
</template>

<script>
	import {recipeList,recipeDeleteApi,cancelRecommendApi} from '@/api/recipe';
	import recipeDetails from './handle/recipeDetails.vue';
	export default {
		name: 'recipe_list',
		components: {
		    recipeDetails,
		},
		data() {
			return {
				recipeList: [],
				selectionList: [],
				labelId: '全部',
				recipeFrom: {
					labelId: '全部',
				    name: '',
				    page: 1,
				    limit: 15,
				    order: "desc",
				    orderBy: "update_time"
				},
			    loading: false,
				total: 0,
				modals: false
			}
		},
		created() {
			this.getList();
		},
		methods: {
			// 搜索
			recipeSearchs() {
				this.recipeFrom.page = 1;
				this.getList();
			},
			getList(){
				this.loading = true;
				recipeList(this.recipeFrom).then(async (res) => {
					// console.log(res)
					let data = res.data;
					this.recipeList = data.list;
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
				this.recipeFrom.page = 1;
			    this.recipeFrom.labelId = this.labelId
			    // console.log(this.recipeFrom.labelId)
			    this.getList();
			},
			reset(name) {
			    this.recipeFrom = {
					labelId: '全部',
				    name: '',
				    page: 1,
				    limit: 15,
				    order: "desc",
				    orderBy: "update_time"
			    };
			    this.getList();
			},
			sortChanged(e, props, order) {
			    this.recipeFrom.orderBy = e.prop
				this.recipeFrom.order = e.order.replace("ending","");
			    this.getList();
			},
			recipeDetail(row) {
			    this.$refs.recipeDetails.modals = true;
			    this.$refs.recipeDetails.getDetails(row.uuId);
			},
			delRecipe(row, tit, num){
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
				  recipeDeleteApi({recipeId: row.uuId})
					.then((res) => {
					  this.$message.success(res.msg);
					  this.getList();
					})
					.catch((res) => {
					  this.$message.error(res.msg);
					});
				})
			},
			cancelRecommendHadle(row, tit, num) {
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
				  cancelRecommendApi({recipeId: row.uuId})
					.then((res) => {
					  this.$message.success(res.msg);
					  this.getList();
					})
					.catch((res) => {
					  this.$message.error(res.msg);
					});
				})
			},
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