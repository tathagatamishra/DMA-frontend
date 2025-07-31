import dynamic from "next/dynamic";

const EditService  = dynamic(()=>import("@/component/Admin/PageEdit/EditService"),{ssr:false})

export default function page() {
  return <EditService />;
}
