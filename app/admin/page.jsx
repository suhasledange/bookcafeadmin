'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Container from '../components/Container';
import service from '../appwrite/service';
import formatDate from '../util/formatDate';
import { IoSearch } from "react-icons/io5";
import InTransitModal from '../components/InTransitModal';
import RequestModal from '../components/RequestModal';


const OrdersPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter,setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('');
  const [orderItem,setOrderItem] = useState(null);
  const [TransitModal,setTransitModal] = useState(false)
  const [requestModal,setRequestModal] = useState(false)
  const [requests,setRequests] = useState(0);


  const fetchData = useCallback(async () => {
    try {
      const { documents } = await service.OrdeList();
      const sortedOrders = documents.sort((a, b) => new Date(b.DateOfOrder) - new Date(a.DateOfOrder));
      setOrderList(sortedOrders);
      setFilteredOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, []);

  useEffect(()=>{
    if(orderList.length){
      const res = orderList.filter(order => order.status === 'Request');
      setRequests(res.length)
    }
  },[orderList])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filterOrders = (status) => {
    setActiveFilter(status)
    if (status === 'all') {
      setFilteredOrders(orderList);
    } else {
      const filtered = orderList.filter(order => order.status.toUpperCase() === status.toUpperCase());
      setFilteredOrders(filtered);
    }
  };

  const OpenModal = (item,status)=>{
    status = status.toLowerCase()
    if(status=== 'in_transit'){
      setTransitModal(true)
      setOrderItem(item)
    } 
    else if(status === 'request'){ 
       setRequestModal(true)
       setOrderItem(item)
    }
      else if (status === 'delivered') console.log('delivered open')
  }


  const tableHeaders = [
    "SrNo.",
    "RazorPayId",
    "DateOfOrder",
    "DeliveredDate",
    "DueDate",
    "Due",
    "BookName",
    "UserName",
    "Phone",
    "Address",
    "Price",
    "Quantity",
    "Status",
    "Update",
  ];


  const filterBtn = [
    { id: 1, text: 'All', filter: "all" },
    { id: 2, text: 'Delivered', filter: "DELIVERED" },
    { id: 3, text: 'Pending', filter: "IN_TRANSIT" },
    { id: 4, text: 'Cancelled', filter: "CANCELLED" }, 
    { id: 5, text: 'Requests', filter: "Request",req:true,}, 
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orderList.filter(order => {
      for (let key in order) {
        if (typeof order[key] === 'string' && order[key].toLowerCase().includes(query)) {
          return true;
        }
      }
      return false;
    });
    setFilteredOrders(filtered);
  };


  return (
    <Container>
      { TransitModal &&
        <InTransitModal filterOrders={filterOrders} orderItem={orderItem} setTransitModal={setTransitModal}/>
      }
      { requestModal &&
        <RequestModal filterOrders={filterOrders} orderItem={orderItem} setRequestModal={setRequestModal}/>
      }
      
      <div className="w-full flex-col h-full pt-4 md:pt-8 overflow-hidden">
        <div className='flex items-center gap-2 mb-3 px-2'>
          <h1 className='text-xl font-semibold'>Orders</h1>
          <span className='text-md text-gray-700'>{filteredOrders.length} Orders found</span>
        </div>

        <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 mb-5">
        <div className='z-10 md:space-x-3 space-y-2 md:space-y-0'>
      {
        filterBtn.map(b=>(
          <button className={`relative ml-4 underline-offset-4 font-semibold  ${activeFilter === b.filter ? "underline text-blue-700" :"text-gray-700 "}`} key={b.id} onClick={() => filterOrders(b.filter)}>{b.text}
                {b.req && <div className=' absolute -right-[36%] text-red-500 top-0'>({requests})</div>}
          </button>
        ))
      }
      </div>
        <div className='max-w-xl flex-1'>

          <div className='w-full p-2 px-3 flex rounded-md items-center border'>
            <input value={searchQuery} onChange={handleSearch} className='w-full outline-none' placeholder='search'/>
            <IoSearch className=' cursor-pointer text-gray-700 text-lg'/>
          </div>
        
        </div>
        </div>

        <div className='border-2'>

        <div className='table-container max-h-[calc(100vh-180px)] min-h-[calc(100vh-180px)] overflow-y-scroll overflow-x-scroll'>
          <table className='text-left text-sm w-full'>
            <thead className="bg-gray-300">
              <tr>

                {tableHeaders.map((header, index) => (
                  <th key={index} className="px-4 py-2">{header}</th>
                ))}

              </tr>
            </thead>
            <tbody>


              {filteredOrders.map((item, index) => (
                 <tr key={item.$id} className='mb-2 pb-2 border-b border-gray-400 text-gray-700'>
                 <td className="px-4 py-2">{index + 1}</td>
                 <td className="px-4 py-2">{item.razorPayId}</td>
                 <td className="px-4 py-2">{formatDate(item.DateOfOrder)}</td>
                 <td className="px-4 py-2">{formatDate(item.DeliveredDate)}</td>
                 <td className="px-4 py-2">{formatDate(item.DueDate)}</td>
                 <td className="px-4 py-2">{item.Due}</td>
                 <td className="px-4 py-2">{item.bookName}</td>
                 <td className="px-4 py-2">{item.name}</td>
                 <td className="px-4 py-2">{item.phone}</td>
                 <td className="px-4 py-2">{item.address}</td>
                 <td className="px-4 py-2">&#8377;{item.price}</td>
                 <td className="px-4 py-2">{item.quantity}</td>
                 <td className={`px-4 py-2`}>
                   <div className={` py-2 px-4 text-sm ${item.status === "DELIVERED" ? "bg-green-300/[0.3] text-green-500" : item.status === "IN_TRANSIT" ? "bg-yellow-300/[0.3] text-yellow-500 " : "bg-red-300/[0.3] text-red-500"} text-center rounded-full font-semibold`}>
                     {item.status}
                   </div>
                 </td>
                 <td className={`px-4 py-2`}>
                  { item.status === 'IN_TRANSIT' || item.status === 'Request' ?
                    <button  onClick={()=>OpenModal(item,item.status)} className={` py-2 px-4 text-sm  active:scale-95 cursor-pointer duration-200 bg-black text-white text-center rounded-sm font-semibold`}>
                     Update
                   </button>
                   :""
                  }
                 
                 </td>
               </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </Container>
  );
};

export default OrdersPage;
