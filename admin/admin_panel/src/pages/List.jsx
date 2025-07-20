import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchList = async() => {
    setLoading(true);
    try {
      console.log("Starting API request...");
      const response = await axios.get(backendUrl + 'api/product/list');
      console.log("API Response status:", response.status);
      console.log("API Response data:", response.data);
      
      // Check for "sucess" instead of "success"
      if(response.data.sucess){
        console.log("Products count:", response.data.products?.length || 0);
        setList(response.data.products);
      }
      else{
        console.log("API returned success: false");
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.log("API Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  const removeProduct = async (id) => {
      try {
        const response = await axios.post(backendUrl + 'api/product/remove',{id},{headers:{token}})
        if(response.data.success){
          toast.success(response.data.message)
          await fetchList();
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
  }
  
  useEffect(()=>{
    console.log("Component mounted, backendUrl:", backendUrl);
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Loading state */}
        {loading && <p className="py-4 text-center">Loading products...</p>}
        
        {/* Empty list message */}
        {!loading && list.length === 0 && (
          <p className="py-4 text-center">No products found</p>
        )}

        {/*Product List */}
        {
          list.map((item,index)=>(
            // Changed from simple div to grid with the same structure as the header
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border'>
              <img src={item.image[0]} alt="" className="h-12 w-12 object-cover" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className="text-center">X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List