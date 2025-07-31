import dynamic from "next/dynamic";

const ManageMainService = dynamic(()=>import("@/component/Admin/PageEdit/ManageMainService"),{ssr:false})

export default function page() {
  return <ManageMainService />;
}
