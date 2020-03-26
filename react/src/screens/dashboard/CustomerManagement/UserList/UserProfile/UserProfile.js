import React, {Component} from "react";
import {connect} from "react-redux";
import {Table, ButtonToolbar, Button, Tabs, Tab } from "react-bootstrap";
import Panel from 'react-bootstrap/lib/Panel';
import _ from "lodash";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Rating from "../../../../../components/UserRatingComponent";
import "../../../../../styles/common/CustomerProfile.scss";

const profileImage = require("../../../../../resources/images/dashboardIcons/default-user.png");

class UserProfile extends Component {
  static propTypes = {
    userprofiledetails: PropTypes.any,
    tripList: PropTypes.arrayOf(Object),
    loading: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      collapse: false
    };
    this.setLoading = this.setLoading.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setLoading(nextProps.loading);
  }

  setLoading(loading) {
    this.setState({isLoading: loading});
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  render() {
    const user = this.props.userprofiledetails;
    const tasks = user.tasks;
    return (
      <div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profilediv">
          <img
            alt="profile"
            src={_.get(this.props, "userprofiledetails.profileurl", profileImage)}
            className="image"
          />
          <div className="profdetails">
            <div>
              <span className="profname">
                {_.get(this.props.userprofiledetails, "name", "")}{" "}
              </span>
              <span className="profrating">
                <Rating
                  noofstars={5}
                  ratedStar={this.props.userprofiledetails.userRating}
                />
              </span>
            </div>
            <div className="namephone">
              <span className="phone">
                <span
                  style={{color: "#bbb"}}
                  className="glyphicon glyphicon-phone"
                />
                <span style={{fontSize: 12, marginLeft: 5, color: "#bbb"}}>
                  {this.props.userprofiledetails.phone}
                </span>
              </span>
              <span className="email">
                <span
                  style={{marginLeft: 5, fontSize: 12, color: "#bbb"}}
                  className="glyphicon glyphicon-envelope"
                />
                <span style={{fontSize: 12, marginLeft: 5, color: "#bbb"}}>
                  {this.props.userprofiledetails.email}
                </span>
              </span>
            </div>
            <div className="address">
              <span
                style={{ color: "#bbb" }}
                className="glyphicon glyphicon-home"
              />
              <span style={{ fontSize: 12, marginLeft: 5, color: "#bbb" }}>
                {this.props.userprofiledetails.address}
              </span> 
            </div>
            <div className="categorycity">
              <span className="category">
                <span
                  style={{ color: "#bbb" }}
                  className="glyphicon glyphicon-briefcase"
                />
                <span style={{ fontSize: 12, marginLeft: 5, marginRight: 5, color: "#bbb" }}>
                  {this.props.userprofiledetails.category}
                </span>
              </span>
              <span className="city">
              <span
                  style={{ color: "#bbb" }}
                  className="glyphicon glyphicon-road"
                />
                <span style={{ fontSize: 12, marginLeft: 5, color: "#bbb" }}>
                  {this.props.userprofiledetails.city}
                </span>
              </span>
            </div>
          </div>
          <div style={{float: "right", display: "none"}}>
            <Button className="deactivebutton">De-Activate</Button>
          </div>
          <div style={{ marginTop: 60 }}>
            <Panel>
              <Panel.Heading>Tasks</Panel.Heading>
              <Panel.Body>
                <Table striped bordered condensed hover>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Fee</th>
                      <th>Tasker Name</th>
                      <th>Tasker Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks && tasks.map((index) => {
                      return (
                        <tr>
                          <td>{index.taskDetails.category}</td>
                          <td>{index.taskDetails.fee}</td>
                          <td>{index.taskerData.name}</td>
                          <td>{index.taskerData.email}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Panel.Body>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userprofiledetails: state.userprofiledetails,
    currentUser: state.auth.currentUser,
    // tripList: state.tripDetails.tripData,
    // loading: state.tripDetails.tripLoading
  };
}
export default connect(mapStateToProps)(UserProfile);
