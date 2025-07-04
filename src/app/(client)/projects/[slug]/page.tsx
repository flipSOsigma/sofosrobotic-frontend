'use client'

import AnimatedText from '@/components/animation/animation-bouncy-text'
import Silk from '@/components/background/background-aurora'
import BadgeTopic from '@/components/badge/badge-topic'
import NavigationBar from '@/components/navigation-bar'
import { INewsItem } from '@/lib/interfaces'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ProjectsPage () {

  const path = usePathname().split("/").pop();
  console.log(path)
  const [projectsData, setProjectsData] = useState<INewsItem>();

  useEffect(() => {
    const getSlugData = fetch('/api/news-detail/').then(res => res.json()).then(data => setProjectsData(data.data[0]));
    getSlugData
  }, [])


  return (
    <div className="w-full bg-white dark:bg-black overflow-x-hidden min-h-screen" >
      <NavigationBar className="absolute top-0 left-0 px-0 z-50" />
      <div className="md:w-full w-screen relative h-80" id="about">
        <div className="absolute top-0 max-w-full left-0 z-30 px-4 md:px-40 xl:px-80 text-center flex h-full justify-between items-end w-full pb-5">
          {projectsData && (
            <div className="flex flex-col items-start w-full">
              <AnimatedText splitType="words" ease="power3.out" duration={0.9} text={projectsData.title} className="md:text-5xl text-3xl mb-4" />
              <p>{projectsData.description}</p>
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
        {projectsData && (
          <div className="md:px-40 xl:px-80 mt-4 px-4 text-end flex flex-col h-full items-end w-full justify-start">
            <div className="w-full aspect-video overflow-hidden object-center object-cover">
              <img className='w-full h-full object-center object-cover' src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
            </div>
            <div className='w-full flex flex-col items-start text-start mt-10'>
              <p>{projectsData.content}</p>
            </div>  
          </div>
        )}
      </div>
    </div>
  )
}