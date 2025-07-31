import dynamic from "next/dynamic";

const  ManageBlog = dynamic(()=>import("@/component/Admin/PageEdit/ManageBlog"),{ssr:false})

export default function page() {
  return (
    <ManageBlog />
  )
}
