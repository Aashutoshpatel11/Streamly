import React, { useEffect, useState } from 'react'
import PlaylistPlayer from '../components/PlaylistPlayer'
import {useParams} from 'react-router';
import axios from 'axios';

function PlaylistViewPage() {
    const [playlist, setPlaylist] = useState({});
    const {id} = useParams()

    const getPlaylistData = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/playlist/user-playlists/${id}`,{withCredentials:true});
            if(response){
                setPlaylist(response.data.data);
            }
            console.log("response",response.data.data);
            return response
        } catch (error) {
            console.log("Error fetching playlist detaisl", error.message);
            throw new Error(error)
        }
    }

    useEffect(() => {
        getPlaylistData(id);
    }, [id]);
  return (
    <div>
        <PlaylistPlayer 
        name={playlist.name}
        description={playlist.description}
        createdAt={playlist.createdAt}
        videos={playlist.videos}
        />
    </div>
  )
}

export default PlaylistViewPage