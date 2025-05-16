<template>
  <el-dialog :visible.sync="commentMsgShow" width="90%">
    <span slot="title">选择动态：<span style="color: gray;">回复 / 审核 / 屏蔽 动态评论</span></span>
    <el-row style="margin-bottom: 10px;">
      <el-input v-model="searchMsg.nickName" placeholder="用户名关键词搜索" size="small" style="width: 29%;">
        <el-button slot="append" icon="el-icon-search" @click="findAllMsgs()"/>
        <el-button slot="append" icon="el-icon-refresh-left" @click="searchMsg.nickName = ''; findAllMsgs()"/>
      </el-input>
      <el-input v-model="searchMsg.title" placeholder="动态标题关键词搜索" size="small" style="width: 29%;">
        <el-button slot="append" icon="el-icon-search" @click="findAllMsgs()"/>
        <el-button slot="append" icon="el-icon-refresh-left" @click="searchMsg.title = ''; findAllMsgs()"/>
      </el-input>
      <el-input v-model="searchMsg.content" placeholder="动态内容关键词搜索" size="small" style="width: 29%;">
        <el-button slot="append" icon="el-icon-search" @click="findAllMsgs()"/>
        <el-button slot="append" icon="el-icon-refresh-left" @click="searchMsg.content = ''; findAllMsgs()"/>
      </el-input>
  </el-row>
    <el-table v-loading="msgsTableLoading" :data="msgTable">
      <el-table-column label="ID" type="index" width="45" align="center"/>
      <el-table-column label="头像" width="75">
        <template slot-scope="scope">
          <img :src="scope.row.user.headUrl" v-show="scope.row.user.headUrl" width="45" height="45"/>
          <img src="../../assets/images/maijiCat.png" v-show="! scope.row.user.headUrl" width="45"
               height="45"/>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="150"
                       show-overflow-tooltip
                       :formatter="(row) => row.user.nickName || '麦吉用户'">
      </el-table-column>
      <el-table-column label="动态标题/内容" min-width="345"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="color: gray;">标题：</span><span>{{scope.row.title || '—'}}</span><br/>
          <span style="color: gray;">内容：</span><span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论数" width="68">
        <template slot-scope="scope">
          <el-tag type="primary">{{scope.row.allCCCount}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="未审核" width="68">
        <template slot-scope="scope">
          <el-tag type="danger">{{scope.row.notReadCount}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="选择动态" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkComment(scope.row)">查看评论 <i class="el-icon-search"/></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 10px; text-align: right;">
		<pagination
			v-if="total"
			:total="total"
			:page-sizes="[8, 15, 20, 30]"
			:page-size="searchMsg.size"
			ayout="total, sizes, prev, pager, next, jumper"
			:current-page.sync="searchMsg.page"
			@pagination="pageChange"/>
    </el-row>
  </el-dialog>
</template>

<script>
	import { findAllMsgsApi } from '@/api/community'
    export default {
        data() {
			return {
				total: 0,
				searchMsg: {
					nickName: '',
					title: '',
					content: '',
					page: 1,
					limit: 8
				},
				msgTable: null,
				msgsTableLoading: false,
				commentMsgShow: false,
			}
        },
		computed: {
		},
		watch: {
		},
		methods: {
			//查看评论
			checkComment(msgs) {
				this.$emit('closeCommentMsgList',msgs)
			},
			async findAllMsgs() {
			  this.msgsTableLoading = true
			  const result = await findAllMsgsApi(this.searchMsg)
			  if (result.code == 200) {
				this.msgTable = result.data.list.sort((c1, c2) =>c2.notReadCount - c1.notReadCount)
				this.total = result.data.count
				this.msgsTableLoading = false
			  }
			},
			pageChange() {
				this.msgTable = [];
				this.findAllMsgs();
			},
		},
    }
</script>

<style scoped lang="scss">
	::v-deep .el-dialog {
		margin-top: auto !important;
		height: 100%;;
	}
    .el-table .success-row {
        color: #409EFF;
    }
    .el-form-item {
        text-align: left;
    }
    .el-dialog__body {
        padding-top: 10px;
    }

    .el-tooltip__popper {
      max-width: 30%;
    }
</style>
