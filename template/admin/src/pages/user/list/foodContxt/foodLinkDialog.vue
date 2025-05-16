<template>
  <!-- 替换相关食物弹窗 -->
  <el-dialog title=""
             :visible.sync="isShow"
             width="924px"
			 :close-on-click-modal="false"
			 :close-on-press-escape="false"
             :before-close="handleClose">
    <div class="linkWrap">
      <div class="linkLeft">
        <div class="leftBox">
          <div class="leftText1">
            邀请您查看
          </div>
          <div class="leftText2">私人饮食定制食谱</div>
          <div class="leftItem mt89">
            <img src="../../../../assets/images/food/danxuan_xuanzhong.png"
                 alt="">
            <span>专业营养师搭配</span>
          </div>
          <div class="leftItem mt10">
            <img src="../../../../assets/images/food/danxuan_xuanzhong.png"
                 alt="">
            <span>私人饮食定制</span>
          </div>
          <img :src="qrCode"
               alt=""
               class="erweimaImg" />
          <div class="leftText3">识别二维码查看定制食谱</div>
        </div>
      </div>
      <div class="linkRight">
     <!--   <div class="rightTitle">食谱链接</div>
        <div class="mainText1">食谱地址</div>
        <div class="rightMain">
          <div class="mainLeft">
            <div class="mainLink">{{link}}</div>
          </div>
          <div class="mainRight">
            <img src="../../../../assets/images/food/fuzhi.png"
                 alt="">
            <span>复制链接</span>
          </div>
        </div> -->
        <div class="handleBtn">
          <el-button @click="uploadImg"
                     type="primary"
                     plain>下载图片</el-button>
          <el-button type="primary"
                     @click="saveFood">确 定</el-button>
        </div>
      </div>
    </div>

  </el-dialog>

</template>

<script>
export default {
  name: 'WorkspaceJsonReplaceDialog',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
	qrCode: {
	  type: String,
	  default: false,
	},
	link: {
	  type: String,
	  default: false,
	}
  },
  data () {
    return {
      radio: '3'
    };
  },

  mounted () {

  },

  methods: {
    // 生成食谱
    saveFood () {
      this.$emit('closeFood')
	  this.$store.dispatch('delVisitedViews', this.$route);
	  this.$router.go(-1);
    },
    handleClose () {
      this.$emit('closeFood')
	  this.$store.dispatch('delVisitedViews', this.$route);
	  this.$router.go(-1);
    },
    uploadImg () {
		const link = document.createElement('a');
		link.href = this.qrCode;
		link.download = `${new Date().getTime()}.png`;
		link.click();
		URL.revokeObjectURL(this.qrCode);
    }
  },
};
</script>
<style lang="scss" scoped>
.textMore {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
::v-deep .el-dialog__header {
  border-bottom: 0;
}
::v-deep .el-dialog__body,
::v-deep .el-dialog__header {
  padding: 0 !important;
}
::v-deep .el-dialog__headerbtn {
  position: absolute !important;
  z-index: 99999;
}

.linkWrap {
  width: 100%;
  height: 670px;
  display: flex;
  .linkLeft {
    width: 416px;
    background: #dddfe5;
    padding: 47px 22px;
    box-sizing: border-box;
    .leftBox {
      width: 372px;
      height: 573px;
      background: url('../../../../assets/images/food/kapian.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      .leftText1 {
        width: 100%;
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 18px;
        color: #ffffff;
        padding-top: 31%;
        text-align: center;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: 90%;
          left: 10%;
          width: 80px;
          height: 1px;
          background: #ffffff;
        }
        &::after {
          content: '';
          position: absolute;
          top: 90%;
          right: 10%;
          width: 80px;
          height: 1px;
          background: #ffffff;
        }
      }
      .leftText2 {
        font-family: PingFang SC;
        font-weight: 600;
        font-size: 20px;
        color: #ffffff;
        margin-top: 22px;
      }
      .mt89 {
        margin-top: 89px;
      }
      .mt10 {
        margin-top: 10px;
      }
      .leftItem {
        width: 261px;
        height: 21px;
        background: #f7f8fa;
        border-radius: 2px;

        img {
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
        span {
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 14px;
          color: #666666;
          vertical-align: middle;
          margin-left: 11px;
        }
      }
      .erweimaImg {
        width: 170px;
        height: 170px;
        margin-top: 20px;
      }
      .leftText3 {
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #c2c2cb;
        margin-top: 10px;
      }
    }
  }
  .linkRight {
    width: calc(100% - 416px);
    padding: 47px 40px;
    box-sizing: border-box;
    position: relative;
    .rightTitle {
      font-family: Source Han Sans CN;
      font-weight: 500;
      font-size: 26px;
      color: #333333;
    }
    .mainText1 {
      font-family: Source Han Sans CN;
      font-weight: 500;
      font-size: 20px;
      color: #000000;
      margin-top: 111px;
    }
    .rightMain {
      width: 100%;
      display: flex;
      margin-top: 17px;
      .mainLeft {
        width: calc(100% - 120px);
        margin-right: 20px;
        .mainLink {
          font-family: Source Han Sans CN;
          font-weight: 400;
          font-size: 16px;
          color: #000000;
          line-height: 24px;
        }
      }
      .mainRight {
        width: 100px;
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #2355f6;
        text-align: right;
        img {
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
    .handleBtn {
      position: absolute;
      right: 40px;
      bottom: 35px;
    }
  }
}
</style>