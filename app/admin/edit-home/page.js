import dynamic from "next/dynamic";

const EditHome = dynamic(()=>import("@/component/Admin/PageEdit/EditHome"),{ssr:false})

export default function page() {
  return <EditHome />;
}
