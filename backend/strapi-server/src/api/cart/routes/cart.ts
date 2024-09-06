/**
 * cart router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::cart.cart', {
  config: {
    update: {
      policies: ['is-author'],
    }
  }
});
