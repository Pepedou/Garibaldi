import React, {Component} from 'react';
import CarouselItem from './CarouselItem';
import './Carousel.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            active: this.props.active,
            direction: ''
        }

        this.rightClick = this.moveRight.bind(this);
        this.leftClick = this.moveLeft.bind(this);
    }

    generateItems() {
        var items = [];
        var level;
        console.log(this.state.active);
        
        for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
            var index = i;
            
            if (i < 0) {
                index = this.state.items.length + i;
            } else if (i >= this.state.items.length) {
                index = i % this.state.items.length;
            }

            level = this.state.active - i;
            items.push(<CarouselItem key={index} id={this.state.items[index]} level={level} />);
        }

        return items;
    }
    
    moveLeft() {
        var newActive = this.state.active;
        newActive--;
        this.setState({
            active: newActive < 0 ? this.state.items.length - 1 : newActive,
            direction: 'left'
        });
    }
    
    moveRight() {
        var newActive = this.state.active;
        this.setState({
            active: (newActive + 1) % this.state.items.length,
            direction: 'right'
        });
    }
    
    render() {
        return(
            <div className="container carousel">
                <div id="carousel" className="centered">
                    <div className="arrow arrow-left col-md-1" onClick={this.leftClick}>
                        <i className="fi-arrow-left"></i>
                    </div>
                    <ReactCSSTransitionGroup 
                        className="col-md-9"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionName={this.state.direction}
                        >
                        {this.generateItems()}
                    </ReactCSSTransitionGroup>
                    <div className="arrow col-md-1" onClick={this.rightClick}>
                        <i className="fi-arrow-right"></i>
                    </div>
                </div>
            </div>
        )
    }
}