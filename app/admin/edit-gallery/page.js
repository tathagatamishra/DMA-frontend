import dynamic from "next/dynamic";

const EditGallery = dynamic(()=>import("@/component/Admin/PageEdit/EditGallery"),{ssr:false})

export default function page() {
  return <EditGallery />;
}
