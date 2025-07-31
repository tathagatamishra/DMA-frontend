const ManageLead = dynamic(()=>import('@/component/Admin/PageEdit/ManageLead'),{ssr:false})
import dynamic from 'next/dynamic'
import React from 'react'

export default function page() {
  return (
    <ManageLead />
  )
}
