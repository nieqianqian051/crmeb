// +---------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +---------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +---------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +---------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +---------------------------------------------------------------------

import LayoutMain from '@/layout';
import setting from '@/setting';
let routePre = setting.routePre;

const meta = {
    auth: true,
};

const pre = 'recipe_';

export default {
    path: routePre + '/recipe',
    name: 'recipe',
    header: 'recipe',
    redirect: {
        name: `${pre}list`,
    },
    meta,
    component: LayoutMain,
    children: [
        {
            path: 'list',
            name: `${pre}list`,
            meta: {
                auth: ['admin-recipe-recipe-index'],
                title: '食谱管理',
            },
            component: () => import('@/pages/recipe/list/index'),
        },
        {
            path: 'add_recipe/:id?',
            name: `${pre}recipeAdd`,
            meta: {
                auth: ['admin-recipe-recipe-index'],
                title: '食谱添加',
                activeMenu: routePre + '/recipe/recipe_list',
            },
            component: () => import('@/pages/recipe/recipeAdd'),
        },
    ]
};