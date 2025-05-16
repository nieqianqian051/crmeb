<template>
  <!-- 替换相关食物弹窗 -->
  <el-dialog title="替换相关主食"
             :visible.sync="isMainShow"
			 v-if="isMainShow"
             width="65%"
             :before-close="handleClose"
			 destroy-on-close
			 :close-on-press-escape="false"
			 :close-on-click-modal="false">
    <div class="foodBox" v-loading="loading">
      <div class="searchBox">
        <span>搜索：</span>
        <el-input v-model="name"
                  style="width: 457px;"
                  placeholder="请输入要替换的主食"></el-input>
        <el-button type="primary"
                   class="ml15"
                   @click="searchFood"> 查询</el-button>
      </div>
      <div class="foodTips">以下食物可替换<span>其他主食</span></div>
      <div class="foodList" >
        <el-radio-group v-model="radio" @change="handleRadioChange"
                        style="width: 100%;">
          <el-radio :label="item.uuId"
                    class="radioBox"
                    v-for="(item ,index) in foodList"
                    :key="item.uuId">
            <div class="foodItem">
              <div class="foodLeft">
                <img :src="item.imgData.url"
                     alt="">
              </div>
              <div class="foodCenter">
                <div class="foodName textMore">{{ item.name }}</div>
				<div class="foodCount textMore">{{ item.description }}</div>
              </div>
            </div>
          </el-radio>
        </el-radio-group>
		<div class="acea-row row-right page">
		  <pagination
		    v-if="total"
		    :total="total"
		    :page.sync="page"
		    :limit.sync="limit"
		    @pagination="pageChange"
		  />
		</div>
      </div>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary"
                 @click="saveFood">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
	import {searchAllMainFood,deleteRecipe} from "@/api/user";
	
export default {
  name: 'mainDialog',
  props: {
    isMainShow: {
      type: Boolean,
      default: false,
    },
	weight: {
		type: String,
		default: '0',
	},
	foodId: {
		type: String,
		default: '',
	},
	week1: {
		type: String,
		default: "1"
	},
	obj1: {
		type: Object,
		default: {}
	},
	stage1: {
		type: String,
		default: "第一阶段"
	}
  },
  data () {
    return {
      radio: '',
	  name: '',
	  loading: false,
	  foodList: [],
	  total: 0,
	  page: 1,
	  limit: 10
    };
  },

  filters: {
	  foodFilter(data){
		  let val = '';
		  // data.forEach((item,index)=>{
			  // if(index==0){
				 //  val = item.foodName
			  // }else{
				 //  val = val + "、" + item.foodName
			  // }
		  // })
		  return val;
	  }
  },
  
  mounted () {
  },

  methods: {
	  handleRadioChange(value){
		  this.radio = value
	  },
	getDetails(type,foodId){
		this.loading = true;
		let data = {
			foodId: foodId,
			name: this.name,
			page: this.page,
			limit: this.limit
		}
		searchAllMainFood(data).then(async (res) => {
		  if (res.code === 200) {
			this.loading = false;
			this.foodList = res.data.list
			this.total = res.data.count
		  } else {
			this.loading = false;
			this.$message.error(res.msg);
		  }
		}).catch((res) => {
		  this.loading = false;
		  this.$message.error(res.msg);
		});
	},
    searchFood () {
		this.getDetails(this.type,this.foodId);
    },
    // 生成食谱
    saveFood () {
		console.log(this.radio)
		let recipeIds = []
		if(this.obj1.recipes.map(x=>x.uuId)){
			this.obj1.recipes.map(x=>x.uuId).forEach(j=>{
				recipeIds.push(j)
			})
		}
		let data = {
			food: {uuId: this.radio,weight: this.weight},
			week: this.week1,
			element: {
				type: this.obj1.type,
				value: parseFloat(Number(this.obj1.elements.filter(x=>x.element==='热量').map(v=>v.value)[0]).toFixed(2)).toString(),
				recipeIds: recipeIds
			}
		}
		this.loading = true;
		deleteRecipe(data).then(res=>{
			this.radio = ''
			this.name= ''
			this.foodList= []
			this.total= 0
			this.page= 1
			this.limit= 10
			this.$emit('updateMainFood', res.data,this.week1)
		}).catch(err=>{
			this.loading = false
			this.$message({
				type: "error",
				message: "替换失败",
				duration: 1000
			})
		})
    },
    handleClose () {
		this.radio = ''
		this.name= ''
		this.foodList= []
		this.total= 0
		this.page= 1
		this.limit= 10
		this.$emit('closeMainFood')
        this.$emit('update:isMainShow',!this.isMainShow)
    },
	pageChange() {
	  this.getDetails(this.type,this.foodId);
	},
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-radio__input {
  top: 35px;
}
.textMore {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.foodBox {
  padding: 0 14px;
  box-sizing: border-box;
  .searchBox {
    display: flex;
    justify-content: center;
    span {
      line-height: 32px;
      margin-right: 5px;
    }
    .ml15 {
      margin-left: 15px;
    }
  }
  .foodTips {
    width: 100%;
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: #333333;
    margin: 32px 0 39px 0;
    span {
      color: #0156ff;
    }
  }
  .foodList {
    width: 100%;
    height: 350px;
    overflow: auto;
    .radioBox {
      width: calc(100% - 20px);
      display: block;
    }
    .foodItem {
      display: flex;
      width: calc(100% - 20px);
      margin-left: 20px;
      border-bottom: 1px solid #f4f4f4;
      padding-bottom: 10px;
      .foodLeft {
        width: 51px;
        margin-right: 22px;
        img {
          width: 51px;
          height: 51px;
          border-radius: 50%;
        }
      }
      .foodCenter {
        width: calc(100% - 143px);
        height: 51px;
        .foodName {
          width: 100%;
          height: 35px;
          font-weight: 500;
          font-size: 16px;
          color: #000000;
          line-height: 35px;
        }
        .foodCount {
          width: 100%;
          height: 14px;
          font-weight: 400;
          font-size: 14px;
          color: #666666;
        }
      }
      .foodRight {
        width: 60px;
        margin-left: 10px;
        font-weight: 500;
        font-size: 16px;
        color: #333333;
        text-align: right;
        line-height: 51px;
      }
    }
  }
}
</style>