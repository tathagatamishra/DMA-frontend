import Homepage from "@/component/Homepage/Homepage";
import { serverUrl } from "@/config";
import axios from "axios";
import Head from "next/head";

export const dynamic = "force-dynamic";




const getHomeData = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getHome`);
    return data.homeData;
  } catch (error) {
    console.log(error);
  }
  return [];
};

const getFAQData = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getFaq`);
    return data.faqData;
  } catch (error) {
    console.log(error);
  }
  return {};
};

export default async function page() {
  const homeData = await getHomeData();
  const faqData = await getFAQData();

  return (
    <>
      <Homepage homeData={homeData} faqData={faqData} />
    </>
  );
}
