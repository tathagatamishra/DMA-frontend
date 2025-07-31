
import dynamic from 'next/dynamic'
import React from 'react'
const EditFounder = dynamic(()=>import("@/component/Admin/PageEdit/EditFounder"),{ssr:false})

const page = () => {
  return (
    <EditFounder />
  )
}

export default page