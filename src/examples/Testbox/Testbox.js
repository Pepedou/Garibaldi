import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './css/reset.css';
import './css/style.css';
import './transitions.css'

export default class Testbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artists: [
                {
                    name: 'Artist 1',
                    subtitle: 'Visual Design',
                    profileImage: 'img/img.png'
                }, {
                    name: 'Artist 2',
                    subtitle: 'Sculptor',
                    profileImage: 'img/img.png'
                }
            ],
            selectedArtist: null,
            resizing: false
        };
    }


    componentDidMount() {
        var thisRef = this;

        setTimeout(()=> { thisRef.setState({ artists: thisRef.state.artists.concat([{ name: 'Artist 3', subtitle: 'Artic Artist', profileImage: 'img/img.png' }]) }) }, 1000);
        // setTimeout(() => { console.log('I was called.') }, 1000);
    }
    
    handleClick(i) {
        
        let newItems = this.state.artists.slice();
        newItems.splice(i, 1);
        this.setState({
            artists: newItems
        });
    }

    render() {

        const items = this.state.artists.map((item, index) => {
            return (<li key={index} className="current slides-in">
                <a href="" onClick={(e) => { e.preventDefault(); this.handleClick(index); }}>
                    <img src="img/img.png" alt="Project Illustration" />
                    <div className="project-info">
                        <h2>{item.name}</h2>
                        <p>{item.subtitle}</p>
                    </div>
                </a>
            </li>);
        });

        return (
            <div className="col-xs-12">
                <div className="cd-projects-wrapper">
                    <ul className="cd-slider" style={{width: '2867.14px'}}>
                        <ReactCSSTransitionGroup transitionName="example" 
                                        transitionEnterTimeout={500}
                                        transitionLeaveTimeout={200}>
                            {items}
                        </ReactCSSTransitionGroup>
                    </ul>
                </div>
            </div>
        );
    }
}