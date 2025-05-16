<template>
  <!-- 添加相关食物弹窗 -->
  <el-dialog title="添加菜品"
             :visible.sync="isAddShow"
             width="756px"
             :before-close="handleClose"
             :close-on-press-escape="false"
             :close-on-click-modal="false">
    <div class="foodBox"
         v-loading="loading">
      <div class="searchBox">
        <span>搜索：</span>
        <el-input v-model="filterText"
                  style="width: 457px;"
                  placeholder="请输入菜谱名称"
				  ></el-input>
      </div>
      <div class="treeBox">
        <el-tree class="filter-tree"
                 :data="data"
                 show-checkbox
                 node-key="id"
                 :props="defaultProps"
                 :default-checked-keys="checked"
                 :filter-node-method="filterNode"
                 ref="tree">
        </el-tree>
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
import { treeRecipe,updateRecipe } from "@/api/user";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import { detailsApi } from '@/api/recipe';

export default {
  name: 'addDialog',
  props: {
    isAddShow: {
      type: Boolean,
      default: false,
    },
	weekObj: {
		type: Object,
	},
	stage: {
		type: String,
		default: "第一阶段"
	}
  },
  data () {
    return {
      loading: false,
      filterText: '',
      data: [],
      checked: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },

  mounted () {
  },
  
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },

  computed: {
    ...mapGetters([
      'getRecipeDayList',
    ]),
  },
  methods: {
    ...mapMutations([
      'setRecipeDayList',
    ]),
    getDetails (recipeIds, checkedList) {
	  let that = this
      this.loading = true;
	  this.filterText = ''
      that.checked = [];
      checkedList.forEach(function (item) {
		  if(item.recipes && item.recipes.length>0){
			  item.recipes.forEach(function (i) {
			    that.checked.push(String(item.type).concat("-", i.uuId))
			  })
		  }
      })
      let arr1 = recipeIds.filter(x => x.type == 1);
      let arr2 = recipeIds.filter(x => x.type == 2);
      let arr3 = recipeIds.filter(x => x.type == 3);
      let arr = [
        { type: 1, recipeIds: arr1[0].recipes.map(x => x.uuId) },
        { type: 2, recipeIds: arr2[0].recipes.map(x => x.uuId) },
        { type: 3, recipeIds: arr3[0].recipes.map(x => x.uuId) }
      ]
      treeRecipe(arr, {name: this.filterText, stage: this.stage}).then(async (res) => {
        if (res.code === 200) {
          this.loading = false;
          this.data = res.data
        } else {
          this.loading = false;
          this.$message.error(res.msg);
        }
      }).catch((res) => {
        this.loading = false;
        this.$message.error(res.msg);
      });
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 添加菜品
    saveFood () {
      const keys = this.$refs.tree.getCheckedKeys();
      if (keys && keys.length > 0) {
        let arr = [];
        keys.forEach(v => {
          const obj = {};
          const vArr = v.split('-');
          const type = vArr[0];
          const uuid = vArr[1];
          obj.type = type;
          obj.uuId = uuid;
          arr.push(obj)
        })
		if(arr.filter(x=>x.type == 1).length==0){
			this.$message.warning("请至少选中一个早餐食谱");
			return
		}
		if(arr.filter(x=>x.type == 1).length>2){
			this.$message.warning("早餐食谱最多只能选中两个");
			return
		}
		if(arr.filter(x=>x.type == 2).length==0){
			this.$message.warning("请至少选中一个午餐食谱");
			return
		}
		if(arr.filter(x=>x.type == 2).length>2){
			this.$message.warning("午餐食谱最多只能选中两个");
			return
		}
		if(arr.filter(x=>x.type == 3).length==0){
			this.$message.warning("请至少选中一个晚餐食谱");
			return
		}
		if(arr.filter(x=>x.type == 3).length>2){
			this.$message.warning("晚餐食谱最多只能选中两个");
			return
		}
		let list = []
		let list1 = []
		let list2 = []
		arr.forEach(v => {
		    if(v.type == 1) {
				detailsApi(v.uuId)
				.then(async (res) => {
				  list.push(res.data.gear)
				})
		    } else if(v.type == 2) {
				detailsApi(v.uuId)
				.then(async (res) => {
				  list1.push(res.data.gear)
				})
		    } else {
				detailsApi(v.uuId)
				.then(async (res) => {
				  list2.push(res.data.gear)
				})
		    }
		})
		if(list.length==1){
			let result = list.some(ele => ele === 3)
			if(!result){
				this.$message.warning("一个食谱只能是荤素");
				return
			}
		}
		if(list1.length==1){
			let result1 = list1.some(ele => ele === 3)
			if(!result1){
				this.$message.warning("一个食谱只能是荤素");
				return
			}
		}
		if(list2.length==1){
			let result2 = list2.some(ele => ele === 3)
			if(!result2){
				this.$message.warning("一个食谱只能是荤素");
				return
			}
		}
		if(list.length==2){
			let result1 = hasBoth(list,1,2)
			let result2 = hasBoth(list,1,3)
			let result3 = hasBoth(list,2,3)
			let result4 = hasBoth(list,3,3)
			if(!result1 || !result2 || !result3 || !result4){
				this.$message.warning("两个食谱必须包含荤菜");
				return
			}
		}
		if(list1.length==2){
			let result1 = hasBoth(list1,1,2)
			let result2 = hasBoth(list1,1,3)
			let result3 = hasBoth(list1,2,3)
			let result4 = hasBoth(list1,3,3)
			if(!result1 || !result2 || !result3 || !result4){
				this.$message.warning("两个食谱必须包含荤菜");
				return
			}
		}
		if(list2.length==2){
			let result1 = hasBoth(list2,1,2)
			let result2 = hasBoth(list2,1,3)
			let result3 = hasBoth(list2,2,3)
			let result4 = hasBoth(list2,3,3)
			if(!result1 || !result2 || !result3 || !result4){
				this.$message.warning("两个食谱必须包含荤菜");
				return
			}
		}
		let elements = []
		for(let index in this.weekObj.customs) {			
			let value;
			this.weekObj.customs[index].elements.forEach(item=>{
				if(item.element == "热量") value = parseFloat(Number(item.value).toFixed(2)).toString()
			})
			let obj = {
				type: this.weekObj.customs[index].type,
				value: value,
				recipeIds: arr.filter(x=>x.type==this.weekObj.customs[index].type).map(x=>x.uuId),
				food: this.weekObj.customs[index].food
			}
			elements.push(obj)
		}
		let data = {
			week: this.weekObj.week,
			elements: elements
		}
		this.loading = true;
		updateRecipe(data).then(res=>{
			this.loading = false
			this.$emit('addFood', res.data,arr)
		}).catch(err=>{
			this.loading = false
			this.$message({
				type: "error",
				message: "添加失败",
				duration: 1000
			})
		})
      }
    },
    handleClose () {
      this.$emit('closeFood')
    },
	hasBoth(arr, elem1, elem2) {
	  return arr.includes(elem1) && arr.includes(elem2);
	}
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
  .treeBox {
    width: 100%;
    height: 300px;
    overflow: auto;
    margin-top: 15px;
  }
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