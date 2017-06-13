import React, {Component, PropTypes} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  gridList: {
    overflowY: 'auto',
  },
  labelStyle: {color: 'white'},
  iconStyle: {fill: 'white'}
};

export default class GridListComponent extends Component {
    

    render() {
        return(
            <GridList
                style={styles.gridList}
                cols={3}
                padding={5}
                >
                {this.props.cardList.map((card, key) => (
                    <GridTile
                        key={key}
                        title={card.title}
                        subtitle={card.artist}
                        onTouchTap={(event) => this.props.onTouchTap(event, card)}
                        actionIcon={<Checkbox
                                        label=""
                                        labelStyle={styles.labelStyle}
                                        iconStyle={styles.iconStyle}
                                        onCheck={(event) => this.props.onCheck(event, card)}
                                        />}
                        >
                            <img src={card.source} alt=""/>
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