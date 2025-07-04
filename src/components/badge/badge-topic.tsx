import React from 'react'

const BadgeTopic = ({text, className}: {text: string, className?:string}) => {
  return (
    <div className={'bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-xs' + " " + className}>
      {text}
    </div>
  )
}

export default BadgeTopic
