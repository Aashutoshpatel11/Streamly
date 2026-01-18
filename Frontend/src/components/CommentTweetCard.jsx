// import React, { useEffect, useState } from 'react'
// import timeAgo from '../utils/TimeAgo'
// import { useSelector } from 'react-redux'
// import { FaEdit } from "react-icons/fa";
// import { AiOutlineDelete } from "react-icons/ai";
// import { FaTelegramPlane } from "react-icons/fa";
// import { MdOutlineCancel } from "react-icons/md";
// import axios from 'axios';
// import useLike from '../assets/useLike';
// import { TbThumbUp } from "react-icons/tb";
// import { TbThumbUpFilled } from "react-icons/tb";

// function CommentTweetCard({id, ownerId, type, avatar, username, updatedAt, content, likes, tweets=[], setTweets, videoComments=[], setVideoComments }) {
//     const [isEditing, setIsEditing] = useState(false)
//     const [newContent, setNewContent] = useState('')
//     const userId = useSelector( (state) => state.auth.userData._id )
//     const {isLiked, setIsLiked, likedEntities, setLikedEntities, likeCount, setLikeCount, toggleLike} = useLike({
//       type: type,
//       entityId: id
//     })

//     const handleEditClick = async () => {
//       if( isEditing ){
//           try {
//               if(type=="tweet"){
//                 const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/tweet/update-tweets/${id}`,
//                   {
//                     "content": newContent
//                   },
//                   {withCredentials: true}
//                 )
//                 console.log("Updated tweet response",response);
//                 if(response){
//                   content=response.data.data.content
//                   setNewContent(response.data.data.content)
//                   setIsEditing(false)
//                 }
//               }else{
//                 const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/comment/updateComment/${id}`,
//                   {
//                     "content": newContent
//                   },
//                   {withCredentials: true}
//                 )
//                 console.log("Updated Comment response",response);
//                 if(response){
//                   content=response.data.data.content
//                   setNewContent(response.data.data.content)
//                   setIsEditing(false)
//                 }
//               }
//           } catch (error) {
//               console.log("UPDATE TWEET/COMMENT ERROR::", error.message);
//               throw new Error(error)
//           }
//       }else{
//         setIsEditing(true)
//       }
//     }

//     const handleDelete = async () => {
//       if(isEditing){
//         setIsEditing(false)
//         setNewContent(content)
//       }else{
//         if(type=="tweet"){
//           try {
//             const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/tweet/delete-tweets/${id}`,{withCredentials:true})
//             if(response){
//               setTweets(prevTweets => prevTweets.filter(tweet => tweet._id !== id));
//             }
//           } catch (error) {
//             console.log("DELETE TWEET ERROR::", error.message);
//             throw new Error(error)
//           }
//         }else{
//           try {
//             const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/comment/deleteComment/${id}`,{withCredentials:true})
//             if(response){
//               setVideoComments(prevComments => prevComments.filter(comment => comment._id !== id));
//             }
//           } catch (error) {
//             console.log("DELETE COMMENT ERROR::", error.message);
//             throw new Error(error)
//           }
//         }
//       }
//     }

//     useEffect(()=>{
//       setNewContent(content)
//     }, [])

//     return (
//         <div key={updatedAt} className='relative m-2 mb-' >
//             <div className="chat chat-start w-4/5">
//                 <div className="chat-image avatar">
//                     <div className="w-10 rounded-full">
//                         <img
//                           alt="avatar"
//                           src={avatar || "https://img.daisyui.com/images/profile/demo/kenobee@192.webp" }
//                         />
//                     </div> 
//                 </div>
//                 <div className="chat-header">
//                     @{username}
//                     <time className="text-xs opacity-50">{timeAgo(updatedAt)}</time>
//                 </div>
//                 {
//                   isEditing?
//                   <textarea
//                     className="chat-bubble w-full  overflow-hidden resize-none"
//                     value={newContent}
//                     disabled={!isEditing}
//                     onChange={(e) => setNewContent(e.target.value)}
//                     readOnly={false}
//                   />: 
//                   <div className="chat-bubble text-md">{newContent}</div>
//                 }


//                 <div className="chat-footer text-[18px] font-semibold  opacity-50">
//                   <button 
//                   className='cursor-pointer'
//                   onClick={()=>toggleLike({"type":type, "entityId":id})} 
//                   type="button">
//                     {isLiked? <TbThumbUpFilled/> : <TbThumbUp/>}
//                   </button> 
//                   {likeCount? likeCount: ""}
//                 </div>
//             </div>
//             {
//               ownerId==userId && (
//                 <div className='absolute bottom-0 right-0 w-1/5 flex justify-end items-end gap-5 pr-5 mt-6' >

