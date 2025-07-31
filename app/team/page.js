import Team from "@/component/Team/Team";
import { serverUrl } from "@/config";
import axios from "axios";
import Head from "next/head";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Meet Our Team | Dikshant Malhotra & Associates - Experts in Compliance & Corporate Governance",
  description:
    "Meet the expert team at Dikshant Malhotra & Associates, a premier Company Secretarial & Compliance firm in Gurugram. Our professionals specialize in Company Registration, ROC Filings, Corporate Governance, Taxation, M&A, Business Advisory, and more. Trusted by businesses across India and globally.",
  keywords: [
    "Our Team",
    "Expert CS Team",
    "Company Secretarial Experts",
    "Best CS Firm in India",
    "Top Company Secretary firm in Delhi NCR",
    "Corporate Compliance Team",
    "Business Legal Advisors",
    "Company Secretary in Gurugram",
    "CS firm in Sector 49 Gurugram",
    "CS firm in Gurugram",
    "LLP Registration Experts",
    "Business Setup Consultants",
    "ROC Filing Team",
    "Legal Compliance Team",
    "GST & Taxation Experts",
    "Business Expansion Consultants",
    "Corporate Governance Experts",
    "Investment Advisory Team",
    "Due Diligence Specialists",
    "Audit & Assurance Team",
    "SEBI Compliance Consultants",
    "RBI Compliance Specialists",
    "FEMA Compliance Experts",
    "MSME Registration Consultants",
    "Startup Legal Experts",
    "International Business Compliance",
    "Secretarial Services Team",
    "Trademark Registration Experts",
    "Corporate Legal Advisors",
    "Business Advisory Consultants",
    "Corporate Law Experts",
    "Annual Compliance Team",
    "Business Risk Management Team",
  ],
  robots: "index, follow",
  language: "en",
  revisitAfter: "2 days",
  rating: "safe for kids",
  yahooSeeker: "content, index",
  googleSiteVerification: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  canonical: "https://www.dmassociates.in/team",
};


const getTeam = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getTeam`);
    console.log(data.teamData);
    return data.teamData;
  } catch (error) {
    console.log(error);
  }
  return {};
};

export default async function page() {
  const teamData = await getTeam();
  return (
    <>
      <Team teamData={teamData} />
    </>
  );
}
