import axios from 'axios';
import React, {use, useEffect, useState} from 'react'
import { TbThumbUp } from "react-icons/tb";
import { TbThumbUpFilled } from "react-icons/tb";
import { useSelector } from 'react-redux';
import SubscribeBtn from '../assets/SubscribeBtn';
import useSubscribe from '../assets/useSubscribe';
import LikeBtn from '../assets/LikeBtn';

function VideoPlayer({videosrc, title, channelName="user", likes, id, ownerAvatar, channelId}) {
  const [isLiked, setIsLiked] = useState(false)
  const currentUser = useSelector( (state) => state.auth.userData )
  const {subscriberCount, setSubscriberCount, isSubscribed, toggleSubscribe } = useSubscribe(channelId)

  useEffect(()=>{
    console.log(subscriberCount);
  }, [subscriberCount])
  
  return (
    <div>
        <video 
        className='w-full h-auto mx-auto rounded-lg shadow-lg bg-black'
        controls 
        src={videosrc}>
        </video>
        <div className='flex flex-col' >
            <h1 className='text-2xl font-semibold mt-4 mb-2'>{title}</h1>
            <div className='flex justify-between gap-2' >
                <div className='flex gap-4 text-sm' >
                    <div className="w-10 rounded-full">
                    <img
                        className='w-full rounded-full'
                        alt="Tailwind CSS Navbar component"
                        src={ownerAvatar} />
                    </div>
                    <div className='flex flex-col h-full p-0 justify-between ' >
                        <p className='font-semibold' >{channelName}</p>
                        <p className='text-white/50' >{subscriberCount}</p>
                    </div>
                    {/* <SubscribeBtn channelId={channelId} />
                     */}
                    <button
                    className={`btn rounded-full btn-md text-black ${isSubscribed? 'bg-white' : 'bg-error'} hover:bg-white/50`}
                    type="button"
                    onClick={() => toggleSubscribe()}
                    >{isSubscribed? 'Unsubscribe' : 'Subscribe' }</button>
                </div>
                <div>
                    <LikeBtn type={"video"} id={id} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoPlayer