<template>
  <div>
    <el-card :bordered="false" shadow="never" class="ivu-mb-16" :body-style="{ padding: 0 }">
      <div class="padding-add">
        <el-form
          ref="formValidate"
          :model="formValidate"
          :label-width="labelWidth"
          :label-position="labelPosition"
          @submit.native.prevent
          inline
        >
          <el-form-item label="状态：" label-for="status">
            <el-select
              v-model="formValidate.status"
              placeholder="请选择"
              @change="userSearchs"
              clearable
              class="form_content_width"
            >
              <el-option value="1" label="显示"></el-option>
              <el-option value="0" label="不显示"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份昵称：" label-for="role_name">
            <el-input
              clearable
              placeholder="请输入身份昵称"
              v-model="formValidate.roleName"
              class="form_content_width"
            />
          </el-form-item>
          <el-form-item label="身份标识：" label-for="role_key">
            <el-input
                clearable
                placeholder="请输入身份标识"
                v-model="formValidate.roleKey"
                class="form_content_width"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userSearchs">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card :bordered="false" shadow="never" v-loading="spinShow">
      <el-button v-auth="['setting-system_role-add']" type="primary" @click="add('添加')">添加身份</el-button>
      <el-table
        :data="tableList"
        ref="table"
        class="mt14"
        v-loading="loading"
        highlight-current-row
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
      >
        <el-table-column label="ID" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份昵称" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份标识" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.roleKey }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="权限" min-width="1000">
          <template slot-scope="scope">
            <span class="line1">{{ scope.row.rules }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="状态" min-width="120">
          <template slot-scope="scope">
            <el-switch
              class="defineSwitch"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
              :value="scope.row.status"
              @change="onchangeIsShow(scope.row)"
              size="large"
              active-text="显示"
              inactive-text="隐藏"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <a v-if="scope.row.roleKey != 'admin'" @click="edit(scope.row, '编辑')">编辑</a>
            <el-divider direction="vertical"></el-divider>
            <a v-if="scope.row.roleKey != 'admin'" @click="del(scope.row, '删除', scope.$index)">删除</a>
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
    <!-- 新增编辑-->
    <el-dialog
      :visible.sync="modals"
      :title="`${modelTit}身份`"
      :close-on-click-modal="false"
      :show-close="true"
      width="540px"
      @closed="closed"
    >
      <el-form
        ref="formInline"
        :model="formInline"
        :rules="ruleValidate"
        label-width="100px"
        :label-position="labelPosition2"
        @submit.native.prevent
        v-loading="formShow"
      >
        <el-form-item label="身份名称：" label-for="role_name" prop="role_name">
          <el-input placeholder="请输入身份昵称" v-model="formInline.role_name" />
        </el-form-item>
        <el-form-item label="身份标识：" label-for="role_key" prop="role_key">
          <el-input placeholder="请输入身份标识" v-model="formInline.role_key" />
        </el-form-item>
        <el-form-item label="是否开启：" prop="status">
          <el-radio-group v-model="formInline.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限：">
          <div class="trees-coadd">
            <div class="scollhide">
              <div class="iconlist">
                <el-tree
                  :data="menusList"
                  node-key="id"
                  check-strictly
                  show-checkbox
                  highlight-current
                  ref="tree"
                  :default-checked-keys="selectIds"
                  :props="defaultProps"
                  @check="clickDeal"
                ></el-tree>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('formInline')">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { roleListApi, roleSetStatusApi, menusListApi, roleCreateApi, roleInfoApi } from '@/api/setting';
import {roleDelFromApi, roleEditApi} from "../../../api/setting";
export default {
  name: 'systemRole',
  data() {
    return {
      formShow: false,
      spinShow: false,
      modals: false,
      total: 0,
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24,
      },
      loading: false,
      formValidate: {
        status: '',
        roleName: '',
        roleKey: '',
        page: 1,
        limit: 20,
      },
      tableList: [],
      formInline: {
        role_key: '',
        role_name: '',
        status: 0,
        checked_menus: [],
        id: 0,
      },
      menusList: [],
      selectIds: [],
      modelTit: '',
      ruleValidate: {
        role_name: [{ required: true, message: '请输入身份昵称', trigger: 'blur' }],
        role_key: [{ required: true, message: '请输入身份标识', trigger: 'blur' }],
        status: [{ required: true, type: 'number', message: '请选择是否开启', trigger: 'change' }],
        // checked_menus: [
        //     { required: true, validator: validateStatus, trigger: 'change' }
        // ]
      },
      defaultProps: {
        children: 'children',
        label: 'title',
      },
    };
  },
  computed: {
    ...mapState('media', ['isMobile']),
    labelWidth() {
      return this.isMobile ? undefined : '80px';
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'right';
    },
    labelPosition2() {
      return this.isMobile ? 'top' : 'right';
    },
  },
  created() {
    this.getList();
  },
  methods: {
    closed() {
      this.formInline = {
        role_name: '',
        status: 0,
        checked_menus: [],
        id: 0,
      };
      this.selectIds = [];
    },
    // 添加
    add(name) {
      this.formInline.id = 0;
      this.modelTit = name;
      this.modals = true;
      this.formShow = true;
      this.getmenusList();
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
        roleDelFromApi(row.id)
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
    // 修改是否显示
    onchangeIsShow(row) {
      let data = {
        id: row.id,
        status: row.status,
      };
      roleSetStatusApi(data)
        .then(async (res) => {
          this.$message.success(res.msg);
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    // 列表
    getList() {
      this.loading = true;
      this.formValidate.status = this.formValidate.status || '';
      roleListApi(this.formValidate)
        .then(async (res) => {
          let data = res.data;
          this.tableList = data.list;
          this.total = res.data.count;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
    // 表格搜索
    userSearchs() {
      this.formValidate.page = 1;
      this.getList();
    },
    // 编辑
    edit(row, name) {
      this.modelTit = name;
      this.formInline.id = row.id;
      this.modals = true;
      this.formShow = true;
      this.rows = row;
      this.getIofo(row);
    },
    // 菜单列表
    getmenusList() {
      this.spinShow = true;
      menusListApi()
        .then(async (res) => {
          let data = res.data;
          this.formShow = false;
          this.menusList = data.menus;
          this.menusList.map((item, index) => {
            if (item.title === '主页') {
              // item.checked = true;
              // item.disableCheckbox = true;
              if (item.children.length) {
                item.children.map((v) => {
                  // v.checked = true;
                  // v.disableCheckbox = true;
                });
              }
            }
            item.expand = false;
          });
          this.spinShow = false;
        })
        .catch((res) => {
          this.spinShow = false;
          this.formShow = false;
          this.$message.error(res.msg);
        });
    },
    // 详情
    getIofo(row) {
      this.spinShow = true;
      roleInfoApi(row.id)
        .then(async (res) => {
          let data = res.data;
          this.formShow = false;
          this.formInline = data.role || this.formInline;
          this.formInline.role_key = data.role.roleKey;
          this.formInline.role_name = data.role.roleName;
          this.formInline.checked_menus = this.formInline.rules;
          this.$nextTick((e) => {
            this.selectIds = this.formInline.rules.split(',');
            this.tidyRes(data.menus);
            // this.$refs.tree.setCheckedKeys(Array(arr));
          });
          this.spinShow = false;
        })
        .catch((res) => {
          this.spinShow = false;
          this.formShow = false;
          this.$message.error(res.msg);
        });
    },
    forChildrenChecked(arr, status, pid) {
      if (arr.length) {
        let len = arr.length;
        for (var j = 0; j < len; j++) {
          var childNode = this.$refs.tree.getNode(arr[j].id).data;
          if (status) {
            this.$refs.tree.setChecked(childNode.id, true);
            childNode.checked = true;
          }
          if (!status) {
            this.$refs.tree.setChecked(childNode.id, false);
            childNode.checked = false;
          }
          if (childNode.children.length) {
            this.forChildrenChecked(childNode.children, status);
          }
        }
      }
    },

    clickDeal(currentObj, treeStatus, ccc) {
      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      let selected = treeStatus.checkedKeys.indexOf(currentObj.id); // -1未选中
      // 选中
      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中
        this.selectedParent(currentObj);
        // 统一处理子节点为相同的勾选状态
        this.uniteChildSame(currentObj, true);
      } else {
        // 未选中 处理子节点全部未选中
        if (currentObj.children.length !== 0) {
          this.uniteChildSame(currentObj, false);
        }
        let selParent = false;
        let parentNode = currentObj.pid ? this.$refs.tree.getNode(currentObj.pid).data : undefined;
        if (parentNode && parentNode.children.length) {
          for (let i = 0; i < parentNode.children.length; i++) {
            if (treeStatus.checkedKeys.includes(parentNode.children[i].id)) {
              selParent = true;
            }
          }
        }
        if (!selParent && currentObj.pid) this.$refs.tree.setChecked(currentObj.pid, false);
      }
    },
    // 统一处理子节点为相同的勾选状态
    uniteChildSame(treeList, isSelected) {
      this.$refs.tree.setChecked(treeList.id, isSelected);
      for (let i = 0; i < treeList.children.length; i++) {
        this.uniteChildSame(treeList.children[i], isSelected);
      }
    },
    // 统一处理父节点为选中
    selectedParent(currentObj) {
      let currentNode = this.$refs.tree.getNode(currentObj);
      if (currentNode.parent.key !== undefined) {
        this.$refs.tree.setChecked(currentNode.parent, true);
        this.selectedParent(currentNode.parent);
      }
    },
    tidyRes(menus) {
      let data = [];
      menus.map((menu) => {
        if (menu.title === '主页') {
          menu.checked = true;
          // menu.disabled = true;
          if (menu.children.length) {
            menu.children.map((v) => {
              v.checked = true;
            });
          }
          data.push(menu);
        } else {
          data.push(this.initMenu(menu));
        }
      });
      this.$set(this, 'menusList', data);
    },
    initMenu(menu) {
      let data = {},
        checkMenus = ',' + this.formInline.checked_menus + ',';
        data.title = menu.title;
        data.id = menu.id;
        data.pid = menu.pid;
        data.children = menu.children;
        data.checked = menu.checked;

      if (menu.children && menu.children.length > 0) {
        data.children = [];
        menu.children.map((child) => {
          data.children.push(this.initMenu(child));
        });
      } else {
        data.checked = checkMenus.indexOf(String(',' + data.id + ',')) !== -1;
        data.expand = !data.checked;
      }
      return data;
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formInline.checked_menus = [
            ...this.$refs.tree.getCheckedKeys(),
            ...this.$refs.tree.getHalfCheckedKeys(),
          ];
          if (this.formInline.checked_menus.length === 0) return this.$message.warning('请至少选择一个权限');
          this.formShow = true;
          if(this.formInline.id === 0){
            roleCreateApi(this.formInline)
                .then(async (res) => {
                  this.formShow = false;
                  this.$message.success(res.msg);
                  this.modals = false;
                  this.getList();
                  this.$refs[name].resetFields();
                  this.formInline.checked_menus = [];
                })
                .catch((res) => {
                  this.formShow = false;
                  this.$message.error(res.msg);
                });
          } else {
            roleEditApi(this.formInline)
                .then(async (res) => {
                  this.formShow = false;
                  this.$message.success(res.msg);
                  this.modals = false;
                  this.getList();
                  this.$refs[name].resetFields();
                  this.formInline.checked_menus = [];
                })
                .catch((res) => {
                  this.formShow = false;
                  this.$message.error(res.msg);
                });
          }
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.$refs['formInline'].resetFields();
      this.formInline.checked_menus = [];
      this.selectIds = [];
      this.modals = false;
    },
  },
};
</script>

<style scoped lang="stylus">
.trees-coadd
    width: 100%;
    height: 385px;
    .scollhide
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
       // margin-left: 18px;
.scollhide::-webkit-scrollbar {
    display: none;
}
</style>
