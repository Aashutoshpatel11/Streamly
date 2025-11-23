import React, { use, useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

function VideoUploadForm() {
    const { register, handleSubmit , formState: { errors, isValid } } = useForm({mode:"onChange"});
    const [progress, setProgress] = useState(false)
    const navigate = useNavigate()
    const username = useSelector( state => state.auth.userData.username )

    const formData = new FormData();

    const onSubmit = async (data) => {
        setProgress(true);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("videoFile", data.videoFile[0]);
        formData.append("thumbnail", data.thumbnail[0]);
        try {
            console.log("FROM DATA", formData);
            
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/video/publish-video`,
                 formData, 
                 {withCredentials: true});
            setProgress(false)
            navigate(`/channel/${username}`)
            return response
        } catch (error) {
            console.log("ERROR UPLADING VIDEO::", error.message);
            
            throw new Error(error)
        }
    };

  return (
    <div id='VIDEOFORM' className='hidden z-10 bg-white/10 backdrop-blur-sm top-0 left-0 w-screen h-screen backdrop' >
        <div className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 ' >
        <form 
        onSubmit={handleSubmit(onSubmit)}
        >
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Upload Video</legend>

            <label className="label">Title {errors.title && (<span>*this field is required</span>)}</label>
            <input {...register('title', {required: true} )} type="text" className="input" placeholder="My awesome page" />

            <label className="label">Description {errors.description && (<span>*this field is required</span>)}</label>
            <input {...register('description',{required: true})} type="text" className="input" placeholder="my-awesome-page" />

            <label className="label">Video {errors.videoFile && (<span>*this field is required</span>)}</label>
            <input {...register('videoFile',{required: true})} type="file" className=" file-input file-input-info" placeholder="Name" />

            <label className="label">Thumbnail {errors.thumbnail && (<span>*this field is required</span>)} </label>
            <input {...register('thumbnail',{required: true})} type="file" className=" file-input file-input-info" placeholder="Name" />
            {progress? <progress className="progress mt-4 w-full"></progress> : <div className='h-2 mt-4 w-full' ></div>}
            <div className=" flex justify-end gap-2">

                <button 
                onClick={()=> {
                    document.getElementById('VIDEOFORM').classList.remove('fixed')
                    document.getElementById('VIDEOFORM').classList.add('hidden')
                }}
                className='btn btn-ghost w-auto mt-4' >Close</button>

                <button
                disabled={!isValid}
                type='submit'
                className='btn btn-info w-auto mt-4' >Upload</button>

            </div>
            
            </fieldset>
        </form>
        </div>
    </div>
  )
}

export default VideoUploadForm