'use client'

import { useEffect, useState } from 'react';
import { INewsItem } from '../interfaces';
import CardsNews from '@/components/card/cards-news';

const DashboardLoadNews = ({pagination, className, pageIndicator = true}: {pagination: number, className?:string, pageIndicator?:boolean}) => {
  const [newsData, setNewsData] = useState<INewsItem[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [longPageNumber, setLongPageNumber] = useState<number>(1);

  useEffect(() => {
    const dataFetching = fetch('/api/news')
    .then(res => res.json())
    .then(newsData => {
      setLongPageNumber(Math.ceil(newsData.data.length / pagination))
      setNewsData((newsData.data).slice(pageNumber * pagination - pagination, pageNumber * pagination))
    })

    dataFetching
  }, [pageNumber])

  const changePages = (e: any) => {
    e.preventDefault();
    setPageNumber(e.target.innerText)
  }

  return (
    <div className={className + " " + "grid gap-4 overflow-x-auto w-full grid-cols-3 overflow-hidden " }> 
      {newsData.map((item, i) => (
        <CardsNews key={i} className="mb-10" dataItem={item} role={'admin'}/>
      ))}
      <div className="md:px-40 px-4 flex justify-center gap-2 col-span-3 pb-10">
        {pageIndicator && [...Array(longPageNumber)].map((_, i) => (
          <button key={i} onClick={(e) => changePages(e)} className="w-10 aspect-square border border-black dark:border-white flex items-center justify-center hover:scale-125 duration-300 cursor-pointer">{i+1}</button>
        ))}
      </div>
    </div>
  )
}

export default DashboardLoadNews
