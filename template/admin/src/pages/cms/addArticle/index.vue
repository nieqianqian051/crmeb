<template>
  <div class="article-manager">
    <pages-header
      ref="pageHeader"
      :title="$route.params.id ? '编辑文章' : '添加文章'"
      :backUrl="$routeProStr + '/cms/article/index'"
    ></pages-header>
    <el-card :bordered="false" shadow="never" class="mt16">
      <el-form
        class="form"
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <div class="goodsTitle acea-row">
          <div class="title">文章信息</div>
        </div>
        <div class="grid_box">
          <el-form-item label="标题：" prop="title" label-for="title">
            <el-input v-model="formValidate.title" placeholder="请输入" class="content_width" />
          </el-form-item>
          <el-form-item label="文章标签：" label-for="labelIds" prop="labelIds">
			<el-cascader 
				class="content_width" 
				size="small" 
				v-model="formValidate.labelIds" 
				:options="treeData" 
				placeholder="请选择文章标签"
				/>
          </el-form-item>
          <el-form-item label="文章描述：" prop="desc" label-for="desc">
            <el-input v-model="formValidate.desc" type="textarea" :rows="8" placeholder="请输入文章描述" class="content_width" />
          </el-form-item>
		  <el-form-item label="文章封面" prop="imageId">
		      <div class="picBox">
				  <el-upload action="" list-type="picture-card" :limit="1"
					 :http-request="addMaijiArticleImage"
					 :file-list="maijiArticleImages"
					 :on-exceed="() => $message.warning(`只能上传1张文章封面`)">
					 <div class="upLoad acea-row row-center-wrapper">
					   <i class="el-icon-plus" style="font-size: 24px"></i>
					 </div>
				 </el-upload>
		      </div>
			  <div class="tip">建议尺寸：230 x 160 </div>
		  </el-form-item>
        </div>
        <div class="goodsTitle acea-row">
          <div class="title">文章内容</div>
        </div>
        <el-form-item label="文章内容：" prop="content">
          <WangEditor style="width: 90%" :content="formValidate.content" @editorContent="getEditorContent"></WangEditor>
        </el-form-item>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
      <el-dialog :visible.sync="modalPic" width="950px" title="上传商品图" :close-on-click-modal="false">
        <uploadPictures
          :isChoice="isChoice"
          @getPic="getPic"
          :gridBtn="gridBtn"
          :gridPic="gridPic"
          v-if="modalPic"
        ></uploadPictures>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import uploadPictures from '@/components/uploadPictures';
