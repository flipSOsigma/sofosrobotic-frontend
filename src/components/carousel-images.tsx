import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselImages({images, className}: {images: string[], className?: string}) {
  return (
    <Carousel className={"w-full border" + " " + className} >
      <CarouselContent>
        {images.map((images, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-full aspect-video">
              <img src={images} alt="" className="w-full h-full object-cover object-center"/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
