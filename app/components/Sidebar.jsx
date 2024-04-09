'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import { logoutSlice } from '@/store/authSlice';
import Container from './Container';
import { MdLogout } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { usePathname, useRouter } from 'next/navigation';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = ({menu,setMenu}) => {

    const pathname = usePathname()

    const dispatch = useDispatch()
    const router = useRouter()

    const status = useSelector(state => state.auth.status)
    
    const logout =async ()=>{
        await authService.logoutAccount()
        dispatch(logoutSlice())

    }
  
    const links = [
        {id:1,text:'Home',link:"/admin",logo:<IoHome/>},
        {id:2,text:'Users',link:"/admin/users",logo:<FaUsers/>},
        {id:3,text:'Books',link:"/admin/books",logo:<SiBookstack/>},
    ]

    useEffect(()=>{
        if(!status) router.replace('/')
      },[status])
  

  return (
    <Container className="bg-white relative h-full flex justify-center">
        <div className='flex items-center flex-col space-y-10 mt-20 z-40'>
        
        <h1 onClick={()=>setMenu((prev)=>!prev)} className='hidden md:block cursor-pointer text-xl font-bold tracking-wider underline underline-offset-4 text-gray-600'>
                {
                    menu 
                    ?
                    <IoCloseSharp className='text-2xl'/>
                    : <GiHamburgerMenu className='text-2xl'/>
                }
            
             </h1>
        
        <div className='flex flex-col space-y-6'>
            { 
            links.map(l => (  
                <Link href={l.link} className={`text-lg ${pathname === l.link ? "bg-blue-400/[0.3] text-blue-600":""} rounded-md p-2 px-4 flex items-center justify-center gap-2 hover:text-blue-600 duration-200 font-semibold tracking-widest`} key={l.id}>{l.logo} {menu ? l.text : ""} </Link>
            ))
            }
        
        </div>
        <div>
            <button className='w-full flex hover:text-blue-600 p-2 hover:bg-blue-400/[0.3] text-gray-700 rounded-md duration-200 items-center justify-center font-semibold' onClick={logout}><MdLogout className='text-4xl'/></button>
        </div>
        </div>
        </Container>
  )
}

export default Sidebar
