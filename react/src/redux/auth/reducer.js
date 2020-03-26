import {
  CLEAR_USER_DATA,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  SET_LOGGED_IN_STATUS,
  FLUSH_DATA,
  GPS_COORDS_SUCCESS,
  GPS_COORDS_FAILED,
  CURRENT_USER,
  TASKS_SUCCESS,
  SET_SPINNER,
  RESET_LOGIN,
  SET_RESET_SPINNER,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from "./actionType";

const initialState = {
  user: {},
  tasks: {},
  reset: {},
  resetData: {},
  invalidCredential: false,
  loggedInStatus: false,
  currentUser: null,
  loading: false,
  resetLoading: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case FLUSH_DATA:
      return {...initialState};
    case GPS_COORDS_SUCCESS:
      return {
        ...state,
        coords: action.data
      };
    case GPS_COORDS_FAILED:
      return {
        state
      };
    case CLEAR_USER_DATA:
      return {...initialState, loggedInStatus: false};
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
        invalidCredential: false,
        loggedInStatus: true
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        user: action.data,
        invalidCredential: true,
        loggedInStatus: false
      };
    case RESET_LOGIN:
      return {
        ...state,
        invalidCredential: false,
      }
    case TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.data,
      }
    case CURRENT_USER: 
      return {
        ...state,
        currentUser: action.data,
      }
    case SET_SPINNER:
      return {
        ...state,
        loading: action.data,
      }
    case SET_RESET_SPINNER:
      return {
        ...state,
        resetLoading: action.data,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetSuccess: true,
        resetVisible: false,
        resetData: action.data,
      }
    case RESET_PASSWORD_FAILED: 
      return {
        ...state,
        resetSuccess: false,
        reset: action.data,
      }
    default:
      return state;
  }
};
