import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { BeatLoader } from 'react-spinners';
import cover from '../../resources/images/dashboardIcons/Default-Portrait.png';
import logo from '../../resources/images/dashboardIcons/Default-Portrait.png';
import '../../styles/common/login.scss';
import {
  loginUser,
  resetUser
} from "../../redux/auth/action";
const iconImage = require("../../resources/images/dashboardIcons/taskman_logo.png");

class Login extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        showForgotView: false,
    }

    _confirm() {
       this.props.loginUser(this.state.email, this.state.password)
    }

    _reset() {
      this.props.resetUser(this.state.email);
    }

    componentWillMount() {
        if (this.props.user.loggedInStatus) {
            this.props.history.push('/home');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user.loggedInStatus !== nextProps.user.loggedInStatus) {
            this.props.history.push('/home');
        }
    }

  render() {
    const { user, invalidCredential } = this.props;
        return (
            <div className="dp-login-wrapper">

                <div className="dp-content-wrapper">
                  <div className="dp-login-form">
                      <div className="dp-login-form-wrapper">
                      <center>
                        <img
                          src={iconImage}
                          alt="cover"
                          height="20%"
                          width="20%"
                        />
                        </center>
                  {!this.state.showForgotView ?
                    (<div>
                      <div className="dp-form">
                        <p className="dp-login-title">
                          <center>Please enter your Email and Password</center>
                        </p>
                        <div className="dp-login-conatiner">
                          <input
                            className="dp-login-email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                            type="text"
                            placeholder="Email"
                          />
                          <input
                            className="dp-login-password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                            type="password"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <center>
                        <div style={{ marginTop: 2, color: 'red' }}>
                          {invalidCredential && user.user.message}
                        </div>
                        <button
                          className="dp-login-button"
                          onClick={() => this._confirm()}
                        >
                          {user.loading ?
                            <div>
                              <BeatLoader
                                sizeUnit={"px"}
                                size={15}
                                color={'#fefefe'}
                                loading={true}
                              />
                            </div> :
                            <div>
                              LOGIN
                              <FontAwesome
                                name="arrow-right"
                                style={{
                                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                                  color: '#fff',
                                  marginLeft: 15,
                                  fontWeight: 400
                                }}
                              />
                            </div>}
                        </button>
                      </center>
                    </div>) :
                    (<div>
                      <div className="dp-form">
                        <p className="dp-login-title">
                          <center>Please enter your Registered Email to reset password</center>
                        </p>
                        <div className="dp-login-conatiner">
                          <input
                            className="dp-login-email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                            type="text"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <center>
                        <div style={{ marginTop: 2, color: 'red' }}>
                          {!user.resetSuccess && user.reset.message}
                        </div>
                        <button
                          className="dp-login-button"
                          onClick={() => this._reset()}
                        >
                          {user.resetLoading ?
                            <div>
                              <BeatLoader
                                sizeUnit={"px"}
                                size={15}
                                color={'#fefefe'}
                                loading={true}
                              />
                            </div> :
                            <div>
                              RESET
                              <FontAwesome
                                name="arrow-right"
                                style={{
                                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                                  color: '#fff',
                                  marginLeft: 15,
                                  fontWeight: 400
                                }}
                              />
                            </div>}
                        </button>
                      </center>
                    </div>)}
                    </div>
                    <center>
                      <button onClick={() => this.setState({ showForgotView: true })} className="dp-forgot-button">
                        {this.state.showForgotView === false && <span>Forgot Password</span>}
                      </button>
                    </center>
                  </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    invalidCredential: state.auth.invalidCredential,
    loggedInStatus: state.auth.loggedInStatus,
    user: state.auth
  };
}

function bindActions(dispatch) {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    resetUser: (email) => dispatch(resetUser(email)),
  };
}

export default withRouter(
    connect(mapStateToProps, bindActions)(Login)
);
