import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class LoaderComponent extends Component {
    render() {
        return(
            <div className="LoaderComponent">
                <CircularProgress size={80} thickness={7} />
            </div>
        )
    }
}