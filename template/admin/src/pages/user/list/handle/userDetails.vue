<template>
  <div style="width: 100%">
    <el-drawer :visible.sync="modals" title="用户详情" :wrapperClosable="false" 
	:size="1300" @closed="draChange">
      <div class="acea-row head">
        <div class="avatar mr15"><img :src="psInfo.headUrl" /></div>
        <div class="dashboard-workplace-header-tip">
          <p class="dashboard-workplace-header-tip-title" v-text="psInfo.nickName || '-'"></p>
          <div class="dashboard-workplace-header-tip-desc">
            <span class="dashboard-workplace-header-tip-desc-sp" 
			v-for="(item, index) in detailsData" :key="index">{{
              item.title + '：' + item.value
            }}</span>
          </div>
        </div>
        <div class="edit-btn" v-if="this.psInfo && this.psInfo.appUser && this.psInfo.appUser.tel">
          <el-button v-if="!isEdit" type="primary" @click="edit">编辑</el-button>
          <el-button v-if="isEdit" @click="edit">取消</el-button>
          <el-button v-if="isEdit" type="primary" @click="editSave">保存</el-button>
        </div>
      </div>
      <el-row justify="space-between" class="mt14">
        <el-col :span="24">
          <el-tabs type="border-card" v-model="activeName" @tab-click="changeTab">
            <el-tab-pane name="user" label="用户信息">
              <userEditForm ref="editForm" :userId="userId" 
			  @success="getDetails(userId)" v-if="isEdit"></userEditForm>
              <user-info :ps-info="psInfo" v-else></user-info>
            </el-tab-pane>
			<el-tab-pane name="questionNaire" label="调查问卷">
			  <question-naire :ps-info="psInfo"></question-naire>
			</el-tab-pane>
            <el-tab-pane :name="item.val" v-for="(item, index) in list" :key="index" :label="item.label">
              <template>
				<el-row :gutter="24" justify="space-between" 
					v-if="userFrom.type==='recipe' && psInfo.appUser.tel">
				  <el-col :span="24" style="padding-top: 12px;">
				   <el-button v-auth="['user-set-recipe']" type="primary" 
				   @click="createFood(userId)">定制食谱</el-button>  
				  </el-col>
				</el-row>
                <el-table
                  class="mt20"
                  :data="userLists"
                  max-height="400"
                  ref="table"
                  v-loading="loading"
                  no-userFrom-text="暂无数据"
                  no-filtered-userFrom-text="暂无筛选结果"
                >
                  <el-table-column :label="item.title" min-width="120" 
				  v-for="(item, index) in columns" :key="index">
                    <template slot-scope="scope">
                      <template v-if="item.key">
                        <div>
                          <span>{{ scope.row[item.key] }}</span>
                        </div>
                      </template>
                      <template v-else-if="item.slot === 'number'">
                        <div :class="scope.row.pm ? 'plusColor' : 'reduceColor'">
                          {{ scope.row.pm ? '+' + scope.row.number : '-' + scope.row.number }}
                        </div>
                      </template>
					  <template v-if="item.title === '总热量'">
					    <div>
					      <span>{{ parseFloat(Number(scope.row['totalHeat']) * 
						  Number(scope.row['totalPercent'])).toFixed(2) }}</span>
					    </div>
					  </template>
					  <template v-if="item.title === '早餐热量'">
					    <div>
					      <span>{{ parseFloat(Number(scope.row['totalHeat']) * 
						  Number(scope.row['totalPercent']) * 
						  Number(scope.row['morningPercent'])).toFixed(2) }}</span>
					    </div>
					  </template>
					  <template v-if="item.title === '午餐热量'">
					    <div>
					      <span>{{ parseFloat(Number(scope.row['totalHeat']) * 
						  Number(scope.row['totalPercent']) * 
						  Number(scope.row['noonPercent'])).toFixed(2) }}</span>
					    </div>
					  </template>
					  <template v-if="item.title === '晚餐热量'">
					    <div>
					      <span>{{ parseFloat(Number(scope.row['totalHeat']) * 
						  Number(scope.row['totalPercent']) * 
						  Number(scope.row['nightPercent'])).toFixed(2) }}</span>
					    </div>
					  </template>
					  <template v-if="item.title === '操作'">
					    <a @click="getQrCodeDetails(scope.row['uuId'])">查看二维码</a>
					  </template>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="acea-row row-right page">
                  <pagination
                    v-if="total"
                    :total="total"
                    :page.sync="userFrom.page"
                    :limit.sync="userFrom.limit"
                    @pagination="changeType"
                  />
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-drawer>
	<!-- 查看生成食谱弹窗 -->
	<foodLinkDialog :isShow="isShow"
					:qrCode="qrCode"
					:link="link"
	                @closeFood="closeFood"></foodLinkDialog>
  </div>
</template>

