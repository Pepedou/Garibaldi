import React, {PropTypes} from 'react';

let ArtistProfilePic = (props) => {
  let {image, name} = props;

  let profileImage = {
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center top",
      backgroundRepeat: "no-repeat"
  }

  return (
    <div className="col-xs-12 col-md-6">
      <div className="row">
        <div className="col-xs-12" id="profileImage" style={profileImage}>
          <div className="artistName">
            <img src={`${image}`} alt=""/>
            {name}
          </div>
        </div>
      </div>
    </div>
  );
}

ArtistProfilePic.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default ArtistProfilePic;