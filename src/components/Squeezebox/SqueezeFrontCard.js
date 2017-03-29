import React, {Component} from 'react';
import ArtistCover from '../../components/ArtistCover/ArtistCover';

export default class SqueezeFrontCard extends Component {
    render() {
        const artist = this.props.artist;
        const detailCardCss = artist === null  ? 'cd-project-content' : 'cd-project-content is-visible';

        return (
            artist ? <div className={detailCardCss}>
                <ArtistCover artist={artist}/>
                <a  href="#0"
                    className="close cd-img-replace"
                    onClick={this.props.onClickHandler}>Close</a>
            </div> : null
        );
    }
}