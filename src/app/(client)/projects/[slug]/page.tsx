'use client'

import AnimatedText from '@/components/animation/animation-bouncy-text'
import Silk from '@/components/background/background-aurora'
import BadgeTopic from '@/components/badge/badge-topic'
import { CarouselImages } from '@/components/carousel-images'
import NavigationBar from '@/components/navigation-bar'
import { INewsItem } from '@/lib/interfaces'
import LoadNews from '@/lib/loader/load-news'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function NewsPage () {

  const path = usePathname().split("/").pop();
  console.log(path)
  const [newsData, setNewsData] = useState<INewsItem>();

  useEffect(() => {
    const getSlugData = fetch('/api/news/' + path).then(res => res.json()).then(newsData => setNewsData(newsData.data));
    const updateViews = fetch('/api/news/' + path + '/views', {method: 'PUT'}).then(res => res.json()).then(res => console.log(res));

    updateViews
    getSlugData
  }, [])

  return (
    <div className="w-full bg-white dark:bg-black overflow-x-hidden min-h-screen pb-20" >
      <NavigationBar className="absolute top-0 left-0 px-0 z-50 bg-transparent" />
      <div className="md:w-full w-screen flex justify-center relative h-80" id="about">
        <div className="absolute top-0 z-30 px-4 max-w-7xl mx-auto text-center flex h-full justify-between items-end w-full pb-5">
          {newsData && (
            <div className="flex flex-col items-start w-full">
              <AnimatedText splitType="words" ease="power3.out" duration={0.9} text={newsData.title} className="md:text-5xl text-start text-3xl mb-4" />
              <p>{newsData.description}</p>
              <BadgeTopic text="Project Topic" className="mt-5"/>
            </div>
          )}
        </div>
        <div className="w-full h-full bg-gradient-to-b from-white/0 to-white dark:from-black/0 from-70% dark:to-black z-20 absolute top-0 left-0"></div>
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
          className="opacity-40"
        />
      </div>
      <div className="w-full" id="projects">
        {newsData && (
          <div className="max-w-7xl mx-auto mt-4 px-4 text-start flex flex-col h-full items-start w-full justify-start">
            <div className="w-full aspect-video overflow-hidden object-center object-cover">
              <CarouselImages images={newsData.imagePath} />
            </div>
            <div className='w-full flex flex-col items-start text-start mt-10 whitespace-pre-line'>
              <p>{newsData.content}</p>
            </div>  
            <hr className="my-10 w-full"/>
            <div className="w-full flex flex-col">

            <div className="flex flex-col w-full gap-4 mb-10 justify-start mt-5">
              <p>author</p>
              <div className="flex gap-2 items-center">
                <div className="aspect-square w-12 bg-muted-foreground rounded-full border">
                  <img alt="" />
                </div>
                <div className="flex flex-col items-start">
                  <h1 className='font-bold text-xl'>{newsData.authorId}</h1>
                  <p>{new Date(newsData.date).toLocaleString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full max-w-7xl mx-auto mt-2 gap-4 flex flex-col px-4">
          <p>More news</p>
          <LoadNews pagination={3} className='mt-0' />
        </div>
      </div>
    </div>
  )
}