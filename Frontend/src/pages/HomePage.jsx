import React, { useEffect, useState } from 'react'
import VideoCard from '../components/VideoCard'
import HeroSection from '../components/HeroSection/HeroSection'
import GetAllVideos from '../assets/GetAllVideos'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import axios from 'axios'
import TweetDisplay from '../components/TweetDisplay'

function HomePage() {
    const [activeTab, setActiveTab] = useState('videos');
    const [videos, setVideos] = useState([])
    const dispatch = useDispatch()
    const [openPopupId, setOpenPopupId] = useState(null);

    const getAllVideos =  async() => {
      const response = await GetAllVideos()
      setVideos(response)
    }

    const tabs = [
      { id: "videos", name:"Videos"},
      { id: "tweets", name:"Tweets"},
    ]

    useEffect( () => {
      getAllVideos()
    }, [])

    // useEffect( () => {
    //   console.log("videos:", videos)
    // }, [videos])

  return (
    <div>
      <HeroSection/>
      {/* <div className='divider' ></div> */}
      <div className='w-full px-4 sm:px-6 lg:px-8 pb-10 ' >
        <nav className="w-full mt-6 border-gray-200 dark:border-gray-700 sticky mb-10  top-0 bg-gray-50 dark:bg-base-100 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-6 overflow-x-auto whitespace-nowrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    py-3 text-lg font-medium transition-colors duration-150 ease-in-out
                                    ${activeTab === tab.id 
                                        ? 'border-b-2 border-red-600 text-red-600 dark:text-red-500' 
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                    }
                                `}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

        {activeTab === 'videos' && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' >
          {
            videos.map( (video) => (
              <VideoCard 
              key={video._id} 
              src={video.thumbnail}  
              title={video.title}
              views={Math.floor(video.views)} 
              duration={video.duration}
              channelImageSrc={video.owner.avatar} 
              channelName={video.owner.username}
              videoId={video._id} 
              createdAt={video.createdAt}
              ownerId={video.owner?._id}
              openPopupId={openPopupId}
              setOpenPopupId={setOpenPopupId}
              />
            ) )
          }
          </div>
        )}
        {
          activeTab === 'tweets' && (
            <TweetDisplay
            type="all-tweets"
            />
          )
        }
      </div>
    </div>
  )
}

export default HomePage