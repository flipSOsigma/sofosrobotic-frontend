import React from 'react'

const SpanText = ({text, className= ""}: { text: string, className?: string }) => {
  return (
    <div className={'bg-gradient-to-bl text-transparent bg-clip-text from-blue-600 via-cyan-400 to-purple-500' + " " + className}>
      {text}
    </div>
  )
}

export default SpanText
