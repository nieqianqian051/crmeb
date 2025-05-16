<template>
  <!-- 替换相关食物弹窗 -->
  <el-dialog title="替换相关食物"
             :visible.sync="isShow"
			 v-if="isShow"
             width="65%"
             :before-close="handleClose"
			 destroy-on-close
			 :close-on-press-escape="false"
			 :close-on-click-modal="false">
    <div class="foodBox" v-loading="loading">
      <div class="searchBox">
		<span>分类：</span>
	    <el-select v-model="gear" placeholder="请选择" style="margin-right: 10px;">
			<el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			</el-option>
		</el-select>
        <span>搜索：</span>
        <el-input v-model="name"
                  style="width: 457px;"
                  placeholder="请输入要替换的食物"></el-input>
        <el-button type="primary"
                   class="ml15"
                   @click="searchFood"> 查询</el-button>
      </div>
      <div class="foodTips">以下食物可替换<span>其他食谱</span></div>
      <div class="foodList" >
        <el-radio-group v-model="radio" @change="handleRadioChange"
                        style="width: 100%;">
          <el-radio :label="item.uuId"
                    class="radioBox"
                    v-for="(item ,index) in recipeList"
                    :key="item.uuId">
            <div class="foodItem">
              <div class="foodLeft">
                <img :src="item.mainImage.url"
                     alt="">
              </div>
              <div class="foodCenter">
                <div class="foodName textMore" v-if="item.gear==1">{{ item.name + "（纯素）"}}</div>
                <div class="foodName textMore" v-if="item.gear==2">{{ item.name + "（纯肉）"}}</div>
				<div class="foodName textMore" v-if="item.gear==3">{{ item.name + "（荤素搭配）"}}</div>
				<div class="foodCount textMore">{{ item | foodFilter }}</div>
              </div>
              <!-- <div class="foodRight">122</div> -->
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
	import {searchAllRecipe,deleteRecipe} from "@/api/user";
	
export default {
  name: 'replaceDialog',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
	recipeIds: {
		type: Array,
		default: [],
	},
	week: {
		type: String,
		default: "1"
	},
	obj: {
		type: Object,
		default: {}
	},
	stage: {
		type: String,
		default: "第一阶段"
	}
  },
  data () {
    return {
      radio: '',
	  name: '',
	  loading: false,
	  recipeList: [],
	  total: 0,
	  page: 1,
	  limit: 10,
	  gear: '',
	  options: [
	    {
			value: '2',
			label: '纯荤'
	    }, {
			value: '1',
			label: '纯素'
	    }, {
			value: '3',
			label: '荤素搭配'
	    }
	  ],
    };
  },

  filters: {
	  foodFilter(data){
		  let val = '';
		  data.mainFoods.forEach((item,index)=>{
			  if(index==0){
				  val = item.foodName
			  }else{
				  val = val + "、" + item.foodName
			  }
		  })
		  return val;
	  }
  },
  
  mounted () {
  },

  methods: {
	  handleRadioChange(value){
		  this.radio = value
	  },
	getDetails(type,recipeIds){
		this.loading = true;
		let data = {
			recipeIds: JSON.stringify(recipeIds),
			type: type == 1 ? '早餐' : type == 2 ? '午餐' : '晚餐',
			gear: this.gear,
			name: this.name,
			stage: this.stage,
			page: this.page,
			limit: this.limit
		}
		searchAllRecipe(data).then(async (res) => {
		  if (res.code === 200) {
			this.loading = false;
			this.recipeList = res.data.list
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
		this.getDetails(this.type,this.recipeIds);
    },
    // 生成食谱
    saveFood () {
		let recipeIds = [this.radio]
		this.obj.recipes = this.obj.recipes.filter(item => item.uuId !== this.recipeIds[0]);
		if(this.obj.recipes.map(x=>x.uuId)){
			this.obj.recipes.map(x=>x.uuId).forEach(j=>{
				recipeIds.push(j)
			})
		}
		let data = {
			food: this.obj.food,
			week: this.week,
			element: {
				type: this.obj.type,
				value: parseFloat(Number(this.obj.elements.filter(x=>x.element==='热量').map(v=>v.value)[0]).toFixed(2)).toString(),
				recipeIds: recipeIds
			}
		}
		this.loading = true;
		let that = this
		deleteRecipe(data).then(res=>{
			this.radio = ''
			this.name= ''
			this.recipeList= []
			this.total= 0
			this.page= 1
			this.limit= 10
			that.$emit('updateFood', res.data,this.week)
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
		this.recipeList= []
		this.total= 0
		this.page= 1
		this.limit= 10
      this.$emit('closeFood')
    },
	pageChange() {
	  this.getDetails(this.type,this.recipeIds);
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