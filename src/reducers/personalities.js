import _ from 'lodash';

import Store from '../store/personalities';

export const initialState = Store;

export default function personalityReducer(state = initialState, action) {
  switch (action.type) {
    case 'PERSONALITIES_REPLACE': {
      let personalities = [];

      if (action.data.items) {
        personalities = _.map(action.data.items, (personality) => {
          const articleP = personality.fields.article;
          const imageP = personality.fields.profileImage;

          const types = _.map(personality.fields.types || [], (type) => {
            const articleT = type.fields.article;
            const coverImageT = type.fields.coverImage;
            const profileImageT = type.fields.profileImage;

            return {
              id: type.sys.id,
              name: type.fields.name,
              articleId: type.fields.article.sys.id,
              personalityId: personality.sys.id,
              article: articleT ? {
                title: articleT.fields.title,
                description: articleT.fields.description,
              } : null,
              coverImageUrl: coverImageT ? coverImageT.fields.file.url : null,
              profileImageUrl: profileImageT ? profileImageT.fields.file.url : null,
            };
          });

          return {
            id: personality.sys.id,
            name: personality.fields.name,
            tagline: personality.fields.tagline,
            articleId: personality.fields.article.sys.id,
            article: articleP ? {
              title: articleP.fields.title,
              description: articleP.fields.description,
            } : null,
            profileImageUrl: imageP ? imageP.fields.file.url : null,
            types,
          };
        });
      }

      return {
        ...state,
        error: null,
        loading: false,
        personalities,
      };
    }
    case 'PERSONALITIES_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    default:
      return state;
  }
}
