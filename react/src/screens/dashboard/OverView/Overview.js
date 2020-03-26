import React, {Component} from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import { DataBlock } from "./dataBlock";
import OnGoingTrips from "../../../components/OverView/onGoingTrips";
import './style.css'

class Users extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    loading: PropTypes.bool,
    meta: PropTypes.object,
    ongoingTripList: PropTypes.object,
    recentReviewedTripList: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activePage: 1
    };
    this.setLoading = this.setLoading.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setLoading(nextProps.loading);
    if (this.props.user.loggedInStatus === false) {
      this.props.history.push('/')
    }
  }

  setLoading(loading) {
    this.setState({isLoading: loading});
  }

  render() {
    return (
      <div className="animate ">
        <div className="row">
          <DataBlock userData={this.props.user} taskData={this.props.tasks}/>
        </div>
        <div className="row">
          <OnGoingTrips
             userData={this.props.user} ongoingTripDetails={_.get(this.props, "ongoingTripList.data", "")}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    loading: state.users.loading,
    meta: state.users.meta,
    user: state.auth.user,
    tasks: state.auth.tasks
  };
}


export default withRouter(connect(mapStateToProps)(Users));
