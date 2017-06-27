import React, {Component} from 'react';
import './csstransition_ex1.css';

export default class CssTransitionEx1 extends Component {
    render() {
        return (
            <div>
                <section id='color'>
                    <h3>Blue to green</h3>
                    <div className='square'></div>
                </section> <hr />

                <section id='circle'>
                    <h3>Square to circle</h3>
                    <div className='square'></div>
                </section>
            </div>
        );
    }
}