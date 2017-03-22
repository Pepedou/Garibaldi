import React, {PropTypes} from 'react';

let ArtistProfileInfo = (props) => {
  let {description} = props;

  return (
    <div className="col-xs-12 col-sm-6">
      <div className="artistDescription">{description}</div>
    </div>
  );
}

ArtistProfileInfo.propTypes = {
  description: PropTypes.string
};

export default ArtistProfileInfo;