import { factories } from '@strapi/strapi'

// 批量删除购物车数据
// 参数：{ id: number }[] id是要删除的购物车id
// 示例 localhost:1337/api/carts/del-many?id[0]=77&id[1]=76

/*
* 参考
* 控制器 https://strapi.nodejs.cn/dev-docs/backend-customization/controllers
* 路由 https://strapi.nodejs.cn/dev-docs/backend-customization/routes
* context参数 https://strapi.nodejs.cn/dev-docs/backend-customization/requests-responses/#ctxrequestquery
* CRUD https://docs-v4.strapi.io/dev-docs/api/entity-service/crud#findmany
* */
export default factories.createCoreController('api::cart.cart', ({strapi }) => ({
  async deleteMany(ctx) {
    try {
      const { id: currentUserId } = ctx.state.user
      const params = await this.sanitizeQuery(ctx) as { id: number[] }
      // 查找当前用户下的购物车数据，只能删除自己数据，不能删别人的
      const product = await strapi.entityService.findMany('api::cart.cart', {
        fields: ['id'],
        filters: {
          $and: [
            {
              user: {
                id: {
                  $eq: currentUserId
                }
              }
            },
            {
              id: {
                $in: params.id
              }
            }
          ]
        },
      }) as { id: number }[]
      const delList = []
      for (const { id } of product) {
        await strapi.entityService.delete('api::cart.cart', id, {
          fields: ['id'],
        })
        delList.push(id)
      }
      ctx.body = { del: delList }
    } catch (err) {
      ctx.body = err
    }
  }
}))
