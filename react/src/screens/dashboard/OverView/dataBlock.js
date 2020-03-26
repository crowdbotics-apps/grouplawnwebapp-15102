import React from "react";
import _ from "lodash";
import { Block } from "./block";

export const DataBlock = props => {
  let taskerData = [];
  let userData = [];
  if (props.userData) {
    function result(o) {
      if (o.userType === ('user' || 'admin' || 'superadmin')) {
        userData.push(o);
      } else if (o.userType === 'tasker')
      {
        taskerData.push(o);
      }
      else {
        console.log("Not an user");
      }
    }
    _.map(props.userData, result);
  }
  return (
    <div className="acb-details-wrapper">
        <Block
          title="total_users"
          stats={userData.length}
          imgSrc="users"
          color="#333"
        />
        <Block
          title="total_taskers"
          stats={taskerData.length}
          imgSrc="briefcase"
          color="#333"
        />
        <Block
          title="total_tasks"
          stats={props.taskData.length}
          imgSrc="tasks"
          color="#333"
        />
    </div>
  );
};