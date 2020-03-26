import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Pagination,
  Button,
  FormControl,
  DropdownButton,
  MenuItem,
  InputGroup
} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import _ from "lodash";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import UserProfileAction from "../../../../redux/userProfile/action";
import Rating from "../../../../components/UserRatingComponent";
import "../../../../styles/common//TaskerList.scss";

class TaskersList extends Component {
  static propTypes = {
    userList: PropTypes.any,
    loading: PropTypes.bool,
    meta: PropTypes.object,
    userprofiledetails: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activePage: 1
    };
    this.setLoading = this.setLoading.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setLoading(nextProps.loading);
  }

  setLoading(loading) {
    this.setState({isLoading: loading});
  }
  updateProfile(user) {
    this.props.userprofiledetails(user);
  }
  handlePagination(eventkey) {
    this.setState({activePage: eventkey});
  }
  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="panel panel-primary">
          <div className="panel-heading panelheading">
            <span>
              {" "}
              <FormattedMessage
                id={"drivers_list"}
                defaultMessage={"Taskers List"}
              />
            </span>
            <div
              className="col-sm-4 col-xs-4"
              style={{
                float: "right",
                marginTop: -7,
                marginRight: -10,
                display: "none"
              }}
            >
              <InputGroup className="col-sm-8 col-xs-8 inputgroup">
                <InputGroup.Addon className="inputaddon">
                  >
                  <span
                    className="glyphicon glyphicon-search"
                    style={{color: "#bbb"}}
                  />
                </InputGroup.Addon>
                <FormControl
                  type="text"
                  className="forminput"
                  placeholder="ie Suraj,Tata Tiago,KA-25-MX-007 etc"
                />
              </InputGroup>
              <DropdownButton
                bsStyle="primary"
                className="col-sm-12 col-xs-12"
                title="Relevant"
                id="bg-nested-dropdown"
                style={{marginLeft: 10}}
              >
                <MenuItem eventKey="1">Dropdown link</MenuItem>
                <MenuItem eventKey="2">Dropdown link</MenuItem>
              </DropdownButton>
            </div>
          </div>
          <div className="panel-body panelTableBody">
            <table className="col-xs-12 panelTable">
              <thead>
                <tr className="panelTableHead">
                  <th className="col-md-2">
                    {" "}
                    <FormattedMessage id={"name"} defaultMessage={"Name"} />
                  </th>
                  <th className="col-md-2">
                    {" "}
                    <FormattedMessage
                      id={"category"}
                      defaultMessage={"Category"}
                    />
                  </th>
                  <th className="col-md-2">
                    {" "}
                    <FormattedMessage
                      id={"sub_category"}
                      defaultMessage={"Sub Category"}
                    />
                  </th>
                  <th className="col-md-1.5">
                    {" "}
                    <FormattedMessage
                      id={"fee"}
                      defaultMessage={"Fee"}
                    />
                  </th>
                  <th className="col-md-1.5">
                    {" "}
                    <FormattedMessage
                      id={"contact_no"}
                      defaultMessage={"Contact"}
                    />
                  </th>
                  <th className="col-md-1.5">
                    <FormattedMessage id={"rating"} defaultMessage={"Rating"} />
                  </th>
                  <th className="col-md-1" />
                </tr>
              </thead>
              {this.props.loading ? null : (
                <tbody className="panelTableTBody">
                  {_.get(this.props, "user", "")
                    ? _.map(
                      this.props.user,
                      (item, index) =>
                        item.userType === "tasker" ? (
                          <tr key={index}>
                            <td>
                              <Link
                                to={`/tasker-profile/${item.username}`}
                                onClick={() => {
                                  this.updateProfile(item);
                                }}
                              >
                                <span
                                  style={{
                                    textDecoration: "underline",
                                    cursor: "pointer"
                                  }}
                                >
                                  {item.name}
                                </span>
                              </Link>
                            </td>
                            <td>{item.category}</td>
                            <td>{item.subCategory && typeof item.subCategory === "object" && item.subCategory.map((index) => {
                              return (
                                <div>
                                  {index.name}
                                </div>
                              )
                            }            
                            )}</td>
                            <td>{item.fee}</td>
                            <td>{item.phone}</td>
                            <td>
                              <Rating
                                noofstars={5}
                                ratedStar={item.userRating}
                              />
                            </td>
                            <td>
                              <div style={{float: "right"}}>
                                <Button
                                  className="deactivebutton"
                                  style={{display: "none"}}
                                >
                                    De-Activate
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ) : null
                    )
                    :
                    <div style={{ padding: 15 }}>
                      <span>No of Taskers are Zero </span>
                    </div>
                  }
                </tbody>
              )}
            </table>
          </div>
        </div>
        <Pagination
          className="pagination"
          bsSize="medium"
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          items={this.props.meta ? this.props.meta.totalNoOfPages : 1}
          activePage={this.state.activePage}
          onSelect={this.handlePagination}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userList: state.users.userList,
    user: state.auth.user,
    loading: state.users.loading,
    meta: state.users.meta,
    failedUserListApi: state.users.failedUserListApi
  };
}
function bindActions(dispatch) {
  return {
    userprofiledetails: user =>
      dispatch(UserProfileAction.userprofiledetails(user))
  };
}

export default connect(mapStateToProps, bindActions)(TaskersList);
