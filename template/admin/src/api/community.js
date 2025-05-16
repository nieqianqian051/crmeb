import request from '@/libs/request';

/**
 * @description 社区管理--动态列表
 * @param {Object} param data {Object} 传值参数
 */
export function communityList(data) {
	return request({
		url: '/community/community',
		method: 'post',
		params: data,
	});
}

/**
 * @description 社区管理--活动标签列表
 * @param {Object} 
 */
export function comActivityList() {
	return request({
		url: '/community/community/hotActs',
		method: 'post',
	});
}

/**
 * @description 社区管理--评论动态
 * @param {Object} 
 */
export function commentMsgApi(data) {
	return request({
		url: '/community/community/commentMsg',
		method: 'post',
		data: data
	});
}

/**
 * @description 社区管理--编辑动态
 * @param {Object} 
 */
export function editComMsgInfoApi(data) {
	return request({
		url: '/community/community/editComMsgInfo',
		method: 'post',
		data: data
	});
}

/**
 * @description 社区管理--编辑动态标签
 * @param {Object} 
 */
export function editComMiddleLabelApi(data) {
	return request({
		url: '/community/community/editComMsgInfo',
		method: 'post',
		data: data
	});
}

/**
 * @description 社区管理--获取动态详细
 * @param {Object} 
 */
export function findComMsgByIdApi(msgId) {
	return request({
		url: `/community/community/findComMsgById/${msgId}`,
		method: 'post'
	});
}

/**
 * @description 社区管理--审核
 * @param {Object} 
 */
export function dynamicAuditApi(data) {
	return request({
		url: '/community/community/check',
		method: 'post',
		data: data
	});
}

/**
 * @description 社区管理--获取动态的评论列表
 * @param {Object} 
 */
export function findAllCommentsApi(data) {
	return request({
		url: '/community/community/findAllComments',
		method: 'post',
		data: data
	});
}

/**
 * @description 社区管理--审核评论
 * @param {Object} 
 */
export function readCommentApi(data) {
	return request({
		url: '/community/community/readComment',
		method: 'post',
		data: data
	});
}

/**
 * @description 社区管理--评论回复
 * @param {Object} 
 */
export function commentReplyApi(data) {
	return request({
		url: '/community/community/commentReply',
		method: 'post',
		data: data
	});
}

/**
 * @description 社区管理--评论其它评论
 * @param {Object} 
 */
export function commentCommentApi(data) {
	return request({
		url: '/community/community/commentComment',
		method: 'post',
		data: data
	});
}

/**
 * @description 社区管理--获取动态列表
 * @param {Object} 
 */
export function findAllMsgsApi(data) {
	return request({
		url: '/community/community/findAllMsgList',
		method: 'post',
		data: data
	});
}