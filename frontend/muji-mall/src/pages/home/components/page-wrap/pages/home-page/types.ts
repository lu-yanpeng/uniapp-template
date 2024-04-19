// 每个模块的组件名就是他的id，通过这个id实现点击导航跳转对应模块
export type NavItemId = Readonly<[
  'banner',
  'special-collection',
  'news',
  'category',
  'rank-list',
  'page-video'
]>
