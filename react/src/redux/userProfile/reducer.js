const USER_PROFILE_DETAILS = "USER_PROFILE_DETAILS";
const TASK_DETAILS = "TASK_DETAILS";

const initialState = {
  id: null,
  fname: null,
  lname: null,
  phoneNo: null,
  email: null,
  userRating: null,
  tasks: []
};

export const userprofiledetails = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_DETAILS:
      return {
        ...state,
        fname: action.userObject.fname,
        name: action.userObject.name,
        phone: action.userObject.phone,
        fid: action.userObject.fid,
        email: action.userObject.email,
        username: action.userObject.username,
        profileurl: action.userObject.profileurl,
        address: action.userObject.address,
        category: action.userObject.category,
        subCategory: action.userObject.subCategory,
        city: action.userObject.city,
      };
    case TASK_DETAILS:
      return {
        ...state,
        tasks: action.tasks,
      }
    default:
      return state;
  }
};
