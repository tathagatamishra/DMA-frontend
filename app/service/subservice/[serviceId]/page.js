import SingleService from "@/component/SingleService/SingleService";
import SubService from "@/component/SubService/SubService";

import { serverUrl } from "@/config";
import axios from "axios";
import Head from "next/head";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const serviceId = params.serviceId;

  // Fetch service data from API or database
  const getMainService = async (serviceId) => {
    try {
      const { data } = await axios.get(`${serverUrl}/getSubService/${serviceId}`);
      return data.subService;
    } catch (error) {
      console.log(error);
    }
  };
  const serviceData = await getMainService(serviceId);

  return {
    title: `${serviceData?.title} | Dikshant Malhotra & Associates`,
    description:
      "Expert Company Incorporation Services in India by Dikshant Malhotra & Associates. We assist in Private Limited Company Registration, One Person Company (OPC) Formation, Public Limited Company Setup, and Section 8 Company Registration, ensuring compliance with all legal requirements.",
    keywords: [
      "Company Incorporation Services",
      "Private Limited Company Registration",
      "One Person Company Formation",
      "Public Limited Company Setup",
      "Section 8 Company Registration",
      "Company Formation in India",
      "Business Setup Services",
      "Company Registration Consultants in Gurugram",
      "Company Law Compliance",
      "Company Incorporation Process",
      "Company Incorporation Consultants",
      "Company Incorporation in Delhi NCR",
      "Company Incorporation in Haryana",
      "Company Incorporation in India",
      "Company Incorporation Services in India",
      "Company Incorporation Services in Gurugram",
      "Company Incorporation Services in Delhi NCR",
      "Company Incorporation Services in Haryana",
      "Company Incorporation Services in Sector 49 Gurugram",
    ],
    robots: "index, follow",
    language: "en",
    revisitAfter: "2 days",
    rating: "safe for kids",
    yahooSeeker: "content, index",
    googleSiteVerification: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
    canonical: `https://www.dmassociates.in/service/subservice/${serviceId}`,
  };
}


const getMainService = async (serviceId) => {
  try {
    const { data } = await axios.get(`${serverUrl}/getSubService/${serviceId}`);
    return data.subService;
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

export default async function page({ params }) {
  const serviceId = params.serviceId;
  const serviceData = await getMainService(serviceId);
  const serviceList = await getServiceList();
  return (
    <>
      <SubService
        serviceData={serviceData}
        serviceList={serviceList}
        serviceId={serviceId}
      />
    </>
  );
}
