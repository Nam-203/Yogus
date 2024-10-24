import CallList from '@/component/CallList/CallList'
import React from 'react'

const page = () => {
  return (
   <section  className='flex size-full flex-col gap-10 text-white'>
    <h1 className=' text-3xl font-bold'>
        upComming
    </h1>
    <CallList type ="upcomming"/>
   </section>
  )
}

export default page