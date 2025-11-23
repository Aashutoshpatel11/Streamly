import axios from 'axios'

export default async function GetAllVideos() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/video/videos`)
        return response.data.data.filter( video => video.isPublished === true )
    } catch (error) {
        console.log("Error::GetAllVideos::", error.message);
        throw new Error(error)
    }
}