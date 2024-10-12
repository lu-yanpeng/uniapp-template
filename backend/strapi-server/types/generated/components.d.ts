import type { Schema, Attribute } from '@strapi/strapi';

export interface BannerBanner extends Schema.Component {
  collectionName: 'components_banner_banners';
  info: {
    displayName: 'banner';
    icon: 'picture';
    description: '';
  };
  attributes: {
    images: Attribute.Component<'images.images', true>;
  };
}

export interface CartListCartList extends Schema.Component {
  collectionName: 'components_cart_list_cart_lists';
  info: {
    displayName: 'cart-list';
  };
  attributes: {
    product: Attribute.Relation<
      'cart-list.cart-list',
      'oneToOne',
      'api::product.product'
    >;
    count: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface ColorsColors extends Schema.Component {
  collectionName: 'components_colors_colors';
  info: {
    displayName: 'colors';
    description: '';
  };
  attributes: {
    uid: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    cover: Attribute.Media;
  };
}

export interface DetailsDetails extends Schema.Component {
  collectionName: 'components_details_details';
  info: {
    displayName: 'details';
    icon: 'calendar';
  };
  attributes: {
    color: Attribute.String & Attribute.Required;
    inventory: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    cover: Attribute.Media;
    price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface DictDict extends Schema.Component {
  collectionName: 'components_dict_dicts';
  info: {
    displayName: 'Dict';
    icon: 'oneWay';
    description: '';
  };
  attributes: {
    value: Attribute.Text & Attribute.Required;
    key: Attribute.Enumeration<
      ['gender', 'code', 'ref', 'season', 'material', 'producer']
    > &
      Attribute.Required;
  };
}

export interface ImagesImages extends Schema.Component {
  collectionName: 'components_images_images';
  info: {
    displayName: 'images';
    icon: 'layer';
    description: '';
  };
  attributes: {
    img: Attribute.Media & Attribute.Required;
    uid: Attribute.String & Attribute.Unique;
  };
}

export interface ParameterParameter extends Schema.Component {
  collectionName: 'components_parameter_parameters';
  info: {
    displayName: 'Parameter';
    description: '';
  };
  attributes: {
    gender: Attribute.String;
    code: Attribute.String;
    ref: Attribute.String & Attribute.Required;
    season: Attribute.String;
    material: Attribute.String;
    producer: Attribute.String;
  };
}

export interface SkuEntrySkuEntry extends Schema.Component {
  collectionName: 'components_sku_entry_sku_entries';
  info: {
    displayName: 'sku_entry';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    sku: Attribute.Component<'sku-single.sku-single', true>;
    color: Attribute.Component<'colors.colors', true>;
  };
}

export interface SkuSingleSkuSingle extends Schema.Component {
  collectionName: 'components_sku_single_sku_singles';
  info: {
    displayName: 'sku_single';
    icon: 'book';
    description: '';
  };
  attributes: {
    size: Attribute.String & Attribute.Required;
    color: Attribute.String & Attribute.Required;
    inventory: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    price: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface SpuSpu extends Schema.Component {
  collectionName: 'components_spu_spus';
  info: {
    displayName: 'SPU';
    icon: 'grid';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    sales: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    cover: Attribute.Media;
    min_list_price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    max_list_price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'banner.banner': BannerBanner;
      'cart-list.cart-list': CartListCartList;
      'colors.colors': ColorsColors;
      'details.details': DetailsDetails;
      'dict.dict': DictDict;
      'images.images': ImagesImages;
      'parameter.parameter': ParameterParameter;
      'sku-entry.sku-entry': SkuEntrySkuEntry;
      'sku-single.sku-single': SkuSingleSkuSingle;
      'spu.spu': SpuSpu;
    }
  }
}
