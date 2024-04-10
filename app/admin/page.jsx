'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Container from '../components/Container';
import service from '../appwrite/service';
import formatDate from '../util/formatDate';
import { IoSearch } from "react-icons/io5";

const OrderTableRow = ({ item, index }) => (
  <tr key={item.$id} className='mb-2 pb-2 border-b border-gray-400 text-gray-700'>
    <td className="px-4 py-2">{index + 1}</td>
    <td className="px-4 py-2">{item.razorPayId}</td>
    <td className="px-4 py-2">{formatDate(item.DateOfOrder)}</td>
    <td className="px-4 py-2">{formatDate(item.DeliveredDate)}</td>
    <td className="px-4 py-2">{formatDate(item.DueDate)}</td>
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
  </tr>
);

const OrdersPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter,setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('');
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

  const tableHeaders = [
    "SrNo.",
    "RazorPayId",
    "DateOfOrder",
    "DeliveredDate",
    "DueDate",
    "BookName",
    "UserName",
    "Phone",
    "Address",
    "Price",
    "Quantity",
    "Status",
  ];


  const filterBtn = [
    { id: 1, text: 'All', filter: "all" },
    { id: 2, text: 'Delivered', filter: "DELIVERED" },
    { id: 3, text: 'Pending', filter: "IN_TRANSIT" },
    { id: 4, text: 'Cancelled', filter: "CANCELLED" }, 
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
      <div className="w-full flex-col h-full pt-4 md:pt-8 overflow-hidden">
        <div className='flex items-center gap-2 mb-5'>
          <h1 className='text-xl font-semibold'>Orders</h1>
          <span className='text-md text-gray-700'>{filteredOrders.length} Orders found</span>
        </div>

        <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 mb-5">
        <div className='md:space-x-6 space-x-3'>
      {
        filterBtn.map(b=>(
          <button className={` underline-offset-4 font-semibold  ${activeFilter === b.filter ? "underline text-blue-700" :"text-gray-700 "}`} key={b.id} onClick={() => filterOrders(b.filter)}>{b.text}</button>
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

        <div className='max-h-[calc(100vh-250px)] md:min-h-[calc(100vh-180px)] overflow-y-scroll overflow-x-scroll'>
          <table className='text-left text-sm overflow-scroll w-full'>
            <thead className="bg-gray-300">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index} className="px-4 py-2">{header}</th>
                ))}

              </tr>
            </thead>
            <tbody>


              {filteredOrders.map((item, index) => (
                
                <OrderTableRow key={item.$id} item={item} index={index} />
              
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
