
import React from 'react'
import dynamic from "next/dynamic";

const ManageProfileCard = dynamic(()=>import("@/component/Admin/PageEdit/ManageProfileCard"),{ssr:false})

const page = () => {
  return (
   <ManageProfileCard />
  )
}

export default page