import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AddToPlaylist({ onClose, videoId }) {
    const [playlists, setPlaylists] = useState([])
    const [newPlaylist, setNewPlaylist] = useState({
        "name": '',
        "description": ''
    })

    const getUserPlaylists = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/playlist/user-playlists`,{withCredentials: true} )
            if(response){
                setPlaylists(response.data.data)
            }
            console.log(response.data.data);
            return response
            
        } catch (error) {
            console.log("GET USER PLAYLIST:: ERROR ::", error.message);
            throw new Error(error)
        }
    }

    useEffect(()=>{
        getUserPlaylists()
    }, [])

    // HANDLE EXISTING ADDITION IN EXISTING PLAYLIST
    const handleAddVideoToExistingPlaylist = async(id) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/playlist/add-video/${id}-${videoId}`,
                {},
                {withCredentials: true}
            )
            if(response){
                onClose()
            }
            console.log(response.data.data);
            return response
        } catch (error) {
            console.log("handleAddVideoToExistingPlaylist:: ERROR::", error.message)
            throw new Error(error)
        }
    }

    // HANDLE CREATE NEW PLAYLIST AND ADD VIDEO

    const handlePlaylistAndAddVideo = async () => {
        try {
            const createPlaylistResponse = await axios.post(`${import.meta.env.VITE_SERVER_URL}/playlist/create-playlist`, newPlaylist, {withCredentials: true}) 
            if(createPlaylistResponse){
                getUserPlaylists()
            }
            return response
        } catch (error) {
            console.log("handlePlaylistAndAddVideo:: ERROR::", error.message)
            throw new Error(error)
        }
    }

  return (
    <div
      className="absolute top-10 right-0 w-64 bg-base-100 rounded-lg shadow-xl border border-base-300 p-4 space-y-3 z-50"
      onClick={(e)=> e.stopPropagation()}
    >
      <p className="text-xs font-semibold uppercase opacity-70 border-b pb-1">
        Choose from Existing Playlist
      </p>

      {
        playlists && playlists.map( (playlist) => (
            <button 
            key={playlist._id}
            onClick={ () => handleAddVideoToExistingPlaylist(playlist._id) }
            className="btn btn-sm btn-ghost border-white/10 border-2 w-full text-left truncate hover:scale-102 transition duration-150"
            >
                {playlist.name}
            </button>
        ) )
      }

      <p className="text-xs font-semibold uppercase opacity-70 border-b pb-1 pt-2">
        Create New Playlist
      </p>

      <input 
        value={newPlaylist.name}
        onChange={ (e) => setNewPlaylist( {...newPlaylist, "name": e.target.value} ) }
        type="text" placeholder="Name" className="input input-bordered input-sm w-full" />
      <input 
        value={newPlaylist.description}
        onChange={ (e) => setNewPlaylist( {...newPlaylist, "description": e.target.value} ) }
        type="text" placeholder="Description" className="input input-bordered input-sm w-full mt-1" />

      <button 
      disabled={ !newPlaylist.description.length || !newPlaylist.name.length}
      onClick={()=> handlePlaylistAndAddVideo()}
      className="btn btn-primary btn-sm w-full mt-2">Create Playlist</button>
      <button className="btn btn-ghost btn-sm w-full mt-2" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default AddToPlaylist;
