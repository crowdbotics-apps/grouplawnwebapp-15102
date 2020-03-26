import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import PendingApproval from "../../../../components/Driver/OverView/pendingApproval";
import RecentReview from "../../../../components/Driver/OverView/recentReview";
import ActiveDrivers from "../../../../components/Driver/OverView/activeDrivers";
import "../../../../styles/common/driver_overview.scss";

class OverView extends Component {
  static propTypes = {
    recentReviewedTripList: PropTypes.object,
    activeTaskersList: PropTypes.object,
    approvePendingUsers: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.setLoading = this.setLoading.bind(this);
  }
  setLoading(loading) {
    this.setState({ isLoading: loading });
  }
  render() {
    return (
      <div className="row animate trips">
        {!this.state.isLoading ? (
          <div className="loading-wrap" style={{ minHeight: 500 }}>
            <div className="loading">
              <div id="spinner">
                <svg
                  className="spinner"
                  width="65px"
                  height="65px"
                  viewBox="0 0 66 66"
                >
                  <circle
                    className="path"
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    cx="33"
                    cy="33"
                    r="30"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {this.props.recentReviewedTripList &&
            this.props.activeTaskersList ? (
                <div>
                  <div className="row">
                    <PendingApproval />
                    <RecentReview
                      recentReviewList ={_.get(this.props, "recentReviewedTripList.data", "")}
                    />
                  </div>
                  <div className="row">
                    <ActiveDrivers
                      activeTaskersList={_.get(this.props, "activeTaskersList.data", "")}
                    />
                  </div>
                </div>
              ) : null}
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    loading: state.users.loading,
    meta: state.users.meta,
    recentReviewedTripList: state.trips.recentReviewedTripList,
    activeTaskersList: state.currentUser.activeTaskersList
  };
}
export default connect(mapStateToProps)(OverView);
