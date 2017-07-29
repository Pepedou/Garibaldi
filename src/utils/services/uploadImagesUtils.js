import sha1 from 'sha1';
import superagent from 'superagent';
import {NotificationTypes} from '../../components/alerts/notifications/NotificationTypes'

export let uploadFile = (file, addNotification, callBackFunction) => {
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

        const image = file
        let uploadRequest = superagent.post(url);
        uploadRequest.attach('file', image);

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key]);
        });

        uploadRequest.end((err, res) => {
            if(err) {
                addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "No se pudo guardar la imagen"})
                return false;
            }

            const uploaded = res.body;
            callBackFunction(uploaded.secure_url)
        })
    }