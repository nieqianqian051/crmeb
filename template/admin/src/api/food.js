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
 * @description 食材管理--列表
 * @param {Object} param data {Object} 传值参数
 */
export function foodList(data) {
	return request({
		url: '/food/food',
		method: 'post',
		data: data,
	});
}

/**
 * @description 食材管理--获取食材分类树形列表
 * @param {Object} param data {Object} 传值参数
 */
export function findAllFoodTypes() {
	return request({
		url: '/food/findAllFoodTypes',
		method: 'post',
	});
}

/**
 * @description 食材管理-详情
 * @param {Number} param id {Number} 食材id
 */
export function detailsApi(id) {
	return request({
		url: `/food/food/${id}`,
		method: 'get',
	});
}

/**
 * @description 云存储 url 上传
 * @param {Object} param data {Object} 传值参数
 */
export function uploadFoodImages(data) {
	return request({
		url: `/food/food/uploadFoodImages`,
		method: 'post',
		file: true,
		data,
	});
}

/**
 * @description 添加食材
 * @param {Number}
 */
export function addFood(data){
	return request({
		url: `/food/food/add`,
		method: 'post',
		data: data
	});
}

/**
 * @description 编辑食材
 * @param {Number}
 */
export function editFood(data){
	return request({
		url: `/food/food/edit`,
		method: 'post',
		data: data
	});
}

/**
 * @description 编辑食材
 * @param {Number}
 */
export function deleteFood(data){
	return request({
		url: `/food/food/remove`,
		method: 'post',
		params: data
	});
}

/**
 * @description 食材分类列表
 * @param {Number}
 */
export function categoryList(data){
	return request({
		url: `/food/food/category`,
		method: 'get',
		params: data
	});
}

/**
 * @description 食材分类 -- 添加表单
 * @param {Object} param params {Object} 传值参数
 */
export function foodCreateApi() {
	return request({
		url: '/food/food/category/create',
		method: 'get',
	});
}

/**
 * @description 删除食材分类
 * @param {Object} param params {Object} 传值参数
 */
export function foodDeleteApi(data) {
	return request({
		url: '/food/food/category/remove',
		method: 'post',
		params: data
	});
}

/**
 * @description 食材分类 -- 编辑表单
 * @param {Object} param params {Object} 传值参数
 */
export function foodEditApi(id){
	return request({
		url: `/food/food/category/${id}`,
		method: 'get',
	});
}

/**
 * @description 食材分类 -- 修改状态
 * @param {Object} param params {Object} 传值参数
 */
export function setShowApi(data) {
	return request({
		url: `/food/food/category/set_show/${data.uuId}/${data.isShow}`,
		method: 'post',
	});
}