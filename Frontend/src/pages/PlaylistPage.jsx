import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PlaylistCard from '../components/PlaylistCard'

function PlaylistPage() {
  const [newPlaylist, setNewPlaylist] = useState({
    "name": '',
    "description": ''
  })
  const [Playlists, setPlaylists] = useState([])
  
  // GET PLAYLISTS
  const getPlaylists = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/playlist/user-playlists`,  {withCredentials: true})
      if(response.data.data){
        setPlaylists(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching playlists:', error)
      throw new Error(error)
    }
  }

  useEffect( () => {
    getPlaylists()
  }, [] )

  // CREATE PLAYLIST
  const createPlaylist = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/playlist/create-playlist`,
        newPlaylist , 
        {withCredentials: true}
      )
      if(response.data.data){
         await getPlaylists()
        setNewPlaylist({"name": '', "description": ''})
      }
    } catch (error) {
      console.error('Error creating playlist:', error)
      throw new Error(error)
    }
  }


  // Handle DELETE
  const handleDelete = async (_id) => {
      try {
          const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/playlist/delete/${_id}`, {withCredentials: true})
          getPlaylists()
          return response
      } catch (error) {
          console.error('Error deleting playlist:', error)
          throw new Error(error)
      }
  }

  return (
    <div className='w-full h-full p-10 md:px-12 lg:px-14 xl:px-30' >
        <header className="mb-8 flex items-center justify-between ">
            <h1 className="text-3xl font-extrabold ">
                My Playlists
            </h1>
            <div className='flex gap-5' >

              <input 
              className='input input-bordered focus:outline-none '
              type="text"
              value={newPlaylist.name} 
              onChange={(e) => setNewPlaylist((prev) => {
                return { ...prev, name: e.target.value };
              })}
              placeholder='Name' />

              <input 
              className='input input-bordered focus:outline-none '
              type="text"
              value={newPlaylist.description} 
              onChange={(e) => setNewPlaylist((prev) => {
                return { ...prev, description: e.target.value };
              })}
              placeholder='Description' />

              <button 
              disabled={ newPlaylist.name && newPlaylist.description ? false : true }
              onClick={ () => createPlaylist()}
              className='btn btn-info '
              type="button ">Create</button>

            </div>
        </header>
        <div className='divider' ></div>
        <div className='min-w-full' >
          {
            Playlists && [...Playlists].reverse().map( ( playlist ) => (
              <div key={playlist._id} className='mb-6' >
                <PlaylistCard 
                _id={playlist._id}
                name={playlist.name} 
                description={playlist.description} 
                numberOfvideos={playlist.videos.length}
                onDelete = {() => handleDelete(playlist._id)}
                />
              </div>
            ) )
          }
        </div>
    </div>
  )
}

export default PlaylistPage