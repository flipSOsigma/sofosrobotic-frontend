'use client'

import { useEffect, useState } from 'react';
import { INewsItem } from '../interfaces';
import CardsProjects from '@/components/card/cards-project';

const LoadProjects = ({pagination}: {pagination: number}) => {
  const [projectsData, setProjectsData] = useState<INewsItem[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [longPageNumber, setLongPageNumber] = useState<number>(1);

  useEffect(() => {
    const dataFetching = fetch('/api/news')
    .then(res => res.json())
    .then(projectsData => {
      setLongPageNumber(Math.ceil(projectsData.data.length / pagination))
      setProjectsData((projectsData.data).slice(pageNumber * pagination - pagination, pageNumber * pagination))
    })

    dataFetching
  }, [pageNumber])

  const changePages = (e: any) => {
    e.preventDefault();
    setPageNumber(e.target.innerText)
  }

  return (
    <div className="grid gap-4 overflow-x-auto mt-20 w-full grid-cols-3 overflow-hidden">
      {projectsData.map((item, i) => (
        <CardsProjects key={i} className="mb-10" dataItem={item}/>
      ))}
      <div className="md:px-40 px-4 flex justify-center gap-2 col-span-3 pb-10">
        {[...Array(longPageNumber)].map((_, i) => (
          <button key={i} onClick={(e) => changePages(e)} className="w-10 aspect-square border border-black dark:border-white flex items-center justify-center hover:scale-125 duration-300 cursor-pointer">{i+1}</button>
        ))}
      </div>
    </div>
  )
}

export default LoadProjects
