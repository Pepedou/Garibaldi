import React, {Component} from 'react';
import ArtistCover from '../../components/ArtistCover/ArtistCover';

export default class GalleryPage extends Component {
    render() {
        return (
            <div className="main-area">
                <ArtistCover showCover={true} artist={{name: "Lucía", image:"http://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg", description:"Description"}}/>
            </div>
        );
    }
}