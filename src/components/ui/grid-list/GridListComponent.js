import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GridList, GridTile} from 'material-ui/GridList';
import Checkbox from 'material-ui/Checkbox';
import {MosaicTypes} from '../../../utils/constants/MosaicTypes'

const styles = {
  gridList: {
    overflowY: 'auto',
  },
  labelStyle: {color: 'white'},
  iconStyle: {fill: 'white'}
};

export default class GridListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: this.getColumnNumber()
        };
    }

    getColumnNumber() {
        if(screen.width >= 1024) {
            return 4
        } else if(screen.width >= 768 && screen.width < 1024) {
            return 3
        } else if(screen.width >= 400 && screen.width < 768) {
            return 2
        } else {
            return 1
        }
    }

    getTitle(mosaicType, card) {
        if(mosaicType === MosaicTypes.ART) {
            return card.title
        } else {
            return `${card.name} ${card.lastName}`
        }
    }

    getSubtitle(mosaicType, card) {
        if(mosaicType === MosaicTypes.ART) {
            return card.author
        } else {
            return card.email
        }
    }

    getSource(mosaicType, card) {
        if(mosaicType === MosaicTypes.ART) {
            return card.images.thumbnail 
        } else {
            return card.photo === "" || !card.photo ? "https://s3.amazonaws.com/whisperinvest-images/default.png" : card.photo 
        }
    }

    render() {
        let {mosaicType, addCheckCard, deleteCheckCard} = this.props
        return(
            <GridList
                style={styles.gridList}
                cols={this.state.columns}
                padding={5}
                >
                {this.props.cardList.map((card, key) => (
                    <GridTile
                        key={key}
                        title={this.getTitle(mosaicType, card)}
                        subtitle={this.getSubtitle(mosaicType, card)}
                        onTouchTap={(event) => this.props.onTouchTap(event, card, mosaicType)}
                        actionIcon={<Checkbox
                                        label=""
                                        labelStyle={styles.labelStyle}
                                        iconStyle={styles.iconStyle}
                                        onCheck={(event) => this.props.onCheck(event, card, addCheckCard, deleteCheckCard)}
                                        />}
                        >
                            <img src={this.getSource(mosaicType, card)} alt=""/>
                    </GridTile>
                ))}
            </GridList>
        )
    }
}

GridListComponent.propTypes = {
  cardList: PropTypes.array,
  onTouchTap: PropTypes.func,
  onCheck: PropTypes.func,
  addCheckCard: PropTypes.func,
  deleteCheckCard: PropTypes.func
};