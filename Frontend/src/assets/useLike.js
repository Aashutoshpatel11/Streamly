import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'


export default function useLike({type, entityId}) {
  const currentUser = useSelector( (state) => state.auth.userData )
  const [isLiked, setIsLiked] = useState(false)
  const [likedEntities, setLikedEntities] = useState([])
  const [likeCount, setLikeCount] = useState(0)

  // GET LIKED ENTITIES
  const getLikedEntities = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/like/getLikedEntities/${entityId}`)
      if(response){
        setLikedEntities(response.data.data)
        setLikeCount(response.data.data.length)
        setIsLiked( response.data.data.filter( (item) => item.likedBy==currentUser._id ).length? true: false )
      }
    } catch (error) {
      console.log("GET LIKED ENTITIES :: ERROR :: ", error.message);
      throw new Error(error)
    }
  }

  useEffect( () => {
    getLikedEntities()
  }, [entityId] )


  // TOGGLE LIKE
  const toggleLike = async ({type, entityId}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/like/toggle-${type}Like/${entityId}`,{}, {withCredentials: true})
        if(response){
          getLikedEntities()
        }
        return response
    } catch (error) {
      console.log("TOGGLE LIKE :: ERROR :: ", error.message);
      throw new Error(error)
    }
  }


  return {
  isLiked,
  setIsLiked,
  likedEntities,
  setLikedEntities,
  likeCount,
  setLikeCount,
  toggleLike
  }
}
