import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import {Table, Button, Tabs, Tab} from 'react-bootstrap';
import Rating from '../../../../../components/UserRatingComponent';
import '../../../../../styles/common/TaskerProfile.scss';

const profileImage = require('../../../../../resources/images/dashboardIcons/default-user.png');

class TaskerProfile extends Component {
  static propTypes = {
    userprofiledetails: PropTypes.any,
    tripList: PropTypes.object,
    loading: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isOpen: false,
      imageUrl: ''
    };
    this.setLoading = this.setLoading.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setLoading(nextProps.loading);
  }

  setLoading(loading) {
    this.setState({isLoading: loading});
  }

  openLIghtBox(url) {
    this.setState({isOpen: true, imageUrl: url});
  }
  render() {
    const user = this.props.userprofiledetails;
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
              <span className="profname}">
                {_.get(this.props.userprofiledetails, 'name', '')}{' '}
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
                {' '}
                <span
                  style={{color: '#bbb'}}
                  className="glyphicon glyphicon-phone"
                />
                <span style={{fontSize: 12, marginLeft: 5, color: '#bbb'}}>
                  {this.props.userprofiledetails.phoneNo}
                </span>
              </span>
              <span className="email">
                {' '}
                <span
                  style={{marginLeft: 5, fontSize: 12, color: '#bbb'}}
                  className="glyphicon glyphicon-envelope"
                />
                <span style={{fontSize: 12, marginLeft: 5, color: '#bbb'}}>
                  {this.props.userprofiledetails.email}
                </span>
              </span>
            </div>
            <div className="address">
              <span
                style={{color: '#bbb'}}
                className="glyphicon glyphicon-home"
              />
              <span style={{fontSize: 12, marginLeft: 5, color: '#bbb'}}>
                {this.props.userprofiledetails.address}
              </span>
            </div>
            <div className="categorycity">
              <span className="category">
                <span
                  style={{color: '#bbb'}}
                  className="glyphicon glyphicon-briefcase"
                />
                <span
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    marginRight: 5,
                    color: '#bbb'
                  }}
                >
                  {this.props.userprofiledetails.category}
                </span>
              </span>
              <span className="city">
                <span
                  style={{color: '#bbb'}}
                  className="glyphicon glyphicon-road"
                />
                <span style={{fontSize: 12, marginLeft: 5, color: '#bbb'}}>
                  {this.props.userprofiledetails.city}
                </span>
              </span>
            </div>
          </div>
          <div style={{float: 'right', display: 'none'}}>
            <Button className="deactivebutton">De-Activate</Button>
          </div>
        </div>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.imageUrl}
            onCloseRequest={() => this.setState({isOpen: false})}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userprofiledetails: state.userprofiledetails
  };
}
export default connect(
  mapStateToProps,
)(TaskerProfile);
