import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CommentTweetCard from './CommentTweetCard'

function TweetDisplay({type}) {
    const [tweets, setTweets] = useState([])
    const [tweet, setTweet] = useState("")

    const getAllTweets = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tweet/${type}`, {withCredentials: true} )
            if(response){
                setTweets(response.data.data)
            }
            console.log("Twwets",response.data.data);
            return response
        } catch (error) {
            console.log("GET ALL TWEETS EEROR::", error.message);
            throw new Error(error)
        }
    } 

    useEffect( ()=> {
        getAllTweets()
    }, [] )

    // Publish a tweet
    const publishATweet = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/tweet/create`,
            {
                "content": tweet
            },
            {withCredentials:true}
            )
            setTweet("")
            getAllTweets()
            return response
        } catch (error) {
            console.log("PUBLISH A TWEET ERROR::", error.message);
            throw new Error(error)
        }
    }


  return (
    <div className='p-5 md:p-7 lg:p-10 flex flex-col gap-4 rounded-2xl border border-white/10' >
        <div className='overflow-auto h-96 ' >
            {
            tweets && [...tweets].reverse().map( (tweet) => (
                <CommentTweetCard 
                key={tweet.createdAt}
                type="tweet"
                avatar={tweet.owner?.avatar}
                username={tweet.owner?.username}
                createdAt={tweet.createdAt}
                content={tweet.content}
                likes={"Likes"}
                />
            ) )
        }
        </div>
        <div className='' > 
            <form
            className='flex gap-4 w-full'
            onSubmit={ (e) => publishATweet(e) } action="submit">
              <input 
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              className={`border-b-2 border-black w-full bg-transparent focus:outline-none pb-2 text-white/80 ${tweet.length && "border-info"} transition ease-out duration-500 ` }
              type="text" 
              placeholder='Add a Tweet...' />
              <button 
              className='btn btn-info rounded-full' 
              type="submit"
              disabled={!tweet.length}
              >Post</button>
            </form> 
        </div>
    </div>
  )
}

export default TweetDisplay