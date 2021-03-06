import React, {Component} from "react";
import {FormattedMessage, defineMessages, intlShape} from "react-intl";
import PropTypes from "prop-types";
import $ from "jquery";
import {connect} from "react-redux";
import {NavDropdown, MenuItem} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {clearUserData} from "../../redux/auth/action";
import "../../styles/common/header.scss";

const iconImage = require("../../resources/images/dashboardIcons/taskman_logo.png");
const profileImage = require("../../resources/images/flat-avatar.png");

function showMenu() {
  $(".dashboard-page").toggleClass("push-right");
}

class TopNav extends Component {
  static propTypes = {
    userDetails: PropTypes.object,
    clearUserData: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      rtlClass: true
    };
    this.rightToLeft = this.rightToLeft.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  rightToLeft() {
    this.setState({rtlClass: !this.state.rtlClass});
    if (this.state.rtlClass) {
      $("body").addClass("rtl");
    } else {
      $("body").removeClass("rtl");
    }
  }

  changeLanguage(e) {}
  componentDidCatch(error, info) {
    console.log("The error is ", error, info);
  }
  logOutUser(event) {
    event.preventDefault();
    this.props.clearUserData();
    this.props.history.push("/");
    localStorage.removeItem("id_token");
    localStorage.removeItem("userType");
  }
  render() {
    return (
      <nav className="navbar navbar-fixed-top topNavbar" role="navigation">
        <div className="navbar-header navbarHeader">
          <button
            type="button"
            className="navbar-toggle"
            onClick={e => {
              e.preventDefault();
              showMenu();
            }}
            target="myNavbar"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link to="/home" className="navbar-brand navbarBrand">
            <img src={iconImage} className="topnavImgLeft" />
            <span className="title topnavText">Task Man</span>
          </Link>
        </div>

        <div className="navbarHead">
          <div
            id="myNavbar"
            className={"collapse navbar-collapse navbarCollapse"}
          >
            <span className="componentTitle">
              {" "}
              <FormattedMessage
                id={"admin_dashboard"}
                defaultMessage={"ADMIN DASHBOARD"}
              />
            </span>
            <ul
              className={
                "nav navbar-nav pull-right navbar-right pullRight ulNavbar"
              }
            >
              <NavDropdown
                id="dropDown4"
                className="navbarProfile"
                eventKey={4}
                title={
                  <span>
                    <img
                      src={iconImage}
                      className="topnavImg"
                      role="presentation"
                    />
                  </span>
                }
              >
                <MenuItem
                  className="dropdownLogout"
                  onClick={e => this.logOutUser(e)}
                >
                  <FormattedMessage id="logout" defaultMessage="Logout" />
                </MenuItem>
              </NavDropdown>
            </ul>
          </div>
          <ul
            className="nav navbar-nav pull-right ulNavbar hidd"
            style={{marginTop: 8}}
          >
            <NavDropdown
              id="navDropDown11"
              eventKey={4}
              title={
                <span>
                  <img
                    src={profileImage}
                    className="topnav-img topnavImg"
                    alt=""
                  />
                </span>
              }
              noCaret
              className="dropdown admin-dropdown dropdown"
            >
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                }}
              >
                <FormattedMessage id="logout" defaultMessage="Logout" />
              </MenuItem>
            </NavDropdown>
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state
  };
}
function bindActions(dispatch) {
  return {
    clearUserData: () => dispatch(clearUserData())
  };
}

export default withRouter(connect(mapStateToProps, bindActions)(TopNav));
