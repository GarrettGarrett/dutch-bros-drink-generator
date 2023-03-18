import React from 'react'

function RandomizeButton({randomize, setRandomize, setWayBackVisible, setNewestImageVisible, setImageLoading, buttonText}) {
  return (
    <>
        <div 
        onClick={() => {
            setWayBackVisible(false)
            setNewestImageVisible(true)
            setRandomize(!randomize)
            setImageLoading(true)
        }}
        className='mb-4 active:scale-95 bg-[#365F95] text-white font-Futura flex px-4 py-2 rounded-md hover:cursor-pointer hover:bg-opacity-80 text-center'>
            <span className='uppercase m-auto'>{buttonText}</span>
        </div>
    </>
  )
}

export default RandomizeButton