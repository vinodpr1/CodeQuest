import React from 'react'

const page = ({params}:{params:{questionId: string}}) => {
  return (
    <main className='pt-32'>
      Question with some question ID
    </main>
  )
}

export default page;