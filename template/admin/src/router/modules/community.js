import LayoutMain from '@/layout';
import setting from '@/setting';
let routePre = setting.routePre;

const pre = 'community_';

export default {
  path: routePre + '/community',
  name: 'community',
  header: 'community',
  redirect: {
    name: `${pre}community`,
  },
  component: LayoutMain,
  children: [
    {
      path: 'community_list',
      name: `${pre}communityList`,
      meta: {
        auth: ['admin-store-storeCommunity-index'],
        title: '动态管理',
        keepAlive: true,
      },
      component: () => import('@/pages/community/communityList/index'),
    },
  ],
};
