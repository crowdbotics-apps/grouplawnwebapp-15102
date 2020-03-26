import React from "react";
import FontAwesome from "react-fontawesome";
import { FormattedMessage } from 'react-intl'

export const Block = props => {
  console.log('block props', props);
  return (
    <div className="acb-details-block">
      <div className="acb-details-data">
        <div className="acb-details-desc">
          <FormattedMessage id={props.title} defaultMessage={"--"} />
        </div>
        {props.stats &&
          <div className="acb-details-desc desc-info">{props.stats}</div>
        }
      </div>
      <div className="acb-details-img">
        <FontAwesome
          name={props.imgSrc}
          size="3x"
          style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)", color: '#6495ed' }}
      />
      </div>
    </div>
  );
};