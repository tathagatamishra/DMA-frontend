import Admin from "@/component/Admin/Admin";
import { serverUrl } from "@/config";
import axios from "axios";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";


export default async function page() {
  return <Admin />;
}
