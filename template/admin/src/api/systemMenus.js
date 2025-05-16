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
 * @description 权限--列表
 * @param {Object} param data {Object} 传值参数
 */
export function getTable(data) {
  return request({
    url: '/system/menu',
    method: 'post',
    params: data,
  });
}
/**
 * @description 权限--刷新菜单及权限
 * @param {Object} param data {Object} 传值参数
 */
export function getMenusUnique(data) {
  return request({
    url: '/system/menu/unique',
    method: 'get',
    params: data,
  });
}

/**
 * 权限 -- 添加
 */
export function addMenus() {
  return request({
    url: '/system/menu/create',
    method: 'get',
  });
}

/**
 * 权限 -- 编辑
 * @param id
 */
export function editMenus(id) {
  return request({
    url: '/system/menu/' + id + '/edit',
    method: 'post',
  });
}

/**
 * @description 添加 编辑
 * @param {Object} param data {Object} 集合
 * @param {String} param data.url {String} 地址
 * @param {String} param data.method {String} 请求方式
 * @param {Object} param data.datas {Object} 传值参数
 */
export function addMenusApi(data) {
  return request({
    url: data.url,
    method: data.method,
    data: data.datas,
  });
}

/**
 * @description 表单详情
 * @param {Number} param id {Number} 规则id
 */
export function menusDetailsApi(id) {
  return request({
    url: `/system/menu/${id}`,
    method: 'get',
  });
}

/**
 * @description 修改显示
 * @param {Number} param data.id {Number} 规则id
 * @param {Number} param data.is_show {Number} 状态值
 */
export function isShowApi(data) {
  return request({
    url: `/system/menu/show/${data.id}`,
    method: 'post',
    data,
  });
}

/**
 * @description 权限列表
 */
export function getRuleList(cate_id) {
  return request({
    url: `/system/ruleList?cate_id=${cate_id}`,
    method: 'get',
  });
}
/**
 * @description 权限列表
 */
export function menusBatch(data) {
  return request({
    url: `/system/menu/batch`,
    method: 'post',
    data,
  });
}

/**
 * @description 权限分类树列表
 */
export function menusRuleCate(data) {
  return request({
    url: `/system/rule_cate`,
    method: 'get',
  });
}
