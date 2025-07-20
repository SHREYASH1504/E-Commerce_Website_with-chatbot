import React from 'react'

const NewsLetterbox = () => {
    const onSubmitHandler = (event) =>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-color-gray-800'>Subscribe Now & Get 20% off</p>
        <p className='text-gray-600 mt-3'>
        🎉 New Arrivals Alert! Shop the Latest Trends Now and Enjoy Exclusive Discounts! 🛒
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:2-1/2 flex items-center gap-3 mx-auto my-6 border-outline'>
            <input className='w-full sm-flex-1 ' type= "email" placeholder='Enter your Email' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'> SUBSCRIBE NOW!</button>
        </form>

    </div>
  )
}

export default NewsLetterbox

