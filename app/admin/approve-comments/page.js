const ApproveComment =  dynamic(()=>import('@/component/Admin/PageEdit/ApproveComment'),{ssr:false})
import dynamic from 'next/dynamic'
import React from 'react'


export default function page() {
  return (
    <ApproveComment />
  )
}
