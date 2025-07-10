import DashboradSideBar from '@/components/dashboard-sidebar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
      <DashboradSideBar />
      <div className='w-full flex flex-col p-8 gap-8'>
        <div className="flex flex-col">
          <h1 className='text-2xl font-bold'>Welcome to the dashboard</h1>
          <p className='text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, excepturi.</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
          <Card className='border-2' key={i}>
            <CardHeader>
              <h1 className='font-bold text-sm'>News Activity</h1>
            </CardHeader>
            <CardContent>
              <b className='text-3xl'>240 <span className='font-normal text-xs'>news</span></b>
              <p className='text-muted-foreground text-xs'>news made on this site</p>
            </CardContent>
          </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
