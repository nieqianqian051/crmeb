<template>
  <div>
    <el-card :bordered="false" shadow="never" class="ivu-mt">  
	  <el-row :gutter="24" justify="space-between">
		  <el-col :span="24">
		   <router-link :to="$routeProStr + '/cms/article/add_article'" v-auth="['cms-article-creat']"
			><el-button type="primary" class="bnt">添加文章</el-button></router-link>
		  </el-col>
	  </el-row>
	  <el-tabs v-model="labelId" @tab-click="onClickTab">
	  		<el-tab-pane :label="item.name" :name="item.type" v-for="(item, index) in headeNum" :key="index" />
	  </el-tabs>
      <el-table
        :data="cmsList"
        ref="table"
        class="mt14"
        v-loading="loading"
        highlight-current-row
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
      >
		<el-table-column label="文章封面" width="85">
			<template slot-scope="scope">
				<img v-if="scope.row.img" :src="scope.row.img.smallUrl" width="45" height="45"/>
			</template>
		</el-table-column>
		<el-table-column label="文章标题/描述" min-width="120"
						 show-overflow-tooltip>
		  <template slot-scope="scope">
			<span style="color: gray;">标题：</span><span>{{scope.row.title}}</span><br/>
			<span style="color: gray;">描述：</span><span>{{scope.row.desc}}</span>
		  </template>
		</el-table-column>
		<el-table-column label="文章评论" width="120">
		  <template slot-scope="scope">
			<el-button type="text" size="mini" 
			@click="findAllArticleComments(scope.row.uuId,{page: 1,limit: 10})">查看评论 <i class="el-icon-zoom-in"/></el-button>
		  </template>
		</el-table-column>
		<el-table-column label="排序权重" width="150">
		  <template slot-scope="scope">
			<el-input size="mini" v-model="scope.row.sortWeight" style="width:60px;margin-right: 10px;"/>
			<el-button type="primary" size="mini" @click="updateSort(scope.row, 2)">修改</el-button>
		  </template>
		</el-table-column>
		<el-table-column label="文章标签" width="220" align="center">
		    <template slot-scope="scope">
		      <el-tag effect="plain" :type="elTagType(scope.row.labelName)" size="mini">{{scope.row.labelName}}</el-tag><br/>
		      <el-popover trigger="click" width="210" popper-class="myPopper">
		        <el-cascader v-model="updateLabels" :options="allMaijiArticleLabels" style="margin-bottom: 12px;"/>
		        <el-button type="primary" size="mini" style="width: 100%; margin-top: 10px;" @click="updLabel(scope.row)">确定</el-button>
		        <el-tag effect="plain" type="warning" slot="reference" @click="updateLabels = [labelId, scope.row.labelId]"
		                size="mini" style="cursor: pointer;">修改标签&nbsp;<i class="el-icon-edit-outline"/></el-tag>
		      </el-popover>
		    </template>
	    </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template v-slot="{ row, index }">
           <a @click="edit(row)">编辑</a>
            <el-divider direction="vertical"></el-divider>
            <!-- <a @click="artRelation(scope.row, '取消关联', index)">{{
              scope.row.product_id === 0 ? '关联' : '取消关联'
            }}</a>
            <el-divider direction="vertical"></el-divider> -->
            <a @click="del(row, '删除文章', index)">删除</a>
          </template>
        </el-table-column>
      </el-table>
