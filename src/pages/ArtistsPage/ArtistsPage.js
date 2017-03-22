import React, {Component} from 'react';
import ArtistCover from '../../components/ArtistCover/ArtistCover';

export default class GalleryPage extends Component {
    render() {
        return (
            <div className="main-area row">
                <ArtistCover showCover={true} artist={{name: "Lucía Echenique Álvarez", image:"http://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg", description:"Description"}}/>
            </div>
        );
    }
}