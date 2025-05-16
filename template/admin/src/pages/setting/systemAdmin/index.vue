<template>
  <div>
    <el-card :bordered="false" shadow="never" class="ivu-mb-16" :body-style="{padding:0}">
      <div class="padding-add">
        <el-form
            ref="formValidate"
            :model="formValidate"
            label-width="80px"
            label-position="right"
            @submit.native.prevent
            inline
        >
          <el-form-item label="状态：" label-for="status1">
            <el-select v-model="status" placeholder="请选择" @change="userSearchs" clearable class="form_content_width">
              <el-option value="all" label="全部"></el-option>
              <el-option value="1" label="开启"></el-option>
              <el-option value="0" label="关闭"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索：" label-for="status2">
            <el-input
                clearable
                placeholder="请输入姓名或者账号"
                v-model="formValidate.name"
                class="form_content_width"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userSearchs">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card :bordered="false" shadow="never" class="ivu-mt">
      <el-button v-auth="['setting-system_admin-add']" type="primary" @click="add"
      >添加管理员</el-button>
      <el-table
        :data="list"
        class="mt14"
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
        v-loading="loading"
        highlight-current-row
      >
        <el-table-column label="姓名" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份" min-width="130">
          <template slot-scope="scope">
            <div v-if="scope.row.roles.length !== 0">
              <el-tag v-for="(item, index) in scope.row.roles.split(',')" :key="index">{{ item }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="最后一次登录时间" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.lastTime | longToDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后一次登录ip" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.lastIp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开启" min-width="70">
          <template slot-scope="scope">
            <el-switch
              class="defineSwitch"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
              :value="scope.row.status"
              @change="onchangeIsShow(scope.row)"
              size="large"
              active-text="开启"
              inactive-text="关闭"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <a @click="edit(scope.row)">编辑</a>
            <el-divider direction="vertical"></el-divider>
            <a @click="del(scope.row, '删除管理员', scope.$index)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="acea-row row-right page">
        <pagination
          v-if="total"
          :total="total"
          :page.sync="formValidate.page"
          :limit.sync="formValidate.limit"
          @pagination="getList"
        />
      </div>
    </el-card>
    <!-- 添加 编辑 -->
    <admin-from :FromData="FromData" ref="adminfrom" @submitFail="submitFail"></admin-from>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { adminListApi, adminFromApi, adminEditFromApi, setShowApi } from '@/api/systemAdmin';
import adminFrom from '../../../components/from/from';
import {adminDelFromApi} from "../../../api/systemAdmin";
export default {
  name: 'systemAdmin',
  components: { adminFrom },
  data() {
    return {
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24,
      },
      total: 0,
      loading: false,
      roleData: {
        status1: '',
      },
      formValidate: {
        roles: '',
        status: '',
        name: '',
        page: 1, // 当前页
        limit: 20, // 每页显示条数
      },
      status: '',
      list: [],
      FromData: null,
      modalTitleSs: '',
      ids: Number,
    };
  },
  computed: {
    ...mapState('media', ['isMobile']),
    labelWidth() {
      return this.isMobile ? undefined : '50px';
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'left';
    },
  },
  filters: {
    longToDate(timestamp) {
        var date = new Date(timestamp * 1000); // 转换为毫秒
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的
        var day = date.getDate().toString().padStart(2, '0');
        var hours = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2, '0');
        var seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
  },
  created() {
    this.getList();
  },
  methods: {
    // 修改是否开启
    onchangeIsShow(row) {
      let data = {
        id: row.id,
        status: row.status,
      };
      setShowApi(data)
        .then(async (res) => {
          this.$message.success(res.msg);
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    // 请求列表
    submitFail() {
      this.getList();
    },
    // 列表
    getList() {
      this.loading = true;
      this.formValidate.roles = this.formValidate.roles || '';
      adminListApi(this.formValidate)
        .then(async (res) => {
          this.total = res.data.count;
          this.list = res.data.list;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
    // 添加表单
    add() {
      adminFromApi()
        .then(async (res) => {
          res.data.rules.some(function (item,index,array){
            if(index == 4){
              item.value = [];
            }
            if(index == 5){
              item.value = Number(item.value);
              delete item.validate;
            }
          });
          this.FromData = res.data;
          this.$refs.adminfrom.modals = true;
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    // 编辑
    edit(row) {
      adminEditFromApi(row.id)
        .then(async (res) => {
          res.data.rules.some(function(item,index,array){
            if(index == 4){
              item.value = item.value.split(',').map(Number);
            }
            if(index == 5){
              item.value = Number(item.value);
              delete item.validate;
            }
          });
          if (res.data.status === false) {
            return this.$authLapse(res.data);
          }
          this.FromData = res.data;
          this.$refs.adminfrom.modals = true;
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    // 删除
    del(row, tit, num) {
      let delfromData = {};
      if (!delfromData.info) {
        delfromData.info = '';
      }
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('div', null, `确定要${tit}吗？`),
          h('div', null, `${delfromData.info}`)
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        iconClass: 'el-icon-warning',
        confirmButtonClass: 'btn-custom-cancel'
      }).then(() => {
        adminDelFromApi(row.id)
            .then(async (res) => {
              this.$message.success(res.msg);
              setTimeout(()=>{
                this.getList();
              },1000)
            })
            .catch((res) => {
              this.$message.error(res.msg);
            });
      }).catch(() => {
      })
    },
    // 表格搜索
    userSearchs() {
      this.formValidate.status = this.status === 'all' ? '' : this.status;
      this.formValidate.page = 1;
      this.list = [];
      this.getList();
    },
  },
};
</script>

<style scoped></style>
