import React from 'react'

function RandomizeButton({
  randomize,
  setRandomize,
  setWayBackVisible,
  setNewestImageVisible,
  setImageLoading,
  buttonText,
}) {
  return (
    <>
      <div
        onClick={() => {
          setWayBackVisible(false)
          setNewestImageVisible(true)
          setRandomize(!randomize)
          setImageLoading(true)
        }}
        className="mb-4 flex rounded-md bg-[#365F95] px-4 py-2 text-center font-Futura text-white hover:cursor-pointer hover:bg-opacity-80 active:scale-95"
      >
        <span className="m-auto uppercase">{buttonText}</span>
      </div>
    </>
  )
}

export default RandomizeButton
