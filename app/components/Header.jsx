import React from 'react'
import Container from './Container'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
const Header = ({menu,setMenu}) => {
  return (
    <div className='z-50 sticky top-0 flex items-center bg-white shadow-md h-16 w-full'>
      <Container className="h-full flex items-center justify-between">
             <div className=' cursor-pointer' onClick={()=>{setMenu((prev) => !prev)}}>
            {
              menu ? <IoCloseSharp className='text-3xl'/>
              : <GiHamburgerMenu className='text-2xl'/>
            }
            </div>
            
            <h1 className='text-lg font-bold text-gray-700'>BookCafe</h1>
      </Container>
    </div>
  )
}

export default Header
