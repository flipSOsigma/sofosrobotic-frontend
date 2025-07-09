import React from 'react'
import BadgeTopic from '../badge/badge-topic'
import Link from 'next/link'
import { INewsItem } from '@/lib/interfaces'
import { truncateWords } from '@/lib/functions'

const CardsNews = ({
    className,
    dataItem,
    role,
  } : {
    className?: string, 
    dataItem?: INewsItem,
    role?: string
  }) => {

  return (
    <Link href={role === 'admin' ? "/dashboard/news/" + dataItem?.uniqueId : "/news/" + dataItem?.uniqueId } className={'flex flex-col items-start text-start gap-2 w-full max-w-full xl:max-w-full md:max-w-sm' + " " + className}>
      <div className="w-full aspect-video overflow-hidden object-cover object-center bg-white">
        <img src={dataItem?.imagePath ? dataItem.imagePath[0] : "https://dummyimage.com/1080x1080"} alt="" className='object-center object-cover w-full h-full' />
      </div>
      <BadgeTopic text={dataItem?.category || "category"} className="mt-5"/>
      <h1 className="text-2xl">{dataItem?.title || "The data is being on load ..."}</h1>
      <p className='whitespace-normal text-gray-600'>{dataItem?.excerpt && truncateWords(dataItem.description)}</p>
    </Link>
  )
}

export default CardsNews
