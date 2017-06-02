import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const styles = {
};

export default class CardComponent extends Component {
    render() {
        return(
            <Card>
                <CardHeader
                title={this.props.headerTitle}
                subtitle={this.props.headerSubtitle}
                avatar={this.props.headerAvatar}
                />
                <CardMedia
                overlay={<CardTitle title={this.props.overlayTitle} subtitle={this.props.overlaySubtitle} />}
                >
                <img src={this.props.cardImage} />
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

DefaultButton.propTypes = {
  headerTitle: PropTypes.string,
  headerSubtitle: PropTypes.string,
  headerAvatar: PropTypes.string,
  overlayTitle: PropTypes.string,
  overlaySubtitle: PropTypes.string,
  cardImage: PropTypes.string,
  cardTitle: PropTypes.string,
  cardSubtitle: PropTypes.string,
  cardDescription: PropTypes.string,
  cardActions: PropTypes.any
};