<!--      <div class="acea-row row-right page">
        <pagination
          v-if="total"
          :total="total"
          :page.sync="artFrom.page"
          :limit.sync="artFrom.limit"
          @pagination="getList"
        />
      </div> -->
    </el-card>
	<el-dialog title="麦吉简介：评论列表" :visible.sync="commentShow" 
		class="paymentFooter" width="1000px" @closed="cancel"
		:close-on-click-modal="false"
		:close-on-press-escape='false'>
		<el-table v-loading="commentTableLoading"
		          max-height="456px" :data="commentTable"
		          highlight-current-row
		          no-userFrom-text="暂无数据"
		          no-filtered-userFrom-text="暂无筛选结果">
		  <el-table-column label="头像" width="70">
		    <template slot-scope="scope">
		      <img :src="scope.row.sourceUser.headUrl" v-if="scope.row.sourceUser && scope.row.sourceUser.headUrl" width="45" height="45"/>
		    </template>
		  </el-table-column>
		  <el-table-column label="用户名" width="110" show-overflow-tooltip>
			  <template slot-scope="scope">
				  {{ scope.row.sourceUser.nickName? scope.row.sourceUser.nickName: '麦吉用户' }}
			  </template>
		  </el-table-column>
		  <el-table-column label="评论/回复内容" min-width="500">
		    <template slot-scope="scope">
		      <el-row>
		        <el-col style="font-weight: bold; width: 50%;" class="mjn"><span style="line-height: 39px;">评论内容：{{scope.row.content}}</span></el-col>
		        <el-col style="width: 50%;">
		          <el-popover width="250" trigger="click" popper-class="myPopper">
		            <el-input type="textarea" :rows="3" v-model="scope.row.rcontent" placeholder="请输入回复内容" style="width: 100%;"/>
		            <el-button type="primary" size="mini" plain @click="articleComment(scope.row)" style="width: 100%; margin-top: 5px;">确定</el-button>
		            <span slot="reference" style="color: #409EFF; cursor: pointer;">回复 <i class="el-icon-edit"/></span>
		          </el-popover>
		          <span style="margin: 0 10px;">{{scope.row.inTime}}</span>
		          <el-button type="text" style="color: red;" @click="delArticleComments(scope.row.uuId)">屏蔽 <i class="el-icon-circle-close"/></el-button>
		        </el-col>
		      </el-row>
		      <el-row v-for="(cc,index) in scope.row.list" :key="index">
		        <el-col style="color: gray; width: 50%; line-height: 39px;">{{cc.sourceUser.nickName}} 回复 {{cc.targetUser.nickName}}：{{cc.content}}</el-col>
		        <el-col style="width: 50%;">
		          <el-popover width="250" trigger="click" popper-class="myPopper">
		            <el-input type="textarea" :rows="3" v-model="cc.rcontent" placeholder="请输入回复内容" style="width: 100%;"/>
		            <el-button type="primary" size="mini" plain @click="articleComment(cc)" style="width: 100%; margin-top: 5px;">确定</el-button>
		            <span slot="reference" style="color: #409EFF; cursor: pointer;">回复 <i class="el-icon-edit"/></span>
		          </el-popover>
		          <span style="margin: 0 10px;">{{cc.inTime}}</span>
		          <el-button type="text" style="color: red;" @click="delArticleComments(cc.uuId)">屏蔽 <i class="el-icon-circle-close"/></el-button>
		        </el-col>
		      </el-row>
		    </template>
		  </el-table-column>
		</el-table>
		<div class="acea-row row-right page">
		  <pagination
		    v-if="total"
		    :total="total"
		    :page.sync="pageOne.page"
		    :limit.sync="pageOne.limit"
		    @pagination="pageChange"
		  />
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { cmsListApi, categoryListApi, relationApi, 
	findAllArticleCommentsApi, editArticleById, 
	findAllLabelBySourceApi, updateArticleLabel,
	 articleCommentApi, delArticleCommentsApi } from '@/api/cms';
