// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import request from '@/libs/request';

/**
 * @description 文章管理--列表
 * @param {Object} param data {Object} 传值参数
 */
export function cmsListApi(data) {
  return request({
    url: '/article/article',
    method: 'post',
    params: data,
  });
}

/**
 * @description 获取麦吉简介文章评论列表
 * @param {Object} data
 */
export function findAllArticleCommentsApi(data) {
  return request({
    url: '/article/article/findAllArticleComments',
    method: 'post',
    params: data,
  });
}

/**
 * @description 删除或编辑麦吉简介文章
 * @param {Object} data
 */
export function editArticleById(data) {
	return request({
	  url: '/article/article/edit',
	  method: 'post',
	  data: data,
	});
}

/**
 * @description 根据标签来源获取标签列表
 * @param {Object} data
 */
export function findAllLabelBySourceApi(data) {
	return request({
	  url: '/article/article/findAllLabelsBySource',
	  method: 'post',
	  params: data,
	});
}

/** 
 * @description 修改麦吉简介文章标签
 * @param {Object} data
 */
export function updateArticleLabel(data) {
	return request({
	  url: '/article/article/updateArticleLabel',
	  method: 'post',
	  data: data,
	});
}

/** 
 * @description 文章评论/评论回复
 * @param {Object} data
 */
export function articleCommentApi(data) {
	return request({
	  url: '/article/article/articleComment',
	  method: 'post',
	  data: data,
	});
}

/** 
 * @description 屏蔽麦吉简介文章评论
 * @param {Object} data
 */
export  function delArticleCommentsApi(data) {
	return request({
	  url: '/article/article/delArticleComments',
	  method: 'post',
	  data: data,
	});
}

/**
 * @description 文章管理--新增编辑
 * @param {Object} param data {Object} 传值参数
 */
export function cmsAddApi(data) {
  return request({
    url: '/article/article/article',
    method: 'post',
    data,
  });
}

/**
 * @description 文章管理--文章详情
 * @param {Number} param id {Number} 文章id
 */
export function createApi(id) {
  return request({
    url: `/article/article/${id}`,
    method: 'post',
  });
}

/**
 * @description 文章管理--文章图片上传
 * @param {Number} param id {Number} 文章id
 */
export function uploadArticleImagesApi(data){
	return request({
		url: `/article/article/uploadArticleImages`,
		method: 'post',
		file: true,
		data,
	});
}