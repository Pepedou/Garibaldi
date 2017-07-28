import React, {Component} from 'react';
import UploadImage from '../../examples/UploadImage/UploadImage'

export default class PlayGroundPage extends Component {
    render() {
        return (
            <div>
                <h1>This is a playground!</h1>
                <UploadImage />
            </div>
        );
    }
}