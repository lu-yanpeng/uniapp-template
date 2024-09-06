// 用户只能更新自己创建的数据，不能修改其他人的数据，否者返回403
export default async (policyContext, config, { strapi }) => {
  // 查询这条数据的user字段，跟发送请求的user做对比，不是同一个用户就403
  const { user } = policyContext.state
  const params = policyContext.params
  const enter = await strapi.entityService.findOne('api::cart.cart', params.id, {
    fields: ['id'],
    populate: {
      user: {
        fields: ['id']
      }
    },
  })
  if (user.id !== enter.user.id) {
    return false
  }

  const { body: { data } } = policyContext.request
  const length = Object.keys(data).length
  // 一个put请求必须要更新quantity字段，不传或者多传其他字段都会返回403
  return length === 1 && 'quantity' in data
}
