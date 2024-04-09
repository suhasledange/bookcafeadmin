'use client'

import { loginSlice } from "@/store/authSlice";
import {  useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Container from "./components/Container";
import Loader from "./components/Loader";
import authService from "./appwrite/auth";

export default function Home() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const status = useSelector(state => state.auth.status)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const userData = await authService.loginAccount(data);
            if(userData){
                const data = await authService.getCurrentUser()
                if(data.labels[0] === 'admin'){
                    dispatch(loginSlice({data}))
                    router.push('/admin')
                }
                else{
                    alert('you are not admin')
                    await authService.logoutAccount()
                }

            }
            else{
                alert("Invalid Crendentials")
            }
            
        } catch (error) {
            console.log("invalid credentials",error)
            alert("Invalid Crendentials")
        }
        finally {
            reset();
            setLoading(false);
          }
    }

    useEffect(()=>{
        if(status) router.push('/admin')
    },[status])

    
    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/[0.5]">
                <div className="h-full flex max-w-md mx-auto items-center justify-center">
                    <div className="bg-white p-5 w-full rounded-sm -translate-y-10">
                        <Container className="">
                            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                                <h1 className="text-center text-xl font-semibold tracking-widest mb-5 mt-2 underline underline-offset-4 text-gray-700">Admin Login</h1>
                                <div className="flex flex-col space-y-4">

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-md font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            {...register('email', { required: true })}
                                            className="mt-1 p-3 border outline-black rounded-sm border-gray-300 w-full"
                                        />
                                        {errors.email?.type === "required" && (
                                            <p role="alert" className='text-sm text-red-800 font-light'>Email is required</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <div className=' space-y-2'>
                                            <label htmlFor="password" className="block text-md font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                {...register('password', { required: true })}
                                                className="mt-1 p-3 border outline-black rounded-sm border-gray-300  w-full"
                                            />
                                            {errors.password?.type === "required" && (
                                                <p role="alert" className='text-sm text-red-800 font-light'>Password is required</p>
                                            )}
                                        </div>

                                    </div>
                                    <button
                                        type="submit"
                                        className="text-lg gap-3 flex items-center justify-center bg-black text-white p-3 rounded-sm w-full hover:bg-black/[0.9] transition duration-150"
                                    >
                                        Login {loading ? <Loader className1="border-white w-6 h-6 " /> : ""}
                                    </button>
                                </div>


                            </form>
                        </Container>



                    </div>
                </div>
            </div>
        </>
    );
}
