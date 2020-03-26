import React, {Component} from "react";
import {Table} from "react-bootstrap";
import moment from "moment";
import _ from "lodash";
import "../../styles/common/overView.scss";
import {FormattedMessage} from "react-intl";
export default class OnGoingTrips extends Component {

   formatDate(bookingTime) {
   return moment(bookingTime).format("h:mm a");
 }
  render() {
    const { userData } = this.props;
    let onlineUsers = [];
    let onlineTaskers = [];
   
    function result(o) {
      if (o.userType === "user" && o.isTasker === false && o.online === true) {
        onlineUsers.push(o);
      }
      else if ((o.userType === "tasker" && o.online === true) || (o.userType === "user" && o.isTasker === true && o.online === true)) {
        onlineTaskers.push(o);
      }
      else {
        //
      }
    }
    _.map(userData, result);

    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              {" "}
              <FormattedMessage
                id={"online_taskers"}
                defaultMessage={"Online Taskers"}
              />
            </div>
            <div className="panel-body panelTableBody">
              <Table responsive className="panelTable">
                <thead>
                  <tr className="panelTableHead">
                    <th className="col-lg-2">
                      <FormattedMessage
                        id={"task_code"}
                        defaultMessage={"Name"}
                      />
                    </th>
                    <th className="col-lg-2">
                      {" "}
                      <FormattedMessage
                        id={"category"}
                        defaultMessage={"Category"}
                      />
                    </th>
                    <th className="col-lg-3">
                      {" "}
                      <FormattedMessage
                        id={"sub_category"}
                        defaultMessage={"Sub Category"}
                      />
                    </th>
                    <th className="col-lg-5">
                      {" "}
                      <FormattedMessage
                        id={"current_location"}
                        defaultMessage={"Current Location"}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody className="panelTableTBody">
                  {onlineTaskers.length
                    ? onlineTaskers.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name === null ? item.username : item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.subCategory && typeof item.subCategory === "object" && item.subCategory.map((index) => {
                          return (
                            <div>
                              {index.name}
                            </div>
                          )
                        }
                        )}</td>
                        <td>{item.currentLocation && item.currentLocation.address}</td>
                      </tr>
                    ))
                    :
                    <tr>
                      <td>No Online Taskers</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </div>
          </div>
      </div>
    );
  }
}

