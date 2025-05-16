<template>
	<view class="comment_wrap">
		<view class="comment_item" v-for="(item, index) in chatData" :key="index">
			<view class="comment_left">
				<image src="../static/images/user/header.webp" mode=""></image>
			</view>
			<view class="comment_right">
				<view class="name_wrap">
					<view class="name_text">
						<text>{{item.name}}</text>
						<view class="name_tips">
							{{item.stage}}
						</view>
					</view>
					<view class="zan_wrap">
						<text>{{item.zan}}</text>
						<image src="../static/images/user/comment_dianzan.png" mode="" 　v-if="!item.isZan"
							@click="clickZan(item)"></image>
						<image src="../static/images/user/comment_dianzai_xuanzhong.png" mode="" v-else
							@click="clickZan(item)"></image>
					</view>
				</view>
				<view class="content_wrap">
					<!-- {{item.content}} -->
					<rich-text :nodes="replaceEmoji(item.content)"></rich-text>
				</view>
				<!-- <image src="../static/img/emoji/emoji0.png" mode=""></image> -->
				<view class="back_wrap">
					<view class="back_box" @click="replayChat(item)">
						回复
					</view>
					<view class="back_time">
						{{item.time}}
					</view>
				</view>
				<!-- 子列表 -->
				<view class="child_box" v-for="(cItem, cIndex) in item.children" :key="cIndex">
					<view class="child_wrap" v-if="cIndex<1 || item.expand">
						<view class="child_left">
							<image src="../static/images/user/header.webp" mode=""></image>
						</view>
						<view class="child_right">
							<view class="name_wrap">
								<view class="name_text">
									<text>{{cItem.name}}</text>
								</view>
								<view class="zan_wrap">
									<text>{{cItem.zan}}</text>
									<image src="../static/images/user/comment_dianzan.png" mode="" v-if="!cItem.isZan"
										@click="clickZan(cItem)"></image>
									<image src="../static/images/user/comment_dianzai_xuanzhong.png" mode="" v-else
										@click="clickZan(cItem)"></image>
								</view>
							</view>
							<view class="content_wrap">
								<text v-if="cItem.backUser" @click="replayChat(cItem)">回复</text>
								<text class="back_user" v-if="cItem.backUser">{{cItem.backUser}}：</text>
								<!-- {{cItem.content}} -->
								<rich-text :nodes="replaceEmoji(cItem.content)"></rich-text>
							</view>
							<view class="back_wrap">
								<view class="back_box" @click="replayChat(cItem)">
									回复
								</view>
								<view class="back_time">
									{{cItem.time}}
								</view>
							</view>

						</view>
					</view>
				</view>
				<!-- 如果回复超过一条,就显示展开一条回复 -->
				<view class="expend_wrap" @click="clickExpend(item)" v-if="item.children.length > 1">
					<view class="split_box"></view>
					<text>{{ item.expand ? '收起' : '展开更多回复' }}</text>
					<image src="../static/images/user/xiala.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 回复弹窗 -->
		<ChatPop ref="chayPop" :currentChat="currentChat" @changeMsg="changeMsg"></ChatPop>
	</view>
</template>

