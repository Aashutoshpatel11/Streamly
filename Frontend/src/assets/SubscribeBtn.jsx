import React, { useEffect, useState } from 'react'
import useSubscribe from './useSubscribe'


function SubscribeBtn({channelId}) {
    const [count, setCount] = useState(0)

    const {subscriberCount, setSubscriberCount, isSubscribed, toggleSubscribe } = useSubscribe(channelId)
    useEffect(()=>{
        setCount(subscriberCount)
        console.log(count);
      }, [subscriberCount])
  return (
    <button
    className={`btn rounded-full btn-md text-black ${isSubscribed? 'bg-white' : 'bg-error'} hover:bg-white/50`}
    type="button"
    onClick={() => toggleSubscribe()}
    >{isSubscribed? 'Unsubscribe' : 'Subscribe' }</button>
  )
}

export default SubscribeBtn;