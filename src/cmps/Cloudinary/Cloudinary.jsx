import { useState } from 'react';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'


export const Cloudinary = (props) => {

const [image,setImage] = useState(null)

    const successCallBack = (res) => {
        setImage(res.info.original_filename);
        props.getImageFromCloudinary(res.info.secure_url);
    }
    const failureCallBack = (res) => {
        console.log(res);
    }

    return (
        <div>
            <WidgetLoader />
            <Widget
                sources={['local', 'camera', 'url', 'dropbox']}
                sourceKeys={{ dropboxAppKey: '1dsf42dl1i2', instagramClientId: 'd7aadf962m' }}
                resourceType={'image'}
                cloudName={'dc8wmcnkw'}
                uploadPreset={'eubwk5az'}
                buttonText={image? image: 'Upload Photo'}
                style={{
                    border: 'none',
                    width: '100%',
                }}
                folder={'socialed'}
                multiple={false}
                autoClose={false}
                onSuccess={successCallBack}
                onFailure={failureCallBack}
                logging={false}
                customPublicId={'sample'}
                eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'}
                use_filename={true}
                destroy={false}
                apiKey={624814373725371}
                accepts={'application/json'}
                contentType={'application/json'}
                withCredentials={true}
                unique_filename={true}
            />
        </div>
    )
}