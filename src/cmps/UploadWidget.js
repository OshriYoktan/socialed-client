import { useEffect,useRef } from "react"



const UploadWidget = (props) => {
    const {user,changeUser} = props

    const setImage = (image) => {
        user.image = image
        changeUser(user)
    }
    
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dc8wmcnkw',
            uploadPreset: 'eubwk5az'
        }, function(error,result) {
            setImage(result.data.info.files[0].uploadInfo.url);
            console.log(result);
        })
    }, [])
    return (
        <button onClick={() => widgetRef.current.open()}>
            Upload
        </button>
    )

}

export default UploadWidget