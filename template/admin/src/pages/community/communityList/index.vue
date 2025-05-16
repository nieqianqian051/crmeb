<template>
	<div>
		<el-card :bordered="false" shadow="never" class="ivu-mt" :body-style="{ padding: 0 }">
			<div class="padding-add">
				<el-form
					ref="userFrom"
					:model="userFrom"
					label-width="80px"
					label-position="right"
					@submit.native.prevent
					inline>
					<div class="acea-row search-form">
						<el-form-item label="动态话题：" label-for="act" prop="act">
							<el-select
								v-model="userFrom.act"
								placeholder="动态话题：请选择"
								clearable style="width: 180px;">
							    <el-option
									v-for="act in selectDataLabel"
									:key="act.uuId"
									:label="act.actName"
									:value="act.actName"/>
							</el-select>
						</el-form-item>
						<el-form-item label="用户名：" label-for="nickName" prop="nickName">
							<el-input
								v-model="userFrom.nickName"
								placeholder="用户名关键词搜索"
								style="width: 180px;"
								class="form_content_width">
							</el-input>
						</el-form-item>
						<el-form-item label="动态内容：" label-for="content" prop="content">
							<el-input
								v-model="userFrom.content"
								placeholder="动态内容关键词搜索"
								style="width: 180px;"
								class="form_content_width">
							</el-input>
						</el-form-item>
						<el-form-item label="发布时间：" label-for="publishTimes">
							<el-date-picker
								clearable
								v-model="regDates"
								type="daterange"
								format="yyyy-MM-dd"
								value-format="yyyy-MM-dd"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								@change="handleChange"
								:picker-options="pickerOptions"
								style="width: 250px"
								class="mr20"></el-date-picker>
						</el-form-item>
						<el-form-item class="search-form-sub">
							<el-button type="primary" @click="comSearch">搜索</el-button>
							<el-button class="ResetSearch" @click="reset('userFrom')">重置</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card :bordered="false" shadow="never" class="ivu-mt mt16" :body-style="{ padding: '0 20px 20px' }">
			<el-tabs v-model="userFrom.priority" @tab-click="onClickTab">
			  <el-tab-pane :label="item.name" :name="item.type" v-for="(item, index) in headeNum" :key="index" />
			</el-tabs>
			<el-table :data="communityList"
					class="mt16"
					ref="table"
					highlight-current-row
					v-loading="loading"
					empty-text="暂无数据"
					no-filtered-userFrom-text="暂无筛选结果"
					@sort-change="sortChanged"
					@select="handleSelectRow"
					@select-all="handleSelectAll"
					@row-click="handleRowClick">
				<el-table-column label="ID" type="index" width="80" align="center" />
				<el-table-column label="头像" width="80">
					<template slot-scope="scope">
						<div class="tabBox_img" v-viewer>
							<img v-lazy="scope.row.user.headUrl" v-if="scope.row.user && scope.row.user.headUrl && /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i.test(scope.row.user.headUrl)"/>
							<img src="../../../assets/images/maijiCat.png" v-else/>
						</div>
					</template>
				</el-table-column>
				<el-table-column
				  label="用户名"
				  width="180"
				  show-overflow-tooltip>
				  <template slot-scope="scope">
				  	<div>
						{{ scope.row.user.nickName || '麦吉用户' }}
				  	</div>
				  </template>
				</el-table-column>
				<el-table-column label="动态话题/内容" width="352" show-overflow-tooltip>
				  <template slot-scope="scope">
				    <span style="color: gray;">标题：</span>
				    <span>{{ scope.row.title || '—' }}</span>
				    <br />
				    <span style="color: gray;">内容：</span>
				    <span>{{ scope.row.content }}</span>
				  </template>
				</el-table-column>
				<el-table-column
					label="发布时间"
					width="180">
					<template slot-scope="scope">
						{{ scope.row.publishTime | dateFormatter }}
					</template>
			    </el-table-column>
				<el-table-column label="动态标签" width="180" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.labelIds.length == 0">普通动态</span>
						<span style="color:#2db2ea;margin-left: 15px;" v-if="scope.row.labelIds.includes(1)">首页推荐</span> 
						<span style="color:#ffa93c;margin-left: 15px;" v-if="scope.row.labelIds.includes(3)">精选动态</span><br>
						<span style="color:#8f7ee5;" v-if="scope.row.labelIds.includes(2)">案例动态</span>
						<span style="color:#8f7ee5;margin-left: 15px;" v-if="scope.row.labelIds.includes(0)">优质动态</span> 
						<span style="color:#34d384;margin-left: 15px;" v-if="scope.row.isTop == 1 && ! ['1', '2', '3'].includes(userFrom.priority)">全局置顶</span>
						<el-tag
							type="danger"
							size="mini"
							v-if="userFrom.isolation && scope.row.examined == 1"
							>自动审核</el-tag>
						<el-tag
							type="danger"
							size="mini"
							v-if="userFrom.isolation && scope.row.examined == 2"
							>人工审核</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="回复用户" width="100" align="center">
				    <template slot-scope="scope">
						<el-popover
							width="250"
							ref="popover"
							trigger="click"
							popper-popper-class="myPopper"
							style="margin-left: 10px;" >
							<el-input
								type="textarea"
								:rows="3"
								v-model="scope.row.rcontent"
								placeholder="请输入回复内容"
								style="width: 100%;"/>
							<el-button
								type="primary"
								size="mini"
								plain
								@click="commentMsg(scope)"
								style="width: 100%; margin-top: 10px;"
								>确定</el-button>
							<span slot="reference" style="color: #409EFF; cursor: pointer;">
							回复
							</span>
						</el-popover>
				    </template>
				</el-table-column>
				<el-table-column label="详情/评论" width="150" align="center">
					<template slot-scope="scope">
						<el-badge :value="scope.row.commentedCount" class="item_a">
							<el-button type="text" size="mini" @click="showDialog(scope.row.msgId)">查看详情</el-button>
						</el-badge>
					</template>
				</el-table-column>
				<el-table-column label="置顶序号" width="80" fixed="right" v-if="userFrom.priority == '5'">
					<template slot-scope="scope">
						<el-input size="mini" width="80"
							v-model="scope.row.topSort" 
							@blur="editArticle(Object.assign(scope.row, {isTop: 1}), 1)">
						</el-input>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					fixed="right"
					width="200"
					v-if="['-1'].includes(userFrom.priority)"
					align="center">
					<template slot-scope="scope" v-if="['-1', '0'].includes(userFrom.priority)">
						<el-button
							type="text"
							size="mini"
							@click="auditClick(scope.row)"
							v-if="!scope.row.isolation"
							>审核</el-button>
						<el-button
							type="text"
							size="mini"
							@click="editArticle(Object.assign(scope.row, {isolation: false}), 1)"
							v-if="scope.row.isolation"
							style="color: red;"
							>取消屏蔽</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="200" fixed="right" v-if="userFrom.priority != '-1'">
					<template slot-scope="scope">
						<el-button
							type="text"
							size="mini"
							@click="auditClick(scope.row)"
							v-if="!scope.row.isolation"
						>重新审核</el-button>
					<el-button
						v-if="userFrom.priority != '6'"
						type="text"
						size="mini"
						style="color:red"
						@click="editArticle(Object.assign(scope.row, {isolation: true, examined: 1}), 1)">
						屏蔽 </el-button>
					<el-button
						v-if="userFrom.priority == '6'"
						type="text"
						size="mini"
						@click="editArticle(Object.assign(scope.row, {isolation: false}), 1)"
						style="color: red;">取消屏蔽</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="acea-row row-right page">
				<pagination
				  v-if="total"
				  :total="total"
				  :page.sync="userFrom.page"
				  :limit.sync="userFrom.limit"
				  @pagination="pageChange"/>
			</div>
		</el-card>
	    <articleDetails ref="articleDetails" :msgId="msgId"></articleDetails>
		<commentAudit :auditValue ="auditValue" @funclick="getMKsgForson"></commentAudit>
	</div>
