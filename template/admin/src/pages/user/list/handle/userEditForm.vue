<template>
  <div class="user-info">
    <el-form ref="formItem" :rules="ruleValidate" :model="formItem" label-width="100px" @submit.native.prevent>
      <div class="section">
        <div class="section-hd">基本信息</div>
        <div class="section-bd">
          <div class="item">
            <el-form-item label="用户ID：">
              <el-input class="form-sty" disabled v-model="formItem.userId" placeholder="请输入编号"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="真实姓名：">
              <el-input class="form-sty" v-model.trim="formItem.realName" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="手机号码：" prop="tel">
              <el-input class="form-sty" v-model="formItem.tel" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="生日：">
              <el-date-picker
                clearable
                class="form-sty"
                type="date"
                v-model="formItem.birth"
                placeholder="请选择生日"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="性别：">
              <el-radio-group v-model="formItem.sex">
                <el-radio v-for="item in list" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="身份证号：" prop="idCard">
              <el-input class="form-sty" v-model.trim="formItem.idCard" placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="原始体重：" prop="weight">
              <el-input class="form-sty" v-model="formItem.weight" placeholder="请输入原始体重"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="目标体重：" prop="targetWeight">
              <el-input class="form-sty" v-model="formItem.targetWeight" placeholder="请输入目标体重"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="用户身高：" prop="height">
              <el-input class="form-sty" v-model="formItem.height" placeholder="请输入用户身高"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-hd">密码</div>
        <div class="section-bd">
          <div class="item">
            <el-form-item label="登录密码：">
              <el-input
                class="form-sty"
                type="password"
                v-model="formItem.pwd"
                placeholder="请输入登录密码（修改用户可不填写，不填写不修改原密码）"
              ></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="确认密码：">
              <el-input
                class="form-sty"
                type="password"
                v-model="formItem.truePwd"
                placeholder="请输入确认密码（修改用户可不填写，不填写不修改原密码）"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-hd">用户概况</div>
        <div class="section-bd">
<!--          <div class="item">-->
<!--            <el-form-item label="用户等级：">-->
<!--              <el-select v-model="formItem.level" class="form-sty" clearable>-->
<!--                <el-option-->
<!--                  v-for="(item, index) in infoData.levelInfo"-->
<!--                  :key="index"-->
<!--                  :value="item.id"-->
<!--                  :label="item.name"-->
<!--                ></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </div>-->
          <div class="item">
            <el-form-item label="用户分组：">
              <el-select v-model="formItem.group_id" class="form-sty" clearable>
                <el-option
                  v-for="(item, index) in infoData.groupInfo"
                  :key="index"
                  :value="item.id"
                  :label="item.group_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item lang">
            <el-form-item label="用户标签：">
              <div style="display: flex">
                <div class="labelInput acea-row row-between-wrapper" @click="openLabel">
                  <div style="width: 90%">
                    <div v-if="dataLabel.length">
                      <el-tag
                        closable
                        v-for="(item, index) in dataLabel"
                        :key="index"
                        @close="closeLabel(item)"
                        class="mr10"
                        >{{ item.label_name }}</el-tag
                      >
                    </div>
                    <span class="span" v-else>选择用户关联标签</span>
                  </div>
                  <div class="ivu-icon ivu-icon-ios-arrow-down"></div>
                </div>
                <span class="addfont" @click="addLabel">新增标签</span>
              </div>
            </el-form-item>
          </div>
<!--          <div class="item lang">-->
<!--            <el-form-item label="推广资格：">-->
<!--              <el-radio-group v-model="formItem.spread_open" class="form-sty">-->
<!--                <el-radio :label="1">开启</el-radio>-->
<!--                <el-radio :label="0">关闭</el-radio>-->
<!--              </el-radio-group>-->
<!--              <div class="tip">关闭用户的推广资格后，在任何分销模式下该用户都无分销权限</div>-->
<!--            </el-form-item>-->
<!--          </div>-->
<!--          <div class="item lang">-->
<!--            <el-form-item label="推广权限：">-->
<!--              <el-radio-group v-model="formItem.is_promoter" class="form-sty">-->
<!--                <el-radio :label="1">开启</el-radio>-->
<!--                <el-radio :label="0">关闭</el-radio>-->
<!--                <div class="tip">指定分销模式下，开启或关闭用户的推广权限</div>-->
<!--              </el-radio-group>-->
<!--            </el-form-item>-->
<!--          </div>-->
<!--          <div class="item lang">-->
<!--            <el-form-item label="用户状态：">-->
<!--              <el-radio-group v-model="formItem.status" class="form-sty">-->
<!--                <el-radio :label="1">开启</el-radio>-->
<!--                <el-radio :label="0">锁定</el-radio>-->
<!--              </el-radio-group>-->
<!--            </el-form-item>-->
<!--          </div>-->
        </div>
      </div>
      <div class="section">
        <div class="section-hd">用户备注</div>
        <div class="section-bd">
          <div class="item">
            <el-form-item label="用户备注：">
              <el-input
                class="form-sty"
                type="textarea"
                :rows="5"
                v-model="formItem.address"
                placeholder="请输入用户备注"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-dialog :visible.sync="labelShow" title="请选择用户标签" :modal="false" :show-close="true" width="540px">
      <userLabel
        v-if="labelShow"
        :only_get="true"
        :uid="formItem.userId"
        @close="labelClose"
        @activeData="activeData"
      ></userLabel>
    </el-dialog>
  </div>
