import React, {PropTypes} from 'react';
import ArtistProfilePic from '../ArtistProfilePic/ArtistProfilePic';
import ArtistProfileInfo from '../ArtistProfileInfo/ArtistProfileInfo';
import './ArtistCover.css';

let ArtistCover = (props) => {
  let {artist, showCover} = props;
  return (
    showCover ? <div className="col-xs-12 col-sm-12">
      <ArtistProfilePic image={artist.image} name={artist.name}/>
      <ArtistProfileInfo description={artist.description}/>
    </div> : ''
  );
}

ArtistCover.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default ArtistCover;