import Founder from "@/component/Founder/Founder";
import { serverUrl } from "@/config";
import axios from "axios";
import Head from "next/head";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Founder | Dikshant Malhotra - Expert Company Secretary & Compliance Advisor",
  description:
    "Dikshant Malhotra, founder of Dikshant Malhotra & Associates, is a Fellow Company Secretary with 10+ years of experience in Corporate Governance, Business Compliance, ROC Filings, Mergers & Acquisitions, Taxation, and Legal Advisory. He is dedicated to helping businesses navigate complex regulatory frameworks with ease and expertise.",
  keywords: [
    "Dikshant Malhotra",
    "Founder of Dikshant Malhotra & Associates",
    "Best Company Secretary in India",
    "Top Company Secretary in Gurugram",
    "CS firm in Sector 49 Gurugram",
    "CS firm in Gurugram",
    "Best CS firm in India",
    "Top Company Secretary firm in Delhi NCR",
    "Top 10 CS firm in Delhi NCR",
    "Corporate Governance Expert",
    "Business Compliance Consultant",
    "Company Secretary in Gurugram",
    "Legal Advisory Expert",
    "Company Registration Expert",
    "ROC Filing Consultant",
    "LLP Registration in Delhi NCR",
    "Taxation Consultant",
    "Corporate Compliance Advisor",
    "Investment Advisory",
    "Secretarial Services",
    "Business Setup Consultant",
    "SEBI Compliance Consultant",
    "RBI Compliance Services",
    "MSME Registration Expert",
    "Business Legal Consultant",
    "Due Diligence Expert",
    "Audit and Assurance Services",
    "Annual Compliance Consultant",
    "Business Expansion Advisor",
    "Corporate Law Specialist",
    "International Business Consultant",
    "Cross Border Transactions Expert",
    "Private Limited Company Formation",
    "Trademark Registration Consultant",
  ],
  robots: "index, follow",
  language: "en",
  revisitAfter: "2 days",
  rating: "safe for kids",
  yahooSeeker: "content, index",
  googleSiteVerification: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  canonical: "https://www.dmassociates.in/about/founder",
};


const getFounder = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getFounder`);
    // console.log("data",data.founderData)
    return data.founderData;
  } catch (error) {
    console.log(error);
  }
  return {};
};

export default async function page() {
  const founderData = await getFounder();
  return (
    <>
      <Founder founderData={founderData} />
    </>
  );
}
