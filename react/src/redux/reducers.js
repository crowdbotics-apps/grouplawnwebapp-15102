import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { auth } from "./auth/reducer";
import { users } from "./users/reducer";
import { userprofiledetails } from "./userProfile/reducer";
const rootReducer = combineReducers({
  form: reduxFormReducer,
  auth,
  users,
  userprofiledetails,
});

export default rootReducer;
