import React from 'react'
import { Navigation, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogsItem from './blogsItem'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import BlogsItemLoading from './blogsItemLoading';
import ShowMore from './showMore';
import useBlogsData from '../../hooks/useBlogsData';
import {  toast } from 'react-toastify';



export default function LatestBlogs() {

    const {blogs,isloading,error} = useBlogsData('https://65f7f726b4f842e808867f20.mockapi.io/rocket-1/api/blogs')
    if(error) toast(`Error: ${error}`,{type:'error',theme:'colored'})
  return (
<>
    <div className=''>
        

        <div className='flex justify-between items-center'>
            <h2 className=' text-left font-extrabold text-3xl mb-10'>LatestBlogs</h2>
            <a href={`/blogs`}className='text-blue-500 cursor-pointer'>See All</a>
        </div>
        <div className='relative'>
        <Swiper
        style={{
            '--swiper-navigation-sides-offset':'-50px'
        }} 
        modules={[Navigation]}
         lazy={'true'}
          spaceBetween={50}
           navigation 
           slidesPerView={4}
           >
            
            {!isloading?<>
            {blogs?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,10).map((item,index)=>(
                <SwiperSlide key={index} className=''>
                     <BlogsItem blog={item} index={index} key={index} />
                </SwiperSlide>
            ))}
            <SwiperSlide className='' >
                <ShowMore />
            </SwiperSlide>
            </>
            :
            <>

            {[...Array(4)].map((_, index) => (
                <SwiperSlide key={index} className=''>
                    <BlogsItemLoading />
                </SwiperSlide>
            ))}
            </>
            }
        </Swiper>
        </div>
    </div>
    </>
  )
}
