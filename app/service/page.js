import Services from '@/component/Services/Services'
import { serverUrl } from "@/config";
import axios from "axios";
export const dynamic = "force-dynamic";

const getServicePage = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getServicePage`);
    return data.servicePageData;
  } catch (error) {
    console.log(error);
  }
  return {};
};

const getServiceList = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getServiceList`);
    return data.serviceList;
  } catch (error) {
    console.log(error);
  }
  return {};
};


export default async function page() {
  const serviceData = await getServicePage();
  const serviceList = await getServiceList();
  return (
    <Services serviceData={serviceData} serviceList={serviceList}/>
  )
}