</template>
<script>
	import { communityList,comActivityList,commentMsgApi,
		editComMsgInfoApi,editComMiddleLabelApi } from '@/api/community';
	import articleDetails from '../articleDetails';
	import commentAudit from '../commentAudit';
	export default {
		name: 'community_list',
		components: {
		  commentAudit,
		  articleDetails
		},
		data() {
			return {
				msgId: '',
				numerical:0,
				auditValue:[],
				total: 0,
				loading: false,
				communityList: [],
				userFrom: {
					priority: '-1',
					act: '',
				    content: '',
					isolation: false,
					nickName: '',
					publishTime1: '',
					publishTime2: '',
					page: 1,
					limit: 15
				},
				headeNum: [
					{ type: '-1', name: '待审核' },
					{ type: '0', name: '优质动态' },
					{ type: '5', name: '置顶动态' },
					{ type: '1', name: '推荐动态' },
					{ type: '3', name: '精选动态' },
					{ type: '2', name: '案例动态' },
					{ type: '4', name: '积分动态' },
					{ type: '-2', name: '审核拒绝' },
					{ type: '6', name: '屏蔽动态' },
				],
				selectedIds: [],
				regDates: [],
				pickerOptions: {
				    shortcuts: [
				        {
				            text: "最近一周",
				            onClick(picker) {
				                const start = new Date();
				                start.setDate(start.getDate() - 6);
				                picker.$emit("pick", [start, new Date()]);
				            }
				        },
				        {
				            text: "最近两周",
				            onClick(picker) {
				                const start = new Date();
				                start.setDate(start.getDate() - 13);
				                picker.$emit("pick", [start, new Date()]);
				            }
				        },
				        {
				            text: "最近三周",
				            onClick(picker) {
				                const start = new Date();
				                start.setDate(start.getDate() - 20);
				                picker.$emit("pick", [start, new Date()]);
				            }
				        },
				        {
				            text: "最近一月",
				            onClick(picker) {
				                const start = new Date();
				                start.setMonth(start.getMonth() - 1);
				                picker.$emit("pick", [start, new Date()]);
				            }
				        },
				        {
				            text: "最近两月",
				            onClick(picker) {
				                const start = new Date();
				                start.setMonth(start.getMonth() - 2);
				                picker.$emit("pick", [start, new Date()]);
				            }
				        },
				        {
				            text: "最近三月",
				            onClick(picker) {
				                const start = new Date();
				                start.setMonth(start.getMonth() - 2);
				                picker.$emit("pick", [start, new Date()]);
				            }
				        },
				        {
				            text: "最近半年",
				            onClick(picker) {
				                const start = new Date();
				                start.setMonth(start.getMonth() - 6);
				                picker.$emit("pick", [start, new Date()]);
				            }
				        },
				        {
				            text: "最近一年",
				            onClick(picker) {
				                const start = new Date();
				                start.setFullYear(start.getFullYear() - 1);
				                picker.$emit("pick", [start, new Date()]);
				            }
				        }
				    ]
				},
				selectDataLabel: []
			}
	    },
		created() {
			this.getList();
		},
		mounted() {
			this.getComActivity();
		},
		filters: {
			dateFormatter (datetime) {
				if(datetime) {
					datetime = new Date(datetime);
					let y = datetime.getFullYear() + '-'
					let yue = datetime.getMonth()+1;
					let mon = yue < 10 ? '0'+yue+'-' : yue+'-'
					let d = datetime.getDate() < 10 ? '0'+datetime.getDate() : datetime.getDate()
					let hours = datetime.getHours() < 10 ? '0' + datetime.getHours() + ':' : datetime.getHours() + ':'
					let minutes = datetime.getMinutes() < 10 ? "0" +datetime.getMinutes()+":" : datetime.getMinutes()+":"
					let seconds = datetime.getSeconds() < 10 ? "0"+datetime.getSeconds() : datetime.getSeconds()
					return y + mon + d + '\n' + hours + minutes + seconds
				}
				return '—'
			},
		},
	    methods: {
			onClickTab() {
				this.userFrom.page = 1;
				this.communityList = [];
				this.getList();
			},
			pageChange() {
				this.communityList = [];
				this.getList();
			},
			sortChanged(e, props, order) {
				this.userFrom[e.prop] = e.order.replace("ending","");
				this.getList();
			},
			handleSelectRow(selection, row) {
				let ids = [];
					selection.map((e) => {
					ids.push(e.uid);
				});
				this.selectedIds = ids;
				this.$nextTick(() => {
					//确保dom加载完毕
					this.setChecked();
				});
			},
			handleSelectAll(selection) {
				let ids = [];
				selection.map((e) => {
					ids.push(e.uid);
				});
				this.selectedIds = ids;
				this.$nextTick(() => {
					//确保dom加载完毕
					this.setChecked();
				});
			},
			setChecked() {
				//将new Set()转化为数组
				this.ids = [...this.selectedIds];
				// 找到绑定的table的ref对应的dom，找到table的objData对象，objData保存的是当前页的数据
				let objData = this.$refs.table.objData;
				for (let index in objData) {
					if (this.selectedIds.has(objData[index].uid)) {
						objData[index]._isChecked = true;
					}
				}
			},
			getComActivity() {
				comActivityList().then(res=>{
					let arr = []
					res.data.forEach(function(item){
						let obj = {
							...item,
							actName : "#"+item.actName+"#"
						}
						arr.push(obj)
					})
					this.selectDataLabel = arr
				})	
			},
			getList() {
				this.loading = true;
				communityList(this.userFrom).then(async (res)=>{
					let data = res.data;
					this.communityList = data.list;
					this.total = data.count;
					this.loading = false;
					this.$nextTick(() => {
						this.setChecked();
					});
				}) .catch((res) => {
					this.loading = false;
					this.$message.error(res.msg);
				});
			},
			async commentMsg(scope) {
				const data = {
					belongId: scope.row.msgId,
					content: scope.row.rcontent,
					status: 0,
				};
				const result = await commentMsgApi(data);
				if (result.code != 200)
					return this.$message.error(`回复失败，请稍后重试`);
				document.body.click() 
				this.$refs['popover'].doClose();
				return this.$message.success(`回复成功，请点击查看评论`);
			},
			handleRowClick() {
				
			},
			showDialog(msgId) {
				this.$refs.articleDetails.dynamic = true;
				this.msgId = msgId
				this.$refs.articleDetails.getDetails(msgId);
				this.$refs.articleDetails.findAllComments();
			},
			async editArticle(row, type) {
				let result = {};
				if (type == 1) result = await editComMsgInfoApi(row);
				if (type == 2) result = await editComMiddleLabelApi(row);
				if (result.code != 200)
				return this.$message.error(`设置失败，请稍后重试`);
				this.getList();
				Array.from(document.getElementsByClassName("myPopper")).forEach(
					(ep) => (ep.style.display = "none")
				);
				return this.$message.success(`设置成功`);
			},
			auditClick(value){
				this.numerical++
				this.auditValue =[value,this.numerical]     
			},
			getMKsgForson(data){
				this.getList();
			},
			comSearch() {
				this.userFrom.page = 1;
				this.communityList = [];
				this.getList();
			},
			reset(name) {
				this.$refs[name].resetFields();
				this.regDates = []
				this.userFrom.publishTime1 = ''
				this.userFrom.publishTime1 = ''
			    this.communityList = [];
			    this.getList();
			},
			handleChange(e) {
				this.regDates = e || [];
				if(this.regDates.length===0){
					this.userFrom.publishTime1 = ''
					this.userFrom.publishTime2 = ''
				}else{
					this.userFrom.publishTime1 = e[0]
					this.userFrom.publishTime2 = e[1]
				}	
			}
	    }
	}
