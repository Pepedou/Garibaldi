import React, {PropTypes} from 'react';
import ArtistProfilePic from '../ArtistProfilePic/ArtistProfilePic';
import ArtistProfileInfo from '../ArtistProfileInfo/ArtistProfileInfo';
import './ArtistCover.css';

let ArtistCover = (props) => {
  let {artist} = props;
  return (
    <div className="col-xs-12 col-md-12">
      <div className="row">
        <ArtistProfilePic image={artist.profileImage} name={artist.name}/>
        <ArtistProfileInfo description={artist.subtitle}/>
      </div>
    </div>
  );
}

ArtistCover.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default ArtistCover;