<template>
  <div>
    <el-card :bordered="false" shadow="never" class="ivu-mt">
      <el-form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-width="160px"
        label-position="right"
      >
        
		<el-form-item label="问卷调查二维码：">
		  <div >
		    <img :src="qrCode" alt="" style="width: 150px;height: 150px;"/>
		  </div>
		</el-form-item>
		<el-form-item label="头像：">
		  <div class="avatar" @click="avatarMoadl = true">
		    <img v-if="formValidate.headPic" :src="formValidate.headPic" alt="" />
		    <img v-else src="../../../assets/images/f.png" alt="" />
		  </div>
		</el-form-item>
        <el-form-item label="账号：" prop="">
          <el-input type="text" v-model="account" :disabled="true" class="input"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="real_name">
          <el-input type="text" v-model="formValidate.realName" class="input"></el-input>
        </el-form-item>
        <el-form-item label="原始密码：">
          <el-input type="password" v-model="formValidate.pwd" class="input"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input type="password" v-model="formValidate.newPwd" class="input"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：">
          <el-input type="password" v-model="formValidate.confirmPwd" class="input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('formValidate')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
			
    <el-dialog :visible.sync="avatarMoadl" title="头像上传" width="720px">
      <CropperImg v-if="avatarMoadl" @uploadImgSuccess="uploadImgSuccess"></CropperImg>
    </el-dialog>
  </div>
</template>

<script>
import { updtaeAdmin } from '@/api/user';
import { mapState } from 'vuex';
import CropperImg from '@/components/cropperImg';
import { getCookies } from '@/libs/util';
export default {
  name: 'setting_user',
  components: { CropperImg },
  computed: {
    ...mapState('media', ['isMobile']),
    ...mapState('userLevel', ['categoryId']),
    labelWidth() {
      return this.isMobile ? undefined : '80px';
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'right';
    },
  },
  data() {
    return {
      account: '',
      avatarMoadl: false,
	  qrCode: '',	 
      formValidate: {
        avatar: '',
        realName: '',
        pwd: '',
        newPwd: '',
        confPwd: '',
      },
      ruleValidate: {
        realName: [{ required: true, message: '您的姓名不能为空', trigger: 'blur' }],
      },
    };
  },
  mounted() {
    this.account = this.$store.state.userInfo.userInfo.account;
    this.formValidate.headPic = this.$store.state.userInfo.userInfo.headPic;
    this.formValidate.realName = this.$store.state.userInfo.userInfo.realName;
	let binary = "";
	const bytes = new Uint8Array(this.$route.params.data)
	for(let i = 0; i< bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i])
	}
	this.qrCode = "data:image/png;base64," + window.btoa(binary);
  },
  created() {
	 
  },
  methods: {
    uploadImgSuccess(data) {
      this.avatarMoadl = false;
      this.formValidate.headPic = data;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            account : this.account,
            headPic: this.formValidate.headPic,
            realName: this.formValidate.realName,
            pwd: this.formValidate.pwd,
            newPwd: this.formValidate.newPwd,
            confirmPwd: this.formValidate.confirmPwd
          }
          updtaeAdmin(data)
            .then((res) => {
              this.$store.commit('userInfo/userRealName', this.formValidate.realName);
              this.$store.commit('userInfo/userRealHeadPic', this.formValidate.headPic);
              this.$message.success(res.msg);
            })
            .catch((res) => {
              this.$message.error(res.msg);
            });
        } else {
          if (this.formValidate.newPwd !== this.formValidate.confirmPwd) {
            this.$message.error('您输入的新密码与旧密码不一致');
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 400px;
}
.avatar {
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #f2f2f2;
  }
}
</style>
