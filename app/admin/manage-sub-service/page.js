import dynamic from "next/dynamic";

const ManageSubService  = dynamic(()=>import("@/component/Admin/PageEdit/ManageSubService"),{ssr:false})

export default function page() {
  return <ManageSubService />;
}
