import Homepage from "@/component/Homepage/Homepage";
import { serverUrl } from "@/config";
import axios from "axios";

export const dynamic = "force-dynamic";

export const metadata = {
  metadataBase: new URL('https://www.dmassociates.in'),
  title: 'Dikshant Malhotra & Associates | Company Secretarial & Compliance Experts',
  description: 'Dikshant Malhotra & Associates, a premier Company Secretarial firm in Gurugram, offers expert services in Company & LLP Registration, ROC Compliances, GST, Income Tax, XBRL Filings, Startup Advisory, M&A, Due Diligence, and more. We ensure businesses stay compliant, avoid penalties, and adopt ethical corporate governance. Trusted by corporate groups globally.',
  keywords: [
    'Company Secretary',
    'Company Registration',
    'LLP Registration',
    'ROC Compliance',
    'Business Setup',
    'Corporate Governance',
    'Income Tax',
    'GST Registration',
    'XBRL Filing',
    'Mergers and Acquisitions',
    'Due Diligence',
    'Audit and Assurance',
    'Secretarial Services',
    'Trademark Registration',
    'Corporate Legal Advisory',
    'Private Limited Company Registration',
    'OPC Registration',
    'Nidhi Company Registration',
    'NBFC Registration',
    'FSSAI Registration',
    'ISO Certification',
    'MSME Registration',
    'Startups India',
    'Angel Investors',
    'Venture Capital Compliance',
    'Business Compliance',
    'RBI Compliance',
    'FEMA Compliance',
    'IPR Protection',
    'Corporate Restructuring',
    'Cross Border Transactions',
    'Legal Documentation',
    'Shareholders Agreement',
    'MOA & AOA Drafting',
    'Business Expansion',
    'Foreign Company Registration in India',
    'Virtual CFO Services',
    'Payroll Management',
    'Financial Planning',
    'Corporate Taxation',
    'SEBI Compliance',
    'RBI Approvals',
    'International Business Compliance',
    'ESOPs Structuring',
    'Partnership Firm Registration',
    'GST Filing',
    'Annual Compliance',
    'Business Consultancy',
    'Investment Advisory',
    'Legal Risk Management'
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  alternates: {
    canonical: '/'
  },
  verification: {
    google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
    yahoo: 'content, index'
  },
  authors: [
    { name: 'Dikshant Malhotra & Associates' }
  ],
  category: 'Legal Services',
  other: {
    'content-language': 'en',
    'revisit-after': '2 days',
    'rating': 'safe for kids'
  },
  openGraph: {
    title: 'Dikshant Malhotra & Associates | Company Secretarial & Compliance Experts',
    description: 'Premier Company Secretarial firm offering expert services in Company & LLP Registration, ROC Compliances, GST, Income Tax, and more.',
    url: 'https://www.dmassociates.in',
    siteName: 'Dikshant Malhotra & Associates',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dikshant Malhotra & Associates | Company Secretarial & Compliance Experts',
    description: 'Premier Company Secretarial firm offering expert services in Company & LLP Registration, ROC Compliances, GST, Income Tax, and more.',
  }
}


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
  
  return <Homepage homeData={homeData} faqData={faqData} />;
}

// import Homepage from "@/component/Homepage/Homepage";
// import { serverUrl } from "@/config";
// import axios from "axios";
// import Development from "@/component/Development/Development";

// export const dynamic = "force-dynamic";

// const getHomeData = async () => {
//   try {
//     const { data } = await axios.get(`${serverUrl}/getHome`);
//     return data.homeData;
//   } catch (error) {
//     console.log(error);
//   }
//   return [];
// };

// const getFooterData = async () => {
//   try {
//     const { data } = await axios.get(`${serverUrl}/getFooter`);
//     return data.footerData;
//   } catch (error) {
//     console.log(error);
//   }
//   return {};
// };

// export default async function page() {
//   const homeData = await getHomeData();
//   return <Development homeData={homeData} />;
// }
