import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GridList, GridTile} from 'material-ui/GridList';
import Checkbox from 'material-ui/Checkbox';
import {MosaicTypes} from '../../../utils/constants/MosaicTypes'
import images from '../../../content/images/exportImages'

const styles = {
  gridList: {
    overflowY: 'auto',
  },
  labelStyle: {color: 'white'},
  iconStyle: {fill: 'white'}
};

let getColumnNumber= () => {
    if(window.screen.width >= 1024) {
        return 4
    } else if(window.screen.width >= 768 && window.screen.width < 1024) {
        return 3
    } else if(window.screen.width >= 400 && window.screen.width < 768) {
        return 2
    } else {
        return 1
    }
}

export default class GridListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: getColumnNumber()
        };

        this.updateColumnNumber = this.updateColumnNumber.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateColumnNumber);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateColumnNumber);
    }

    updateColumnNumber(event) {
        event.preventDefault()
        this.setState({columns: getColumnNumber()})
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
            return card.photo === "" || !card.photo ? images.default_user : card.photo 
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