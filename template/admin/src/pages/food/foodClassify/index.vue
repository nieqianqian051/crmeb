<template>
  <div class="article-manager">
    <el-card :bordered="false" shadow="never" class="ivu-mt" :body-style="{ padding: 0 }">
      <div class="padding-add">
        <el-form ref="artFrom" :model="artFrom" inline label-width="80px" label-position="right" @submit.native.prevent>
          <el-form-item label="食材分类：" prop="parentId" label-for="parentId">
            <el-select
              v-model="artFrom.parentId"
              placeholder="请选择食材分类"
              @change="userSearchs"
              clearable
              class="form_content_width"
            >
              <el-option v-for="item in treeSelect" :value="item.id" :label="item.name" :key="item.id">{{
                item.name
              }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类状态：" label-for="isShow">
            <el-select
              v-model="artFrom.isShow"
              placeholder="请选择分类状态"
              clearable
              @change="userSearchs"
              class="form_content_width"
            >
				<el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				</el-option>
            <!--  <el-option value="0" label="显示"></el-option>
              <el-option value="1" label="隐藏"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称：" label-for="name">
            <el-input clearable placeholder="请输入分类名称" v-model="artFrom.name" class="form_content_width" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userSearchs">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card :bordered="false" shadow="never" class="ivu-mt mt16">
      <el-button v-auth="['product-save-cate']" type="primary" class="bnt" @click="addClass">添加分类</el-button>
      <vxe-table
        class="mt14"
        highlight-hover-row
        :loading="loading"
        header-row-class-name="false"
        :tree-config="{ children: 'children' }"
        :data="tableData"
      >
        <vxe-table-column field="uuId" title="ID" tooltip width="80"></vxe-table-column>
        <vxe-table-column field="name" tree-node title="分类名称" min-width="250"></vxe-table-column>
        <vxe-table-column field="picture" title="分类图标" min-width="100">
          <template v-slot="{ row }">
            <div class="tabBox_img" v-viewer v-if="row.picture">
              <img v-lazy="row.picture" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="sort" title="排序" min-width="100" tooltip="true"></vxe-table-column>
        <vxe-table-column field="isShow" title="状态" min-width="120">
          <template v-slot="{ row }">
            <el-switch
              class="defineSwitch"
              :active-value="0"
              :inactive-value="1"
              v-model="row.isShow"
              :value="row.isShow"
              @change="onchangeIsShow(row)"
              size="large"
              active-text="开启"
              inactive-text="关闭"
            >
            </el-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column field="date" title="操作" width="120" fixed="right">
          <template v-slot="{ row, index }">
            <a @click="edit(row)">编辑</a>
            <el-divider direction="vertical"></el-divider>
            <a @click="del(row, '删除食材分类', index)">删除</a>
          </template>
        </vxe-table-column>
      </vxe-table>
    </el-card>
    <!-- 添加 编辑表单-->
    <edit-from ref="edits" :FromData="FromData" @submitFail="userSearchs"></edit-from>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {categoryList, foodCreateApi, foodDeleteApi, foodEditApi, setShowApi } from '@/api/food';
import editFrom from '../../../components/from/from';
export default {
  name: 'food_foodClassify',
  components: {
    editFrom,
  },
  data() {
    return {
      treeSelect: [],
      FromData: null,
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24,
      },
      loading: false,
      artFrom: {
        parentId: '',
        isShow: '',
        name: '',
      },
      tableData: [],
	  options: [
		  {value: 0,label:'显示'},
		  {value: 1,label:'隐藏'}
	  ]
    };
  },
  computed: {
    ...mapState('admin/userLevel', ['categoryId']),
  },
  mounted() {
    this.goodsCategory();
    this.getList();
  },
  methods: {
    // 商品分类；
    goodsCategory() {
      categoryList(this.artFrom)
        .then((res) => {
          this.treeSelect = res.data;
        })
        .catch((res) => {
          this.$message({
			  duration: 1000,
			  type: 'error',
			  message: res.msg
          });
        });
    },
    // 列表
    getList() {
      this.loading = true;
      this.artFrom.isShow = this.artFrom.isShow || '';
      this.artFrom.parentId = this.artFrom.parentId || '';
      categoryList(this.artFrom)
        .then(async (res) => {
          this.tableData = res.data;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message({
			  duration: 1000,
			  type: 'error',
			  message: res.msg
		  });
        });
    },
    pageChange(index) {
      this.artFrom.page = index;
      this.getList();
    },
    // 添加
    addClass() {
      this.$modalForm(foodCreateApi()).then(() => this.getList() 
	  );
    },
    // 编辑
    edit(row) {
		console.log(row,11111)
      this.$modalForm(foodEditApi(row.uuId)).then(() => this.getList());
    },
    // 修改状态
    onchangeIsShow(row) {
      let data = {
        uuId: row.uuId,
        isShow: row.isShow,
      };
      setShowApi(data)
        .then(async (res) => {
          this.$message.success(res.msg);
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    // 下拉树
    handleCheckChange(data) {
      let value = '';
      let title = '';
      this.list = [];
      this.artFrom.pid = 0;
      data.forEach((item, index) => {
        value += `${item.id},`;
        title += `${item.title},`;
      });
      value = value.substring(0, value.length - 1);
      title = title.substring(0, title.length - 1);
      this.list.push({
        value,
        title,
      });
      this.artFrom.pid = value;
      this.getList();
    },
    // 删除
    del(row, tit, num) {
		console.log(row)
		if(row.children != null && row.children.length>0){
			return this.$message.warning("存在子节点不允许删除");
		}
      // let delfromData = {
      //   title: tit,
      //   num: num,
      //   url: `/food/food/category/remove`,
      //   method: 'post',
      //   params: row.uuId,
      // };
      // this.$modalSure(delfromData)
      //   .then((res) => {
      //     this.$message.success(res.msg);
      //     this.getList();
      //   })
      //   .catch((res) => {
      //     this.$message.error(res.msg);
      //   });
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
		  foodDeleteApi({uuId: row.uuId})
		    .then((res) => {
		      this.$message.success(res.msg);
			  this.goodsCategory();
		      this.getList();
		    })
		    .catch((res) => {
		      this.$message.error(res.msg);
		    });
	  })
    },
    // 表格搜索
    userSearchs() {
      this.artFrom.page = 1;
      this.getList();
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
