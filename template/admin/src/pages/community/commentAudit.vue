<template>
	<div class="details" v-show="DynamicAuditshow">
		<div class="details_a">
			<!--动态审核-->
			<div style="padding: 3px 20px;display: flex;justify-content: space-between;">
				<span>
					<h4>动态审核</h4>
				</span>
				<span style="font-size: 30px;margin-top: 4px;" @click="dynamicClick">
					<i class="el-icon-close"></i>
				</span>
			</div>
			<!--话题-->
			<div style="display: flex;padding:5px 75px;">
				<img
					:src="user_content.user.headUrl"
					alt
					v-if="user_content.user && user_content.user.headUrl"
					width="80"
					height="80"/>
				<img
					src="https://maiji-static-images.oss-cn-beijing.aliyuncs.com/maiji-static-images/7adab52c3646400e9e61d0442874cedc.png"
					v-else
					width="80"
					height="80"/> 
				<div style="margin-left: 15px;">
					<p>用户名：{{user_content.user != null ? user_content.user.nickName : ""}}</p>
					<p style="color:#999999">发布时间：{{user_content.publishTime}}</p>
				</div>
			</div>		
			<p style="padding:5px 75px;">
				话题：
				<span
					style="color:#ffa545"
					v-for="(item,index) in dialogData.topics"
					:key="index"
					>{{'#'+item+'#'+' 、'}}</span>
			</p>
			<p style="padding:5px 75px;color:#333333">
				内容：
				<span style="color:#666666">{{user_content.content}}</span>
			</p>
			<p style="display: flex;padding:5px 75px;">
				动态图片：
				<span v-for="(item,index) in dialogData.files" :key="index" style="margin-left: 10px;">
					<img
						:src="item.smallUrl"
						width="70px"
						height="70px"
						@click="dynamicImgclick(item.smallUrl)"/>
				</span>
			</p>
			<p style="padding: 40px 75px 0;;display: flex;border-top: solid 1px #eee;">
				标签设置：
				<el-checkbox-group
					style="margin-left: 60px;"
					v-model="checkList"
					@change="dynamic_AuditClick">
				<el-checkbox :label="0">优质动态</el-checkbox>
				<el-checkbox :label="5">全局置顶</el-checkbox>
				<el-checkbox :label="1">首页推荐</el-checkbox>
				<el-checkbox :label="3">精选动态</el-checkbox>
				<!-- <el-checkbox :label=2>案列动态</el-checkbox> -->
				</el-checkbox-group>
			</p>
			<p style="width: 20%;margin: 150px auto 0;display: flex;justify-content: space-evenly;">
				<el-button size="mini" type="danger" @click="auditClick(2)">审核拒绝</el-button>
				<el-button size="mini" type="primary" @click="auditClick(1)">审核通过</el-button>
			</p>
		</div>
		<div class="details_a detaimg2" v-show="dynamicShow">
			<span @click="ShutDownIMG" style="position: absolute;right: 10px;top: 1px;font-size: 40px;">
				<i class="el-icon-circle-close"></i>
			</span>
			<div :style="{backgroundImage:'url('+dynamicImg+')',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}" class="luk"></div>
		</div>
    </div>
</template>

<script>
	import { findComMsgByIdApi,dynamicAuditApi } from "@/api/community"
	export default {
		props: {
			auditValue: Array
		},
		data() {
			return {
				user_content: {},
				dialogData: {},
				msgId: null,
				DynamicAuditshow: false,
				dynamicShow: false,
				checkList: [],
				audit_Labes: [],
				dynamicImg: ""
			};
		},
		watch: {
			auditValue: {
				handler(newValue, oldValue) {
					this.user_content = newValue[0];
					if (newValue[1]) {
						this.DynamicAuditshow = true;
						this.msgId = newValue[0].msgId;
						this.showDialog(this.msgId);
					}
				},
				deep: true
			}
		},
		methods: {
			dynamicClick() {
				let that = this;
				that.DynamicAuditshow = false;
				that.dialogData = [];
				that.checkList = [];
			},
			// 查看动态详情
			async showDialog(msgId) {
				let that = this;
				const result = await findComMsgByIdApi(msgId);
				if (result.code == 200) {
					that.checkList.push(null);
					that.dialogData = result.data;
					that.checkList = result.data.labelIds;
				}
			},
			dynamic_AuditClick(value) {
				this.audit_Labes = value;
			},
			//审核动态
			async auditClick(kay) {
				let that = this;
				let data = {
					labels: that.audit_Labes,
					msgId: that.msgId,
					status: kay
				};
				let metaData = {
					page: 0,
					size: 0
				};
				try {
					const res = await dynamicAuditApi(data, metaData);
					if (res.code === 200) {
						that.$message.success("审核完毕");
						that.audit_Labes = [];
						that.dynamicClick();
						that.$emit("funclick", "a");
					}
				} catch (e) {
					that.$message.error("服务异常，请稍后再试");
				}
			},
			dynamicImgclick(row) {
				this.dynamicShow = true;
				this.dynamicImg = row;
			},
			ShutDownIMG() {
				this.dynamicShow = false;
				this.dynamicImg = "";
			}
		}
	}
</script>

<style scoped>
.details {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(1, 1, 1, 0.8);
  top: 1px;
  left: 1px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.details_a {
  width: 60%;
  height: 70%;
  background: #fff;
  border-radius: 8px;
}
img {
  border-radius: 6px;
}
.detaimg2 {
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.luk {
  width: 1000px;
  height: 900px;
}
</style>