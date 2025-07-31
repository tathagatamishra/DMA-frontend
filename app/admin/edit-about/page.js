import dynamic from "next/dynamic";
const EditAbout = dynamic(
  () => import('@/component/Admin/PageEdit/EditAbout'),
  { ssr: false }
)
export default function page() {
  return (
    <EditAbout />
  )
}
