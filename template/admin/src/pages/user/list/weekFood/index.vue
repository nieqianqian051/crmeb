<template>
  <div>
    <!-- 一周食谱-->
    <el-card :bordered="false"
             shadow="never"
             class="ivu-mt mb15 pl"
             :body-style="{ padding: 0 }"
             v-for="(item, index) in weekData"
             :key="index">
      <div class="padding-add">
        <div class="itemWrap">
          <div class="itemLeft">{{ item.week | weekFilter }}</div>
          <div class="itemRight">
            <el-card :bordered="false"
                     shadow="never"
                     class="ivu-mt"
                     :body-style="{ padding: '20px'  }">

              <div class="timeItem"
                   v-for="(eItem, eInd) in item.customs"
                   :key="eInd">
                <div class="timeText textMore">
                  {{eItem.type===1?'早餐':eItem.type===2?'午餐':'晚餐'}}
                  <span>{{ eItem.elements | elementFilter }}</span>
                </div>
                <div class="foodBox">
				  <div class="foodItem" v-if="eItem.food">
					  <div class="foodLeft">
						  <img v-if="eItem.food.imgData && eItem.food.imgData.url" :src="eItem.food.imgData.url"
						       alt="">
					  </div>
					  <div class="foodRight">
					    <div class="foodName textMore">{{ eItem.food.name + '(主食)'}}</div>
					    <div class="foodCount textMore">{{ eItem.food.weight? eItem.food.name+":"+eItem.food.weight+'克':eItem.food.name+":"+'0克'}}</div>
					  </div>
					  <div class="foodBtn"
					       @click="clickTF(eItem,item.week)">
					    <img src="../../../../assets/images/food/sucaitihuan-tihuan.png"
					         alt="">替换
					  </div>
				  </div>	
                  <div class="foodItem"
						v-if="eItem.recipes"
                       v-for="(v, i) in eItem.recipes"
                       :key="i">
                    <div class="foodLeft">
                      <img v-if="v.mainImage && v.mainImage.url" :src="v.mainImage.url"
                           alt="">
                    </div>
                    <div class="foodRight">
                      <div class="foodName textMore">{{ v.name }}</div>
                      <div class="foodCount textMore" 
					  >
						  <!-- <el-tooltip placement="top"> -->
							  <div solt="v">{{ v | weightFilter }}</div>
						  <!-- </el-tooltip> -->
					  </div>
                    </div>
                    <div class="foodBtn"
                         @click="clickTH(eItem,item.week,i,v)">
                      <img src="../../../../assets/images/food/sucaitihuan-tihuan.png"
                           alt="">替换
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delBox"
                         @click="delFood(eItem,item.week, i)">
                      <img src="../../../../assets/images/food/guanbi.png"
                           alt="">
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <!--添加食谱  -->
      <div class="addWrap"
           @click="addFoods(item)">
        <img src="../../../../assets/images/food/jia.png"
             alt="">
        <span>添加菜品</span>
      </div>
    </el-card>
    <!-- 操作按钮 -->
    <el-card :bordered="false"
             shadow="never"
             class="ivu-mt mb15 pl"
             :body-style="{ padding: 0 }">
      <div class="padding-add handleBox">
        <el-button type="default"
                   @click="clickPre">上一步</el-button>
        <el-button type="primary"
                   @click="clickNext">下一步</el-button>
      </div>
    </el-card>
    <!-- 替换弹窗 -->
	<mainDialog ref="mainDialog"
	               :isMainShow="isMainShow"
	               :foodId="foodId"
				   :weight="weight"
				   :week1="week1"
				   :obj1="obj1"
				   :stage1="foodForm.stage"
				   @updateMainFood="updateMainFood"
	               @closeMainFood="closeMainFood"></mainDialog>
    <replaceDialog ref="replaceDialog"
                   :isShow="isShow"
                   :recipeIds="recipeIds"
				   :week="week"
				   :obj="obj"
				   :stage="foodForm.stage"
				   @updateFood="updateFood"
                   @closeFood="closeFood"></replaceDialog>
    <addDialog ref="addDialog"
               :isAddShow="isAddShow"
			   :weekObj="weekObj"
			   :stage="foodForm.stage"
               @addFood="addFood"
			   @closeFood="closeFood"></addDialog>
  </div>
