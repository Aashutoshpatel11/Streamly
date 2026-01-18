import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AiOutlineDelete } from "react-icons/ai";
import VideoUploadForm from '../components/VideoUploadForm';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const MetricCard = ({ title, value }) => (
    <div className=" p-4 rounded-lg shadow-md border border-gray-100  dark:border-gray-700">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{title}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
);

export default function DashboardPage() {
    const {userId} = useParams()
    const [stats, setStats] = useState()
    const [channelVideos, setChannelVideos] = useState()


    // GET RPOFILE STATS
    const getDashboardStats = async () => {
        try {
            const response = await axios.get( `${import.meta.env.VITE_SERVER_URL}/dashboard/stats/${userId}` )
            // console.log("STATS", response);
            setStats(response.data.data)
        } catch (error) {
            console.log("GET Dashboard STATS::ERROR",error.message);
            throw new Error(error)
        }
    }

    useEffect( ()=>{
        getDashboardStats()
    }, [] )

    // GET CHANNEL VIDEOS
    const getChannelVideos = async () => {
        try {
            const response = await axios.get( `${import.meta.env.VITE_SERVER_URL}/dashboard/videos/${userId}` )
            // console.log("GET CHANNEL VIDEOS::", response.data.data);
            setChannelVideos(response.data.data)
        } catch (error) {
            console.log("GET CHANNEL VIDEOS::ERROR",error.message);
            throw new Error(error)
        }
    }

    useEffect( ()=>{
        getChannelVideos()
    }, [] )

    // DELETE A VIDEO
    const handleDelete = async ( videoId ) => {
        console.log("video Id", videoId);
        
        try {
            const response = await axios.delete( `${import.meta.env.VITE_SERVER_URL}/video/delete/${videoId}`,{withCredentials: true} )
            // console.log("DELETE VIDEO::", response.data.data);
            if(response){
                toast.info("Video Deleted", {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
                });
                getChannelVideos()
                getDashboardStats()
            }
        } catch (error) {
            console.log("DELETE VIDEO::ERROR",error.message);
            throw new Error(error)
        }   
    }

    // Toggle Publish
    const handlePublish = async ( videoId ) => {
        console.log("video Id", videoId);   
        try {
            const response = await axios.patch( `${import.meta.env.VITE_SERVER_URL}/video/togglePublish/${videoId}`,{}, {withCredentials: true} )
            console.log("TOGGLE PUBLISH VIDEO::", response.data.data);
            getChannelVideos()
        } catch (error) {
            console.log("TOGGLE PUBLISH VIDEO::ERROR",error.message);
            throw new Error(error)
        }
    }

  return (
    <>
        {
            stats ? (
                <div className="min-h-screen p-10 md:px-12 lg:px-14 xl:px-30">
                    <header className="mb-8 flex justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold ">
                                {stats && stats?.channel.fullname}
                            </h1>
                            <p className='text-md  ' >{`@${stats && stats?.channel.username}`}</p>
                        </div>
                        {/* <button className='btn btn-md btn-info' >+ Upload</button> */}
                        {/* Open the modal using document.getElementById('ID').showModal() method */}


                        <button 
                        className="btn btn-info" 
                        onClick={ () => {
                            document.getElementById('VIDEOFORM').classList.remove('hidden')
                            document.getElementById('VIDEOFORM').classList.add('fixed')
                        } }
                        >+ Upload</button>
                        <VideoUploadForm/>
                        


                    </header>

                    <section className="mb-10">
                        <h2 className="text-xl font-semibold mb-4 ">
                            Performance
                        </h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
                            <MetricCard title="Total Likes" value={Math.floor(stats?.likes)} />
                            <MetricCard title="Total Videos" value={Math.floor(stats?.videos)} />
                            <MetricCard title="Total Subscribers" value={Math.floor(stats?.subscribers)} />
                            <MetricCard title="Total Views" value={Math.floor(stats?.views)} />
                        </div>
                    </section>

                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-200">
                            All Published Videos ({channelVideos?.length})
                        </h2>

                        <div className="overflow-x-auto">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {channelVideos?.length > 0 && (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Title</th>
                                                    <th>Status</th>
                                                    <th>Views</th>
                                                    <th>Created At</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {[...channelVideos].reverse().map((video) => (
                                                    <tr key={video._id}>
                                                        <th>
                                                            <label>
                                                                <input
                                                                    onChange={() => handlePublish(video._id)}
                                                                    checked={video?.isPublished}
                                                                    type="checkbox"
                                                                    className={`toggle ${
                                                                        video?.isPublished
                                                                            ? "toggle-info"
                                                                            : "toggle-error"
                                                                    }`}
                                                                />
                                                            </label>
                                                        </th>

                                                        <th>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle h-12 w-12">
                                                                        <img src={video.thumbnail} />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{video.title}</div>
                                                                    <div className="text-sm opacity-50">
                                                                        {video.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </th>

                                                        <th>{video.isPublished ? "Published" : "Not Published"}</th>
                                                        <th>{Math.floor(video.views)}</th>
                                                        <th>{video.createdAt.slice(0, 10)}</th>

                                                        <th>
                                                            <button
                                                                onClick={() => handleDelete(video._id)}
                                                                className="btn btn-ghost hover:btn-error btn-md"
                                                            >
                                                                <AiOutlineDelete />
                                                            </button>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </>
                                    )}
                                </table>

                                {channelVideos?.length === 0 && (
                                    <p className="text-gray-600 dark:text-gray-400 mt-4">
                                        No videos published yet.
                                    </p>
                                )}
                            </div>

                        </div>
                    </section>
                </div>
            ) : <Loader />
        }
    </>
  )
}
