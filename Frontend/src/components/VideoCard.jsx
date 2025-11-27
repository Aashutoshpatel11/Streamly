import React from 'react'
import { useNavigate } from "react-router";
import timeAgo from '../utils/TimeAgo';
import AddToPlaylist from './AddToPlaylist';
import { HiDotsVertical } from 'react-icons/hi';
import { useSelector } from 'react-redux';

function VideoCard({
  channelId,
  src,
  title,
  views,
  createdAt,
  channelImageSrc,
  channelName,
  videoId,
  duration,
  openPopupId,
  setOpenPopupId
}) {
  const userStatus = useSelector( (state) => state.auth.status ) 
  const navigate = useNavigate();
  const isOpen = openPopupId === videoId;

  const handleTogglePopup = (e) => {
    e.stopPropagation();
    setOpenPopupId(isOpen ? null : videoId);
  };

  return (
    <div
      className={`relative bg-base-100 w-full shadow-sm transition-all duration-200 rounded-lg cursor-pointer
      ${isOpen ? "" : "hover:bg-white/10 hover:shadow-lg hover:scale-[1.02]"}`}
      onClick={() => navigate(`/video/${videoId}`)}
    >
      <figure
        className="h-44 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${src})` }}
      >
        <div className="absolute bottom-1 right-1 rounded-md px-2 py-1 bg-black/50 text-xs font-semibold">
          {`${Math.floor(duration/3600)}:${Math.floor(duration/60)}:${Math.floor(duration%60)}`}
        </div>
      </figure>

      <div className="card-body flex flex-row pt-4 pr-4 pb-4 pl-2">
        <div className="avatar mr-1 pt-1">
          <div className="w-8 h-8 rounded-full">
            <img alt="Channel Avatar" src={channelImageSrc} />
          </div>
        </div>

        <div>
          <h2 className="card-title text-base font-semibold line-clamp-2">
            {title}
          </h2>

          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/Channel/${channelId}`);
            }}
            className="text-white/80 hover:underline text-sm"
          >
            {channelName}
          </span>

          <div className="flex gap-2 text-sm text-white/80 items-center">
            <div>{`views: ${views}`}</div>
            <div className="border-l border-white/80 h-3"></div>
            <div>{timeAgo(createdAt)}</div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-2 right-2 z-20"
        onClick={handleTogglePopup}
      >
        {userStatus && 
        <div className="hover:bg-white/70 rounded-full p-2 z-0">
          <HiDotsVertical />
        </div>
        }

        {isOpen && (
          <AddToPlaylist
            videoId={videoId}
            onClose={() => setOpenPopupId(null)}
          />
        )}
      </div>
    </div>
  );
}

export default VideoCard;
