const ManageRequest = dynamic(()=>import('@/component/Admin/PageEdit/ManageRequest'),{ssr:false})
import dynamic from 'next/dynamic'
import React from 'react'

export default function page() {
  return (
    <ManageRequest />
  )
}
