export default {
  // 批量删除购物车数据
  // params：{ id: number }[] id是要删除的购物车id
  // 示例 localhost:1337/api/carts/del-many?id[0]=77&id[1]=76
  routes: [
    {
      method: 'DELETE',
      path: '/carts/del-many',
      handler: 'del-many.deleteMany',
    }
  ]
}
