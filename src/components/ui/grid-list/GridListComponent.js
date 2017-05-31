import React, {Component, PropTypes} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  }
};

export default class GridListComponent extends Component {
    render() {
        return(
            <GridList
                cellHeight={180}
                style={styles.gridList}
                >
                {this.props.cardList.map((card) => (
                    <GridTile
                        key={card.img}
                        title={"Aqui va el titulo"}
                        subtitle={"Aqui va el autor"}
                        >
                            <img src={card.img} />
                    </GridTile>
                ))}
            </GridList>
        )
    }
}

GridListComponent.propTypes = {
  cardList: PropTypes.array
};