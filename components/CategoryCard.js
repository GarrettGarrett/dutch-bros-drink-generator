import React from 'react'

function CategoryCard({category, description, image, index, setSelectedCategory, selectedCategory}) {
  return (
    <>

    <div 
    onClick={() => {
        setSelectedCategory(category)
    }}
    key={index} className={`${selectedCategory == category ? "ring-4 ring-opacity-80 ring-[#B72F2E]" : ""} border border-[#DBE5F7] grid grid-cols-7 my-2 rounded-md`}>
        <div className='px-4 my-auto col-span-5 py-4 space-y-1.5'>
            <div className='font-Futura-bold text-[#365F95] uppercase text-md '>
                {category}
            </div>

            <div className='font-Futura text-[#365F95] text-xs '>
                {description}
            </div>
        </div>

        <div className='col-span-2  mr-2 my-auto'>
            <img src={image} alt="dutch classics" className='w-full h-auto'/>
        </div>
        
    </div>

    </>
  )
}

export default CategoryCard