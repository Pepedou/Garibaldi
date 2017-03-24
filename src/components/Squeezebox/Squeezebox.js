import React, {Component} from 'react';
import SqueezeSlider from './SqueezeSlider';
import SqueezeNavControls from './SqueezeNavControls';
import SqueezeFrontCard from './SqueezeFrontCard';
import './css/reset.css';
import './css/style.css';
var $ = require('jquery');
var checkMQ = require('../../utils/browserClientCheck');
var setTranslateValue = require('../../utils/translateValues');

export default class SqueezeBox extends Component {
    constructor(props) {
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
            resizing : false
        };

        this.handleDetailCardClose = this.handleDetailCardClose.bind(this);
        this.handleSlideBoxClicked = this.handleSlideBoxClicked.bind(this);
        this.nextSides = this.nextSides.bind(this);
        this.prevSides = this.prevSides.bind(this);
        this.updateSlider = this.updateSlider.bind(this);
        this.showProjectPreview = this.showProjectPreview.bind(this);
    }

    handleSlideBoxClicked(artistClicked){
        this.setState({
            selectedArtist: artistClicked
        });
    }

    handleDetailCardClose(e) {
        e.preventDefault();
        
        this.setState({
            selectedArtist: null
        });
    }

    nextSides() {
        var projectsContainer = $('.cd-projects-wrapper');
		var slider = projectsContainer.children('.cd-slider');

        var actual = slider.children('.current'),
            index = actual.index(),
            following = actual.nextAll('li').length,
            width = actual.width(),
            marginLeft = Number(slider.children('li').eq(1).css('margin-left').replace('px', ''));

        index = (following > 4 ) ? index + 3 : index + following - 2;
        //calculate the translate value of the slider container
        var translate = index * (width + marginLeft) + 'px';

        slider.addClass('next');
        setTranslateValue(slider, translate);
        
        var updateSliderRef = this.updateSlider;
        slider.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            updateSliderRef('next', actual, slider, following);
        });

        if( $('.no-csstransitions').length > 0 ) this.updateSlider('next', actual, slider, following);
    }

    prevSides() {
        var projectsContainer = $('.cd-projects-wrapper');
		var slider = projectsContainer.children('.cd-slider');

        var actual = slider.children('.previous'),
            index = actual.index(),
            width = actual.width(),
            marginLeft = Number(slider.children('li').eq(1).css('margin-left').replace('px', ''));

        var translate = index * (width + marginLeft) + 'px';

        slider.addClass('prev');
        setTranslateValue(slider, translate);

        var updateSliderRef = this.updateSlider;
        slider.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            updateSliderRef('prev', actual, slider);
        });

        if( $('.no-csstransitions').length > 0 ) this.updateSlider('prev', actual, slider);
    }

    //TODO: Should be responsibility of SqueezeSlider
    updateSlider(direction, actual, slider, numerFollowing) {
        if( direction === 'next' ) {
            slider.removeClass('next').find('.previous').removeClass('previous');
            actual.removeClass('current');
            if( numerFollowing > 4 ) {
                actual.addClass('previous').next('li').next('li').next('li').addClass('current');
            } else if ( numerFollowing === 4 ) {
                actual.next('li').next('li').addClass('current').prev('li').prev('li').addClass('previous');
            } else {
                actual.next('li').addClass('current').end().addClass('previous');
            }
        } else {
            slider.removeClass('prev').find('.current').removeClass('current');
            actual.removeClass('previous').addClass('current');
            if(actual.prevAll('li').length > 2 ) {
                actual.prev('li').prev('li').prev('li').addClass('previous');
            } else {
                ( !slider.children('li').eq(0).hasClass('current') ) && slider.children('li').eq(0).addClass('previous');
            }
        }
        
        this.updateNavigation();
    }

    //TODO: Should be responsibility of SqueezeNavControls
    updateNavigation() {
        var projectsContainer = $('.cd-projects-wrapper'); // Squeezebox
        var sliderNav = $('.cd-slider-navigation'); // SqueezeNavControls

        //update visibility of next/prev buttons according to the visible slides
        var current = projectsContainer.find('li.current');
        (current.is(':first-child')) ? sliderNav.find('.prev').addClass('inactive') : sliderNav.find('.prev').removeClass('inactive');
        (current.nextAll('li').length < 3 ) ? sliderNav.find('.next').addClass('inactive') : sliderNav.find('.next').removeClass('inactive');
    }

    showProjectPreview(project) {
        var thisShowProjectPreview = this.showProjectPreview;

        if(project.length > 0 ) {
            setTimeout(function(){
                project.addClass('slides-in');
                thisShowProjectPreview(project.next());
            }, 50);
        }
    }

    setSliderContainer() {

        var projectsContainer = $('.cd-projects-wrapper');
		var projectsSlider = projectsContainer.children('.cd-slider');

        try {
            var mq = checkMQ();
            if(mq === 'desktop') {
                var	slides = projectsSlider.children('li'),
                    slideWidth = slides.eq(0).width(),
                    marginLeft = Number(projectsSlider.children('li').eq(1).css('margin-left').replace('px', '')),
                    sliderWidth = ( slideWidth + marginLeft )*( slides.length + 1 ) + 'px',
                    slideCurrentIndex = projectsSlider.children('li.current').index();
                projectsSlider.css('width', sliderWidth);
                ( slideCurrentIndex !== 0 ) && setTranslateValue(projectsSlider, (  slideCurrentIndex * (slideWidth + marginLeft) + 'px'));
            } else {
                projectsSlider.css('width', '');
                setTranslateValue(projectsSlider, 0);
            }
            // resizing = false;
        } catch (error) {
            throw error;
        }
    }
    
    componentDidMount(){
        var projectsContainer = $('.cd-projects-wrapper');
        var projectsSlider = projectsContainer.children('.cd-slider');

        this.setSliderContainer();
        this.showProjectPreview(projectsSlider.children('li').eq(0));
    }

    // TODO: Implement event.
    //if on desktop - set a width for the projectsSlider element	
    // $(window).on('resize', function(){
    //     //on resize - update projectsSlider width and translate value
    //     if( !resizing ) {
    //         (!window.requestAnimationFrame) ? setSliderContainer() : window.requestAnimationFrame(setSliderContainer);
    //         resizing = true;
    //     }
    // });

    render() {
        
        const selectedArtist = this.state.selectedArtist;
        
        return (
            <div className="squeezeBox">
                <div className="cd-projects-wrapper">
                    <SqueezeSlider elements={this.state.artists} onPrevSidesClicked={this.prevSides} onNextSidesClicked={this.nextSides} onBoxClick={this.handleSlideBoxClicked} />
                    <SqueezeNavControls handlePreviousClick={this.prevSides} handleNextClick={this.nextSides} />
	            </div>
                <SqueezeFrontCard artist={selectedArtist} onClickHandler={this.handleDetailCardClose} />
        </div>
        );
    }
}