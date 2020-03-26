/* eslint-disable no-undef */
import React, {Component} from "react";
import Helmet from "react-helmet";
import "../../styles/common/overView.scss";
import {connect} from "react-redux";
import Spinner from "react-spinkit";
import {FormattedMessage} from "react-intl";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from "react-google-maps";
import {withRouter} from "react-router-dom";
import {geolocated} from "react-geolocated";
import {setGPS} from "../../redux/auth/action";

const SimpleMapExampleGoogleMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={15}
      defaultCenter={{
        lat: props.coords ? props.coords.latitude : 12.91,
        lng: props.coords ? props.coords.longitude : 77.601
      }}
      onClick={props.onMapClick}
    >
      {props.markers.map(marker => (
        <Marker
          {...marker}
          style={{fontSize: 5}}
        />
      ))}
    </GoogleMap>
  ))
);

class MapViewDrivers extends Component {
  state = {
    markers: [],
    googleUrl:
      "https://maps.googleapis.com/maps/api/js?v=3.27&libraries=geometry,drawing,places&key=Key"
  };
  render() {
    return (
      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <div className="panel panel-primary Panel">
          <div className="panel-heading">
            {
              <FormattedMessage
                id={"map_view"}
                defaultMessage={"Map View Of Taskers"}
              />
            }
          </div>
          <div className="panel-body panelTableBody">
            <div style={{height: 307}}>
              <Helmet title="TaskMan Dashboard" />
              <SimpleMapExampleGoogleMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=geometry,drawing,places&key=AIzaSyAnVhbl1bPiwiJaIc6hoxWf3MZecJijJEU"
                coords={this.props.coord}
                loadingElement={
                  <div
                    style={{
                      height: 307,
                      width: 200,
                      justifyContent: "center",
                      alignItem: "center"
                    }}
                  >
                    <Spinner name="line-scale-pulse-out-rapid" />
                  </div>
                }
                containerElement={<div style={{height: 307}} />}
                mapElement={<div style={{height: 307}} />}
                markers={this.state.markers}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    coord: state.auth.coords
  };
}
function bindActions(dispatch) {
  return {
    setCoords: coords => dispatch(setGPS(coords))
  };
}
export default withRouter(
  connect(mapStateToProps, bindActions)(
    geolocated({
      positionOptions: {enableHighAccuracy: false},
      userDecisionTimeout: 5000
    })(MapViewDrivers)
  )
);
