import {
  CLEAR_USER_DATA,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  TASKS_SUCCESS,
  SET_LOGGED_IN_STATUS,
  FLUSH_DATA,
  GPS_COORDS_SUCCESS,
  GPS_COORDS_FAILED,
  CURRENT_USER,
  SET_SPINNER,
  RESET_LOGIN,
  SET_RESET_SPINNER,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from './actionType';
import firebase from 'firebase';
import {withRouter} from 'react-router-dom';
let tasks = [];
export const clearUser = () => {
  return {
    type: CLEAR_USER_DATA
  };
};

export const clearUserData = () => {
  return dispatch => {
    
    return dispatch(clearUser());
    
  };
};
export const coordsSuccess = data => {
  return {
    type: GPS_COORDS_SUCCESS,
    data
  };
};
export const coordsFailed = data => {
  return {
    type: GPS_COORDS_FAILED,
    data
  };
};
export const loginUserSuccess = data => {
  return {
    type: LOGIN_USER_SUCCESS,
    data
  };
};

export const loginUserFailed = data => {
  return {
    type: LOGIN_USER_FAILED,
    data
  };
};

export const taskSuccess = data => {
  return {
    type: TASKS_SUCCESS,
    data
  };
};

export const currentUser = data => {
  return {
    type: CURRENT_USER,
    data
  };
};

export const setSpinner = data => {
  return {
    type: SET_SPINNER,
    data
  };
};

export const setResetSpinner = data => {
  return {
    type: SET_RESET_SPINNER,
    data
  };
};

export const resetPasswordSuccess = data => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    data
  };
};

export const resetPasswordFailed = data => {
  return {
    type: RESET_PASSWORD_FAILED,
    data
  };
};

export const setLoggedInStatus = ({jwtAccessToken, loggedInStatus}) => {
  return {
    type: SET_LOGGED_IN_STATUS,
    jwtAccessToken,
    loggedInStatus
  };
};
export const setGPS = coords => {
  return (dispatch, getState) => {
    if (coords.latitude) {
      dispatch(coordsSuccess(coords));
    } else {
      dispatch(coordsFailed);
    }
  };
};

export const getTasks = email => {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection('users')
      .doc(email)
      .collection('tasks')
      .get()
      .then(taskSnapshot => {
        taskSnapshot.forEach(doc => {
          const taskData = doc.data();
          if (taskData.userType === 'tasker') {
            tasks.push(taskData.taskDetails);
            dispatch(taskSuccess(tasks));
          }
        });
      });
  };
};

export const loginYield = email => {
  let userData = [];
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.email) {
            userData.push(data);
            dispatch(getTasks(data.email));
          }
        });
        dispatch(loginUserSuccess(userData));
      });
  };
};

export const loginUser = (email, password) => {
  return (dispatch, getState) => {
    try {
      dispatch(setSpinner(true));
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection('users')
            .doc(email)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.exists) {
                const data = querySnapshot.data().userType;
                if (data === 'superadmin') {
                  dispatch(loginYield(email));
                  withRouter(history => history.push('/home'));
                } else {
                  alert('User is not an Admin');
                }
              }
            });
        })
        .catch(err => {
          console.log('code', err);
          dispatch(setSpinner(false));
          dispatch(loginUserFailed(err));
        });
    } catch (error) {
      console.log('error', error);
      dispatch(loginUserFailed);
    }
  };
};

export const resetUser = email => {
  return (dispatch, getState) => {
    try {
      dispatch(setResetSpinner(true));
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then((res) => {
          console.log(res);
          dispatch(resetPasswordSuccess(res));
          dispatch(setResetSpinner(false));
        })
        .catch((err) => {
          console.log(err);
          dispatch(resetPasswordFailed(err));
          dispatch(setResetSpinner(false));
        });

    } catch (error) {
      console.log(error);
      dispatch(setResetSpinner(false));
    }
  };
};
