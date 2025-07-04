'use client'

import { useEffect, useState } from 'react';
import { INewsItem } from '../interfaces';
import CardsNews from '@/components/card/cards-news';

const LoadNews = () => {
  const [newsData, setNewsData] = useState<INewsItem[]>([]);

  useEffect(() => {

    const dataFetching = fetch('/api/news')
    .then(res => res.json())
    .then(newsData => {
      console.log(newsData);
      setNewsData(newsData.data);
    })

    dataFetching

  }, [])

  return (
    <div className="grid gap-4 overflow-x-auto mt-20 w-full grid-cols-3">
      {newsData.map((item, i) => (
        <CardsNews key={i} className="mb-10" dataItem={item}/>
      ))}
    </div>
  )
}

export default LoadNews