</template>

<script>
import mainDialog from './mainDialog.vue';
import replaceDialog from './replaceDialog.vue';
import { getUserInfo, listRecipe, deleteRecipe } from "@/api/user";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import addDialog from './addDialog.vue';

export default {
  name: 'user_weekFood',
  components: {
	mainDialog,
    replaceDialog,
    addDialog
  },
  data () {
    return {
      userId: '',
      weekData: [],
      isShow: false,
	  isMainShow: false,
      foodId: '',
	  weight: '0',
	  recipeIds: [],
	  obj1: {},
	  obj: {},
	  week1: "1",
	  week: "1",
      checkedList: [],
      isAddShow: false,
      weekDay: "1",
	  weekObj: {
		  week: "",
		  customs: []
	  },
	  foodForm: {
		    day: 0,
			stage: '',
			spicy: 0,
			economy: 0,
			morningFood: '',
			noonFood: '',
			nightFood: '',
			ingredient: '',
			difficultyLevel: 0,
	  },
    };
  },

  filters: {
    weekFilter (data) {
      let week = ""
      switch (data) {
        case "1":
          week = "星期一";
          break
        case "2":
          week = "星期二";
          break
        case "3":
          week = "星期三";
          break
        case "4":
          week = "星期四";
          break
        case "5":
          week = "星期五";
          break
        case "6":
          week = "星期六";
          break
        case "7":
          week = "星期日";
          break
      }
      return week;
    },
    elementFilter (data) {
      let elements = "建议"
      data.map(function (e) {
		  if(e.element == '热量'){
			  elements += e.element + parseFloat(Number(e.value)).toFixed(2) + "千卡，"
		  } else {
			   elements += e.element + parseFloat(Number(e.value)).toFixed(2) + "克，"
		  }       
      })
      return elements.slice(0, -1);
    },
	weightFilter(data) {
		let val = '';
		data.mainFoods.forEach((item,index)=>{
			if(index==0){
				if(item.weight){
					val = item.foodName + ":"+parseFloat(Number(item.weight).toFixed(0))+"克"
				}else{
					val = item.foodName + ":"+"0克"
				} 
			} else {
				if(item.weight){
					val = val + "、" + item.foodName + ":"+parseFloat(Number(item.weight).toFixed(0))+"克"
				}else{
					val = val + "、" + item.foodName + ":"+"0克"
				} 
			}
		})
		return val;
	}
  },

  computed: {
    ...mapGetters([
      'getRecipeDayList',
	  'getFoodForm'
    ]),
  },

  mounted () {
    this.weekData = this.getRecipeDayList
    this.userId = this.$route.query.userId
	this.foodForm = {
		...this.getFoodForm
	} 
  },
  watch: {
    getRecipeDayList: {
      handler (n, o) {
        if (n) {
          this.weekData = this.getRecipeDayList
        }
      },
	  deep: true,
      immediate: true,
    },
	'$route': {
		handler (n, o) {
		  if (n) {
		    this.userId = this.$route.query.userId
		  }
		},
		deep: true,
		immediate: true,
	},
	getFoodForm: {
		handler (n, o) {
		  if (n) {
		    this.foodForm = this.getFoodForm
		  }
		},
		deep: true,
		immediate: true,
	},
  },

  methods: {
    ...mapMutations(['setRecipeDayList']),
    delFood (data, week, index) {
		console.log(121212,data,week,index)
		data.recipes.splice(index, 1)
		let praram = {
			week: week,
			element: {
				type: data.type,
				value: parseFloat(Number(data.elements.filter(x=>x.element==='热量').map(v=>v.value)[0]).toFixed(2)).toString(),
				recipeIds: data.recipes.map(x=>x.uuId)
			}
		}
		console.log(praram)
		deleteRecipe(praram).then(res=>{
			for(let i=0;i<this.weekData.length;i++){
			  if(this.weekData[i].week === week){
				  for(let j=0;j<this.weekData[i].customs.length;j++){
					  if(this.weekData[i].customs[j].type === res.data.type){
						  this.$set(this.weekData[i].customs[j], j, res.data);
						  data.elements = res.data.elements
						  data.food = res.data.food
						  break;
					  }
				  }
			  }
			}
		})
    },
    clickTH (data, week, index, row) {
      this.isShow = true;
      this.recipeIds = [row.uuId];
	  this.obj={
		  ...data
	  }
	  this.week=week
      this.$refs.replaceDialog.getDetails(data.type, this.recipeIds);
    },
	clickTF (data, week) {
	  this.isMainShow = true;
	  this.foodId = data.food.uuId;
	  this.weight = data.food.weight
	  this.obj1={
		  ...data
	  }
	  console.log(week)
	  this.week1=week
	  this.$refs.mainDialog.getDetails(data.type, this.foodId);
	},
	updateMainFood (data,week) {
		this.isMainShow = false;
		console.log(11111111,week)
		for(let i=0;i<this.weekData.length;i++){
		  if(this.weekData[i].week === week){
			  for(let j=0;j<this.weekData[i].customs.length;j++){
				  if(this.weekData[i].customs[j].type === data.type){
					  console.log(this.weekData[i].customs)
					  this.$set(this.weekData[i].customs, j, data);
					  this.foodId = '';
					  this.weight = '0'
					  this.obj1={}
					  this.week1="1"
					  break;
				  }
			  }
		  }
		}
	},
	updateFood (data,week) {
		this.isShow = false;
		for(let i=0;i<this.weekData.length;i++){
		  if(this.weekData[i].week === week){
			  for(let j=0;j<this.weekData[i].customs.length;j++){
				  if(this.weekData[i].customs[j].type === data.type){
					  console.log(this.weekData[i].customs)
					  this.$set(this.weekData[i].customs, j, data);
					  this.recipeIds = [];
					  this.obj={}
					  this.week="1"
					  break;
				  }
			  }
		  }
		}
	},
	closeMainFood () {
	  this.foodId = '';
	  this.weight = '0'
	  this.obj1={}
	  this.week1="1"
	  this.isMainShow = false;
	  this.weekObj= {
		  week: "",
		  customs: []
	  }
	  this.isAddShow= false
	},
    closeFood () {
	  this.recipeIds = [];
	  this.obj={}
	  this.week="1"
      this.isShow = false;
	  this.weekObj= {
		  week: "",
		  customs: []
	  }
	  this.isAddShow= false
    },
    addFood (val,arr) {
      this.isAddShow = false;
	  console.log(111111,val)
      // 并重新请求接口
      // this.weekData=val;
	  for(let i=0;i<this.weekData.length;i++){
		  if(this.weekData[i].week === val.week){
			  // this.weekData[i] = val
			  this.$set(this.weekData, i, val);
			  break;
		  }
	  }
	  // console.log(22222,this.weekData)
	 
      // 根据拿到的data,去匹配食谱
      // const recipeIds = [];
      // arr && arr.forEach(v => {
      //   recipeIds.push(v.uuId);
      // })
      // this.getlistRecipe(recipeIds, val)
    },
    getlistRecipe (data, val) {
      listRecipe(data).then(res => {
        const { data } = res;
        if (data && data.length > 0) {
          data.forEach(v => {
            val.forEach(m => {
              if (v.uuId === m.uuId) {
                v.type = m.type;
              }
            })
          })
        }
        this.weekData.forEach(v => {
          if (v.week === this.weekDay) {
            data.forEach(item => {
              v.customs.forEach(m => {
                if (item.type == m.type) {
                  this.addToArrayUnique(m.recipes, item)
                }
              })

            })
          }
        })
      })
    },
    addToArrayUnique (arr, obj) {
      const index = arr.findIndex(item => item.uuId === obj.uuId);
      if (index === -1) {
        arr.push(obj);
      }
    },
    addFoods (item) {
      this.weekDay = item.week;
	  this.weekObj = item
      this.isAddShow = true;
      let checkedList = [];
      this.recipeIds = [];
      if (item.customs) {
        this.recipeIds = item.customs;
        if (this.recipeIds && this.recipeIds.length > 0) {
          this.recipeIds.forEach(function (item) {
            checkedList.push(item);
          });
        }
      }
      this.$refs.addDialog.getDetails(this.recipeIds, checkedList);
    },
    clickPre () {
      // this.$router.push({
      //   path: this.$routeProStr + '/user/makeFood',
      //   query: {
      //     userId: this.userId,
      //   }
      // })
      this.$emit('handleTwo', 'pre')
    },
    clickNext () {
      this.setRecipeDayList([]);
	  this.setRecipeDayList(this.weekData)
	  console.log('=======>',this.weekData)
      // this.$router.push({
      //   path: this.$routeProStr + '/user/foodContxt',
      //   query: {
      //     userId: this.userId,
      //   }
      // })
      this.$emit('handleTwo', 'next')
    },
	replaceElement(arr, oldValue, newValue) {
	  return arr.map(item => item === oldValue ? newValue : item);
	}
  },
};
</script>
<style lang="scss" scoped>
.handleBox {
  text-align: center;
  padding-bottom: 20px;
}
.textMore {
  text-overflow: ellipsis;
  // overflow: hidden;
  white-space: nowrap;
}
.mb15 {
  margin-bottom: 15px;
}
.pl {
  position: relative;
}
.addWrap {
  width: 105px;
  height: 42px;
  line-height: 42px;
  border-radius: 6px;
  border: 1px solid #377efc;
  text-align: center;
  position: absolute;
  right: 30px;
  top: 30px;
  cursor: pointer;
  img {
    width: 13px;
    height: 13px;
    vertical-align: middle;
  }
  span {
    font-family: Source Han Sans CN;
    font-weight: 500;
    font-size: 16px;
    color: #2355f6;
    vertical-align: middle;
    margin-left: 5px;
  }
}
.itemWrap {
  width: 100%;
  // min-height: 483px;
  background: url('../../../../assets/images/food/weekBg.png') no-repeat;
  background-size: 434px 100%;
  display: flex;
  .itemLeft {
    width: 134px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Source Han Sans CN;
    font-weight: 500;
    font-size: 22px;
    color: #000000;
  }
  .itemRight {
    width: calc(100% - 134px);
    background: #fff;
    margin: 19px;
    .timeItem {
      width: 100%;
      margin-bottom: 26px;
      .timeText {
        width: 100%;
        height: 19px;
        border-left: 4px solid #0060ff;
        padding-left: 10px;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        margin-bottom: 15px;
        span {
          font-weight: 400;
          font-size: 14px;
          color: #999999;
          margin-left: 11px;
        }
      }
      .foodBox {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .foodItem {
          width: 320px;
          height: 100px;
          border-radius: 6px;
          border: 1px solid #f0f2fa;
          padding: 16px;
          box-sizing: border-box;
          display: flex;
          margin-right: 15px;
          margin-bottom: 10px;
          position: relative;
          .delBox {
            position: absolute;
            right: 9px;
            top: 5px;
            cursor: pointer;
            img {
              width: 12px;
              height: 12px;
            }
          }
          .foodLeft {
            width: 49px;
            margin-right: 12px;
            img {
              width: 49px;
              height: 49px;
              border-radius: 50%;
            }
          }
          .foodRight {
            width: calc(100% - 140px);
            .foodName {
              width: 100%;
              height: 21px;
              font-weight: 500;
              font-size: 16px;
              color: #000000;
            }
            .foodCount {
              width: 100%;
              height: 17px;
              font-weight: 400;
              font-size: 11px;
              color: #666666;
              margin-top: 30px;
            }
          }
          .foodBtn {
            width: 79px;
            height: 32px;
            border-radius: 15px;
            line-height: 32px;
            text-align: center;
            border: 1px solid #dbdde3;
            margin-top: 7px;
            font-weight: 400;
            font-size: 16px;
            color: #333333;
            cursor: pointer;
            img {
              vertical-align: middle;
              margin-right: 3px;
            }
          }
        }
      }
    }
  }
}
</style>