import React from 'react'
import timeAgo from '../utils/TimeAgo'
import { Link } from 'react-router'

function PlaylistPlayer({name, description, createdAt, videos}) {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-base-300 rounded-xl shadow-2xl overflow-hidden w-full max-w-sm md:max-w-3xl lg:max-w-4xl transition-all duration-300">
            
            <div className="md:flex">

                <div className="md:w-1/3 bg-linear-to-br from-indigo-500 to-purple-600 p-6 flex flex-col items-center justify-center text-white">
                    
                    <div className="w-48 h-48 mb-4 rounded-lg shadow-xl overflow-hidden">
                        
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-center mb-1">
                        {name} 
                    </h1>
                    
                    <p className="text-indigo-200 text-sm font-medium">
                        {timeAgo(createdAt)}
                    </p>
                    <p className="text-sm mt-2 text-center">
                        {description}
                    </p>
                </div>

                <div className="md:w-2/3 p-4 md:p-6">
                    <h2 className="text-xl font-bold text-white mb-4 border-b pb-2">
                        {`PlayList (${videos?.length || 0} Videos)`}
                    </h2>

                    {
                        videos && videos.length>0 ? videos.map( (video, index) => 
                            (<Link key={video._id} to={`/video/${video._id}`} >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-base-100 transition duration-150 cursor-pointer">
                                        <div className="flex items-center">
                                            <span className="text-white/90 font-mono text-sm mr-4">{index+1<10? `0${index+1}` : index+1 }</span>
                                            <div>
                                                <p className="text-white/90 font-semibold truncate max-w-[200px] sm:max-w-none">{video.title}</p>
                                                <p className="text-white/50 text-sm">{videos.description}</p>
                                            </div>
                                        </div>
                                        <span className="text-white/90 /50 text-sm">{`${Math.floor(video.duration/3600)}:${Math.floor(video.duration/60)}:${Math.floor(video.duration%60)}`}</span>
                                    </div>
                                </div>
                            </Link>)
                        ) : (<p className="text-center text-white/50">No videos in this playlist</p>)
                    }
                    
                    <p className="text-center text-sm text-white/50 mt-6 pt-4 border-t">
                        {"Total Runtime: 45 min"}
                    </p>

                </div>
            </div>
            
        </div>
    </div>
  )
}

export default PlaylistPlayer