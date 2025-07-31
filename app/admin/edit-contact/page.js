import dynamic from "next/dynamic";

const EditContact = dynamic(()=>import("@/component/Admin/PageEdit/EditContact"),{ssr:false})

export default function page() {
  return <EditContact />;
}
