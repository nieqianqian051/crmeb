<template>
  <div class="page-account">
    <div class="container" :class="[fullWidth > 768 ? 'containerSamll' : 'containerBig']">
      <swiper :options="swiperOption" class="swiperPross" v-if="fullWidth > 768">
        <swiper-slide class="swiperPic" v-for="(item, index) in swiperList" :key="index">
          <img :src="item.slide" alt="" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="index_from page-account-container from-wh">
        <div class="page-account-top">
          <div class="page-account-top-logo">
            <img :src="login_logo" alt="logo" style="width: 100%; height: 74px" />
          </div>
        </div>
        <el-form ref="formInline" :model="formInline" :rules="ruleInline" @keyup.enter="handleSubmit('formInline')">
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="formInline.username"
              prefix="ios-contact-outline"
              placeholder="请输入用户名"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="formInline.password"
              prefix="ios-lock-outline"
              placeholder="请输入密码"
              size="large"
              show-password
            />
          </el-form-item>
          <!-- <el-form-item prop="code">
            <div class="code">
              <el-input
                type="text"
                v-model="formInline.code"
                prefix="ios-keypad-outline"
                placeholder="请输入验证码"
                size="large"
              />
              <img :src="imgcode" class="pictrue" @click="captchas" />
            </div>
          </el-form-item> -->
          <el-form-item class="pt10">
            <el-button type="primary" :loading="loading" size="large" @click="handleSubmit('formInline')" class="btn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>

    <Verify
      @success="success"
      captchaType="blockPuzzle"
      :imgSize="{ width: '330px', height: '155px' }"
      ref="verify"
    ></Verify>
    <div class="footer">
      <div class="pull-right" v-if="copyright">{{ copyright }}</div>
      <div class="pull-right" v-else>
        Copyright © 2014-2024 <a href="https://www.crmeb.com" target="_blank">{{ version }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { AccountLogin, loginInfoApi } from '@/api/account';
import { getWorkermanUrl } from '@/api/kefu';
import { setCookies } from '@/libs/util';
import '@/assets/js/canvas-nest.min';
import Verify from '@/components/verifition/Verify';
import { PrevLoading } from '@/utils/loading.js';
import { formatFlatteningRoutes, findFirstNonNullChildren } from '@/libs/system';
import { Local } from '@/utils/storage.js';

export default {
  components: {
    Verify,
  },
  data() {
    return {
      fullWidth: document.documentElement.clientWidth,
      swiperOption: {
        pagination: '.swiper-pagination',
        autoplay: true,
      },
      loading: false,
      isShow: false,
      autoLogin: true,
      imgcode: '',
      formInline: {
        username: '',
        password: '',
      },
      ruleInline: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      login_captcha: 0,
      // jigsaw: null,
      login_logo: '',
      swiperList: [],
      defaultSwiperList: require('@/assets/images/sw.jpg'),
      key: '',
      copyright: '',
      version: '',
    };
  },
  created() {
    const _this = this;
    document.onkeydown = function () {
      if (_this.$route.name === 'login') {
        let key = window.event.keyCode;
        if (key === 13) {
          _this.handleSubmit('formInline');
        }
      }
    };
    window.addEventListener('resize', this.handleResize);
  },
  watch: {
    fullWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          // 打印screenWidth变化的值
          that.timer = false;
        }, 400);
      }
    },
    $route(n) {},
  },
  mounted: function () {
    this.$nextTick(() => {
      // /* eslint-disable */
      let that = this;
      // this.jigsaw = jigsaw.init({
      //   el: this.$refs.captcha,
      //   onSuccess() {
      //     that.modals = false;
      //     that.closeModel();
      //   },
      //   onFail: this.closefail,
      //   onRefresh() {},
      // });
      if (this.screenWidth < 768) {
        document.getElementsByTagName('canvas')[0].removeAttribute('class', 'index_bg');
      } else {
        document.getElementsByTagName('canvas')[0].className = 'index_bg';
      }
      this.swiperData();
    });
  },
  methods: {
    swiperData() {
      loginInfoApi()
        .then((res) => {
          window.document.title = `${res.data.site_name} - 登录`;
          localStorage.setItem('ADMIN_TITLE', res.data.site_name || '');
          this.$store.commit('setAdminTitle', res.data.site_name);
          let data = res.data || {};
          this.login_logo = data.login_logo ? data.login_logo : require('@/assets/images/logo.png');
          this.swiperList = data.slide.length ? data.slide : [{ slide: this.defaultSwiperList }];
          this.key = data.key;
          this.copyright = data.copyright;
          this.version = data.version;
          this.login_captcha = data.login_captcha;
        })
        .catch((err) => {
          this.$message({
			  type: "error",
			  message: err,
			  duration: 1000
		  })
          this.login_logo = require('@/assets/images/logo.png');
          this.swiperList = [{ slide: this.defaultSwiperList }];
        });
    },
    success(params) {
      this.closeModel(params);
    },
    // 关闭模态框
    closeModel(params) {
      this.isShow = false;
      // noinspection JSVoidFunctionReturnValueUsed

      this.loading = true;
      let data = {
		  username: this.formInline.username,
		  password: this.formInline.password
	  }
      AccountLogin(data)
        .then(async (res) => {
		  this.loading = false;
          let data = res.data;
          let expires = this.getExpiresTime(data.expires_time);
          // 记录用户登陆信息
          setCookies('uuid', data.user_info.id, expires);
          setCookies('token', data.token, expires);
          setCookies('expires_time', data.expires_time, expires);
          Local.set('PERMISSIONS', data.site_func);
          this.$store.commit('userInfo/uniqueAuth', data.unique_auth);
          this.$store.commit('userInfo/userInfo', data.user_info);
          // 保存菜单信息
          this.$store.commit('menus/setopenMenus', []);
          this.$store.commit('menus/getmenusNav', data.menus);
          this.$store.dispatch('routesList/setRoutesList', data.menus);
          let arr = formatFlatteningRoutes(this.$router.options.routes);
          this.formatTwoStageRoutes(arr);
          this.$store.commit('menus/setOneLvMenus', arr);
          let routes = formatFlatteningRoutes(data.menus);
          this.$store.commit('menus/setOneLvRoute', routes);
          // 记录用户信息
          this.$store.commit('userInfo/name', data.user_info.account);
          this.$store.commit('userInfo/avatar', data.user_info.headPic);
          this.$store.commit('userInfo/access', data.unique_auth);
          this.$store.commit('userInfo/logo', data.logo);
          this.$store.commit('userInfo/logoSmall', data.logo_square);
          this.$store.commit('userInfo/version', data.version);
          this.$store.commit('userInfo/newOrderAudioLink', data.newOrderAudioLink);
          this.login_captcha = 0;
          try {
            // if (data.queue === false) {
            //   this.$notify.warning({
            //     title: '温馨提示',
            //     dangerouslyUseHTMLString: true,
            //     message:
            //       '您的【消息队列】未开启，没有开启会导致异步任务无法执行。请尽快执行命令开启！！<a href="https://doc.crmeb.com/single/crmeb_v4/7217" target="_blank">点击查看开启方法</a>',
            //     duration: 30000,
            //   });
            // }
            // if (data.timer === false) {
            //   this.$notify.warning({
            //     title: '温馨提示',
            //     dangerouslyUseHTMLString: true,
            //     message:
            //       '您的【定时任务】未开启，没有开启会导致自动收货、未支付自动取消订单、订单自动好评、拼团到期退款等任务无法正常执行。请尽快执行命令开启！！<a href="https://doc.crmeb.com/single/crmeb_v4/7211" target="_blank">点击查看开启方法</a>',
            //     duration: 30000,
            //   });
            // }
            this.checkSocket();
          } catch (e) {}
          PrevLoading.start();
          return this.$router.push({
            path: res.data.menus.length ? findFirstNonNullChildren(res.data.menus).path : this.$routeProStr + '/',
          });
        })
        .catch((err) => {
		  this.loading = false;
          // console.log("登录失败",err)
          let data = res === undefined ? {} : res;
          this.$message({
			  type: "error",
			  message: data.msg || '登录失败',
			  duration: 1000
		  })
          this.login_captcha = res.data.login_captcha;
        });
    },
    formatTwoStageRoutes(arr) {
      if (arr.length <= 0) return false;
      const newArr = [];
      const cacheList = [];
      arr.forEach((v) => {
        if (v && v.meta && v.meta.keepAlive) {
          newArr.push({ ...v });
          cacheList.push(v.name);
          this.$store.dispatch('keepAliveNames/setCacheKeepAlive', cacheList);
        }
      });
      return newArr;
    },
    checkSocket() {
      getWorkermanUrl().then((res) => {
        let url = res.data.admin;
        let isNotice = false;
        let socket = new WebSocket(url);
        socket.onopen = () => {
          isNotice = true;
          socket.close();
        };
        socket.onerror = (err) => {
          if (!isNotice) {
            isNotice = true;
            this.$notify.warning({
              title: '温馨提示',
              message:
                '您的【长连接】未开启，没有开启会导致系统默认客服无法使用,后台订单通知无法收到。请尽快执行命令开启！！<a href="https://doc.crmeb.com/single/crmeb_v4/7219" target="_blank">点击查看开启方法</a>',
              dangerouslyUseHTMLString: true,
              duration: 30000,
            });
          }
        };
        socket.onclose = (err) => {
          if (!isNotice) {
            isNotice = true;
            this.$notify.warning({
              title: '温馨提示',
              message:
                '您的【长连接】未开启，没有开启会导致系统默认客服无法使用,后台订单通知无法收到。请尽快执行命令开启！！<a href="https://doc.crmeb.com/single/crmeb_v4/7219" target="_blank">点击查看开启方法</a>',
              dangerouslyUseHTMLString: true,
              duration: 30000,
            });
          }
        };
      });
    },
    getExpiresTime(expiresTime) {
      let nowTimeNum = Math.round(new Date() / 1000);
      let expiresTimeNum = expiresTime - nowTimeNum;
      return parseFloat(parseFloat(parseFloat(expiresTimeNum / 60) / 60) / 24);
    },

    closefail() {
      // if (this.jigsaw) this.jigsaw.reset();
      this.$message.error('校验错误');
    },
    handleResize(event) {
      this.fullWidth = document.documentElement.clientWidth;
      if (this.fullWidth < 768) {
        document.getElementsByTagName('canvas')[0].removeAttribute('class', 'index_bg');
      } else {
        document.getElementsByTagName('canvas')[0].className = 'index_bg';
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
		  this.loading = true;
          if (this.login_captcha == 1) {
		    this.loading = false;
            this.$refs.verify.show();
          } else {
            this.closeModel();
          }
        }
      });
    },
  },
  beforeCreate() {
    if (this.fullWidth < 768) {
      document.getElementsByTagName('canvas')[0].removeAttribute('class', 'index_bg');
    } else {
      document.getElementsByTagName('canvas')[0].className = 'index_bg';
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize);
    document.getElementsByTagName('canvas')[0].removeAttribute('class', 'index_bg');
  },
};
</script>
<style scoped lang="stylus">
.page-account {
  display: flex;
  width: 100%;
  background-image: url('../../../assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: auto;
}

.page-account .code {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-account .code .pictrue {
  height: 40px;
}

.swiperPross {
  border-radius: 12px 0px 0px 12px;
}

.swiperPross, .swiperPic, .swiperPic img {
  width: 510px;
  height: 100%;
}

.swiperPic img {
  width: 100%;
  height: 100%;
}

.container {
  height: 400px !important;
  padding: 0 !important;
  border-radius: 12px;
  z-index: 1;
  display: flex;
}

.containerSamll {
  /* width: 56% !important; */
  background: #fff !important;
}

.containerBig {
  width: auto !important;
  background: #f7f7f7 !important;
}

.index_from {
  padding: 32px 40px 32px 40px;
  height: 400px;
  box-sizing: border-box;
}

.page-account-top {
  padding: 20px 0 24px 0 !important;
  box-sizing: border-box !important;
  display: flex;
  justify-content: center;
}

.page-account-container {
  border-radius: 0px 6px 6px 0px;
}

.btn {
  width: 100%;
  background: linear-gradient(90deg, rgba(25, 180, 241, 1) 0%, rgba(14, 115, 232, 1) 100%) !important;
}

.captchaBox {
  width: 310px;
}

input {
  display: block;
  width: 290px;
  line-height: 40px;
  margin: 10px 0;
  padding: 0 10px;
  outline: none;
  border: 1px solid #c8cccf;
  border-radius: 4px;
  color: #6a6f77;
}

#msg {
  width: 100%;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
}

a:link, a:visited, a:hover, a:active {
  margin-left: 100px;
  color: #0366D6;
}

.index_from ::v-deep .ivu-input-large {
  font-size: 14px !important;
}

.from-wh {
  width: 400px;
}

.pull-right {
  float: right !important;
}

::v-deep .el-button--primary {
  border: none;
}

::v-deep .el-button {
  padding: 13px 20px !important;
}

.pull-right {
  float: right !important;
  color: #666;
}

.pull-right a {
  margin-left: 0;
  color: #666;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  margin: 0;
  background: rgba(255, 255, 255, 0.8);
  border-top: 1px solid #e7eaec;
  overflow: hidden;
  padding: 10px 20px;
  height: 36px;
  line-height: 18px;
  z-index: 999;
}
</style>
