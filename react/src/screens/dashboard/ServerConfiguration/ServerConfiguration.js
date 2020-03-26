import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import Toast from "../../../components/Toast";
import EmailSettings from "../../../components/serverConfig/emailSetting";
import SmsSettings from "../../../components/serverConfig/smsSettings";
import CloudinaryDetails from "../../../components/serverConfig/cloudinaryDetails";


class ServerConfiguration extends Component {
  static propTypes = {
    configObj: PropTypes.object,
    loadingConfig: PropTypes.bool,
    failedUpdateConfig: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      serverObj: {
        emailConfig: {
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // secure:true for port 465, secure:false for port 587
          username: "@gmail.com",
          password: ""
        },
        smsConfig: {
          accountSid: "",
          token: "",
          from: ""
        },
        cloudinaryConfig: {
          cloud_name: "",
          api_key: "",
          api_secret: ""
        }
      }
    };
    this.configUpdate = this.configUpdate.bind(this);
  }
  
  render() {
    return (
      <div className="animate">
        <div>
          {this.props.failedUpdateConfig && this.state.edit ? (
            <Toast
              message="Updation failed! Try again"
              showToast
              delay={1000}
            />
          ) : null}
          {this.props.failedUpdateConfig === false &&
          this.state.edit === true ? (
              <Toast message="Updated Successfully" showToast delay={1000} />
            ) : null}
          <EmailSettings
            emailObj={
              _.isEmpty(this.props.configObj)
                ? this.state.serverObj
                : this.props.configObj
            }
            onUpdateEmailSettings={this.configUpdate}
          />
          <SmsSettings
            smsObj={
              _.isEmpty(this.props.configObj)
                ? this.state.serverObj
                : this.props.configObj
            }
            onUpdateSmsSettings={this.configUpdate}
          />
          <CloudinaryDetails
            cloudinaryObj={
              _.isEmpty(this.props.configObj)
                ? this.state.serverObj
                : this.props.configObj
            }
            onUpdateCloudinaryDetails={this.configUpdate}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    configObj: state.serverconfigDetails.configObj,
    loadingConfig: state.serverconfigDetails.loadingConfig,
    failedUpdateConfig: state.serverconfigDetails.failedUpdateConfig
  };
}

export default connect(mapStateToProps)(ServerConfiguration);
