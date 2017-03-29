import React, {Component} from 'react';
import ArtistCover from '../../components/ArtistCover/ArtistCover';

import SqueezeBox from '../../components/Squeezebox/Squeezebox';

export default class ArtistsPage extends Component {
    render() {
        // <Carousel items={items} active={0} ></Carousel>
        // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // return (
        //     <ArtistCover showCover={true} artist={{name: "Lucía Echenique Álvarez", image:"http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg", description:"Description"}}/>
        // );
        return (
            <div className="main-area row">
                <SqueezeBox></SqueezeBox>
            </div>
        );
    }
}