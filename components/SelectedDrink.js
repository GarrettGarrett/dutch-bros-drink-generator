import React from 'react'
import { useState} from 'react'
import DefaultDrink from '../components/DefaultDrink'

function SelectedDrink({drink, wayBackVisible, setWayBackVisible, newestImageVisible, setNewestImageVisible, imageLoading, setImageLoading}) {

  return (
    <>
        <div className='border border-[#DBE5F7] rounded-lg my-4 py-2 space-y-4 h-full'>
            
            <div className='flex justify-center'>
                <div className='-mt-14 '>

                    <img
                    onError={() => {
                        setWayBackVisible(false)
                        setNewestImageVisible(true)
                    }}
                   
                    className={`h-[30vh] ${wayBackVisible && !newestImageVisible ? "" : "hidden"}`}
                     src={`
                        https://web.archive.org/web/20210314010609/https://files.dutchbros.com/website/menu/drink-images/${drink.image}`} alt="" 
                    /> 
            

                    <img
                    onError={() => {
                        setNewestImageVisible(false)
                        setWayBackVisible(false)
                    }}
                    
                    className={`h-[30vh] ${newestImageVisible ? "" : "hidden"}`}
                    src={`https://files.dutchbros.com/website/menu/drink-images-v2/${drink.image}`} alt="" 
                    />

                    <img 
                    src={'/images/Placeholder.png'}
                    className={`h-[30vh] -mt-3 mb-3 ${!wayBackVisible && !newestImageVisible ? "" : "hidden"}`}>
                    </img>

                </div>
            </div>
           
            <div className='font-Futura text-[#365F95] text-xs w-full text-center'>
                <span>{drink.category}</span>
            </div>

            <div className='font-Futura-bold text-[#365F95] uppercase text-md w-full text-center'>
                <span>{drink.name}</span>
            </div>

            <div className='font-Futura text-[#365F95] text-xs w-full text-center'>
                <span>{drink.description}</span>
            </div>
        </div>
    </>
  )
}

export default SelectedDrink

