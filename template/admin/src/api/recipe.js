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
 * @description 食谱管理--列表
 * @param {Object} param data {Object} 传值参数
 */
export function recipeList(data) {
	return request({
		url: '/recipe/recipe',
		method: 'get',
		params: data,
	});
}

/**
 * @description 食谱管理-详情
 * @param {Number} param id {Number} 食谱id
 */
export function detailsApi(id) {
	return request({
		url: `/recipe/recipe/${id}`,
		method: 'get',
	});
}

/**
 * @description 根据标签来源获取标签列表
 * @param {Number}
 */
export function labelList(data) {
	return request({
		url: `/recipe/recipe/findAllLabelsBySource`,
		method: 'post',
		data: data
	});
}

/**
 * @description 获取食材分类分级列表
 * @param {Number}
 */
export function foodList(data) {
	return request({
		url: `/recipe/recipe/findAllFoodTypes`,
		method: 'post',
		params: data
	});
}

/**
 * @description 食谱主图上传
 * @param {Object} param data {Object} 传值参数
 */
export function uploadRecipeImages(data) {
	return request({
		url: `/recipe/recipe/uploadRecipeImages`,
		method: 'post',
		file: true,
		data,
	});
}

/**
 * @description 添加食谱
 * @param {Number}
 */
export function addRecipe(data){
	return request({
		url: `/recipe/recipe/add`,
		method: 'post',
		data: data
	});
}

/**
 * @description 编辑食谱
 * @param {Number}
 */
export function editRecipe(data){
	return request({
		url: `/recipe/recipe/edit`,
		method: 'post',
		data: data
	});
}

/**
 * @description 删除食谱
 * @param {Number}
 */
export function recipeDeleteApi(data){
	return request({
		url: `/recipe/recipe/remove`,
		method: 'post',
		params: data
	});
}

/**
 * @description 取消推荐食谱
 * @param {Number}
 */
export function cancelRecommendApi(data) {
	return request({
		url: `/recipe/recipe/cancelRecommend`,
		method: 'post',
		params: data
	});
}