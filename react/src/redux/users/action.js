import {
  FETCHING_USER,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  FETCHING_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILED,
  FETCHING_USER_STATS_CHARTS,
  FETCH_USER_STATS_CHARTS_SUCCESS,
  FETCH_USER_STATS_CHARTS_FAILED,
  CREATE_NEW_USER_REQ,
  CREATE_NEW_USER_REQ_SUCCESS,
  CREATE_NEW_USER_REQ_FAILED,
  CHANGE_PASSWORD_REQ,
  CHANGE_PASSWORD_REQ_SUCCESS,
  CHANGE_PASSWORD_REQ_FAILED
} from './actionType';
import {reset} from 'redux-form';
import firebase from 'firebase';
import {withRouter} from 'react-router-dom';
import CryptoJS from 'crypto-js';

function fetchingAllUsers() {
  return {
    type: FETCHING_ALL_USERS
  };
}
function fetchAllUsersSuccess(data) {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    data
  };
}
function fetchAllUsersFailed(data) {
  return {
    type: FETCH_ALL_USERS_FAILED,
    data
  };
}
function fetchingUsers() {
  return {
    type: FETCHING_USER
  };
}

function fetchUsersSuccess(data) {
  return {
    type: FETCH_USERS_SUCCESS,
    data
  };
}

function fetchUsersFailed(data) {
  return {
    type: FETCH_USERS_FAILED,
    data
  };
}

function fetchingUsersStatusCharts() {
  return {
    type: FETCHING_USER_STATS_CHARTS
  };
}

function fetchUsersStatusChartsSuccess(data) {
  return {
    type: FETCH_USER_STATS_CHARTS_SUCCESS,
    data
  };
}

function fetchUsersStatusChartsFailed(data) {
  return {
    type: FETCH_USER_STATS_CHARTS_FAILED,
    data
  };
}

function RequestCreateNewUser() {
  return {
    type: CREATE_NEW_USER_REQ
  };
}

function RequestCreateNewUserSuccess(data) {
  return {
    type: CREATE_NEW_USER_REQ_SUCCESS,
    newUser: data
  };
}

function RequestCreateNewUserFailed(data) {
  return {
    type: CREATE_NEW_USER_REQ_FAILED,
    createUserErrorObj: data
  };
}

function RequestChangePassword() {
  return {
    type: CHANGE_PASSWORD_REQ
  };
}

function RequestChangePasswordSuccess(data) {
  return {
    type: CHANGE_PASSWORD_REQ_SUCCESS,
    newPas: data
  };
}

function RequestChangePasswordFailed(data) {
  return {
    type: CHANGE_PASSWORD_REQ_FAILED,
    newPasErrorObj: data
  };
}

function createNewUser(userObj) {
  return (dispatch, getState) => {
    try {
      let cipherPassword = CryptoJS.AES.encrypt(userObj.password, 'secret key');

      cipherPassword = cipherPassword.toString();

      firebase
        .auth()
        .createUserWithEmailAndPassword(userObj.email, userObj.password)
        .then(response => {
          dispatch(RequestCreateNewUserSuccess(response));
          firebase
            .firestore()
            .collection('users')
            .doc(userObj.email)
            .set(
              {
                email: userObj.email,
                name: userObj.fname,
                username: userObj.fname,
                userType: 'admin',
                fid: null,
                phone: null,
                cipherPassword,
                address: null,
                category: null,
                currentLocation: null,
                location: null,
                onTrip: false,
                fee: null,
                isTasker: false,
                rating: [],
                fcmToken: null,
                online: false,
                profileUrl: null,
                status: null,
                stripeId: null,
                subCategory: null
              },
              {
                merge: true
              }
            )
            .catch(error => console.log('Catch', error));
            alert("Admin Created Successfully");
        })
        .catch(error => {
          alert(error.message);
          dispatch(RequestCreateNewUserFailed(error))
        });
    } catch (error) {
      console.log('function error', error);
    }
  };
}

function changePassword(data) {
  return (dispatch, getState) => {
    let user = firebase.auth().currentUser;
    let newPassword = data.password;
   
    let cipherPassword = CryptoJS.AES.encrypt(data.password, 'secret key');

    cipherPassword = cipherPassword.toString();

    
      user.updatePassword(newPassword).then(function (res) {
        dispatch(RequestChangePassword());
     
        firebase
          .firestore()
          .collection('users')
          .doc(user.email)
          .set(
            {
              cipherPassword,
            },
            {
              merge: true
            }
          )
          .catch(error => console.log('Catch', error));
          dispatch(RequestChangePasswordSuccess(res));
      }).catch(function (error) {
        console.log(error);
        alert(error.message);
      });
    };
  }

export default {
  createNewUser,
  changePassword
};
