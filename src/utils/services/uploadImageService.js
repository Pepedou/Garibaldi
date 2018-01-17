import sha1 from 'sha1'
import superagent from 'superagent'

class UploadImageService {
    uploadFile(file) {
        const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
        const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
        const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
        const timeStamp = Date.now() / 1000;

        const paramStr = 'timestamp=' + timeStamp + '&upload_preset=' + uploadPreset + apiSecret;
        const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload';

        const signature = sha1(paramStr);
        const params = {
            'api_key': apiKey,
            'timestamp': timeStamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        const image = file
        let uploadRequest = superagent.post(url);
        uploadRequest.attach('file', image);

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key]);
        });

        return new Promise((resolve, reject) => {
            uploadRequest.end((err, res) => {
                if(err) {
                    reject(err);
                }
    
                const uploaded = res.body;
                resolve(uploaded);
            })
        })

        
    }
}

export default new UploadImageService()
