import React from 'react'
import LogoSVG from '../components/LogoSVG'
import MenuSVG from '../components/MenuSVG'
import GeneratorSVG from '../components/GeneratorSVG'

function Header() {
  return (
    <>
    
    <div className='bg-white shadow-md h-14 bg-opacity-80 flex justify-between pl-4 pr-4  pt-1'>

        <div className='h-16 w-16 pt-3'>
            <a href="https://www.dutchbros.com/" target="_blank" rel="noopener noreferrer">
                <LogoSVG />
            </a>
            
        </div>

        <div className='h-32 w-32 mr-4'>
            <GeneratorSVG />
        </div>

        <div className='h-5 w-5 pt-2.5 hover:scale-110 ease-in-out duration-200'>
            <a href="https://www.dutchbros.com/menu" target="_blank" rel="noopener noreferrer">
                <MenuSVG />
            </a>
        </div>

    </div>

    </>
  )
}

export default Header