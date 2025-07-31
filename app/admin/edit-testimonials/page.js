import dynamic from "next/dynamic";

const EditTestimonials  = dynamic(()=>import("@/component/Admin/PageEdit/EditTestimonials"),{ssr:false})

export default function page() {
  return <EditTestimonials />;
}
