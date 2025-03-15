"use client"
import React from 'react'
import { useSession } from 'next-auth/react'

const page = () => {
  const session = useSession();
  return (
   <div>
       Hello world
       {JSON.stringify(session)}
   </div>
  )
}

export default page