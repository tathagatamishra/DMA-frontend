import dynamic from "next/dynamic";

const EditBrochure  = dynamic(()=>import( "@/component/Admin/PageEdit/EditBrochure"),{ssr:false});

export default function page() {
  return <EditBrochure />;
}