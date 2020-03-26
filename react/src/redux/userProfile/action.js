import firebase from 'firebase';
const USER_PROFILE_DETAILS = 'USER_PROFILE_DETAILS';
const TASK_DETAILS = 'TASK_DETAILS';
let tasks = [];

function userprofiledetails(userObject) {
  return {
    type: USER_PROFILE_DETAILS,
    userObject
  };
}

function taskDetails(tasks) {
  return {
    type: TASK_DETAILS,
    tasks
  };
}

const getTasks = user => {
  return (dispatch, getState) => {

    dispatch(userprofiledetails(user));
    firebase
      .firestore()
      .collection('users')
      .doc(user.email)
      .collection('tasks')
      .get()
      .then(taskSnapshot => {
        taskSnapshot.forEach(doc => {
          const taskData = doc.data();
          if (taskData.userType === 'user') {
            tasks.push(taskData.taskDetails);
          }
        });
        dispatch(taskDetails(tasks))
      });
  };
};

export default {userprofiledetails, getTasks, taskDetails};
