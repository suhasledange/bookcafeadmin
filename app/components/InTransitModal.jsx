'use client'
import { IoCloseSharp } from "react-icons/io5";
import formatDate from "../util/formatDate";
import { useState } from "react";
import service from "../appwrite/service";
import Loader from "./Loader";
const InTransitModal = ({ orderItem, setTransitModal }) => {

    const [loading,setLoading] = useState(false);

    const handleSubmit = async ()=>{
        try {
            setLoading(true);
            const res = await service.confirmOrder(orderItem.$id)
            if(res) {
                window.location.reload();
            }
        } catch (error) {
            console.log("error confirming order",error)
        }finally{
            setLoading(false)
        }
    }


    return (
        <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='fixed inset-0 w-full h-full bg-black opacity-40' onClick={() => setTransitModal(false)}>
            </div>
            <div className='flex items-center min-h-screen px-4 py-8'>
                <div className='relative w-full max-w-2xl p-4 mx-auto bg-white rounded-sm shadow-lg'>
                    <div className='flex justify-end'>
                        <button onClick={() => setTransitModal(false)} className='p-2 text-gray-400 rounded-md hover:bg-gray-100'>
                            <IoCloseSharp className='text-2xl' />
                        </button>
                    </div>
                    <div className='w-[90%] mx-auto py-3 space-y-3 text-center'>
                        <h4 className='text-lg font-semibold  text-gray-800'>
                            In Transit
                        </h4>
                            <div className='relative mt-3'>
                                <table className="border-collapse w-full  ">
                                    <tbody className="text-left">
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">RazorPay ID</td>
                                            <td className="border px-4 py-2 font-light">{orderItem.razorPayId}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">User Name</td>
                                            <td className="border px-4 py-2 font-light">{orderItem.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Address</td>
                                            <td className="border px-4 py-2 font-light">{orderItem.address}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Date Of Order</td>
                                            <td className="border px-4 py-2 font-light">{formatDate(orderItem.DateOfOrder)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Book Name</td>
                                            <td className="border px-4 py-2 font-light">{orderItem.bookName}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Quantity</td>
                                            <td className="border px-4 py-2 font-light">{orderItem.quantity}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className='relative mt-3'>

                            </div>
                            <button onClick={handleSubmit} className='w-full mt-3 py-3 px-4 flex items-center justify-center gap-3 font-medium text-sm text-center text-white bg-black hover:bg-gray-900 duration-100 active:scale-95 rounded-sm'>
                                Confirm Order {loading &&<Loader className1="w-6 h-6"/>}
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InTransitModal
