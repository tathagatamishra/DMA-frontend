import dynamic from "next/dynamic";

const EditLetter  =  dynamic(()=>import("@/component/Admin/PageEdit/EditLetter"),{ssr:false})

export default function page() {
  return (
    <EditLetter />
  )
}
