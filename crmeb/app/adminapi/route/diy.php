<?php
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

use think\facade\Route;

/**
 * diy 相关路由
 */
Route::group('diy', function () {

    //DIY列表
    Route::get('get_list', 'v1.diy.Diy/getList')->option(['real_name' => 'Diy模板列表']);
    //DIY列表
    Route::get('get_info/:id', 'v1.diy.Diy/getInfo')->option(['real_name' => 'Diy模板数据详情']);
    //DIY列表
    Route::get('get_diy_info/:id', 'v1.diy.Diy/getDiyInfo')->option(['real_name' => 'Diy模板数据详情']);
    //删除DIY模板
    Route::delete('del/:id', 'v1.diy.Diy/del')->option(['real_name' => '删除DIY模板']);
    //使用DIY模板
    Route::put('set_status/:id', 'v1.diy.Diy/setStatus')->option(['real_name' => '使用DIY模板']);
    //获取添加表单
    Route::get('create', 'v1.diy.Diy/create')->option(['real_name' => '添加表单']);
    //添加表单
    Route::post('create', 'v1.diy.Diy/save')->option(['real_name' => '添加DIY']);
    //保存DIY模板
    Route::post('save/[:id]', 'v1.diy.Diy/saveData')->option(['real_name' => '添加DIY模板']);
    //保存DIY模板
    Route::post('diy_save/[:id]', 'v1.diy.Diy/saveDiyData')->option(['real_name' => '添加DIY模板']);
    //获取路径
    Route::get('get_url', 'v1.diy.Diy/getUrl')->option(['real_name' => '获取前端页面路径']);
    //获取商品分类
    Route::get('get_category', 'v1.diy.Diy/getCategory')->option(['real_name' => '获取商品分类']);
    //获取商品
    Route::get('get_product', 'v1.diy.Diy/getProduct')->option(['real_name' => '获取商品列表']);
    //获取门店自提开启状态
    Route::get('get_store_status', 'v1.diy.Diy/getStoreStatus')->option(['real_name' => '获取门店自提开启状态']);
    //还原默认数据
    Route::get('recovery/:id', 'v1.diy.Diy/Recovery')->option(['real_name' => '还原Diy默认数据']);
    //获取所有二级分类
    Route::get('get_by_category', 'v1.diy.Diy/getByCategory')->option(['real_name' => '获取所有二级分类']);
    //设置默认数据
    Route::get('set_recovery/:id', 'v1.diy.Diy/setRecovery')->option(['real_name' => '设置Diy默认数据']);
    //获取商品列表
    Route::get('get_product_list', 'v1.diy.Diy/getProductList')->option(['real_name' => '获取商品列表']);
    //分类、个人中心、一键换色
    Route::get('get_color_change/:type', 'v1.diy.Diy/getColorChange')->option(['real_name' => '获取风格设置']);
    //换色和分类保存
    Route::put('color_change/:status/:type', 'v1.diy.Diy/colorChange')->option(['real_name' => '换色和分类保存']);
    //个人中心菜单获取
    Route::get('get_member', 'v1.diy.Diy/getMember')->option(['real_name' => '个人中心详情']);
    //获取页面链接分类
    Route::get('get_page_category', 'v1.diy.PageLink/getCategory')->option(['real_name' => '获取页面链接分类']);
    //获取页面链接
    Route::get('get_page_link/:cate_id', 'v1.diy.PageLink/getLinks')->option(['real_name' => '获取页面链接']);
    //个人中心菜单保存
    Route::post('member_save', 'v1.diy.Diy/memberSaveData')->option(['real_name' => '个人中心保存']);
    //获取diy小程序二维码
    Route::get('get_routine_code/:id', 'v1.diy.Diy/getRoutineCode')->option(['real_name' => 'diy小程序预览码']);
    //开屏广告
    Route::get('open_adv/info', 'v1.diy.Diy/getOpenAdv')->option(['real_name' => '获取开屏广告']);
    Route::post('open_adv/add', 'v1.diy.Diy/openAdvAdd')->option(['real_name' => '保存开屏广告']);
    //推荐商品
    Route::get('groom_list/:type', 'v1.diy.Diy/getGroomList')->option(['real_name' => '推荐商品']);

    /** 系统链接管理 */
    Route::get('link/category', 'v1.diy.PageLink/getLinkCategory')->option(['real_name' => '获取链接分类']);
    Route::get('link/category/form/:cate_id/[:pid]', 'v1.diy.PageLink/getLinkCategoryForm')->option(['real_name' => '链接分类表单']);
    Route::post('link/category/save/:cate_id', 'v1.diy.PageLink/getLinkCategorySave')->option(['real_name' => '链接分类保存']);
    Route::delete('link/category/del/:cate_id', 'v1.diy.PageLink/getLinkCategoryDel')->option(['real_name' => '链接分类删除']);
    Route::get('link/list/:cate_id', 'v1.diy.PageLink/getLinkList')->option(['real_name' => '链接列表']);
    Route::post('link/save/:id', 'v1.diy.PageLink/getLinkSave')->option(['real_name' => '链接保存']);
    Route::delete('link/del/:id', 'v1.diy.PageLink/getLinkDel')->option(['real_name' => '链接删除']);
})->middleware([
    \app\http\middleware\AllowOriginMiddleware::class,
    \app\adminapi\middleware\AdminAuthTokenMiddleware::class,
    \app\adminapi\middleware\AdminCheckRoleMiddleware::class,
    \app\adminapi\middleware\AdminLogMiddleware::class
])->option(['mark' => 'diy', 'mark_name' => '页面装修']);


/**
 * diy_pro 相关路由
 */
Route::group('diy_pro', function () {

    Route::get('get_list', 'v1.diy.DiyPro/getList')->option(['real_name' => 'DiyPro模板列表']);
    Route::get('get_info/:id', 'v1.diy.DiyPro/getInfo')->option(['real_name' => 'DiyPro模板详情']);
    Route::post('save/:id', 'v1.diy.DiyPro/saveInfo')->option(['real_name' => 'DiyPro模板保存']);
    Route::get('get_product', 'v1.diy.DiyPro/getProduct')->option(['real_name' => '获取商品列表']);
    Route::post('update/name/:id', 'v1.diy.DiyPro/updateName')->option(['real_name' => '修改名称']);
    Route::get('export/data/:id', 'v1.diy.DiyPro/exportDIYData')->option(['real_name' => '导出DIY数据']);
    Route::post('import/data', 'v1.diy.DiyPro/importDIYData')->option(['real_name' => '导入DIY数据']);
})->middleware([
    \app\http\middleware\AllowOriginMiddleware::class,
    \app\adminapi\middleware\AdminAuthTokenMiddleware::class,
    \app\adminapi\middleware\AdminCheckRoleMiddleware::class,
    \app\adminapi\middleware\AdminLogMiddleware::class
])->option(['mark' => 'diy_pro', 'mark_name' => '页面装修']);
