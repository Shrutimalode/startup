import React, { useState } from 'react';
import { uploadImage } from '../../../actions/AddProperty/ImageUploader';
import toast from 'react-hot-toast';

const ImageForm = ({ data = {}, handleInputChange }) => {
    const [imagePreview, setImagePreview] = useState(data?.["image_url_1"]);
    const [isAllowed, setIsAllowed] = useState(true);
    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('file', image);

        setIsAllowed(false);
        toast.promise(uploadImage(formData), {
            loading: "Uploading Image",
            success: (imageResponse) => {
                setIsAllowed(true);
                if (imageResponse.status === 200) {
                    handleInputChange("image_url_1", imageResponse.data?.image_url);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setImagePreview(reader.result);
                    };
                    reader.readAsDataURL(image);
                    return "Image Uploaded Successfully";
                }
                toast.error("Image Upload Failed");
            },
            error: (error) => {
                setIsAllowed(true);
                return "Image Upload Failed";
            }
        })
    };

    return (
        <div className='w-full h-full flex flex-col gap-6 items-center justify-center'>
            <input disabled={!isAllowed} id='imgSelect' className='hidden' type="file" accept="image/*" onChange={handleImageChange} />

            {
                imagePreview ?
                    <label htmlFor="imgSelect" className='cursor-pointer w-full h-full relative flex flex-col justify-center items-center gap-2'>
                        <img src={imagePreview} alt="Selected Image" className='absolute h-full w-full smaspect-video z-[2]' />
                        <div className="skeleton absolute h-full w-full " />
                    </label>
                    :
                    <label htmlFor="imgSelect" className='flex flex-col items-center justify-center gap-4'>
                        <span className='btn btn-soft'>Select Image</span>
                        <span className='opacity-50 text-xs'>(Optional)</span>
                    </label>
            }
        </div>
    );
};

export default ImageForm;