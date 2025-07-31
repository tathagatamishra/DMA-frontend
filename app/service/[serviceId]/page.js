import SingleService from '@/component/SingleService/SingleService'

import { serverUrl } from "@/config";
import axios from "axios";
export const dynamic = "force-dynamic";

const getMainService = async (serviceId) => {
  try {
    const { data } = await axios.get(`${serverUrl}/getMainService/${serviceId}`);
    return data.mainService;
  } catch (error) {
    console.log(error);
  }
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
 
export default async function page({params}) {
  const serviceId = params.serviceId;
  const serviceData = await getMainService(serviceId);
  const serviceList = await getServiceList();
  return (
    <SingleService serviceData={serviceData} serviceList={serviceList}/>
  )
}