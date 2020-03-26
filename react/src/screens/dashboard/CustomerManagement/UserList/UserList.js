import React, {Component} from "react";
import {connect} from "react-redux";
import {Pagination, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import _ from "lodash";
import {FormattedMessage} from "react-intl";
import UserAction from "../../../../redux/users/action";
import UserProfileAction from "../../../../redux/userProfile/action";
import Rating from "../../../../components/UserRatingComponent";
import {Link} from "react-router-dom";
import "../../../../styles/common/CustomerList.scss";

class UserList extends Component {
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
    this.props.getTasks(user);
  }
  handlePagination(eventkey) {
    this.setState({activePage: eventkey});
    this.props.fetchUsers(eventkey, "rider");
  }
  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="panel panel-primary">
          <div className="panel-heading panelheading">
            <span>
              {" "}
              <FormattedMessage
                id={"user_list"}
                defaultMessage={"UserList"}
              />
            </span>
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
                      id={"contact_no"}
                      defaultMessage={"Contact No."}
                    />
                  </th>
                  <th className="col-md-2.5">
                    {" "}
                    <FormattedMessage
                      id={"email_id"}
                      defaultMessage={"Email Id"}
                    />
                  </th>
                  <th className="col-md-3">
                    {" "}
                    <FormattedMessage
                      id={"address"}
                      defaultMessage={"Address"}
                    />
                  </th>
                  <th className="col-md-1.5">
                    <FormattedMessage id={"rating"} defaultMessage={"Rating"} />
                  </th>
                  <th className="col-md-1" />
                </tr>
              </thead>
              <tbody className="panelTableTBody">
                {_.get(this.props, "user", "")
                  ? _.map(this.props.user,
                    (item, index) =>
                      item.userType === "user" ? (
                        <tr key={index}>
                          <td>
                            <Link
                              to={`/user-profile/${item.username}`}
                              onClick={() => {
                                this.updateProfile(item);
                              }}
                            >
                              <span
                                style={{
                                  textDecorspantion: "underline",
                                  cursor: "pointer"
                                }}
                              >
                                {item.name}
                              </span>
                            </Link>
                          </td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>--</td>
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
                      <span>No of Customers are Zero </span>
                    </div>
                }
              </tbody>
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
    loading: state.users.loading,
    meta: state.users.meta,
    user: state.auth.user,
    failedUserListApi: state.users.failedUserListApi
  };
}
function bindActions(dispatch) {
  return {
    getTasks: user =>
      dispatch(UserProfileAction.getTasks(user)),
    currentUser: (useremail) => 
      dispatch(UserAction.currentUser(useremail)),
  };
}
export default connect(mapStateToProps, bindActions)(UserList);
