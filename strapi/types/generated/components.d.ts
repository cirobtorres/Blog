import type { Schema, Struct } from '@strapi/strapi';

export interface SharedDetails extends Struct.ComponentSchema {
  collectionName: 'components_shared_details';
  info: {
    description: '';
    displayName: 'Details';
    icon: 'plus';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    collapsible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    svg: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedDownload extends Struct.ComponentSchema {
  collectionName: 'components_shared_downloads';
  info: {
    displayName: 'Download';
    icon: 'attachment';
  };
  attributes: {
    files: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    uuid: Schema.Attribute.UID &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<'plugin::strapi-advanced-uuid.uuid'>;
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

export interface SharedOptions extends Struct.ComponentSchema {
  collectionName: 'components_shared_options';
  info: {
    displayName: 'options';
    icon: 'check';
  };
  attributes: {
    isCorrect: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    option: Schema.Attribute.String & Schema.Attribute.Required;
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
    questions: Schema.Attribute.Component<'shared.quiz-questions', true>;
  };
}

export interface SharedQuizQuestions extends Struct.ComponentSchema {
  collectionName: 'components_shared_quiz_questions';
  info: {
    description: '';
    displayName: 'QuizQuestions';
    icon: 'bulletList';
  };
  attributes: {
    options: Schema.Attribute.Component<'shared.options', true>;
    question: Schema.Attribute.String;
    uuid: Schema.Attribute.UID &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<'plugin::strapi-advanced-uuid.uuid'>;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'pencil';
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
      'shared.details': SharedDetails;
      'shared.download': SharedDownload;
      'shared.media': SharedMedia;
      'shared.options': SharedOptions;
      'shared.quiz': SharedQuiz;
      'shared.quiz-questions': SharedQuizQuestions;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