import relationList from './relation';
import { formatDate } from '@/utils/validate';
import goodsList from '@/components/goodsList/index';
export default {
  name: 'cms_article',
  data() {
    return {
      modalTitleSs: '',
      loading: false,
      labelId: 'bc1312b24d14408797aaeca6ed5b892c',
      total: 0,
      cmsList: [],
      treeData: [],
      list: [],
      cid: 0, // 移动分类id
      cmsId: 0,
      formValidate: {
        type: 1,
      },
      rows: {},
      modal_loading: false,
      modals: false,
      props: {
        value: 'id',
        label: 'title',
        emitPath: false,
      },
	  updateLabels: null,
	  articleId: '',
	  commentShow: false,
	  commentTableLoading: false,
	  commentTable: [],
	  pageOne: {
	    page: 1,
	    limit: 10
	  },
	  maijiArticleLabels: [],
	  allMaijiArticleLabels: [],
	  headeNum: [
	    { type: 'bc1312b24d14408797aaeca6ed5b892c', name: '入门必读' },
	    { type: '57f060f10fd1453e9fa728a755aaa23e', name: '一阶精选' },
	    { type: 'c1f7b736a51e44fb9aae952e063ddca8', name: '二阶精选' },
	    { type: '55ffb7239877446da86bb89a48a95102', name: '三阶精选' },
	  ],
    };
  },
  components: {
    relationList,
    goodsList,
  },
  computed: {
    ...mapState('media', ['isMobile']),
    labelWidth() {
      return this.isMobile ? undefined : '80px';
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'right';
    },
  },
  filters: {
    formatDate(time) {
      if (time !== 0) {
        let date = new Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
  },
  created() {
	  this.findAllMaijiArticleLabels()
  },
  methods: {
	  findAllMaijiArticleLabels() {
	      findAllLabelBySourceApi({source: "麦吉简介"}).then(res=>{
			  this.maijiArticleLabels = res.data.filter(label => label.listShow == 3)
			  this.allMaijiArticleLabels = this.maijiArticleLabels.map(label => {
			      const newLabel = {value: label.uuId, label: label.name}
			      newLabel.children = res.data.filter(cl => cl.orderNo == label.orderNo)
			          .map(cl => Object.assign({value: cl.uuId, label: cl.name == label.name && '普通文章' || cl.name}))
			      return newLabel
			  })
		  })
		  this.getList();
	  },
	  onClickTab() {
	    this.getList();
	  },
	  pageChange() {
	    this.findAllArticleComments(this.articleId, this.pageOne);
	  },
	  findAllArticleComments(articleId,pageOne){  
		  this.commentShow = true
		  if (articleId) this.articleId = articleId
		  this.commentTableLoading = true
		  this.commentTable = []
		  this.total = 0
		  let data = {
			  articleId: articleId,
			  ...pageOne
		  }
		  findAllArticleCommentsApi(data).then(res=>{
			  this.commentTable = res.data.list
			  this.total = res.data.count
			  this.commentTableLoading = false
		  })
	  },
	  async updateSort (article, type) {
	    const msg = '编辑排序权重'
	    if (type != 2 && article.sortWeight <= 0)
	      return this.$message.warning(`请先输入有效的文章排序权重`)
		let data = {
			uuId: article.uuId,
			type: type,
			sortWeight: article.sortWeight
		}
	    const result = await editArticleById(data)
		if (result.code != 200) return this.$message.error(`${msg}失败，请稍后重试！`)
	    this.getList(article.uuId,this.pageOne)
	    return this.$message.success(`${msg}成功！`)
	  },
	  del(row, tit, num) {
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
		    editArticleById({uuId: row.uuId,type: 1})
		  	.then((res) => {
		  	  this.$message.success(res.msg);
		  	  this.getList();
		  	})
		  	.catch((res) => {
		  	  this.$message.error(res.msg);
		  	});
		  })
	  },
	  elTagType(labelName) {
	      switch (labelName) {
	          case "推荐置顶":
	              return 'success'
	          case "普通文章":
	              return 'info'
	          default :
	              return ''
	      }
	  },
	  async updLabel(article,labels) {
	      const updateLabels = labels || this.updateLabels
		  console.log(article)
		  console.log(updateLabels)
	      const result = await updateArticleLabel([article.uuId, this.labelId, ...updateLabels])
	      if (result.code != 200) return this.$message.error(`修改失败，请稍候重试`)
	      Array.from(document.getElementsByClassName("myPopper"))
	        .forEach(ep => ep.style.display = "none")
	      this.getList()
	      this.$message.success(`修改成功`)
	  },
    cancel() {
      this.commentShow = false;
	  this.commentTable = []
	  this.total = 0
	  this.pageOne = {
		  page: 1,
		  limit: 10
	  }
    },
    // 文章列表
    getList() {
      this.loading = true;
      cmsListApi({labelId: this.labelId})
        .then(async (res) => {
			if (res.data[0].articles.length > 0)
			      this.cmsList = res.data[0].articles.map(ma =>
			          Object.assign(ma, {isRecommend: true, labelName: '推荐置顶', labelId: res.data[0].labelId}))
			  if (res.data[1].articles.length > 0)
			      this.cmsList = [...this.cmsList, ...res.data[1].articles.map(ma =>
			          Object.assign(ma, {labelName: res.data[1].title, labelId: res.data[1].labelId}))]
			  if (res.data[2].articles.length > 0)
			      this.cmsList = [...this.cmsList, ...res.data[2].articles.map(ma =>
			          Object.assign(ma, {labelName: '普通文章', labelId: this.labelId}))]
			this.cmsList = this.cmsList.sort((p1, p2) => p2.sortWeight - p1.sortWeight)
			this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
    // 编辑
    edit(row) {
      this.$router.push({ path: this.$routeProStr + '/cms/article/add_article/' + row.uuId });
    },
	async articleComment (article) {
	  if (!article.rcontent) return this.$message.warning(`请先输入回复内容`)
	  const data = {
	    type: 1,
	    content: article.rcontent,
	    commentId: article.uuId,
		articleId: article.uuId,
		sourceUserId: article.sourceUserId
	  }
	  const result = await articleCommentApi(data)
	  if (result.code != 200) return this.$message.error(`回复失败，请稍后重试`)
	  this.findAllArticleComments(this.articleId)
	  Array.from(document.getElementsByClassName("myPopper"))
	    .forEach(ep => ep.style.display = "none")
	  return this.$message.success(`回复成功`)
	},
	async delArticleComments (articleId) {
	  const result = await delArticleCommentsApi([articleId])
	  if (result.code != 200) return this.$message.error(`屏蔽失败，请稍后重试`)
	  this.findAllArticleComments(this.articleId,this.pageOne)
	  return this.$message.success(`屏蔽成功`)
	},
	
  },
};
</script>

<style scoped lang="stylus">
.treeSel ::v-deep .ivu-select-dropdown-list {
  padding: 0 10px !important;
  box-sizing: border-box;
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
</style>
