import React, {Component, PropTypes} from 'react';
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
            return card.source
        } else {
            return card.photo
        }
    }

    render() {
        let {mosaicType} = this.props
        return(
            <GridList
                style={styles.gridList}
                cols={4}
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
                                        onCheck={(event) => this.props.onCheck(event, card)}
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
  onCheck: PropTypes.func
};