</script>

<style scoped lang="scss">
::v-deep .el-tabs__item {
  height: 54px !important;
  line-height: 54px !important;
}
::v-deep .el-badge__content.is-fixed {
	top: 8px !important;
}
.picBox {
  display: inline-block;
  cursor: pointer;

  .upLoad {
    width: 58px;
    height: 58px;
    line-height: 58px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.02);
    font-size: 24px;
    font-weight: 500;
  }

  .pictrue {
    width: 60px;
    height: 60px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.userFrom {
  ::v-deep .ivu-form-item-content {
    margin-left: 0px !important;
  }
}

.userAlert {
  margin-top: 20px;
}

.userI {
  color: var(--prev-color-primary);
  font-style: normal;
}

img {
  height: 36px;
  display: block;
}

.tabBox_img {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}

.tabBox_tit {
  width: 60%;
  font-size: 12px !important;
  margin: 0 2px 0 10px;
  letter-spacing: 1px;
  padding: 5px 0;
  box-sizing: border-box;
}

.modelBox {
  ::v-deep .ivu-modal-body {
    padding: 0 16px 16px 16px !important;
  }
}

.vipName {
  color: #dab176;
}

.listbox {
  ::v-deep .ivu-divider-horizontal {
    margin: 0 !important;
  }
}

.labelInput {
  width: 180px;
  border: 1px solid #dcdee2;
  padding: 0 15px;
  border-radius: 5px;
  min-height: 30px;
  cursor: pointer;
  font-size: 12px;
  .span {
    color: #c5c8ce;
  }

  .ivu-icon-ios-arrow-down {
    font-size: 14px;
    color: #808695;
  }
}

.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
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
