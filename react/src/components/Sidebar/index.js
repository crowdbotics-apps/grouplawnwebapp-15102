import React, {Component} from 'react';
import {Collapse} from 'react-bootstrap';
import '../../styles/common/sidebar.scss';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
const dashboardIcon = require('../../resources/images/dashboardIcons/dashboardIcon.png');
const driverIcon = require('../../resources/images/dashboardIcons/driver_icon.png');
const customerIcon = require('../../resources/images/dashboardIcons/customer_icon.png');
const appConfIcon = require('../../resources/images/dashboardIcons/app_confIcon.png');

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      openTaskerManagement: false,
      openCustomerManagement: false,
      openAdminArea: false
    };
  }

  render() {
    return (
      <aside className="sidebar">
        <div className="sidenav-outer sidenavOuter">
          <ul>
            <li
              className="sidemenuListTab"
              style={{
                backgroundColor:
                  this.state.activeTab === 1 ? '#6495ed' : '#6495ed'
              }}
            >
              <Link
                to="/home"
                onClick={() => {
                  this.state.activeTab = 1;
                  this.state.openCustomerManagement = false;
                  this.state.openTaskerManagement = false;
                  this.state.openAdminArea = false;
                }}
              >
                <img alt="icon" src={dashboardIcon} className="topnavImgLeft" />
                <span className="title">
                  <FormattedMessage
                    id={'dashboard'}
                    defaultMessage="Dashboard"
                  />
                </span>
              </Link>
            </li>
            <li
              className="sidemenuListTab"
              style={{
                backgroundColor:
                  this.state.activeTab === 2 ? '#6495ed' : '#6495ed'
              }}
              data-toggle="collapse"
              data-target="#demo"
            >
              <a
                onClick={() => {
                  this.setState({
                    activeTab: 2,
                    openTaskerManagement: !this.state.openTaskerManagement,
                    openCustomerManagement: false,
                    openAdminArea: false
                  });
                }}
                style={{cursor: 'pointer'}}
              >
                <img alt="icon" src={driverIcon} className="topnavImgLeft" />
                <span className="title">
                  {' '}
                  <FormattedMessage
                    id={'tasker_management'}
                    defaultMessage={'TASKER MANAGEMENT'}
                  />
                </span>
                {this.state.openTaskerManagement ? (
                  <span className="text-align-right glyphicon glyphicon-minus sidemenuListAddIcon" />
                ) : (
                  <span
                    className={
                      'text-align-right glyphicon glyphicon-plus sidemenuListAddIcon'
                    }
                  />
                )}
              </a>
              <Collapse in={this.state.openTaskerManagement}>
                <div>
                  <ul>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 2 ? '#6495ed' : '#6495ed'
                      }}
                    >
                      <Link
                        to="/tasker-list"
                        onClick={() => {
                          this.state.activeTab = 2;
                        }}
                      >
                        <img
                          alt="icon"
                          src={appConfIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">
                          {' '}
                          <FormattedMessage
                            id={'taskers_list'}
                            defaultMessage={'TASKERS LIST'}
                          />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
            <li
              className="sidemenuListTab"
              style={{
                backgroundColor:
                  this.state.activeTab === 3 ? '#6495ed' : '#6495ed'
              }}
            >
              <a
                onClick={() => {
                  this.state.activeTab = 3;
                  this.setState({
                    openCustomerManagement: !this.state.openCustomerManagement,
                    openTaskerManagement: false,
                    openAdminArea: false
                  });
                }}
                style={{cursor: 'pointer'}}
              >
                <img alt="icon" src={customerIcon} className="topnavImgLeft" />
                <span className="title">
                  <FormattedMessage
                    id={'user_management'}
                    defaultMessage={'USER MANAGEMENT'}
                  />
                </span>
                {this.state.openCustomerManagement ? (
                  <span
                    className={
                      'text-align-right glyphicon glyphicon-minus sidemenuListAddIcon'
                    }
                  />
                ) : (
                  <span
                    className={
                      'text-align-right glyphicon glyphicon-plus sidemenuListAddIcon'
                    }
                  />
                )}
              </a>
              <Collapse in={this.state.openCustomerManagement}>
                <div>
                  <ul>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 3 ? '#6495ed' : '#6495ed'
                      }}
                    >
                      <Link
                        to="/user-list"
                        onClick={() => {
                          this.state.activeTab = 3;
                        }}
                      >
                        <img
                          alt="icon"
                          src={appConfIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">
                          {' '}
                          <FormattedMessage
                            id={'user_list'}
                            defaultMessage={'USER LIST'}
                          />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
            <li
              className="sidemenuListTab"
              style={{
                backgroundColor:
                  this.state.activeTab === 2 ? '#6495ed' : '#6495ed'
              }}
              data-toggle="collapse"
              data-target="#demo"
            >
              <a
                onClick={() => {
                  this.state.activeTab = 2;
                  this.setState({
                    openAdminArea: !this.state.openAdminArea,
                    openTaskerManagement: false,
                    openCustomerManagement: false
                  });
                }}
                style={{cursor: 'pointer'}}
              >
                <img alt="icon" src={customerIcon} className="topnavImgLeft" />
                <span className="title">ADMIN AREA</span>
                {this.state.openAdminArea ? (
                  <span className="text-align-right glyphicon glyphicon-minus sidemenuListAddIcon" />
                ) : (
                  <span
                    className={
                      'text-align-right glyphicon glyphicon-plus sidemenuListAddIcon'
                    }
                  />
                )}
              </a>
              <Collapse in={this.state.openAdminArea}>
                <div>
                  <ul>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 2 ? '#6495ed' : '#6495ed'
                      }}
                    >
                      <Link
                        to="/admin-profile"
                        onClick={() => {
                          this.state.activeTab = 2;
                        }}
                      >
                        <img
                          alt="icon"
                          src={customerIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">CHANGE PASSWORD</span>
                      </Link>
                    </li>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 2 ? '#6495ed' : '#6495ed'
                      }}
                    >
                      <Link
                        to="/create-admin"
                        onClick={() => {
                          this.state.activeTab = 2;
                        }}
                      >
                        <img
                          alt="icon"
                          src={appConfIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">CREATE ADMIN</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
