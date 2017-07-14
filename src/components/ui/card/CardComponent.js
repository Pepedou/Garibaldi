import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class CardComponent extends Component {
    render() {
        return(
            <Card>
                <CardMedia
                    overlay={<CardTitle title={this.props.overlayTitle} subtitle={this.props.overlaySubtitle} />}
                >
                <img src={this.props.cardImage} alt=""/>
                </CardMedia>
                <CardTitle title={this.props.cardTitle} subtitle={this.props.cardSubtitle} />
                <CardText>
                    {this.props.cardDescription}
                </CardText>
                <CardActions>
                    {this.props.cardActions}
                </CardActions>
            </Card>
        )
    }
}

CardComponent.propTypes = {
  overlayTitle: PropTypes.any,
  overlaySubtitle: PropTypes.any,
  cardImage: PropTypes.string,
  cardTitle: PropTypes.any,
  cardSubtitle: PropTypes.any,
  cardDescription: PropTypes.any,
  cardActions: PropTypes.any
};