import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import superagent from 'superagent';

export default class UploadImage extends Component {
    constructor() {
        super();
        this.state = {
            images: []
        }
    }

    uploadFile(files){
        const cloudName = 'zamancer'; // FROM CLOUDINARY SETTINGS
        const apiKey = '874385962738742'; // FROM CLOUDINARY SETTINGS
        const apiSecret = 'QLGmPgxfLxR72oBwfveKk4cn00M'; // FROM CLOUDINARY SETTINGS
        const timeStamp = Date.now() / 1000;
        const uploadPreset = 'mywnuuzi'; // FROM CLOUDINARY SETTINGS

        const paramStr = 'timestamp=' + timeStamp + '&upload_preset=' + uploadPreset + apiSecret;
        const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload';

        const signature = sha1(paramStr);
        const params = {
            'api_key': apiKey,
            'timestamp': timeStamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        const image = files[0];
        let uploadRequest = superagent.post(url);
        uploadRequest.attach('file', image);

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key]);
        });

        uploadRequest.end((err, res) => {
            if(err) {
                alert(err);
                return;
            }

            console.log('UPLOAD COMPLETE: ' + JSON.stringify(res.body));
            const uploaded = res.body;
            let updatedImages = Object.assign([], this.state.images);
            updatedImages.push(uploaded);

            this.setState({
                images: updatedImages
            })
        })
    }

    removeImage(event) {
        event.preventDefault();

        let updatedImages = Object.assign([], this.state.images)
        updatedImages.splice(event.target.id, 1);

        this.setState({
            images: updatedImages
        });
    }

    render() {
        const list = this.state.images.map((image, i) => {
            return (
                <li key={i}>
                    <img style={{width: 72}} src={image.secure_url} /> <br />
                    <a id={i} onClick={this.removeImage.bind(this)} href="#">delete</a>
                </li>
            )
        });

        return (
            <div>
                <label>Upload here!</label>
                <Dropzone onDrop={this.uploadFile.bind(this)} />
                <ol>
                    { list }
                </ol>
            </div>
        ); 
    }
}