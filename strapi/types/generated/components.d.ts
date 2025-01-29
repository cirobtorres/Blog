import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCodeblock extends Struct.ComponentSchema {
  collectionName: 'components_shared_codeblocks';
  info: {
    description: '';
    displayName: 'codeblock';
    icon: 'code';
  };
  attributes: {
    code: Schema.Attribute.Text & Schema.Attribute.Required;
    filename: Schema.Attribute.String & Schema.Attribute.Required;
    language: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeatured extends Struct.ComponentSchema {
  collectionName: 'components_shared_featureds';
  info: {
    description: '';
    displayName: 'Featured';
    icon: 'message';
  };
  attributes: {
    codeblock: Schema.Attribute.Component<'shared.codeblock', true>;
    featured: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuiz extends Struct.ComponentSchema {
  collectionName: 'components_shared_quizzes';
  info: {
    description: '';
    displayName: 'quiz';
    icon: 'bulletList';
  };
  attributes: {
    json: Schema.Attribute.JSON & Schema.Attribute.Required;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.codeblock': SharedCodeblock;
      'shared.featured': SharedFeatured;
      'shared.media': SharedMedia;
      'shared.quiz': SharedQuiz;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
