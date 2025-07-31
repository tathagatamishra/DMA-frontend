import dynamic from "next/dynamic";

const TestDev = dynamic(()=>import("@/component/Admin/PageEdit/TestDev"),{ssr:false})

export default function page() {
  return <TestDev />;
}