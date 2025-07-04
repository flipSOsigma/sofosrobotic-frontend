import { ChevronRight } from 'lucide-react'
import React from 'react'

const BorderedButton = ({
  className,
  text,
  swap,
  iconPlacemment=true,
  iconHover=true
}:{
  className?: string
  text: string
  swap?: boolean
  iconPlacemment?: boolean
  iconHover?: boolean
}) => {
  return (
    <button className={'flex gap-4 px-4 py-2 border group border-black dark:border-gray-300 text-sm items-center' + " " + className + " " + (swap ? 'flex-row-reverse' : '')}>
      {iconPlacemment ? (
        <div className={"flex items-center group"}>
          <hr className="dark:border-white border-black border-b-2 w-10 -mr-3.5 group-hover:w-20 duration-300" />
          <ChevronRight />
        </div>
        ) : null}
      {text}
    </button>
  )
}

export default BorderedButton
