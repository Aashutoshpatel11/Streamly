import React from 'react'
import {useNavigate} from 'react-router'
import {useSelector} from 'react-redux'

function HeroSection() {
    const navigate = useNavigate()
    const status = useSelector( (state) => state.auth.status)
    return (     
        <>
            {status || (<div className="hero bg-base-100 pt-10 pb-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Your Next Obsession is Playing Now.</h1>
                    <p className="py-6">
                        Dive into a universe of exclusive originals, blockbuster hits, and timeless classics. With thousands of titles updated weekly, Streamly brings unlimited entertainment right to your screen—no contracts, just pure streaming joy.
                    </p>
                    </div>
                    <div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl p-8">
                    <div className="card-body items-center justify-center p-0">
                        <h2 className="card-title text-3xl mb-4">Access Your Account</h2>
                        <button 
                        className="btn btn-info btn-lg w-full"
                        onClick={() => navigate('\login')} 
                        >
                        Go to Login
                        </button>
                    </div>
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default HeroSection