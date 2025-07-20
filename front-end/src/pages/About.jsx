import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterbox from '../components/NewsLetterbox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-3 md:w-2/4 text-gray-600'>
          <b className='text-gray-800'>Our Story</b>
          <p>
          Founded with a passion for fashion, our journey began with a vision to make stylish, high-quality clothing accessible to everyone. What started as a small idea has grown into a trusted platform where trends meet affordability. We believe fashion is a form of self-expression, and our carefully curated collections reflect that belief. Every piece we offer is designed to inspire confidence and individuality in our customers.
          </p>
          
          <b className='text-gray-800'>Our Mission</b>
          <p>
          Our mission is to redefine online shopping by providing trendy, comfortable, and affordable fashion for all. We strive to create a seamless and enjoyable shopping experience, from browsing to checkout. Sustainability and quality are at the heart of what we do, ensuring our customers get the best value for their money. With a customer-first approach, we continuously innovate to bring the latest styles right to your doorstep.
          </p>
        </div>
      </div>
      <div className='text-2xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US?'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance</b>
        <p className='text-gray-600'>
        We are committed to delivering top-notch quality in every piece we offer. From fabric selection to stitching and final finishing, each product undergoes strict quality checks to ensure durability and comfort. Our team works closely with trusted manufacturers to maintain high standards while keeping up with the latest trends. With a focus on excellence, we strive to provide clothing that looks great, feels amazing, and lasts long.
        </p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience</b>
        <p className='text-gray-600'>
        We make shopping effortless with a seamless online experience, easy navigation, and secure payment options. Our platform ensures quick order processing, fast shipping, and hassle-free returns to give you a stress-free experience. With detailed product descriptions and size guides, finding the perfect fit is easier than ever. Shop anytime, anywhere, and enjoy fashion at your fingertips.
        </p>
      </div>

      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service</b>
        <p className='text-gray-600'>
        Our customers are at the heart of everything we do, and we strive to provide outstanding support at every step. Our dedicated team is always ready to assist with inquiries, order tracking, and styling advice. We value your feedback and continuously improve to meet your expectations. Your satisfaction is our priority, ensuring a smooth and enjoyable shopping experience.
        </p>
      </div>
      </div>
      <NewsLetterbox />
    </div>
  )
}

export default About
