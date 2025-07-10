import React from 'react'

const BadgeTopic = ({text, className}: {text: string, className?:string}) => {
  return (
    <div className={'bg-primary text-white border-accent dark:text-black px-4 py-2 text-xs' + " " + className}>
      {text}
    </div>
  )
}

export default BadgeTopic
