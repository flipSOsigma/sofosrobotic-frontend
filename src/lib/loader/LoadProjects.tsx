'use client'

import { useEffect, useState } from 'react';
import { INewsItem } from '../interfaces';
import CardsProjects from '@/components/card/cards-project';

const LoadProjects = () => {
  const [projectsData, setProjectsData] = useState<INewsItem[]>([]);

  useEffect(() => {

    const dataFetching = fetch('/api/news')
    .then(res => res.json())
    .then(newsData => {
      console.log(newsData);
      setProjectsData(newsData.data);
    })

    dataFetching

  }, [])

  return (
    <div className="grid gap-4 overflow-x-auto mt-20 w-full grid-cols-3">
      {projectsData.map((item, i) => (
        <CardsProjects key={i} className="mb-10" dataItem={item}/>
      ))}
    </div>
  )
}

export default LoadProjects
