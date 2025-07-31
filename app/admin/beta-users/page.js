import dynamic from "next/dynamic";

const BetaUsers = dynamic(()=>import("@/component/Admin/PageEdit/BetaUsers"),{ssr:false}) 

export default function page() {
  return (
    <BetaUsers/>
  )
}
