import dynamic from "next/dynamic";

const EditFooter = dynamic(()=>import("@/component/Admin/PageEdit/EditFooter"),{ssr:false})

export default function page() {
  return (
    <EditFooter />
  )
}
