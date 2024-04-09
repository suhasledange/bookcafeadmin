'use client'

import authService from "@/app/appwrite/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { loginSlice } from "./authSlice";
import Loader from "@/app/components/Loader";


const UserProvider = ({children}) => {

    const [loading,setLoading] = useState(false);
    const dispatch  = useDispatch()

    const getUser = useCallback(async () => {
        try {
          setLoading(true)
          const data = await authService.getCurrentUser()
          if(data && data.labels[0] === 'admin'){
            dispatch(loginSlice({data}))
          }

        } catch (error) {
          console.log('Error getting user data:', error);
        } finally {
          setLoading(false);
        }
      }, [dispatch]);
    
      useEffect(() => {
        getUser();
      }, [getUser]);
  
  if(loading) return(
    <div className="fixed inset-0">
             <Loader className="h-full max-w-md mx-auto"/>
    </div>
  )
  else return (
    <>  
        {children}
    </>
  )
}

export default UserProvider
