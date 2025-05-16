<template>
	<div class="details" v-if="dynamic">
		<div class="details_a">
			<!--动态详情-->
			<div style="width: 79.2%;padding: 10px 20px;background: aliceblue;display: flex;justify-content: space-between;position: fixed;">
				<span>动态详情</span>
				<span @click="dynamicClick">
					<i class="el-icon-close"></i>
				</span>
			</div>
			<!--头像-->
			<div style="display: flex;justify-content: space-evenly;margin-top: 50px;">
				<div style="width:100px;height:100px;">
					<img :src="commentMsg.user.headUrl" v-if="commentMsg.user && commentMsg.user.headUrl" width="100" height="100"/>
					<img src="https://maiji-static-images.oss-cn-beijing.aliyuncs.com/maiji-static-images/7adab52c3646400e9e61d0442874cedc.png" v-else width="100" height="100"/>
				</div>
				<div style="width:80%;height:100px;">
					<ul style="width:100%;height:100%;display: flex;flex-flow: wrap;list-style: none;margin: 0;padding: 0;align-items: center;">
						<li style="width: 300px;">
							<span style="color:#999999;">用户昵称：</span>
							{{commentMsg.user != null ? commentMsg.user.nickName : ''}}
						</li>
						<li style="width: 300px;">
							<span style="color:#999999;">动态标题：</span>
							{{commentMsg.title || '—'}}
						</li>
						<li style="width: 300px;display:flex;align-items: center;">
							<span style="color:#999999;">动态类型：</span>
							<el-tag v-if="commentMsg.priority==0">普通动态</el-tag>
							<el-tag type="success" v-if="commentMsg.priority==1">推荐动态</el-tag>
							<el-tag type="warning" v-if="commentMsg.priority==2">精选动态</el-tag>
							<el-tag type="danger" v-if="commentMsg.priority==3">案例</el-tag>
						</li>
						<li style="width: 300px;">
							<span style="color:#999999;">地理位置：</span>
							<el-tag type="success" v-if="commentMsg.showLocation ==true">显示地理位置</el-tag>
							<el-tag type="danger" v-else>不显示地理位置</el-tag>
						</li>
						<li style="width: 300px;">
							<span style="color:#999999;">未读评论：</span>
							<el-badge :value="commentMsg.notReadCount">
								<span style="color: #409EFF; cursor: pointer;line-height:50px;" @click="commentMsgShowChange(true)">选择动态</span>
							</el-badge>
						</li>
						<li style="width: 300px;">
							<span style="color:#999999;">发布时间：</span>
							{{ commentMsg.publishTime | dateFormatter}}
						</li>
						<li style="width: 300px;">
							<span style="color:#999999;">是否收藏：</span>
							<el-tag type="success" v-if="commentMsg.isCollect ==true">已收藏</el-tag>
							<el-tag type="danger" v-else>未收藏</el-tag>
						</li>
						<li style="width: 300px;">
						<span style="color:#999999;">是否点赞：</span>
						<el-tag type="success" v-if="commentMsg.isPraise ==true">已点赞</el-tag>
						<el-tag type="danger" v-else>未点赞</el-tag>
					</li>
					</ul>
				</div>
			</div>
			<div style="width: 67%;margin:0px auto 0;height: 23px;">
				<ul style="width:100%;height:100%;display: flex;list-style: none;margin: 0;padding: 0;align-items: center;">
					<li style="width: 300px;">
						<span style="color:#999999;">点赞量：</span>
						{{commentMsg.praiseCount}}
					</li>
					<li style="width: 300px;">
						<span style="color:#999999;">访问量：</span>
						{{commentMsg.pu}}
					</li>
					<li style="width: 300px;">
						<span style="color:#999999;">收藏量：</span>
						{{commentMsg.collectCount}}
					</li>
					<li style="width: 300px;">
						<span style="color:#999999;">转发量：</span>
						{{commentMsg.transmitCount}}
					</li>
					<li style="width: 300px;">
						<span style="color:#999999;">评论数量：</span>
						{{commentMsg.commentedCount}}
					</li>
				</ul>
			</div>
			<!--动态内容-->
			<div style="padding:10px 30px;" class="DynamicClass">
				<p style="margin:6px 0px;color:#999999;">动态内容：</p>
				<span v-html="commentMsg.content"></span>
			</div>
			<!--动态图片-->
			<div style="padding:0px 30px;">
				<p style="margin:6px 0px;color:#999999;">动态图片：</p>
				<div style="display: flex;" v-if="commentMsg.files">
					<img
					:src="img.smallUrl"
					v-for="img in commentMsg.files"
					:key="img.uuId"
					style="width:100px;height:100px;margin-left: 20px;"
					@click="dynamicImgclick(img.smallUrl)"/>
				</div>
			</div>
			<!--评论状态-->
			<div style="padding:25px 30px 10px;display: flex;justify-content: space-between;">
				<div>
					<el-select v-model="examine" size="small">
						<el-option label="评论状态：全部评论" :value="2" />
						<el-option label="评论状态：未审核" :value="0" />
						<el-option label="评论状态：审核通过" :value="1" />
						<el-option label="评论状态：审核拒绝" :value="3" />
					</el-select>
					<span style="margin-left: 20px;">用户名搜索:</span>
					<el-input
						v-model="searchComment.content"
						placeholder="用户名关键词搜索"
						size="small"
						style="width: 200px;padding-left: 10px"
						></el-input>
					<span style="margin-left: 20px;">关键词搜索:</span>
					<el-input
						v-model="searchComment.content"
						placeholder="评论内容关键词搜索"
						size="small"
						style="width: 200px; margin-right: 20px;padding-left: 10px"
						></el-input>
					<el-button type="primary" size="small" @click="findAllComments()">搜索</el-button>
					<el-button size="small" @click="searchComment.content = ''; findAllComments()">刷新</el-button>
				</div>
				<div>
					<el-button type="primary" size="small" @click="readCommentBatch(0)">
						审核通过
						<i class="el-icon-check" />
					</el-button>
					<el-button type="danger" size="small" @click="readCommentBatch(3)">
					审核拒绝
					<i class="el-icon-close" />
					</el-button>
				</div>
			</div>
			<!--回复列表-->
			<div style="padding:0px 30px; 0px;">
				<el-table
					stripe
					v-loading="commentTableLoading"
					:data="commentTable"
					@selection-change="(rows) => comments = rows"
					:header-cell-style="{backgroundColor: '#DCDFE6'}"
					:cell-style="{paddingTop: '7px', paddingBottom: '3px'}">
					<el-table-column type="selection" width="45" />
					<el-table-column label="头像" width="70">
						<template slot-scope="scope">
							<img
								:src="scope.row.sourceUser.headUrl"
								v-if="scope.row.sourceUser && scope.row.sourceUser.headUrl"
								width="45"
								height="45"/>
							<img
								src="../../assets/images/maijiCat.png"
								v-else
								width="45"
								height="45"/>
						</template>
					</el-table-column>
					<el-table-column
						label="用户昵称"
						width="100"
						show-overflow-tooltip>
						<template slot-scope="scope">
							{{ scope.row.sourceUser !=null ? scope.row.sourceUser.nickName : '-' }}
						</template>
					</el-table-column>
					<el-table-column label="评论/回复内容" min-width="400">
						<template slot-scope="scope">
							<el-row>
								<el-tooltip :content="scope.row.content" placement="top-start">
									<el-col style="font-weight: bold; width: 50%; padding-right: 10px;" class="mjn">
										<span style="line-height: 39px;">评论内容：{{scope.row.content}}</span>
									</el-col>
								</el-tooltip>
								<el-col style="width: 50%;">
									<el-tag type="info" size="mini" v-if="scope.row.readAlready == 0">未审核</el-tag>
									<el-tag
										type="success"
										size="mini"
										v-if="scope.row.readAlready == 1 && scope.row.delete == 0"
										>审核通过</el-tag>
									<el-tag
										type="danger"
										size="mini"
										v-if="scope.row.readAlready == 1 && scope.row.delete != 0"
										>审核拒绝</el-tag>
									<el-popover
										width="250"
										trigger="click"
										popper-class="myPopper"
										style="margin-left: 10px;">
										<el-input
											type="textarea"
											:rows="3"
											v-model="comment.content"
											placeholder="请输入回复内容"
											style="width: 100%;"/>
										<el-button
											type="primary"
											size="mini"
											plain
											@click="replyComment(scope.row, 2)"
											style="width: 100%; margin-top: 10px;"
											>确定</el-button>
										<span slot="reference" style="color: #409EFF; cursor: pointer;">
											回复
											<i class="el-icon-edit" />
										</span>
									</el-popover>
									<span style="margin: 0 10px;">{{ scope.row.publishTime | dateFormatter }}</span>
									<el-button
										type="text"
										style="color: green;"
										@click="comments = [scope.row]; readComment(0);">
										{{scope.row.readAlready == 1 && '重新' || ''}}审核通过
										<i class="el-icon-check" />
									</el-button>
									<el-button
										type="text"
										style="color: red;"
										@click="comments = [scope.row]; readComment(3);">
										{{scope.row.readAlready == 1 && '重新' || ''}}审核拒绝
										<i class="el-icon-close" />
									</el-button>
								</el-col>
							</el-row>
							<el-row v-for="(cc,index) in scope.row.commentList" :key="index">
								<el-tooltip :content="cc.content" placement="top-start">
									<el-col
										style="color: gray; width: 50%; line-height: 39px; padding-right: 10px;"
										class="mjn"
										>{{cc.sourceUser.nickName}} 回复 {{cc.targetUser.nickName}}：{{cc.content}}</el-col>
								</el-tooltip>
								<el-col style="width: 50%;">
									<el-tag type="info" size="mini" v-if="cc.readAlready == 0">未审核</el-tag>
									<el-tag
										type="success"
										size="mini"
										v-if="cc.readAlready == 1 && cc.delete == 0"
										>审核通过</el-tag>
									<el-tag
										type="danger"
										size="mini"
										v-if="cc.readAlready == 1 && cc.delete != 0"
										>审核拒绝</el-tag>
										<el-popover
											width="250"
											trigger="click"
											popper-class="myPopper"
											style="margin-left: 10px;">
											<el-input
												type="textarea"
												:rows="3"
												v-model="comment.content"
												placeholder="请输入回复内容"
												style="width: 100%;"/>
											<el-button
												type="primary"
												size="mini"
												plain
												@click="replyComment(cc, 1)"
												style="width: 100%; margin-top: 10px;"
												>确定</el-button>
											<span slot="reference" style="color: #409EFF; cursor: pointer;">
												回复
												<i class="el-icon-edit" />
											</span>
										</el-popover>
										<span style="margin: 0 10px;">{{ cc.publishTime | dateFormatter }}</span>
									<el-button
										type="text"
										style="color: green;"
										@click="comments = [cc]; readComment(0);">
										{{cc.readAlready == 1 && '重新' || ''}}审核通过
										<i class="el-icon-check" />
									</el-button>
									<el-button
										type="text"
										style="color: red;"
										@click="comments = [cc]; readComment(3);">
										{{cc.readAlready == 1 && '重新' || ''}}审核拒绝
										<i class="el-icon-close" />
									</el-button>
								</el-col>
							</el-row>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-row style="margin-top: 15px; float: right; padding-right: 25px;">
				<pagination
					v-if="total"
					:total="total"
					:page.sync="searchComment.page"
					:limit.sync="searchComment.limit"
					@pagination="pageChange"/>
			</el-row>
		</div>
		<commentMsgList ref="commentMsgList" @closeCommentMsgList="closeCommentMsgList">></commentMsgList>
		<div class="detaimg2" v-show="dynamicShow">
			<span @click="shutDownIMG" style="position: absolute;right: 70px;top: 26px;font-size: 40px;color: #ffffff;">
			<i class="el-icon-circle-close"></i></span> 
			<div :style="{backgroundImage:'url('+dynamicImg+')',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}" class="luk">
			</div>
		</div>
	</div>