import WangEditor from '@/components/wangEditor/index.vue';
import { cmsAddApi, createApi, findAllLabelBySourceApi, uploadArticleImagesApi } from '@/api/cms';
export default {
  name: 'addArticle',
  components: { uploadPictures, WangEditor },
  data() {
    const validateUpload = (rule, value, callback) => {
      if (this.formValidate.imageId) {
        callback();
      } else {
        callback(new Error('请上传图文封面'));
      }
    };
    const validateUpload2 = (rule, value, callback) => {
      if (this.formValidate.labelIds.length===0) {
        callback(new Error('请选择文章分类'));
      } else {
        callback();
      }
    };
    return {
      dialog: {},
      isChoice: '单选',
      grid: {
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      },
      gridPic: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12,
      },
      gridBtn: {
        xl: 4,
        lg: 8,
        md: 8,
        sm: 8,
        xs: 8,
      },
      loading: false,
      formValidate: {
        id: undefined,
        title: '',
		imageId: '',
        content: '',
        desc: '',
        labelIds: [],
      },
	  maijiArticleImages: [],
      content: '',
      ruleValidate: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        labelIds: [
          {
            required: true,
            validator: validateUpload2,
            trigger: 'change',
            type: 'number',
          },
        ],
        imageId: [{ required: true, validator: validateUpload, trigger: 'change' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'change' }],
      },
      value: '',
      modalPic: false,
      template: false,
      treeData: [],
      formValidate2: {
        type: 1,
      },
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 500, // 初始容器高度
        initialFrameWidth: '100%', // 初始容器宽度
        UEDITOR_HOME_URL: '/UEditor/',
        serverUrl: '',
      },
    };
  },
  computed: {
    ...mapState('media', ['isMobile']),
    labelWidth() {
      return this.isMobile ? undefined : '100px';
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'right';
    },
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.getDetails();
      } else {
        this.formValidate = {
          id: undefined,
          title: '',
          imageId: '',
          img: '',
          content: '',
          desc: '',
          labelIds: [],
        };
      }
    },
  },
  methods: {
    getEditorContent(data) {
      this.content = data;
    },
    // 选择图片
    modalPicTap() {
      this.modalPic = true;
    },
    // 选中图片
    getPic(pc) {
      this.formValidate.img = pc.att_dir;
      this.modalPic = false;
    },
    // 分类
    getClass() {
		findAllLabelBySourceApi({source: "麦吉简介"}).then(res=>{
		  this.treeData = res.data.filter(label => label.listShow == 3).map(label => {
				const newLabel = {value: label.uuId, label: label.name}
				newLabel.children = res.data.filter(cl => cl.orderNo == label.orderNo)
					.map(cl => {
					  if (cl.name == '置顶推荐') cl.name += '（封面700*275）'
					  else cl.name += '（封面378*278）'
					  return Object.assign({value: cl.uuId, label: cl.name == label.name && '普通文章（封面280*176）' || cl.name})
					})
				return newLabel
			})
	    })
    },
    // 提交数据
    onsubmit(name) {
      this.formValidate.content = this.content;
      this.$refs[name].validate((valid) => {
        if (valid) {
          cmsAddApi(this.formValidate)
            .then(async (res) => {
              this.$message.success(res.msg);
              setTimeout(() => {
                this.$router.push({ path: this.$routeProStr + '/cms/article/index' });
              }, 500);
            })
            .catch((res) => {
              this.$message.error(res.msg);
            });
        } else {
          return false;
        }
      });
    },
	// 上传文章封面图片
	async addMaijiArticleImage(param) {
	    const imageData = new FormData()
	    imageData.append('uploadFiles', param.file)
	    const result = await uploadArticleImagesApi(imageData)
	    if (result.code != 200) this.$message.error(`上传文章封面失败，请稍后重试！`)
	    this.maijiArticleImages = [Object.assign(result.data[0], {isMain: 1})]
	    this.formValidate.imageId = result.data[0].uuId
	},
    // 文章详情
    getDetails() {
      createApi(this.$route.params.id ? this.$route.params.id : undefined)
        .then(async (res) => {
          let data = res.data;
          this.formValidate = data;
		  this.formValidate.imageId = data.img.uuId
		  this.maijiArticleImages = [Object.assign(data.img, {isMain: 1})]
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.msg);
        });
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.getDetails();
    }
  },
  created() {
    this.getClass();
  },
};
</script>
<style scoped lang="scss">
.grid_box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 0;
}
.content_width {
  width: 414px;
}
::v-deep .ivu-form-item-content {
  line-height: unset !important;
}
.picBox {
  display: inline-block;
  cursor: pointer;
}

.form .goodsTitle {
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  margin-bottom: 25px;
}

.form .goodsTitle ~ .goodsTitle {
  margin-top: 20px;
}

.form .goodsTitle .title {
  border-bottom: 2px solid var(--prev-color-primary);
  padding: 0 8px 12px 5px;
  color: #000;
  font-size: 14px;
}

.form .goodsTitle .icons {
  font-size: 15px;
  margin-right: 8px;
  color: #999;
}

.form .add {
  font-size: 12px;
  color: var(--prev-color-primary);
  padding: 0 12px;
  cursor: pointer;
}

.form .radio {
  margin-right: 20px;
}

.form .submission {
  width: 10%;
  margin-left: 27px;
}

.form .upLoad {
  display: contents;
  justify-items: center;
  align-items: center;
  width: 58px;
  height: 58px;
  line-height: 58px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.02);
}

.form .iconfont {
  color: #898989;
}

.form .pictrue {
  width: 60px;
  height: 60px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  margin-right: 10px;
}

.form .pictrue img {
  width: 100%;
  height: 100%;
}

.Modals .address {
  width: 90%;
}

.Modals .address .iconfont {
  font-size: 20px;
}
.tip {
  margin-top: 10px;
  color: #bbb;
  font-size: 12px;
}
</style>
