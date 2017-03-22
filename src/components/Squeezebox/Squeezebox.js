import React, {Component} from 'react';
import './css/reset.css';
import './css/style.css';
//require('modernizr');
//var $ = require('jQuery');
import './js/main.js';

export default class SqueezeBox extends Component {
    render() {
        return (
            <div className="squeezeBox">
                <div className="cd-intro-block">
                    <div className="content-wrapper">
                        <h1>Squeezebox Portfolio Template</h1>
                        <a href="#0" className='cd-btn' data-action="show-projects">Show projects</a>
                    </div>
	            </div>
	            <div className="cd-projects-wrapper">
		            <ul className="cd-slider">
                        <li className="current">
                            <a href="#0">
                                <img src="img/img.png" alt="project image" />
                                <div className="project-info">
                                    <h2>Project 1</h2>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                <img src="img/img.png" alt="project image" />
                                <div className="project-info">
                                    <h2>Project 2</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, dicta.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                <img src="img/img.png" alt="project image" />
                                <div className="project-info">
                                    <h2>Project 3</h2>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                <img src="img/img.png" alt="project image" />
                                <div className="project-info">
                                    <h2>Project 4</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                <img src="img/img.png" alt="project image" />
                                <div className="project-info">
                                    <h2>Project 5</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                <img src="img/img.png" alt="project image" />
                                <div className="project-info">
                                    <h2>Project 6</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                <img src="img/img.png" alt="project image" />
                                <div className="project-info">
                                    <h2>Project 7</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                <img src="img/img.png" alt="project image" />
                                <div className="project-info">
                                    <h2>Project 8</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                <img src="img/img.png" alt="project image" />
                                <div className="project-info">
                                    <h2>Project 9</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                                </div>
                            </a>
                        </li>
		            </ul>

                <ul className="cd-slider-navigation cd-img-replace">
                    <li><a href="#0" className="prev inactive">Prev</a></li>
                    <li><a href="#0" className="next">Next</a></li>
                </ul>
	        </div>
            <div className="cd-project-content">
                <div>
                    <h2>Project title here</h2>
                    <em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ullam.</em>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam quisquam, quae, temporibus dolores porro doloribus. 
                    </p>
                    <p>
                        Illum quaerat asperiores aliquam voluptate saepe omnis porro excepturi in atque veritatis sapiente ipsam voluptates iste amet deserunt ullam error pariatur, magni consectetur optio nostrum minima dolorum. Soluta animi nihil doloremque ipsa incidunt vitae architecto beatae, maxime libero, dolore corporis vero porro tenetur ipsam modi repudiandae magnam enim, quibusdam sit.
                    </p>
                    <p>
                        Illum quaerat asperiores aliquam voluptate saepe omnis porro excepturi in atque veritatis sapiente ipsam voluptates iste amet deserunt ullam error pariatur, magni consectetur optio nostrum minima dolorum. Soluta animi nihil doloremque ipsa incidunt vitae architecto beatae, maxime libero, dolore corporis vero porro tenetur ipsam modi repudiandae magnam enim, quibusdam sit.
                    </p>
                </div>
                <a href="#0" className="close cd-img-replace">Close</a>
            </div>
        </div>
        );
    }
}