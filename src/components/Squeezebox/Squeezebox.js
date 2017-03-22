import React, {Component} from 'react';
import Sliderbox from './Sliderbox';
import './css/reset.css';
import './css/style.css';
import './js/main.js';

export default class SqueezeBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            artists: [{name: 'Artist 1', subtitle: 'Visual Design', profileImage: 'img/img.png'},
                    {name: 'Artist 2', subtitle: 'Sculptor', profileImage: 'img/img.png'},
                    {name: 'Artist 3', subtitle: 'Renovator', profileImage: 'img/img.png'},
                    {name: 'Artist 4', subtitle: 'Museum Master', profileImage: 'img/img.png'},
                    {name: 'Artist 5', subtitle: 'Gallery Gunman', profileImage: 'img/img.png'},
                    {name: 'Artist 6', subtitle: 'Designer', profileImage: 'img/img.png'},
                    {name: 'Artist 7', subtitle: 'Artic Artist', profileImage: 'img/img.png'},
                    ],
            selectedArtist: null,
            detailCardVisible: false
        };

        this.handleDetailCardClose = this.handleDetailCardClose.bind(this);
    }

    getSlider(){
        return (
                <ul className="cd-slider">
                    {this.state.artists.map((p, index) => {
                        var firstClassName = index === 0 ? 'current' : '';
                        return <Sliderbox key={index} initialClass={firstClassName} artist={p} />;
                    })}
                </ul>
        );
    }

    getNavigationControls(){
        return(
            <ul className="cd-slider-navigation cd-img-replace">
                <li><a href="#0" className="prev inactive">Prev</a></li>
                <li><a href="#0" className="next">Next</a></li>
            </ul>
        );
    }

    getDetailCard(){
        const selectedArtist = this.state.artists[0]; // TODO: Change to const {selectedArtist} = this.state;
        const detailCardCss = this.state.detailCardVisible ? 'cd-project-content is-visible' : 'cd-project-content';
        
        return (
            <div className={detailCardCss}>
                <div>
                    <h2>{selectedArtist.name}</h2>
                    <em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ullam.</em>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam quisquam, quae, temporibus dolores porro doloribus. 
                    </p>
                    <p>
                        Illum quaerat asperiores aliquam voluptate saepe omnis porro excepturi in atque veritatis sapiente ipsam voluptates iste amet deserunt ullam error pariatur, magni consectetur optio nostrum minima dolorum. Soluta animi nihil doloremque ipsa incidunt vitae architecto beatae, maxime libero, dolore corporis vero porro tenetur ipsam modi repudiandae magnam enim, quibusdam sit.
                    </p>
                </div>
                <a href="#0" className="close cd-img-replace" onClick={this.handleDetailCardClose}>Close</a>
            </div>
        );
    }

    handleDetailCardClose(e){
        e.preventDefault();
        // singleProjectContent.removeClass('is-visible');
        // this.setState({
        //     detailCardVisible: false
        // });
    }
    
    render() {
        const slider = this.getSlider();
        const navigationControls = this.getNavigationControls();
        const selectedItemDetailCard = this.getDetailCard();

        return (
            <div className="squeezeBox">
                <div className="cd-projects-wrapper">
                    {slider}
                    {navigationControls}
	            </div>
                {selectedItemDetailCard}
        </div>
        );
    }
}