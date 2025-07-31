import dynamic from "next/dynamic";

const EditTeam  =  dynamic(()=>import("@/component/Admin/PageEdit/EditTeam"),{ssr:false})

export default function page() {
  return <EditTeam/> 
}