</template>

<script>
	import { findComMsgByIdApi,findAllCommentsApi,readCommentApi,commentReplyApi,commentCommentApi } from '@/api/community'
	import commentMsgList from './commentMsgList';
	export default {
		name: 'article_details',
		components: {
			commentMsgList
		},
		props: {
		  msgId: {
		    type: String,
		    default: '',
		  },
		},
		data() {
			return {
				dynamic: false,
				commentMsg: {},
				examine: 2,
				total: 0,
				searchComment: {
				  nickName: null,
				  content: null,
				  msgId: '',
				  readAlready: null,
				  delete: null,
				  page: 1,
				  limit: 15
				},
				dynamicShow: false,
				dynamicImg: '',
				commentTableLoading: false,
				commentTable: [],
				comments: [],
				comment: {
				  belongId: null,
				  content: null,
				  status: 3,
				  readAlready: 1,
				},
			}
		},
		computed: {
			
		},
		watch: {
			examine: function (value) {
				this.searchComment.readAlready = 1;
			    if (value == 2) {
					this.searchComment.readAlready = null;
					this.searchComment.delete = null;
			    }
			    if (value == 0) {
					this.searchComment.readAlready = 0;
					this.searchComment.delete = 0;
			    }
				if (value == 1) this.searchComment.delete = 0;
				if (value == 3) this.searchComment.delete = 3;
				this.findAllComments();
			},
			commentMsg: function (value) {
			  if (value.msgId) this.findAllComments();
			},
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
		mounted() {
			
		},
		methods: {
			getDetails(msgId) {
				findComMsgByIdApi(msgId).then(async (res) => {
					if (res.code === 200) {
						let data = res.data;
						this.commentMsg = data;
					} else {
						this.$message.error(res.msg);
					}
				}).catch((res) => {
					this.$message.error(res.msg);
				});
			},
			dynamicClick() {
				this.commentMsg ={}
				this.dynamic = false;
			},
			shutDownIMG(){
				this.dynamicShow= false;
				this.dynamicImg = ""
			},
			commentMsgShowChange(){
				this.$refs.commentMsgList.commentMsgShow = true;
				this.$refs.commentMsgList.findAllMsgs();
			},
			dynamicImgclick(row){
			    this.dynamicImg = row
				if(row){
					this.dynamicShow = true
				}
			},
			async findAllComments() {
				this.commentTableLoading = true;
				this.searchComment.msgId = this.msgId;
				const result = await findAllCommentsApi(this.searchComment);
				if (result.code == 200) this.commentTable = result.data.list;
				this.total = result.data.count
				this.commentTableLoading = false;
			},
			pageChange() {
				this.commentTable = [];
				this.findAllComments();
			},
			// 审批量核评论
			async readCommentBatch(read) {
				if (this.comments.length == 0)
					return this.$message.warning(`请先选择要审核的评论`);
			    const type = (read == 0 && "通过") || "拒绝";
				this.$confirm("确定审核通过所选评论及其所有回复？", `动态评论审核`, {
					confirmButtonText: `确定审核${type}`,
					cancelButtonText: `取消审核`,
					type: "warning",
				}).then(() => {
					const commentsAll = [];
					this.comments.forEach((c) => {
						commentsAll.push(c);
						if (c.commentList) commentsAll.push(...c.commentList);
					});
					this.comments = commentsAll;
					this.readComment(read);
				});
			},
			
			// 审核评论
			async readComment(read) {
				this.comments = this.comments.map((c) =>
					Object.assign(c, {
						delete: read,
						deleteReason: read == 3 && "审核不通过",
						readAlready: 1,
					})
				);
				this.commentTableLoading = true;
				const result = await readCommentApi(this.comments);
				if (result.code != 200)
					return this.$message.error(`操作失败，请稍后重试`);
				this.findAllComments();
				return this.$message.success(`操作成功`);
			},
			// 回复评论
			async replyComment(row, type) {
				this.commentTableLoading = true;
				if (!this.comment.content)
					return this.$message.warning(`请先输入回复内容`);
				this.comment.belongId = row.commentId;
				let result = {};
				if (type == 1) result = await commentReplyApi(this.comment);
				if (type == 2) result = await commentCommentApi(this.comment);
				if (result.code != 200)
					return this.$message.error(`回复评论失败，请稍后重试`);
				Array.from(document.getElementsByClassName("myPopper")).forEach(
					(ep) => (ep.style.display = "none")
				);
				this.findAllComments();
				return this.$message.success(`回复评论成功`);
			},
			closeCommentMsgList(msgs) {
				this.commentMsg = msgs
				this.msgId = msgs.msgId
				this.findAllComments();
				this.$refs.commentMsgList.commentMsgShow = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	.details {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(1, 1, 1, 0.8);
		top: 1px;
		left: 1px;
		z-index: 4;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.details_a {
		width: 80%;
		height: 95%;
		background: #fff;
		overflow: scroll;
	}

	.el-table .success-row {
		background-color: #f5faff;
		color: #409eff;
	}

	.el-divider {
		margin-top: 0;
	}

	.gcDetail {
		margin-bottom: 10px;
	}

	.el-step.is-center .el-step__description {
		padding: 0;
	}

	.orderDetail {
		color: #909399;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.el-switch__label {
		color: #909399;
	}

	.selecte_name {
		width: 7.5%;
		font-size: small;
		line-height: 32px;
		text-align: right;
	}

	.selecte_number {
		width: 80px;
	}

	.selecte_middle {
		width: 30px;
		font-size: small;
		line-height: 32px;
		text-align: center;
	}
	.ql-editor>p>img{
		width: 150px;
		height: 150px;
	}
	.DynamicClass>span>p>img{
		width: 100px;
		height: 100px;
	}
	.detaimg2{
		position: fixed;
		z-index:1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: #00000082;
	}
	.luk{
		width: 1000px;
		height: 900px;
	}
</style>