import CallList from '@/component/CallList/CallList'
import React from 'react'

const page = () => {
  return (
<section  className='flex size-full flex-col gap-10 text-white'>
    <h1 className=' text-3xl font-bold'>
        Recoding
    </h1>
    <CallList type='recordings'/>
   </section>  )
}

export default page