// import axios from 'axios';
// import React, {use, useEffect, useState} from 'react'
// import { TbThumbUp } from "react-icons/tb";
// import { TbThumbUpFilled } from "react-icons/tb";
// import { useSelector } from 'react-redux';
// import SubscribeBtn from '../assets/SubscribeBtn';
// import useSubscribe from '../assets/useSubscribe';
// import LikeBtn from '../assets/LikeBtn';
// import useLike from '../assets/useLike';
// import { useNavigate } from 'react-router';

// function VideoPlayer({videosrc, title, channelName="user", likes, id, ownerAvatar, channelId}) {
//   const currentUser = useSelector( (state) => state.auth.userData )
//   const {subscriberCount, setSubscriberCount, isSubscribed, toggleSubscribe } = useSubscribe(channelId)
//   const {isLiked, setIsLiked, likedEntities, setLikedEntities, likeCount, setLikeCount, toggleLike} = useLike({
//         type: "video",
//         entityId: id
//       })
//     const navigate = useNavigate()

//   useEffect(()=>{
//     console.log(subscriberCount);
//   }, [subscriberCount])
  
//   return (
//     <div>
//         <video 
//         className='w-full h-auto mx-auto rounded-lg shadow-lg bg-black'
//         controls 
//         src={videosrc}>
//         </video>
//         <div className='flex flex-col' >
//             <h1 className='text-2xl font-semibold mt-4 mb-2'>{title}</h1>
//             <div className='flex justify-between gap-2' >
//                 <div className='flex gap-4 text-sm xs:max-h-10' >
//                     <div className="w-10 rounded-full">
//                     <img
//                         className='w-full rounded-full'
//                         alt="Tailwind CSS Navbar component"
//                         src={ownerAvatar} />
//                     </div>
//                     <div className='flex flex-col h-full p-0 justify-between ' >
//                         <p 
//                         onClick={ () => navigate(`/channel/${channelId}`) }
//                         className='font-semibold hover:underline cursor-pointer ' >{channelName}</p>
//                         <p className='text-white/50' >{subscriberCount}</p>
//                     </div>
//                     {/* <SubscribeBtn channelId={channelId} />
//                      */}
//                     <button
//                     className={`btn rounded-full btn-md text-black ${isSubscribed? 'bg-white' : 'bg-error'} hover:bg-white/50`}
//                     type="button"
//                     onClick={() => toggleSubscribe()}
//                     >{isSubscribed? 'Unsubscribe' : 'Subscribe' }</button>
//                 </div>
//                 <div className='text-[18px] font-semibold' >
//                     <button 
//                     className='cursor-pointer mr-2'
//                     onClick={()=>toggleLike({"type":"video", "entityId":id})} 
//                     type="button">
//                     {isLiked? <TbThumbUpFilled/> : <TbThumbUp/>}
//                     </button>
//                     {likeCount? likeCount: ""} 
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

import axios from "axios";
import React, { useEffect } from "react";
import { TbThumbUp, TbThumbUpFilled } from "react-icons/tb";
import { useSelector } from "react-redux";
import useSubscribe from "../assets/useSubscribe";
import useLike from "../assets/useLike";
import { useNavigate } from "react-router";

function VideoPlayer({
  videosrc,
  title,
  channelName = "user",
  likes,
  id,
  ownerAvatar,
  channelId,
}) {
  const currentUser = useSelector((state) => state.auth.userData);
  const { subscriberCount, isSubscribed, toggleSubscribe } = useSubscribe(channelId);
  const { isLiked, likeCount, toggleLike } = useLike({
    type: "video",
    entityId: id,
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(subscriberCount);
  }, [subscriberCount]);

  return (
    <div className="w-full px-0 sm:px-4 md:px-6">
      <video
        className="w-full h-auto max-h-[70vh] rounded-lg shadow-black shadow-2xl bg-black"
        controls
        src={videosrc}
      ></video>

      <div className="flex flex-col mt-4">
        <h1 className="text-xl sm:text-2xl font-semibold mb-3">{title}</h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 ">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              alt="channel avatar"
              src={ownerAvatar}
            />

            <div className="flex flex-col">
              <p
                onClick={() => navigate(`/channel/${channelId}`)}
                className="font-semibold hover:underline cursor-pointer text-sm sm:text-base"
              >
                {channelName}
              </p>
              <p className="text-white/50 text-xs sm:text-sm">
                {subscriberCount} subscribers
              </p>
            </div>

            <button
              className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full font-semibold ${
                isSubscribed ? "bg-white text-black" : "bg-error text-white"
              } hover:bg-white/70`}
              type="button"
              onClick={() => toggleSubscribe()}
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>
          <div className="flex items-center text-lg sm:text-xl font-semibold">
            <button
              className="cursor-pointer mr-2"
              onClick={() => toggleLike({ type: "video", entityId: id })}
              type="button"
            >
              {isLiked ? <TbThumbUpFilled /> : <TbThumbUp />}
            </button>
            {likeCount ? likeCount : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;


// export default VideoPlayer