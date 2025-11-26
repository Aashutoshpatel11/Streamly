import React from 'react'
import {useNavigate} from 'react-router'
import { AiOutlineDelete } from 'react-icons/ai'

function PlaylistCard({_id ,name, description, numberOfvideos=0, onDelete}) {
    const navigate = useNavigate()
    
  return (
    <div onClick={(e) => {
        e.stopPropagation()
        navigate(`/playlist/user-playlist/${_id}`)
    }}>
        <div className="w-full bg-base-200 rounded-lg shadow-lg p-4 mb-3 transition duration-300 hover:bg-base-300 cursor-pointer border border-gray-700 flex items-center">
            
            <div className="grow min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">
                    {name}
                </h3>
                <p className="text-sm text-gray-400 truncate mt-1">
                    {description}
                </p>
            </div>

            <div className="shrink-0 ml-4 text-right">
                <p className="text-lg font-bold text-indigo-400">
                    {numberOfvideos}
                </p>
                <p className="text-sm text-gray-500">
                    Videos
                </p>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                }}
                className="btn btn-ghost hover:btn-error btn-md"
            >
                <AiOutlineDelete />
            </button>

        </div>
    </div>

    )
}

export default PlaylistCard