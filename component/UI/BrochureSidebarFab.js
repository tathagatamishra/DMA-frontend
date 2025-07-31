import { serverUrl } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Toast from "./Toast";

export const SideBarBrochureFab = ({
  showRequestBrochure,
  setShowRequestBrochure,
}) => {
  const [openPdf, setOpenPdf] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastVisible, setToastVisible] = useState(false); // State for toast visibility

  const getFileName = (url) => {
    try {
      const fileName = url.split("/").pop();
      const underscorePos = fileName.indexOf("_");
      if (underscorePos !== -1) {
        return decodeURIComponent(
          fileName.substring(underscorePos + 1).split("?")[0]
        );
      }
      return "PDF Document";
    } catch {
      return "PDF Document";
    }
  };

  useEffect(() => {
    const fun = async () => {
      let data = await axios.get(`${serverUrl}/getBrochure`);
      //   console.log(data.data.brochureData.url);
      const pdf = data.data.brochureData.url;
      const fileName = getFileName(pdf);
      //   console.log(fileName);
      setPdfName(fileName);
      setOpenPdf(pdf);
    };
    fun();
  }, []);

  const [formData, setFormData] = useState({
    type: "Lead",
    name: "",
    email: "",
    phone: "",
    pdfName: pdfName,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    try {
      setToastMessage("Download is in progress...");
      setToastVisible(true);
      setTimeout(async() => {
        setFormData(updatedFormData);
      await axios.post(`${serverUrl}/createLead`, updatedFormData);
      setToastMessage("Download Successful!");
      setToastVisible(false)
        window.open(openPdf, "_blank");
      }, 3000);
      const updatedFormData = {
        ...formData,
        pdfName: pdfName,
      };
    } catch (error) {
      console.log(error);
      setToastMessage("Download Unsuccessful!");
      setToastVisible(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="fixed right-[10px] pb-[35px] sm:pb-[52px] bottom-0 z-50">
        <div
          className="w-[260px] xsm2:w-[349px] h-[360px] bg-[#FFF] border-[0.79px] border-[#DDDDDD] rounded-[12px] flex flex-col px-[17.02px] pt-[28.25px] items-center"
          style={{ boxShadow: "0px 10.21px 14.92px 0px #00000012" }}
        >
          <div className="flex flex-row gap-[16px] xsm2:gap-[42.12px] items-center justify-center ml-[20px] xsm2:ml-[78px]">
            <p className="font-[700] text-[16px] leading-[21.92px] text-[#252B42]">
              Brochure Download
            </p>
            <RxCross1
              className="text-[18px] cursor-pointer"
              onClick={() => {
                setShowRequestBrochure(!showRequestBrochure);
              }}
            />
          </div>
          <input
            type="text"
            name="name"
            className="w-full h-[42px] px-[15.7px] text-[14px] font-[400] text-[#18171D] placeholder-[#18171D] outline-none rounded-[30px] border-[0.79px] border-[#E8E8E8] bg-[#FAFAFA] mt-[24.26px]"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="w-full h-[42px] px-[15.7px] text-[14px] font-[400] text-[#18171D] placeholder-[#18171D] outline-none rounded-[30px] border-[0.79px] border-[#E8E8E8] bg-[#FAFAFA] mt-[24.26px]"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="phone"
            className="w-full h-[42px] px-[15.7px] text-[14px] font-[400] text-[#18171D] placeholder-[#18171D] outline-none rounded-[30px] border-[0.79px] border-[#E8E8E8] bg-[#FAFAFA] mt-[21.28px]"
            placeholder="Your Phone No."
            value={formData.phone}
            onChange={handleChange}
          />

          {formData.name && formData.email && formData.phone ? (
            <button
              className="w-full h-[40px] rounded-[37px] bg-[#335BF5] flex items-center justify-center mt-[20.82px] hover:scale-[103%] transition-[300ms] cursor-pointer"
              onClick={handleSubmit}
            >
              <p className="text-[14.9px] font-[600] text-[#FFF]">Send</p>
            </button>
          ) : (
            <div className="flex flex-col gap-[2px]">
              <button className="w-full h-[40px] cursor-not-allowed rounded-[37px] bg-[rgba(51,91,245,0.42)] flex items-center justify-center mt-[20.82px] ">
                <p className="text-[14.9px] font-[600] text-[#FFF]">Send</p>
              </button>
              <p className="font-[400] text-[12px] text-red-600">
                *All field is mandatory
              </p>
            </div>
          )}
        </div>
      </div>
      {toastVisible && <Toast text={toastMessage} visible={toastVisible} />}
    </>
  );
};
