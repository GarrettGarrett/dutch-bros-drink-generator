import React from 'react'
import { useState} from 'react'
import DefaultDrink from '../components/DefaultDrink'
import LoaderLottie from '../components/LoaderLottie'

function SelectedDrink({drink, wayBackVisible, setWayBackVisible, newestImageVisible, setNewestImageVisible, imageLoading, setImageLoading}) {
console.log("🚀 ~ file: SelectedDrink.js ~ line 6 ~ SelectedDrink ~ drink", drink.image.replace("blended", "lemonade").replace("frost","iced"))

https://web.archive.org/web/20210314010317/https://files.dutchbros.com/website/menu/drink-images/Iced_Starry_Night_Lemonade.png
    
  
  return (
    <>
        <div className='border border-[#DBE5F7] rounded-lg my-4 py-2 space-y-4 h-full'>
            
            <div className='flex justify-center'>
                <div className='-mt-14 '>
                    <img className='h-10 w-10' src={drink.image.replace("blended", "lemonade")} alt="" />

                    <img
                    // onError = {e => e.target.style.display = 'none'} 
                    onError={() => {
                        setWayBackVisible(false)
                        setNewestImageVisible(true)
                    }}
                   
                    className={`h-[30vh] ${wayBackVisible && !newestImageVisible ? "" : "hidden"}`}
                     src={`
                        https://web.archive.org/web/20210314010609/https://files.dutchbros.com/website/menu/drink-images/${drink.image}`} alt="" 
                    /> 
            

                    <img
                    // onError = {e => e.target.style.display = 'none'} 
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

{/* <img src={`
https://web.archive.org/web/20190509001408/https://files.dutchbros.com/website/menu/drink-images/${drink.image}`} alt="" />
<img src={`
https://files.dutchbros.com/website/menu/drink-images-v2/${drink.image}`} alt="" /> */}

// {
//     "name": "9-1-1",
//     "slug": "911",
//     "trademarked": true,
//     "available_sugar_free": false,
//     "description": "6-Shot Irish Cream Breve",
//     "long_description": "The 9-1-1 packs six shots of espresso, half and half and Irish cream syrup into one strong, energy-packed drink! Ready for you to enjoy hot, iced, or blended!",
//     "image": "512px2/Iced_911_HERO.png",
//     "sort": 6,
//     "full_slug": "dutch-classics/911",
//     "category": "Dutch Classics",
//     "pdp": 1
// }