import React, {Component} from "react";
import {connect} from "react-redux";
import {ListGroup, ListGroupItem, ButtonToolbar, Button} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import "../../../styles/common/rider_overview.scss";

class PendingApproval extends Component {
  static propTypes = {
    approvePendingUsers: PropTypes.object,
    pendindusers: PropTypes.object
  };
  approveRider(id, userType) {
    this.props.approveSelectedUser(id, userType);
  }
  rejectRider(id, userType) {
    this.props.rejectSelectedUser(id, userType);
  }
  render() {
    return (
      <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            {" "}
            <FormattedMessage
              id={"pending_approval"}
              defaultMessage={"Pending Approval"}
            />
          </div>
          <div className="panel-body">
            {this.props.approvePendingUsers.success ? (
              <ListGroup className="pannelListGroup">
                {this.props.approvePendingUsers.data.map(item => (
                  <ListGroupItem className="pannelList">
                    <span>
                      {item.fname} {item.lname}
                    </span>
                    <span className="pannelListButtons">
                      <ButtonToolbar>
                        <Button
                          className="pannelListButtonGreen"
                          onClick={() =>
                            this.approveRider(item._id, item.userType)
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          className="pannelListButtonRed"
                          onClick={() =>
                            this.rejectRider(item._id, item.userType)
                          }
                        >
                          Reject
                        </Button>
                      </ButtonToolbar>
                    </span>
                  </ListGroupItem>
                ))}
              </ListGroup>
            ) : (
              <span>
                {" "}
                <FormattedMessage
                  id={"no_approval"}
                  defaultMessage={"No Pending Approvals for User"}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pendindusers: state.currentUser.userApprovalInfo,
    approvePendingUsers: state.currentUser.approvePendingUsers
  };
}
export default connect(mapStateToProps)(PendingApproval);
