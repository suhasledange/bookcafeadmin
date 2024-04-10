'use client'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const Admin = ({children}) => {
  const [menu,setMenu] = useState(false);

  return (
    <div className="flex h-full flex-col md:flex-row md:overflow-hidden">
    <div className='md:hidden'>
      <Header menu={menu} setMenu={setMenu}/>
    </div>
    
    <div className={`${menu ? "translate-x-0 md:w-[15%] w-[60%]" :"md:translate-x-0 -translate-x-full md:w-auto"} transform duration-200  md:relative left-0 absolute h-full shadow-md`}>
      <Sidebar menu={menu} setMenu={setMenu}/>
    </div>
    
    <div className="w-full overflow-auto">{children}</div>
  </div>
  )
}

export default Admin