<script>
	import ChatPop from '@/components/chatPop.vue';
	export default {
		name: "commentChat",
		components: {
			ChatPop
		},
		data() {
			return {
				chatData: [{
					id: 111,
					name: '小王要变瘦',
					content: '尝试了一下锻炼完补充蛋白粉，感觉真的有增肌',
					zan: 123,
					stage: '一阶段',
					time: '13小时前',
					expand: false, // 控制评论的展开状态
					children: [{
							id: 112,
							name: '小田要变瘦',
							content: '你是喝的什么牌子的蛋白粉，求推荐',
							zan: 1,
							time: '11小时前',
						},
						{
							id: 113,
							name: '小潘要变瘦',
							content: '某某蛋白粉',
							zan: 1,
							backUser: '小田要变瘦', //被回复的昵称
							time: '10小时前',
						},
					]
				}, {
					id: 222,
					name: '小王要变瘦22',
					content: '尝试了一下锻炼完补充蛋白粉，感觉真的有增肌222',
					zan: 123,
					stage: '一阶段',
					time: '13小时前',
					expand: false, // 控制评论的展开状态
					children: [{
							id: 221,
							name: '小田要变瘦',
							content: '你是喝的什么牌子的蛋白粉，求推荐',
							zan: 1,
							time: '11小时前',
						},

					]
				}],
				childInd: 2,
				currentChat: {},
				emojiList: [
					[{
							"url": "emoji_0@2x.png",
							"alt": "[NO]"
						},
						{
							"url": "emoji_1@2x.png",
							"alt": "[OK]"
						},
						{
							"url": "emoji_2@2x.png",
							"alt": "[下雨]"
						},
						{
							"url": "emoji_3@2x.png",
							"alt": "[么么哒]"
						},
						{
							"url": "emoji_4@2x.png",
							"alt": "[乒乓]"
						},
						{
							"url": "emoji_5@2x.png",
							"alt": "[便便]"
						},
						{
							"url": "emoji_6@2x.png",
							"alt": "[信封]"
						},
						{
							"url": "emoji_7@2x.png",
							"alt": "[偷笑]"
						},
						{
							"url": "emoji_8@2x.png",
							"alt": "[傲慢]"
						},
						{
							"url": "emoji_9@2x.png",
							"alt": "[再见]"
						},
						{
							"url": "emoji_10@2x.png",
							"alt": "[冷汗]"
						},
						{
							"url": "emoji_11@2x.png",
							"alt": "[凋谢]"
						},
						{
							"url": "emoji_140@2x.png",
							"alt": "[鼓掌]"
						},
						{
							"url": "emoji_13@2x.png",
							"alt": "[删除]"
						},
						{
							"url": "emoji_14@2x.png",
							"alt": "[勾引]"
						},
						{
							"url": "emoji_15@2x.png",
							"alt": "[发呆]"
						},
						{
							"url": "emoji_16@2x.png",
							"alt": "[发抖]"
						},
						{
							"url": "emoji_17@2x.png",
							"alt": "[可怜]"
						},
						{
							"url": "emoji_18@2x.png",
							"alt": "[可爱]"
						},
						{
							"url": "emoji_19@2x.png",
							"alt": "[右哼哼]"
						},
						{
							"url": "emoji_20@2x.png",
							"alt": "[右太极]"
						},
						{
							"url": "emoji_21@2x.png",
							"alt": "[右车头]"
						},
						{
							"url": "emoji_22@2x.png",
							"alt": "[吐]"
						},
						{
							"url": "emoji_23@2x.png",
							"alt": "[吓]"
						}
					],
					[{
							"url": "emoji_24@2x.png",
							"alt": "[咒骂]"
						},
						{
							"url": "emoji_25@2x.png",
							"alt": "[咖啡]"
						},
						{
							"url": "emoji_26@2x.png",
							"alt": "[啤酒]"
						},
						{
							"url": "emoji_27@2x.png",
							"alt": "[嘘]"
						},
						{
							"url": "emoji_28@2x.png",
							"alt": "[回头]"
						},
						{
							"url": "emoji_29@2x.png",
							"alt": "[困]"
						},
						{
							"url": "emoji_30@2x.png",
							"alt": "[坏笑]"
						},
						{
							"url": "emoji_31@2x.png",
							"alt": "[多云]"
						},
						{
							"url": "emoji_32@2x.png",
							"alt": "[大兵]"
						},
						{
							"url": "emoji_33@2x.png",
							"alt": "[大哭]"
						},
						{
							"url": "emoji_34@2x.png",
							"alt": "[太阳]"
						},
						{
							"url": "emoji_35@2x.png",
							"alt": "[奋斗]"
						},
						{
							"url": "emoji_36@2x.png",
							"alt": "[奶瓶]"
						},
						{
							"url": "emoji_37@2x.png",
							"alt": "[委屈]"
						},
						{
							"url": "emoji_38@2x.png",
							"alt": "[害羞]"
						},
						{
							"url": "emoji_39@2x.png",
							"alt": "[尴尬]"
						},
						{
							"url": "emoji_40@2x.png",
							"alt": "[左哼哼]"
						},
						{
							"url": "emoji_41@2x.png",
							"alt": "[左太极]"
						},
						{
							"url": "emoji_42@2x.png",
							"alt": "[左车头]"
						},
						{
							"url": "emoji_43@2x.png",
							"alt": "[差劲]"
						},
						{
							"url": "emoji_44@2x.png",
							"alt": "[弱]"
						},
						{
							"url": "emoji_45@2x.png",
							"alt": "[强]"
						},
						{
							"url": "emoji_46@2x.png",
							"alt": "[彩带]"
						},
						{
							"url": "emoji_47@2x.png",
							"alt": "[彩球]"
						}
					],
					[{
							"url": "emoji_48@2x.png",
							"alt": "[得意]"
						},
						{
							"url": "emoji_49@2x.png",
							"alt": "[微笑]"
						},
						{
							"url": "emoji_50@2x.png",
							"alt": "[心碎了]"
						},
						{
							"url": "emoji_51@2x.png",
							"alt": "[快哭了]"
						},
						{
							"url": "emoji_52@2x.png",
							"alt": "[怄火]"
						},
						{
							"url": "emoji_53@2x.png",
							"alt": "[怒]"
						},
						{
							"url": "emoji_54@2x.png",
							"alt": "[惊恐]"
						},
						{
							"url": "emoji_55@2x.png",
							"alt": "[惊讶]"
						},
						{
							"url": "emoji_56@2x.png",
							"alt": "[憨笑]"
						},
						{
							"url": "emoji_141@2x.png",
							"alt": "[龇牙]"
						},
						{
							"url": "emoji_58@2x.png",
							"alt": "[打哈欠]"
						},
						{
							"url": "emoji_59@2x.png",
							"alt": "[抓狂]"
						},
						{
							"url": "emoji_60@2x.png",
							"alt": "[折磨]"
						},
						{
							"url": "emoji_61@2x.png",
							"alt": "[抠鼻]"
						},
						{
							"url": "emoji_62@2x.png",
							"alt": "[抱抱]"
						},
						{
							"url": "emoji_63@2x.png",
							"alt": "[抱拳]"
						},
						{
							"url": "emoji_64@2x.png",
							"alt": "[拳头]"
						},
						{
							"url": "emoji_65@2x.png",
							"alt": "[挥手]"
						},
						{
							"url": "emoji_66@2x.png",
							"alt": "[握手]"
						},
						{
							"url": "emoji_67@2x.png",
							"alt": "[撇嘴]"
						},
						{
							"url": "emoji_68@2x.png",
							"alt": "[擦汗]"
						},
						{
							"url": "emoji_69@2x.png",
							"alt": "[敲打]"
						},
						{
							"url": "emoji_70@2x.png",
							"alt": "[晕]"
						},
						{
							"url": "emoji_71@2x.png",
							"alt": "[月亮]"
						}
					],
					[{
							"url": "emoji_72@2x.png",
							"alt": "[棒棒糖]"
						},
						{
							"url": "emoji_73@2x.png",
							"alt": "[汽车]"
						},
						{
							"url": "emoji_74@2x.png",
							"alt": "[沙发]"
						},
						{
							"url": "emoji_75@2x.png",
							"alt": "[流汗]"
						},
						{
							"url": "emoji_76@2x.png",
							"alt": "[流泪]"
						},
						{
							"url": "emoji_77@2x.png",
							"alt": "[激动]"
						},
						{
							"url": "emoji_78@2x.png",
							"alt": "[灯泡]"
						},
						{
							"url": "emoji_79@2x.png",
							"alt": "[炸弹]"
						},
						{
							"url": "emoji_80@2x.png",
							"alt": "[熊猫]"
						},
						{
							"url": "emoji_81@2x.png",
							"alt": "[爆筋]"
						},
						{
							"url": "emoji_82@2x.png",
							"alt": "[爱你]"
						},
						{
							"url": "emoji_83@2x.png",
							"alt": "[爱心]"
						},
						{
							"url": "emoji_84@2x.png",
							"alt": "[爱情]"
						},
						{
							"url": "emoji_85@2x.png",
							"alt": "[猪头]"
						},
						{
							"url": "emoji_86@2x.png",
							"alt": "[猫咪]"
						},
						{
							"url": "emoji_87@2x.png",
							"alt": "[献吻]"
						},
						{
							"url": "emoji_88@2x.png",
							"alt": "[玫瑰]"
						},
						{
							"url": "emoji_89@2x.png",
							"alt": "[瓢虫]"
						},
						{
							"url": "emoji_90@2x.png",
							"alt": "[疑问]"
						},
						{
							"url": "emoji_91@2x.png",
							"alt": "[白眼]"
						},
						{
							"url": "emoji_92@2x.png",
							"alt": "[皮球]"
						},
						{
							"url": "emoji_93@2x.png",
							"alt": "[睡觉]"
						},
						{
							"url": "emoji_94@2x.png",
							"alt": "[磕头]"
						},
						{
							"url": "emoji_95@2x.png",
							"alt": "[示爱]"
						}
					],
					[{
							"url": "emoji_96@2x.png",
							"alt": "[礼品袋]"
						},
						{
							"url": "emoji_97@2x.png",
							"alt": "[礼物]"
						},
						{
							"url": "emoji_98@2x.png",
							"alt": "[篮球]"
						},
						{
							"url": "emoji_99@2x.png",
							"alt": "[米饭]"
						},
						{
							"url": "emoji_100@2x.png",
							"alt": "[糗大了]"
						},
						{
							"url": "emoji_101@2x.png",
							"alt": "[红双喜]"
						},
						{
							"url": "emoji_102@2x.png",
							"alt": "[红灯笼]"
						},
						{
							"url": "emoji_103@2x.png",
							"alt": "[纸巾]"
						},
						{
							"url": "emoji_104@2x.png",
							"alt": "[胜利]"
						},
						{
							"url": "emoji_105@2x.png",
							"alt": "[色]"
						},
						{
							"url": "emoji_106@2x.png",
							"alt": "[药]"
						},
						{
							"url": "emoji_138@2x.png",
							"alt": "[麦克风]"
						},
						{
							"url": "emoji_108@2x.png",
							"alt": "[蛋糕]"
						},
						{
							"url": "emoji_109@2x.png",
							"alt": "[蜡烛]"
						},
						{
							"url": "emoji_110@2x.png",
							"alt": "[街舞]"
						},
						{
							"url": "emoji_111@2x.png",
							"alt": "[衰]"
						},
						{
							"url": "emoji_112@2x.png",
							"alt": "[西瓜]"
						},
						{
							"url": "emoji_113@2x.png",
							"alt": "[调皮]"
						},
						{
							"url": "emoji_114@2x.png",
							"alt": "[象棋]"
						},
						{
							"url": "emoji_115@2x.png",
							"alt": "[跳绳]"
						},
						{
							"url": "emoji_116@2x.png",
							"alt": "[跳跳]"
						},
						{
							"url": "emoji_117@2x.png",
							"alt": "[车厢]"
						},
						{
							"url": "emoji_118@2x.png",
							"alt": "[转圈]"
						},
						{
							"url": "emoji_119@2x.png",
							"alt": "[鄙视]"
						}
					],
					[

						{
							"url": "emoji_120@2x.png",
							"alt": "[酷]"
						},
						{
							"url": "emoji_121@2x.png",
							"alt": "[钞票]"
						},
						{
							"url": "emoji_122@2x.png",
							"alt": "[钻戒]"
						},
						{
							"url": "emoji_123@2x.png",
							"alt": "[闪电]"
						},
						{
							"url": "emoji_124@2x.png",
							"alt": "[闭嘴]"
						},
						{
							"url": "emoji_125@2x.png",
							"alt": "[闹钟]"
						},
						{
							"url": "emoji_126@2x.png",
							"alt": "[阴险]"
						},
						{
							"url": "emoji_127@2x.png",
							"alt": "[难过]"
						},
						{
							"url": "emoji_128@2x.png",
							"alt": "[雨伞]"
						},
						{
							"url": "emoji_129@2x.png",
							"alt": "[青蛙]"
						},
						{
							"url": "emoji_130@2x.png",
							"alt": "[面条]"
						},
						{
							"url": "emoji_131@2x.png",
							"alt": "[鞭炮]"
						},
						{
							"url": "emoji_132@2x.png",
							"alt": "[风车]"
						},
						{
							"url": "emoji_133@2x.png",
							"alt": "[飞吻]"
						},
						{
							"url": "emoji_134@2x.png",
							"alt": "[飞机]"
						},
						{
							"url": "emoji_135@2x.png",
							"alt": "[饥饿]"
						},
						{
							"url": "emoji_136@2x.png",
							"alt": "[香蕉]"
						},
						{
							"url": "emoji_137@2x.png",
							"alt": "[骷髅]"
						}
					]
				],
			};
		},
		mounted() {

		},
		methods: {
			//替换表情符号为图片
			replaceEmoji(str) {
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					//console.log("item: " + item);
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								/* let onlinePath = 'https://www.xxx.com/emoji/'
								let imgstr = '<img width="40px" src="' + onlinePath + EM.url + '">'; */
								let imgstr = '<img width="28px" height="28px" src="/static/img/emoji/' + EM
									.url + '">';
								//console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				console.log('replacedStr------', replacedStr)
				return replacedStr;
			},
			changeMsg(data) {
				console.log('腹肌----', data, this.currentChat)
				const selfUser = {
					id: 222,
					name: '小于要变瘦',
					content: data,
					zan: 1,
					time: '5小时前',
				}
				this.chatData.forEach(v => {
					// 如果是一级回复,
					if (v.id === this.currentChat['id']) {
						console.log('添加聊天---', v)
						v.children.push(selfUser);
						v.expand = true;
						return;
					}
					// 如果点击的二级评论,
					if (v.children.length > 0) {
						v.children.forEach(item => {
							if (item.id === this.currentChat['id']) {
								selfUser.backUser = this.currentChat['name'];
								v.children.push(selfUser);
								v.expand = true;
							}
						})
					}

				})
				this.$refs.chayPop.closePop();
			},
			replayChat(data) {
				console.log('回复----', data)
				this.currentChat = data;
				this.$refs.chayPop.openPop();
			},
			clickExpend(item) {
				item.expand = !item.expand;
			},
			clickZan(item) {
				console.log('11111111', item)
				this.$nextTick(() => {
					item.isZan = !item.isZan;
					this.$forceUpdate()
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment_wrap {
		width: 100%;
		// background-color: pink;

		.comment_item {
			width: 100%;
			display: flex;
			padding: 49rpx 0;
			border-bottom: 1rpx solid #F3F1F1;

			.comment_left {
				width: 58rpx;
				height: 58rpx;
				border-radius: 50%;
				margin-right: 30rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.comment_right {
				width: calc(100% - 88rpx);

				.expend_wrap {
					width: 100%;
					display: flex;

					.split_box {
						width: 38rpx;
						height: 16rpx;
						margin-right: 30rpx;
						border-bottom: 2rpx solid #C3C3C3;
					}

					text {
						font-family: PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #474747;
					}

					image {
						width: 20rpx;
						height: 11rpx;
						margin: 14rpx 0 0 11rpx;
					}
				}

				.child_wrap {
					width: 100%;
					display: flex;

					.child_left {
						width: 38rpx;
						height: 38rpx;
						margin-right: 20rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}

					.child_right {
						width: calc(100% - 58rpx);
					}
				}

				.back_wrap {
					width: 100%;
					display: flex;
					margin-bottom: 40rpx;

					.back_box {
						width: 81rpx;
						height: 41rpx;
						line-height: 41rpx;
						text-align: center;
						background: #F5F5F5;
						border-radius: 21rpx;
						font-family: PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #2A2A2A;
						margin-right: 40rpx;
					}

					.back_time {
						font-family: PingFang SC;
						font-weight: 400;
						font-size: 20rpx;
						color: #666666;
						line-height: 43rpx;
					}
				}

				.content_wrap {
					width: 100%;
					margin: 10rpx 0 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #2A2A2A;

					.back_user {
						color: #666666;
					}

				}

				.name_wrap {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.name_text {
						font-family: PingFang SC;
						font-weight: 500;
						font-size: 24rpx;
						color: #000000;

						text {
							line-height: 48rpx;
						}

						.name_tips {
							display: inline-block;
							font-family: PingFang SC;
							font-weight: 400;
							font-size: 16rpx;
							color: #000000;
							width: 53rpx;
							height: 25rpx;
							background: #C0DF17;
							border-radius: 5rpx;
							margin-left: 14rpx;
						}
					}

					.zan_wrap {
						font-family: PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #35363A;

						text {
							vertical-align: sub;
							margin-right: 6rpx;
						}

						image {
							width: 31rpx;
							height: 32rpx;
							vertical-align: middle;
						}
					}
				}
			}
		}
	}
</style>