//                   <button 
//                   onClick={ () => handleEditClick() }
//                   className='btn btn-lg btn-circle btn-ghost hover:btn-info '
//                   type="button">{isEditing?  <FaTelegramPlane /> : <FaEdit /> }</button>

//                   <button 
//                   onClick={ () => handleDelete() }
//                   className='btn btn-lg btn-circle btn-ghost hover:btn-error' 
//                   type="button">
//                     {isEditing? <MdOutlineCancel /> : <AiOutlineDelete />}
//                   </button>
//                 </div>
//               )
//             } 
//         </div>
//     )
// }

// export default CommentTweetCard

import React, { useEffect, useState } from "react";
import timeAgo from "../utils/TimeAgo";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import useLike from "../assets/useLike";
import { TbThumbUp, TbThumbUpFilled } from "react-icons/tb";

function CommentTweetCard({
  id,
  ownerId,
  type,
  avatar,
  username,
  updatedAt,
  content,
  likes,
  tweets = [],
  setTweets,
  videoComments = [],
  setVideoComments,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const userId = useSelector((state) => state.auth.userData._id);

  const { isLiked, likeCount, toggleLike } = useLike({
    type: type,
    entityId: id,
  });

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        if (type === "tweet") {
          const response = await axios.patch(
            `${import.meta.env.VITE_SERVER_URL}/tweet/update-tweets/${id}`,
            { content: newContent },
            { withCredentials: true }
          );
          if (response) {
            content = response.data.data.content;
            setNewContent(content);
            setIsEditing(false);
          }
        } else {
          const response = await axios.patch(
            `${import.meta.env.VITE_SERVER_URL}/comment/updateComment/${id}`,
            { content: newContent },
            { withCredentials: true }
          );
          if (response) {
            content = response.data.data.content;
            setNewContent(content);
            setIsEditing(false);
          }
        }
      } catch (error) {
        console.log("UPDATE TWEET/COMMENT ERROR::", error.message);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    if (isEditing) {
      setIsEditing(false);
      setNewContent(content);
      return;
    }

    try {
      if (type === "tweet") {
        const response = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/tweet/delete-tweets/${id}`,
          { withCredentials: true }
        );
        if (response) {
          setTweets((prev) => prev.filter((t) => t._id !== id));
        }
      } else {
        const response = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/comment/deleteComment/${id}`,
          { withCredentials: true }
        );
        if (response) {
          setVideoComments((prev) => prev.filter((c) => c._id !== id));
        }
      }
    } catch (error) {
      console.log("DELETE ERROR::", error.message);
    }
  };

  useEffect(() => {
    setNewContent(content);
  }, []);

  return (
    <div className="relative w-full px-2 sm:px-4 mt-3">
      <div className="chat chat-start w-full">
        <div className="chat-image avatar">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full">
            <img
              alt=""
              src={
                avatar ||
                "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              }
            />
          </div>
        </div>

        <div className="chat-header flex items-center gap-2 text-sm sm:text-base">
          @{username}
          <span className="text-xs opacity-50">{timeAgo(updatedAt)}</span>
        </div>

        {isEditing ? (
          <textarea
            className="chat-bubble w-full min-h-16 resize-none text-sm sm:text-base"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        ) : (
          <div className="chat-bubble text-sm sm:text-base wrap-break">
            {newContent}
          </div>
        )}

        <div className="chat-footer flex items-center gap-1 text-lg opacity-70">
          <button
            className="cursor-pointer"
            onClick={() => toggleLike({ type: type, entityId: id })}
            type="button"
          >
            {isLiked ? <TbThumbUpFilled /> : <TbThumbUp />}
          </button>
          {likeCount ? likeCount : ""}
        </div>
      </div>

      {ownerId === userId && (
        <div className="flex gap-3 justify-end mt-2 pr-2">
          <button
            onClick={handleEditClick}
            className="btn btn-sm sm:btn-md btn-circle btn-ghost hover:btn-info"
            type="button"
          >
            {isEditing ? <FaTelegramPlane /> : <FaEdit />}
          </button>

          <button
            onClick={handleDelete}
            className="btn btn-sm sm:btn-md btn-circle btn-ghost hover:btn-error"
            type="button"
          >
            {isEditing ? <MdOutlineCancel /> : <AiOutlineDelete />}
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentTweetCard;