</template>

<script>
import userLabel from '@/components/userLabel';

import { userLabelAddApi, getUserInfo, editUser, setUser } from '@/api/user';
import dayjs from 'dayjs';

export default {
  name: 'userInfo',
  components: { userLabel },
  props: {
    userId: {
      type: String,
      default: "",
    },
  },
  filters: {
    timeFormat(value) {
      if (!value) {
        return '-';
      }
      return dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss');
    },
    gender(value) {
      if (value == 1) {
        return '男';
      } else if (value == 0) {
        return '女';
      } else {
        return '未知';
      }
    },
  },
  data() {
    return {
      labelShow: false,
      formItem: {
        userId: '',
        realName: '',
        sex: 0,
        tel: '',
        birth: '',
        idCard: '',
        weight: '',
        targetWeight: '',
        height: '',
        pwd: '',
        truePwd: '',
        address: ''
      },
      groupInfo: [],
      labelInfo: [],
      levelInfo: [],
      infoData: {
        groupInfo: [],
        labelInfo: [],
        levelInfo: [],
      },
      ruleValidate: {
        tel: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[3,5,6,7,8])|(18[0-9])|(19[8,9]))\d{8}$/,
            message: "请输入正确的登录名（手机号码）",
            trigger: "blur"
          }
        ],
        weight: [{ required: true, message: '请输入原始体重', trigger: 'blur' },
          // { type: 'number', message: "原始体重必须是数值", trigger: 'blur'},
          { validator: (rule, value, callback) => {
              const regex = /^\d+(\.\d+)?$/;
              if (regex.test(value)) {
                const number = parseFloat(value);
                if (isNaN(number)) {
                  callback(new Error('请输入原始体重为有效的数字'));
                } else if (number < 0 || number > 200) {
                  callback(new Error('原始体重必须在0到200之间'));
                } else {
                  callback();
                }
              } else {
                callback(new Error('请输入原始体重为数值或有效的小数')); // 验证不通过
              }
            }, trigger: 'blur'},
        ],
        targetWeight: [{ required: true, message: '请输入目标体重', trigger: 'blur' },
          // { type: 'number', message: "原始体重必须是数值", trigger: 'blur'},
          { validator: (rule, value, callback) => {
              const regex = /^\d+(\.\d+)?$/;
              if (regex.test(value)) {
                const number = parseFloat(value);
                if (isNaN(number)) {
                  callback(new Error('请输入目标体重为有效的数字'));
                } else if (number < 0 || number > 200) {
                  callback(new Error('目标体重必须在0到200之间'));
                } else {
                  callback();
                }
              } else {
                callback(new Error('请输入目标体重为数值或有效的小数')); // 验证不通过
              }
            }, trigger: 'blur'},
        ],
        height: [{ required: true, message: '请输入用户身高', trigger: 'blur' },
          // { type: 'number', message: '身高必须是数字值', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              const regex = /^\d+(\.\d+)?$/;
              if (regex.test(value)) {
                const number = parseFloat(value);
                if (isNaN(number)) {
                  callback(new Error('请输入用户身高为有效的数字'));
                } else if (number < 100 || number > 250) {
                  callback(new Error('用户身高必须在100到250之间'));
                } else {
                  callback();
                }
              } else {
                callback(new Error('请输入用户身高为数值或有效的小数')); // 验证不通过
              }
            }, trigger: 'blur'},
        ]
      },
      dataLabel: [],
      list: [{label:'男',value:1},{label:'女',value:0}]
    };
  },
  computed: {
    hasExtendInfo() {
      //   return this.psInfo.extend_info.some((item) => item.value);
    },
  },
  created() {
    this.getUserFrom(this.userId);

    // this.formItem = this.userData.userInfo;
  },
  methods: {
    setUser() {
      let data = {
        userId: this.formItem.userId,
        realName: this.formItem.realName,
        sex: this.formItem.sex,
        tel: this.formItem.tel,
        birth: this.formItem.birth,
        idCard: this.formItem.idCard,
        weight: this.formItem.weight,
        targetWeight: this.formItem.targetWeight,
        height: this.formItem.height,
        pwd: this.formItem.pwd,
        truePwd: this.formItem.truePwd,
        address: this.formItem.address
      };
      let ids = [];
      this.dataLabel.map((i) => {
        ids.push(i.id);
      });
      data.label_id = ids;
      // if (!data.real_name) return this.$message.warning("请输入真实姓名");
      // if (!data.phone) return this.$message.warning("请输入手机号");
      // if (!data.pwd) return this.$message.warning("请输入密码");
      // if (!data.true_pwd) return this.$message.warning("请输入确认密码");
      if (data.userId) {
        editUser(data)
          .then((res) => {
            this.$message.success(res.msg);
            this.$emit('success');
          })
          .catch((err) => {
            this.$message.error(err.msg);
          });
      } else {
        setUser(data)
          .then((res) => {
            this.$emit('success');
            this.$message.success(res.msg);
          })
          .catch((err) => {
            this.$message.error('err.msg');
          });
      }
    },
    addLabel() {
      this.$modalForm(userLabelAddApi(0)).then(() => {});
    },
    openLabel(row) {
      this.labelShow = true;
      this.$refs.userLabel.userLabel(JSON.parse(JSON.stringify(this.infoData.labelInfo)));
    },
    closeLabel(label) {
      let index = this.dataLabel.indexOf(this.dataLabel.filter((d) => d.id == label.id)[0]);
      this.dataLabel.splice(index, 1);
    },
    getUserFrom(id) {
      getUserInfo(id)
        .then(async (res) => {
          this.formItem = {
              ...res.data.userInfo,
            tel: res.data.userInfo.appUser.tel
          }
          this.userData = {
            ...this.formItem
          }
          this.$set(this.infoData, 'groupInfo', this.userData.groupInfo);
          // this.$set(this.infoData, 'levelInfo', this.userData.levelInfo);
          this.$set(this.infoData, 'labelInfo', this.userData.labelInfo);
          // let arr = Object.keys(this.formItem);
          // if (this.userData.userInfo) {
          //   arr.map((i) => {
          //     this.formItem[i] = this.userData.userInfo[i];
          //   });
            if (!this.formItem.birth) this.formItem.birth = '';
            if (this.formItem.label_id.length) {
              this.dataLabel = this.formItem.label_id;
            }
          // } else {
          //   this.reset();
          // }
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
    // 标签弹窗关闭
    labelClose() {
      this.labelShow = false;
    },
    activeData(dataLabel) {
      this.labelShow = false;
      this.dataLabel = dataLabel;
    },
    reset() {
      this.formItem = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.labelInput {
  border: 1px solid #dcdee2;
  width: 300px;
  padding: 0 15px;
  border-radius: 5px;
  min-height: 30px;
  cursor: pointer;
  font-size: 12px;

  .span {
    color: #c5c8ce;
  }

  .iconxiayi {
    font-size: 12px;
  }
}
.width-add {
  width: 40px;
}
.mr30 {
  margin-right: 30px;
}

.user-info {
  .section {
    padding: 25px 0;
    border-bottom: 1px dashed #eeeeee;

    &-hd {
      padding-left: 10px;
      border-left: 3px solid var(--prev-color-primary);
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: #303133;
    }

    &-bd {
      display: flex;
      flex-wrap: wrap;
    }

    .item {
      width: 50%;
      display: flex;
      margin: 16px 0px 0 0;
      font-size: 13px;
      color: #666;

      &:nth-child(3n + 3) {
        margin: 16px 0 0;
      }
      .form-sty {
        width: 300px;
      }
      .ivu-form-item {
        margin: 3px 0;
      }
      .addfont {
        display: inline-block;
        font-size: 12px;
        font-weight: 400;
        color: var(--prev-color-primary);
        margin-left: 14px;
        cursor: pointer;
        margin-left: 10px;
      }
    }
    .item.lang {
      width: 100%;
    }
    .value {
      flex: 1;
    }
    .avatar {
      width: 60px;
      height: 60px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
