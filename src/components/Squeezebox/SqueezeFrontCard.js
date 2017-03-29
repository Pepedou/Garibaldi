import React, {Component} from 'react';

export default class SqueezeFrontCard extends Component {
    render() {
        const artist = this.props.artist;
        const title = artist === null  ? '' : artist.name;
        const detailCardCss = artist === null  ? 'cd-project-content' : 'cd-project-content is-visible';

        return (
            <div className={detailCardCss}>
                <div>
                    <h2>{title}</h2>
                    <em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ullam.</em>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium
                        officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur
                        aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam
                        molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea
                        amet quibusdam quisquam, quae, temporibus dolores porro doloribus.
                    </p>
                    <p>
                        Illum quaerat asperiores aliquam voluptate saepe omnis porro excepturi in atque
                        veritatis sapiente ipsam voluptates iste amet deserunt ullam error pariatur,
                        magni consectetur optio nostrum minima dolorum. Soluta animi nihil doloremque
                        ipsa incidunt vitae architecto beatae, maxime libero, dolore corporis vero porro
                        tenetur ipsam modi repudiandae magnam enim, quibusdam sit.
                    </p>
                </div>
                <a  href="#0"
                    className="close cd-img-replace"
                    onClick={this.props.onClickHandler}>Close</a>
            </div>
        );
    }
}