<script>
import { detailsApi, infoApi, getQrCode } from '@/api/user';
import userInfo from './userInfo';
import questionNaire from './questionNaire';
import userEditForm from './userEditForm';
import foodLinkDialog from '../foodContxt/foodLinkDialog.vue';
export default {
  name: 'userDetails',
  components: { userInfo, questionNaire, userEditForm, foodLinkDialog },
  data() {
    return {
      isEdit: false,
      theme2: 'light',
      list: [
	    { val: 'recipe', label: '食谱记录' },
        // { val: 'order', label: '消费记录' },
        // { val: 'integral', label: '积分明细' },
        // { val: 'sign', label: '签到记录' },
        // { val: 'coupon', label: '持有优惠券' },
        // { val: 'balance_change', label: '余额变动' },
        // { val: 'spread', label: '好友关系' },
      ],
      modals: false,
      spinShow: false,
      detailsData: [],
      userId: "",
      loading: false,
      userFrom: {
        type: 'recipe',
        page: 1, // 当前页
        limit: 20, // 每页显示条数
      },
      total: 0,
      columns: [],
      userLists: [],
      psInfo: {},
      activeName: 'user',
	  qrCode: '',
	  link: '',
	  isShow: false,
    };
  },
  created() {},
  methods: {
    edit() {
      this.activeName = 'user';
      this.isEdit = !this.isEdit;
    },
    editSave() {
      this.$refs.editForm.setUser();
    },
    draChange() {
      this.isEdit = false;
    },
    // 用户详情
    getDetails(id) {
      this.activeName = 'user';
      this.userId = id;
      this.spinShow = true;
      this.isEdit = false;
      detailsApi(id)
        .then(async (res) => {
          if (res.code === 200) {
            let data = res.data;
			console.log(data)
            this.detailsData = data.headerList;
            this.psInfo = data.ps_info;
            // this.changeType('user');
            this.spinShow = false;
          } else {
            this.spinShow = false;
            this.$message.error(res.msg);
          }
        })
        .catch((res) => {
          this.spinShow = false;
          this.$message.error(res.msg);
        });
    },
    changeTab(tab) {
      this.activeName = tab.name;
      this.changeType();
    },
    // tab选项
    changeType() {
      this.loading = true;
      this.userFrom.type = this.activeName;
      this.isEdit = false;
      if (this.activeName == 'user') return;
	  if (this.activeName === 'questionNaire') return;
      if (this.userFrom.type === '') {
        this.userFrom.type = 'recipe';
      }
      let data = {
        uuId: this.userId,
        ...this.userFrom
      };
      infoApi(data)
        .then(async (res) => {
          if (res.code === 200) {
            switch (this.userFrom.type) {
			  case 'recipe':
				this.columns = [
					{
						title: '唯一标识',
						key: 'id',
						minWidth: 250, 
					},
					{
						title: '食谱天数',
						key: 'dayNum',
						minWidth: 80, 
					},
					{
						title: '阶段',
						key: 'stage',
						minWidth: 120, 
					},
					{
						title: '总热量',
						key: '',
						minWidth: 120, 
					},
					{
						title: '早餐热量',
						key: '',
						minWidth: 120, 
					},
					{
						title: '午餐热量',
						key: '',
						minWidth: 120, 
					},
					{
						title: '晚餐热量',
						key: '',
						minWidth: 120, 
					},
					{
						title: '记录时间',
						key: 'inTime',
						minWidth: 180, 
					},
					{
						title: '操作',
						key: '',
						minWidth: 160, 
					},
				]
			    break;
              case 'order':
                this.columns = [
                  {
                    title: '订单ID',
                    key: 'order_id',
                    minWidth: 160,
                  },
                  {
                    title: '收货人',
                    key: 'real_name',
                    minWidth: 100,
                  },
                  {
                    title: '商品数量',
                    key: 'total_num',
                    minWidth: 90,
                  },
                  {
                    title: '实付金额',
                    key: 'pay_price',
                    minWidth: 120,
                  },
                  {
                    title: '交易完成时间',
                    key: 'pay_time',
                    minWidth: 120,
                  },
                ];
                break;
              case 'integral':
                this.columns = [
                  {
                    title: '来源/用途',
                    key: 'title',
                    minWidth: 120,
                  },
                  {
                    title: '积分变化',
                    slot: 'number',
                    minWidth: 120,
                  },
                  {
                    title: '变化后积分',
                    key: 'balance',
                    minWidth: 120,
                  },
                  {
                    title: '日期',
                    key: 'add_time',
                    minWidth: 120,
                  },
                  {
                    title: '备注',
                    key: 'mark',
                    minWidth: 120,
                  },
                ];
                break;
              case 'sign':
                this.columns = [
                  {
                    title: '动作',
                    key: 'title',
                    minWidth: 120,
                  },
                  {
                    title: '获得积分',
                    key: 'number',
                    minWidth: 120,
                  },
                  {
                    title: '签到时间',
                    key: 'add_time',
                    minWidth: 120,
                  },
                  {
                    title: '备注',
                    key: 'mark',
                    minWidth: 120,
                  },
                ];
                break;
              case 'coupon':
                this.columns = [
                  {
                    title: '优惠券名称',
                    key: 'coupon_title',
                    minWidth: 120,
                  },
                  {
                    title: '面值',
                    key: 'coupon_price',
                    minWidth: 120,
                  },
                  {
                    title: '有效期(天)',
                    key: 'coupon_time',
                    minWidth: 120,
                  },
                  {
                    title: '领取时间',
                    key: '_add_time',
                    minWidth: 120,
                  },
                ];
                break;
              case 'balance_change':
                this.columns = [
                  {
                    title: '动作',
                    key: 'title',
                    minWidth: 120,
                  },
                  {
                    title: '余额变动',
                    slot: 'number',
                    minWidth: 120,
                  },
                  {
                    title: '当前余额',
                    key: 'balance',
                    minWidth: 120,
                  },
                  {
                    title: '创建时间',
                    key: 'add_time',
                    minWidth: 120,
                  },
                  {
                    title: '备注',
                    key: 'mark',
                    minWidth: 120,
                  },
                ];
                break;
              default:
                this.columns = [
                  {
                  	title: '唯一标识',
                  	key: 'id',
                  	minWidth: 250, 
                  },
                  {
                  	title: '食谱天数',
                  	key: 'dayNum',
                  	minWidth: 80, 
                  },
                  {
                  	title: '阶段',
                  	key: 'stage',
                  	minWidth: 120, 
                  },
                  {
                  	title: '总热量',
                  	key: '',
                  	minWidth: 120, 
                  },
                  {
                  	title: '早餐热量',
                  	key: '',
                  	minWidth: 120, 
                  },
                  {
                  	title: '午餐热量',
                  	key: '',
                  	minWidth: 120, 
                  },
                  {
                  	title: '晚餐热量',
                  	key: '',
                  	minWidth: 120, 
                  },
                  {
                  	title: '记录时间',
                  	key: 'inTime',
                  	minWidth: 180, 
                  },
                  {
                  	title: '操作',
                  	key: '',
                  	minWidth: 160, 
                  },
                ];
            }
            this.$nextTick((e) => {
              let data = res.data;
              this.userLists = data.list;
              this.total = data.count;
            });
            this.loading = false;
          } else {
            this.loading = false;
            this.$message.error(res.msg);
          }
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
	closeFood () {
	  this.isShow = false;
	},
	getQrCodeDetails(uuId) {
		this.isShow = true;
		getQrCode(uuId).then(r=>{
			// 将ArrayBuffer转换为Base64编码的字符串
			const buffer = new Uint8Array(r);
			const base64String = btoa(
			  buffer.reduce((data, byte) => data + String.fromCharCode(byte), "")
			);
			this.qrCode = "data:image/png;base64," + base64String;
		})
		this.link = res.data.link
	},
	createFood(userId){
	  this.$router.push({
	    path: this.$routeProStr  + '/user/add_food',
	    query: {
	      userId: userId
	    }
	  })
	},
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
::v-deep .el-drawer__body {
  padding: 20px 0 !important;
}
::v-deep .el-tabs--border-card > .el-tabs__content {
  padding: 0 35px;
}
::v-deep .el-tabs--border-card > .el-tabs__header,
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item:active {
  border: none;
  height: 40px;
}
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border: none;
  border-top: 2px solid var(--prev-color-primary);
  font-size: 13px;
  font-weight: 500;
  color: #303133;
  line-height: 16px;
}
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  border: none;
}
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  margin-top: 0;
  transition: none;
  height: 40px !important;
  line-height: 40px !important;
  width: 92px !important;
  font-size: 13px;
  font-weight: 400;
  color: #303133;
  line-height: 16px;
}
::v-deep .el-tabs--border-card {
  border: none;
  box-shadow: none;
}
.head {
  position: relative;
  padding: 0 15px;
  .edit-btn {
    position: absolute;
    right: 10px;
    top: 0px;
    display: flex;
    align-items: center;
  }
}
.dashboard-workplace {
  &-header {
    &-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 16px;
      font-weight: 600;
    }

    &-tip {
      width: 82%;
      display: inline-block;
      vertical-align: middle;

      &-title {
        font-size: 13px;
        color: #000000;
        margin-bottom: 12px;
      }

      &-desc {
        &-sp {
          width: 33.33%;
          color: #17233d;
          font-size: 13px;
          display: inline-block;
        }
      }
    }

    &-extra {
      .ivu-col {
        p {
          text-align: right;
        }

        p:first-child {
          span:first-child {
            margin-right: 4px;
          }

          span:last-child {
            color: #808695;
          }
        }

        p:last-child {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
<style scoped lang="stylus">
.user_menu ::v-deep .ivu-menu {
  width: 100% !important;
}
</style>
