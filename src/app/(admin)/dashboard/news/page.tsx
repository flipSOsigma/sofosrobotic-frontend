import DashboradSideBar from '@/components/dashboard-sidebar'
import { Button } from '@/components/ui/button'
import DashboardLoadNews from '@/lib/loader/dashboard-load-news'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
      <DashboradSideBar />
      <div className='w-full flex flex-col p-8 gap-8'>
        <div className="flex flex-col">
          <h1 className='text-2xl font-bold'>Welcome to the News pages</h1>
          <p className='text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, excepturi.</p>
        </div>
        <div className="flex justify-end w-full items-center gap-2"> 
          <input type="text" className='w-full max-w-xs p-2 px-4 border-2 focus:outline-none border-border' placeholder='Search news'/>
          <Button className='h-full px-8 border-2'>find</Button>
        </div>
        <DashboardLoadNews pagination={10} className='mt-4'/>
      </div>
    </div>
  )
}

export default page
