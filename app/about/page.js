import About from "@/component/About/About";
import { serverUrl } from "@/config";
import axios from "axios";
import Head from "next/head";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us | Dikshant Malhotra & Associates - Top CS Firm in Gurugram",
  description:
    "Dikshant Malhotra & Associates is a premier Company Secretarial firm in Gurugram with 10+ years of expertise. We specialize in Company & LLP Registration, ROC Compliance, GST & Income Tax, XBRL Filings, M&A, Due Diligence, Corporate Governance, and more. Trusted by businesses across India and globally for professional legal and compliance services.",
  keywords: [
    "About Dikshant Malhotra & Associates",
    "CS firm in Sector 49 Gurugram",
    "CS firm in Gurugram",
    "Best CS firm in India",
    "Top Company Secretary firm in Delhi NCR",
    "Top 10 CS firm in Delhi NCR",
    "Company Secretary in Gurugram",
    "Corporate Law Firm in Gurugram",
    "ROC Filing Services in Gurugram",
    "Business Compliance Consultant",
    "Trademark Registration in Gurugram",
    "Company Trademark Registration in Gurugram",
    "Legal Advisory Firm in Delhi NCR",
    "GST Filing Consultant in Gurugram",
    "Income Tax Consultant in Gurugram",
    "XBRL Filing Services in India",
    "LLP Registration in Delhi NCR",
    "Private Limited Company Registration in Gurugram",
    "Foreign Company Registration in India",
    "Investment Advisory Services",
    "Corporate Governance Expert",
    "MSME Registration Consultant",
    "SEBI Compliance Consultant",
    "RBI Compliance Services",
    "FEMA Compliance Experts",
    "Business Legal Services",
    "Audit and Assurance Firm in Gurugram",
    "Due Diligence Consultant",
    "Corporate Taxation Services",
    "Annual Compliance for Companies",
    "Business Expansion Consultant",
    "Secretarial Services in Delhi NCR",
    "Best Business Consultancy Firm in Gurugram",
  ],
  robots: "index, follow",
  language: "en",
  revisitAfter: "2 days",
  rating: "safe for kids",
  yahooSeeker: "content, index",
  googleSiteVerification: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  canonical: "https://www.dmassociates.in/about",
};

const getAbout = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getAbout`);
    return data.aboutData;
  } catch (error) {
    console.log(error);
  }
  return {};
};
export default async function page() {
  const aboutData = await getAbout();
  return (
    <>
      <About aboutData={aboutData} />
    </>
  );
}
