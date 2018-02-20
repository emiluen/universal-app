import Store from '../store/publicProfile';

export const initialState = Store;

export default function publicProfileReducer(state = initialState, action) {
  switch (action.type) {
    case 'PUBLIC_PROFILE_FIRSTNAME_UPDATE': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          firstName: action.data,
        };
      }
      return state;
    }
    case 'PUBLIC_PROFILE_PERSONALITIES_UPDATE': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          personalities: action.data,
        };
      }

      return state;
    }
    case 'PUBLIC_PROFILE_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    default:
      return state;
  }
}
