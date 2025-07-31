
import Contact from '@/component/Contact/Contact'
import { serverUrl } from "@/config";
import axios from "axios";
export const dynamic = "force-dynamic";

const getContact = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getContact`);
    return data.contactData;
  } catch (error) {
    console.log(error);
  }
  return {};
};

export default async function page() {
  const contactData = await getContact();
  return (
    <Contact contactData={contactData}/>
  )
}
