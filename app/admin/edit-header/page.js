const EditHeader  = dynamic(()=>import('@/component/Admin/PageEdit/EditHeader'),{ssr:false})
import dynamic from 'next/dynamic'
import React from 'react'

const page = () => {
  return (
    <EditHeader/>
  )
}

export default page