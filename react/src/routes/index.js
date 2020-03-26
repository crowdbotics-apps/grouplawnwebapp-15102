import Home from "../screens/dashboard/OverView";
import React from "react";
import _ from "lodash";
import Login from "../components/Login";
import ServerConfig from "../screens/dashboard/ServerConfiguration";
import DriverOverView from "../screens/dashboard/TaskerManagement/OverView";
import TaskerList from "../screens/dashboard/TaskerManagement/TaskerList";
import MobileConfig from "../screens/dashboard/MobileAppConfiguration";
import Layout from "../components/Layout/layout";
import AddTasker from "../screens/dashboard/TaskerManagement/AddTasker";
import UserList from "../screens/dashboard/CustomerManagement/UserList";
import AdminProfile from "../screens/dashboard/AdminArea/AdminProfile";
import CreateAdmin from "../screens/dashboard/AdminArea/CreateAdmin";
import TaskerProfile from "../screens/dashboard/TaskerManagement/TaskerList/TaskerProfile";
import AddCustomer from "../screens/dashboard/CustomerManagement/AddCustomer";
import Rider from "../screens/dashboard/CustomerManagement/OverView";
import UserProfile from "../screens/dashboard/CustomerManagement/UserList/UserProfile";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Authorization from "../components/Authorization/Authiorization";
import Refresh from "../components/Authorization/Onrefresh";


const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route
        exact
        path="/server-configuration"
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin'])(ServerConfig)
        }
      />
      <Route
        exact
        path="/home"
        // component={
        //   !localStorage.getItem("id_token") ?

        //   Refresh
        //   :
        //   Authorization(['superAdmin','admin'])(Home)
        // }
        component={Home}
      />
      <Route
        exact
        path="/add-customer"
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin','admin'])(AddCustomer)
        }
      />
      <Route
        exact
        path="/add-tasker"
        //  component={
        //   !localStorage.getItem("id_token") ?

        //   Refresh
        //   :
        //   Authorization(['superAdmin','admin'])(AddTasker)
        // }
        component={AddTasker}
      />
      <Route
       exact
       path="/tasker-profile/:username"
      //  component={TaskerProfile}
        component={TaskerProfile}
       />

      <Route
        exact
        path="/tasker"
        // component={
        //   !localStorage.getItem("id_token") ?

        //   Refresh
        //   :
        //   Authorization(['superAdmin','admin'])(DriverOverView)
        // }
        component={DriverOverView}
      />
      <Route
        exact
        path="/tasker-list"
        //  component={
        //   !localStorage.getItem("id_token") ?

        //   Refresh
        //   :
        //   Authorization(['superAdmin','admin'])(TaskerList)
        // }
        component={TaskerList}
      />
      <Route
        exact
        path="/customer"
        //  component={
        //   !localStorage.getItem("id_token") ?

        //   Refresh
        //   :
        //   Authorization(['superAdmin','admin'])(Rider)
        // }
        component={Rider}
      />
      <Route
        exact
        path="/user-profile/:username"
        component={UserProfile}
      />
      <Route
        exact
        path="/user-list"
        component={UserList}
      />
      <Route
        exact
        path="/mobile-app-configuration"
         component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin'])(MobileConfig)
        }
      />
      <Route
        exact
        path="/admin-profile"
         component={AdminProfile}
      />
      <Route
        exact
        path="/create-admin"
        component={CreateAdmin}
      />
    </div>
  </Router>
);
export default Routes;
