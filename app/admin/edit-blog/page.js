import dynamic from "next/dynamic"

const EditBlog  = dynamic(()=>import("@/component/Admin/PageEdit/EditBlog"),{ssr:false})

export default function page() {
  return (
    <EditBlog />
  )
}
