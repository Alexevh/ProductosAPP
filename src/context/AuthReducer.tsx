import {Usuario} from '../interfaces/app-interfaces';

export interface AuthState {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
}

type AuthAction =
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logOut'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'not-authenticated',
        token: null,
        errorMessage: action.payload,
      };
      break;
    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };
      break;
    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };
      break;
    case 'notAuthenticated':
    case 'logOut':
      return {
        ...state,
        errorMessage: '',
        status: 'not-authenticated',
        token: null,
        user: null,
      };
      break;
    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };
      break;

    default:
      return state;
  }
};
