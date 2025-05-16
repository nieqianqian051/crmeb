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

const pre = 'food_';

export default {
    path: routePre + '/food',
    name: 'food',
    header: 'food',
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
                auth: ['admin-food-food-index'],
                title: '食材管理',
            },
            component: () => import('@/pages/food/list/index'),
        },
        {
            path: 'food_classify',
            name: `${pre}foodClassify`,
            meta: {
                title: '食材分类',
                auth: ['admin-food-foodCategory-index'],
            },
            component: () => import('@/pages/food/foodClassify'),
        },
        {
            path: 'add_food/:id?',
            name: `${pre}foodAdd`,
            meta: {
                auth: ['admin-food-food-index'],
                title: '食材添加',
                activeMenu: routePre + '/food/food_list',
            },
            component: () => import('@/pages/food/foodAdd'),
        },
    ]
};