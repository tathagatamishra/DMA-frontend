"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { serverUrl } from "@/config";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import AdminNav from "../AdminUi/AdminNav";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import Services from "@/component/Services/Services";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import AdminUpload from "../AdminUi/AdminUpload";
import SubService from "@/component/SubService/SubService";
import Loader from "@/component/UI/Loader";
import Parser from "@/component/UI/Parser";
import Toast from "@/component/UI/Toast";
import { FaBible } from "react-icons/fa";

export default function ManageSubService() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hideNew, setHideNew] = useState(true);
  const [hideExisting, setHideExisting] = useState(false);
  const [serviceData, setServiceData] = useState({});
  const [serviceList, setServiceList] = useState([]);
  const [subServiceId, setSubServiceId] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showPointsDropdown, setShowPointsDropdown] = useState(false);
  const [showPointsDropdownExist, setShowPointsDropdownExist] = useState(false);
  const [pointesShowIndex, setPointesShowIndex] = useState(null);
  const [pointType, setPointType] = useState("");
  const options = [
    { mark: "✔", text: "Checkmark" },
    { mark: "", text: "Default" },
    { mark: "", text: "Button Points" },
  ];
  const [toastConfig, setToastConfig] = useState({
    type: "",
    text: "",
  });
  const [newSubService, setNewSubService] = useState({
    serviceType: "sub",
    mainServiceId: "",
    hero: {
      tag: "",
      heading: "",
      description: "",
      image: "",
    },
    title: "",
    layout: [],
    faqdata: {
      heading: "Frequently Asked Questions",
      faq: [],
    },
    pdfdata: {
      heading: "Pdf",
      pdf: [],
    },
    rightsection: {
      title: "",
      description: "",
    },
    team: {
      name: "",
      title: "",
      quote: "",
      image: "",
      whatsapp: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      gmail: "",
      youtube: "",
    },
  });

  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getSubService = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${serverUrl}/getSubService/${subServiceId}`
      );
      setServiceData(data.subService);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getServiceList = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${serverUrl}/getServiceList`);
      setServiceList(data.serviceList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getServiceList();
  }, []);

  useEffect(() => {
    if (subServiceId) {
      getSubService();
    }
  }, [subServiceId]);

  const handleNewSubServiceChange = (field, value) => {
    setNewSubService((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewTeam = (field, value) => {
    setNewSubService((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        [field]: value,
      },
    }));
  };
  const handleChangeTeam = (field, value) => {
    setServiceData((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        [field]: value,
      },
    }));
  };

  const handleHeroChange = (field, value) => {
    setNewSubService((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };
  const handleHeroUpdate = (field, value) => {
    setServiceData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  const addLayoutItemExist = (type) => {
    if (type === "points") {
      setShowPointsDropdownExist(true);
      return;
    }

    setServiceData((prev) => ({
      ...prev,
      layout: [...prev.layout, { [type]: type === "image" ? [] : "" }],
    }));
  };

  const addLayoutItem = (type) => {
    if (type === "points") {
      setShowPointsDropdown(true);
      return;
    }

    setNewSubService((prev) => ({
      ...prev,
      layout: [...prev.layout, { [type]: type === "image" ? [] : "" }],
    }));
  };

  // const updateLayoutItem = (index, type, value) => {
  //   setNewSubService((prev) => {
  //     const newLayout = [...prev.layout];
  //     if (type === "points") {
  //       // Ensure value is an array
  //       const pointsArray = Array.isArray(value)
  //         ? value
  //         : value.split("\n").filter((point) => point.trim());
  //       newLayout[index] = { [type]: pointsArray };
  //     } else {
  //       newLayout[index] = { [type]: value };
  //     }
  //     return { ...prev, layout: newLayout };
  //   });
  // };

  const updateLayoutItem = (index, type, value) => {
    setNewSubService((prev) => {
      const newLayout = [...prev.layout];

      if (type === "points") {
        const existingPointType = newLayout[index]?.points?.type || "default";

        let pointsArray;
        if (Array.isArray(value)) {
          pointsArray = value;
        } else if (typeof value === "string") {
          pointsArray = value.split("\n").filter((point) => point.trim());
        } else if (value?.value) {
          pointsArray = value.value;
        } else {
          pointsArray = [];
        }

        newLayout[index] = {
          points: {
            type: existingPointType,
            value: pointsArray,
          },
        };
      } else {
        newLayout[index] = { [type]: value };
      }

      return {
        ...prev,
        layout: newLayout,
      };
    });
  };

  // Add a helper function to safely handle points array
  const getPointsString = (points) => {
    if (!points) return "";
    if (Array.isArray(points)) return points.join("\n");
    if (typeof points === "string") return points;
    return "";
  };

  const handlePointTypeSelect = (selectedType) => {
    setNewSubService((prev) => ({
      ...prev,
      layout: [...prev.layout, { points: { type: selectedType, value: "" } }],
    }));
    setShowPointsDropdown(false);
  };

  const handlePointTypeSelectExisting = (selectedType, index) => {
    setServiceData((prev) => {
      const newLayout = [...prev.layout];
      newLayout.splice(index + 1, 0, {
        points: {
          type: selectedType,
          value: [],
        },
      });
      return {
        ...prev,
        layout: newLayout,
      };
    });
    setShowPointsDropdownExist(false);
  };

  const removeLayoutItem = (index) => {
    setNewSubService((prev) => ({
      ...prev,
      layout: prev.layout.filter((_, i) => i !== index),
    }));
  };

  const addFaqItem = () => {
    setNewSubService((prev) => ({
      ...prev,
      faqdata: {
        ...prev.faqdata,
        faq: [...prev.faqdata.faq, ["", ""]],
      },
    }));
  };

  const updateFaqItem = (index, field, value) => {
    setNewSubService((prev) => {
      const newFaq = [...prev.faqdata.faq];
      newFaq[index][field === "question" ? 0 : 1] = value;
      return {
        ...prev,
        faqdata: {
          ...prev.faqdata,
          faq: newFaq,
        },
      };
    });
  };

  const removeFaqItem = (index) => {
    setNewSubService((prev) => ({
      ...prev,
      faqdata: {
        ...prev.faqdata,
        faq: prev.faqdata.faq.filter((_, i) => i !== index),
      },
    }));
  };

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleImageUpload = async (file, field) => {
    setIsLoading(true);
    try {
      if (file) {
        const fileName = generateRandomString(10) + "_" + file.name;
        const storageRef = ref(
          storage,
          `subService/images/${Date.now()}_${fileName}`
        );
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        if (field === "hero") {
          handleHeroChange("image", url);
          handleHeroUpdate("image", url);
        } else if (field === "layout") {
          const index = newSubService.layout.findIndex(
            (item) => Object.keys(item)[0] === "image"
          );
          if (index !== -1) {
            updateLayoutItem(index, "image", [
              ...newSubService.layout[index].image,
              url,
            ]);
          }
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setIsLoading(false);
  };

  const handlePdfUpload = async (event, index) => {
    setIsLoading(true);
    try {
      const file = event.target.files[0];

      if (!file) {
        console.error("No file selected");
        return;
      }

      console.log("File being uploaded:", file.name);

      const fileName = generateRandomString(10) + "_" + file.name;
      const storageRef = ref(storage, `pdfs/${fileName}`);

      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // Update both states simultaneously
      setServiceData((prev) => {
        const updatedPdfList = [...(prev.pdfdata?.pdf || [])];
        if (index !== null) {
          updatedPdfList[index] = url;
        } else {
          updatedPdfList.push(url);
        }
        return {
          ...prev,
          pdfdata: {
            ...prev.pdfdata,
            heading: prev.pdfdata?.heading || "PDF",
            pdf: updatedPdfList,
          },
        };
      });

      // Update newMainService state as well
      setNewSubService((prev) => {
        const updatedPdfList = [...(prev.pdfdata?.pdf || [])];
        if (index !== null) {
          updatedPdfList[index] = url;
        } else {
          updatedPdfList.push(url);
        }
        return {
          ...prev,
          pdfdata: {
            ...prev.pdfdata,
            heading: prev.pdfdata?.heading || "PDF",
            pdf: updatedPdfList,
          },
        };
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
    setIsLoading(false);
  };

  // Update heading change handler to modify both states
  const handleHeadingChange = (value) => {
    // Update serviceData state
    setServiceData((prev) => ({
      ...prev,
      pdfdata: {
        ...prev.pdfdata,
        heading: value,
      },
    }));

    // Update newMainService state
    setNewSubService((prev) => ({
      ...prev,
      pdfdata: {
        ...prev.pdfdata,
        heading: value,
      },
    }));
  };

  const addPdfItem = () => {
    // Update serviceData state
    setServiceData((prev) => ({
      ...prev,
      pdfdata: {
        ...prev.pdfdata,
        pdf: [...(prev.pdfdata?.pdf || []), ""],
      },
    }));

    // Update newMainService state
    setNewSubService((prev) => ({
      ...prev,
      pdfdata: {
        ...prev.pdfdata,
        pdf: [...(prev.pdfdata?.pdf || []), ""],
      },
    }));
  };

  const removePdfItem = (index) => {
    setServiceData((prev) => ({
      ...prev,
      pdfdata: {
        ...prev.pdfdata,
        pdf: prev.pdfdata.pdf.filter((_, i) => i !== index),
      },
    }));

    setNewSubService((prev) => ({
      ...prev,
      pdfdata: {
        ...prev.pdfdata,
        pdf: prev.pdfdata.pdf.filter((_, i) => i !== index),
      },
    }));
  };

  const handleLayoutImageUpload = async (file, field, index) => {
    setIsLoading(true);
    try {
      const fileName = generateRandomString(10) + "_" + file.name;
      const storageRef = ref(
        storage,
        `mainService/images/${Date.now()}_${fileName}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setServiceData((prev) => {
        const newLayout = [...prev.layout];
        newLayout[index] = { image: url };
        return { ...prev, layout: newLayout };
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setIsLoading(false);
  };

  const handleSubmitNewSubService = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${serverUrl}/createSubService`, newSubService);
      console.log("New sub service created successfully");
      setNewSubService({
        serviceType: "sub",
        mainServiceId: "",
        hero: {
          tag: "",
          heading: "",
          description: "",
          image: "",
        },
        title: "",
        layout: [],
        faqdata: {
          heading: "Frequently Asked Questions",
          faq: [],
        },
        pdfdata: {
          heading: "Pdf",
          pdf: [],
        },
      });
      getServiceList();
      setToastConfig({
        type: "success",
        text: "New Sub Service Created Successfully.",
      });
      setShowToast(true);
    } catch (error) {
      setToastConfig({
        type: "error",
        text: "Please select a main service .",
      });
      setShowToast(true);
      console.error("Error creating new sub service:", error);
    }
    setIsLoading(false);
  };

  const handleEditSubService = async () => {
    if (!subServiceId) return;
    setIsLoading(true);
    try {
      await axios.put(
        `${serverUrl}/editSubService/${subServiceId}`,
        serviceData
      );
      console.log("Sub service updated successfully");
      getServiceList();
    } catch (error) {
      console.error("Error updating sub service:", error);
    }
    setIsLoading(false);
  };

  const handleDeleteSubService = async () => {
    if (!subServiceId) return;
    setIsLoading(true);
    try {
      await axios.delete(`${serverUrl}/deleteSubService/${subServiceId}`);
      console.log("Sub service deleted successfully");
      setSubServiceId("");
      setServiceData({});
      getServiceList();
    } catch (error) {
      console.error("Error deleting sub service:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      {isLoading && <Loader />}

      <AdminNav page="MANAGE SUB SERVICE" />

      <div className="AdminContainer">
        {windowWidth > 800 && serviceList && (
          <div className="AdminPreview">
            <SubService
              serviceData={subServiceId ? serviceData : newSubService}
              serviceList={serviceList}
              usedIn="admin"
            />
          </div>
        )}

        <div className="AdminForm">
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Create New Sub Service</p>
              {hideNew ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => {
                    setHideNew(false);
                    setHideExisting(true);
                  }}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideNew(true)}
                />
              )}
            </div>

            {!hideNew && (
              <>
                <div className="mt-4">
                  <h3 className="font-bold mb-2">Choose a main service</h3>
                  <select
                    className="AdminInput"
                    value={newSubService.mainServiceId}
                    onChange={(e) =>
                      handleNewSubServiceChange("mainServiceId", e.target.value)
                    }
                  >
                    <option value="">Select a main service</option>
                    {serviceList.map((service) => (
                      <option key={service._id} value={service._id}>
                        {Parser(service.title)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <h3 className="font-bold mb-2">Hero</h3>
                  <AdminInput
                    label="Tag"
                    type="input"
                    value={newSubService.hero.tag}
                    onChange={(e) => handleHeroChange("tag", e.target.value)}
                  />
                  <AdminInput
                    label="Heading"
                    type="input"
                    value={newSubService.hero.heading}
                    onChange={(e) =>
                      handleHeroChange("heading", e.target.value)
                    }
                  />
                  <AdminInput
                    label="Description"
                    type="textarea"
                    value={newSubService.hero.description}
                    onChange={(e) =>
                      handleHeroChange("description", e.target.value)
                    }
                  />
                  <AdminUpload
                    label="Hero Image"
                    type="image"
                    value={newSubService.hero.image}
                    onChange={(e) => handleHeroChange("image", e.target.value)}
                    handleUpload={(e) =>
                      handleImageUpload(e.target.files[0], "hero")
                    }
                  />
                </div>

                <div className="mt-4">
                  <h3 className="font-bold mb-2">Title</h3>
                  <AdminInput
                    label="Title"
                    type="input"
                    value={newSubService.title}
                    onChange={(e) =>
                      handleNewSubServiceChange("title", e.target.value)
                    }
                  />
                </div>

                <h3 className="font-bold mt-4 mb-2">Layout</h3>
                {newSubService.layout.map((item, index) => (
                  <div key={index} className="mb-4">
                    {Object.keys(item)[0] === "subtitle" && (
                      <AdminInput
                        type="input"
                        label="Subtitle"
                        value={item.subtitle}
                        onChange={(e) =>
                          updateLayoutItem(index, "subtitle", e.target.value)
                        }
                      />
                    )}
                    {Object.keys(item)[0] === "description" && (
                      <AdminInput
                        type="textarea"
                        label="Description"
                        value={item.description}
                        onChange={(e) =>
                          updateLayoutItem(index, "description", e.target.value)
                        }
                      />
                    )}
                    {Object.keys(item)[0] === "image" && (
                      <AdminUpload
                        label="Image"
                        type="image"
                        value={item.image}
                        handleUpload={(e) =>
                          handleImageUpload(e.target.files[0], "layout")
                        }
                      />
                    )}
                    {Object.keys(item)[0] === "points" && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          Type: {item.points.type}
                        </p>
                        <AdminInput
                          type="textarea"
                          label="Points (one per line)"
                          value={getPointsString(item.points?.type ? item.points.value : item.points)}
                          onChange={(e) =>
                            updateLayoutItem(index, "points", {
                              ...item.points,
                              value: e.target.value.split("\n"),
                            })
                          }
                        />
                      </div>
                    )}
                    <AdminBtn
                      btnColor="red"
                      text="Remove"
                      onClick={() => removeLayoutItem(index)}
                    />
                  </div>
                ))}

                <div className="flex flex-wrap gap-[10px] border-t-2 pt-[20px]">
                  <AdminBtn
                    text="Add Subtitle"
                    onClick={() => addLayoutItem("subtitle")}
                  />
                  <AdminBtn
                    text="Add Description"
                    onClick={() => addLayoutItem("description")}
                  />
                  <AdminBtn
                    text="Add Image"
                    onClick={() => addLayoutItem("image")}
                  />
                  <AdminBtn
                    text="Add Points"
                    onClick={() => addLayoutItem("points")}
                  />
                  {showPointsDropdown && (
                    <div className="relative mb-4">
                      <div className="absolute z-10 w-48 bg-white shadow-lg rounded-md border">
                        <div
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handlePointTypeSelect("default")}
                        >
                          Default
                        </div>
                        <div
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handlePointTypeSelect("bullet")}
                        >
                          Bullet
                        </div>
                        <div
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handlePointTypeSelect("checkmark")}
                        >
                          Checkmark
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <hr className="mt-4 bg-black h-[2px]" />
                <div className="mt-4">
                  <h3 className="font-bold text-[20px] mb-2">Profile Card</h3>
                  <AdminInput
                    label="Name"
                    type="input"
                    value={newSubService?.team?.name}
                    onChange={(e) => handleNewTeam("name", e.target.value)}
                  />
                  <AdminInput
                    label="Title"
                    type="input"
                    value={newSubService?.team?.title}
                    onChange={(e) => handleNewTeam("title", e.target.value)}
                  />
                  <AdminInput
                    label="Quote"
                    type="textarea"
                    value={newSubService?.team?.quote}
                    onChange={(e) => handleNewTeam("quote", e.target.value)}
                  />
                  <AdminUpload
                    label="Hero Image"
                    type="image"
                    value={newSubService?.team?.image}
                    onChange={(e) => handleNewTeam("image", e.target.value)}
                    handleUpload={(e) =>
                      handleImageUpload(e.target.files[0], "team")
                    }
                  />
                  <AdminInput
                    label="Whatsapp"
                    type="input"
                    value={newSubService?.team?.whatsapp}
                    onChange={(e) => handleNewTeam("whatsapp", e.target.value)}
                  />
                  <AdminInput
                    label="Facebook"
                    type="input"
                    value={newSubService?.team?.facebook}
                    onChange={(e) => handleNewTeam("facebook", e.target.value)}
                  />
                  <AdminInput
                    label="Instagram"
                    type="input"
                    value={newSubService?.team?.instagram}
                    onChange={(e) => handleNewTeam("instagram", e.target.value)}
                  />
                  <AdminInput
                    label="Linkedin"
                    type="input"
                    value={newSubService?.team?.linkedin}
                    onChange={(e) => handleNewTeam("linkedin", e.target.value)}
                  />
                  <AdminInput
                    label="Gmail"
                    type="input"
                    value={newSubService?.team?.gmail}
                    onChange={(e) => handleNewTeam("gmail", e.target.value)}
                  />
                  <AdminInput
                    label="Youtube"
                    type="input"
                    value={newSubService?.team?.youtube}
                    onChange={(e) => handleNewTeam("youtube", e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="font-bold mb-2">FAQ</h3>
                  {newSubService.faqdata.faq.map((faq, index) => (
                    <div key={index} className="mb-4">
                      <AdminInput
                        type="input"
                        label="Question"
                        value={faq[0]}
                        onChange={(e) =>
                          updateFaqItem(index, "question", e.target.value)
                        }
                      />
                      <AdminInput
                        type="textarea"
                        label="Answer"
                        value={faq[1]}
                        onChange={(e) =>
                          updateFaqItem(index, "answer", e.target.value)
                        }
                      />
                      <AdminBtn
                        btnColor="red"
                        text="Remove"
                        onClick={() => removeFaqItem(index)}
                      />
                    </div>
                  ))}
                  <AdminBtn text="Add FAQ" onClick={addFaqItem} />
                </div>

                <div className="mt-4">
                  <AdminInput
                    label="PDF Section Heading"
                    type="text"
                    value={newSubService?.pdfdata?.heading || "PDF"}
                    onChange={(e) => handleHeadingChange(e.target.value)}
                    className="mb-4"
                  />

                  {newSubService?.pdfdata?.pdf?.map((pdf, index) => (
                    <div key={index} className="mb-4">
                      <AdminUpload
                        label="PDF"
                        type="pdf"
                        value={pdf} // Display the URL
                        handleUpload={(event) => handlePdfUpload(event, index)}
                        onChange={(e) => {
                          setNewSubService((prev) => {
                            const newPdf = [...prev.pdfdata.pdf];
                            newPdf[index][field === "pdf" ? 0 : 1] = e; // Update based on the field
                            return {
                              ...prev,
                              pdfdata: {
                                ...prev.pdfdata,
                                pdf: newPdf,
                              },
                            };
                          });
                        }}
                      />

                      <AdminBtn
                        btnColor="red"
                        text="Remove"
                        onClick={() => removePdfItem(index)}
                      />
                    </div>
                  ))}

                  <AdminBtn text="Add PDF" onClick={addPdfItem} />
                </div>

                <div className="mt-2">
                  <h3 className="mt-1 font-bold">Right section</h3>
                  <AdminInput
                    type="input"
                    label="Heading"
                    value={newSubService.rightsection?.title}
                    onChange={(e) => {
                      setNewSubService((prev) => ({
                        ...prev,
                        rightsection: {
                          ...prev.rightsection,
                          title: e.target.value,
                        },
                      }));
                    }}
                  />
                  <AdminInput
                    type="textarea"
                    label="Description"
                    value={newSubService.rightsection?.description}
                    onChange={(e) => {
                      setNewSubService((prev) => ({
                        ...prev,
                        rightsection: {
                          ...prev.rightsection,
                          description: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>

                <AdminBtn
                  text="Create Sub Service"
                  className="mt-4"
                  onClick={handleSubmitNewSubService}
                />
              </>
            )}
          </div>
          <Toast
            visible={showToast}
            onClose={() => setShowToast(false)}
            {...toastConfig}
            transition="fade" // Add a fade transition
            duration={3000} // Keep it visible for 3 seconds
            className={`toast-message ${
              toastConfig.type === "success" ? "toast-success" : "toast-error"
            }`}
          />
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Manage Existing Sub Service</p>
              {hideExisting ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => {
                    setHideExisting(false);
                    setHideNew(true);
                  }}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideExisting(true)}
                />
              )}
            </div>

            {!hideExisting && (
              <>
                <h3 className="font-bold mt-4 mb-2">
                  Select a sub service to edit
                </h3>
                <select
                  className="AdminInput"
                  value={subServiceId}
                  onChange={(e) => setSubServiceId(e.target.value)}
                >
                  <option value="">Select a sub service</option>
                  {serviceList.map((mainService) =>
                    mainService.subService.map((subService) => (
                      <option key={subService._id} value={subService._id}>
                        {Parser(mainService.title)} - {Parser(subService.title)}
                      </option>
                    ))
                  )}
                </select>

                {serviceData && subServiceId && (
                  <>
                    <div className="mt-4">
                      <h3 className="font-bold mb-2">Hero</h3>
                      <AdminInput
                        label="Tag"
                        type="edit"
                        value={serviceData.hero?.tag || ""}
                        onChange={(e) =>
                          setServiceData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, tag: e },
                          }))
                        }
                      />
                      <AdminInput
                        label="Heading"
                        type="edit"
                        value={serviceData.hero?.heading || ""}
                        onChange={(e) =>
                          setServiceData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, heading: e },
                          }))
                        }
                      />
                      <AdminInput
                        label="Description"
                        type="edit"
                        value={serviceData.hero?.description || ""}
                        onChange={(e) =>
                          setServiceData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, description: e },
                          }))
                        }
                      />
                      <AdminUpload
                        label="Hero Image"
                        type="image"
                        value={serviceData.hero?.image || ""}
                        onChange={(e) =>
                          setServiceData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, image: e.target.value },
                          }))
                        }
                        handleUpload={(e) =>
                          handleImageUpload(e.target.files[0], "hero")
                        }
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="font-bold mb-2">Title</h3>
                      <AdminInput
                        label="Title"
                        type="edit"
                        value={serviceData.title || ""}
                        onChange={(e) =>
                          setServiceData((prev) => ({
                            ...prev,
                            title: e,
                          }))
                        }
                      />
                    </div>

                    <h3 className="font-bold mt-4 mb-2">Layout</h3>
                    {serviceData.layout &&
                      serviceData.layout.map((item, index) => (
                        <div key={index} className="mb-4">
                          {Object.keys(item)[0] === "subtitle" && (
                            <AdminInput
                              type="edit"
                              label="Subtitle"
                              value={item.subtitle}
                              onChange={(e) => {
                                const newLayout = [...serviceData.layout];
                                newLayout[index] = {
                                  subtitle: e,
                                };
                                setServiceData((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                            />
                          )}
                          {Object.keys(item)[0] === "description" && (
                            <AdminInput
                              type="edit"
                              label="Description"
                              value={item.description}
                              onChange={(e) => {
                                const newLayout = [...serviceData.layout];
                                newLayout[index] = {
                                  description: e,
                                };
                                setServiceData((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                            />
                          )}
                          {Object.keys(item)[0] === "image" && (
                            <AdminUpload
                              label="Image"
                              type="image"
                              value={item.image}
                              handleUpload={(e) =>
                                handleLayoutImageUpload(
                                  e.target.files[0],
                                  "layout",
                                  index
                                )
                              }
                              onChange={(e) => {
                                const newLayout = [...serviceData.layout];
                                newLayout[index] = {
                                  image: e.target.value,
                                };
                                setServiceData((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                            />
                          )}
                          {Object.keys(item)[0] === "points" && (
                            <div>
                              {item.points.type && <p className="text-sm text-gray-600 mb-2">
                                Type: {item.points.type}
                              </p>}
                              <AdminInput
                                type="edit"
                                label="Points (one per line)"
                                value={getPointsString(item.points?.type ? item.points.value : item.points )}
                                onChange={(e) => {
                                  const newLayout = [...serviceData.layout];
                                  newLayout[index] = {
                                    points: {
                                      type: item.points.type, // Preserve the existing type
                                      value: e
                                        .split("\n")
                                        .filter((point) => point.trim()), // Update only the value array
                                    },
                                  };
                                  setServiceData((prev) => ({
                                    ...prev,
                                    layout: newLayout,
                                  }));
                                }}
                              />
                            </div>
                          )}
                          <AdminBtn
                            btnColor="red"
                            text="Remove"
                            onClick={() => {
                              const newLayout = serviceData.layout.filter(
                                (_, i) => i !== index
                              );
                              setServiceData((prev) => ({
                                ...prev,
                                layout: newLayout,
                              }));
                            }}
                          />
                          {index !== serviceData.layout.length - 1 && (
                            <div className="flex flex-wrap gap-[10px] border-t-2 pt-[20px]">
                              <AdminBtn
                                text="Add Subtitle"
                                onClick={() => {
                                  const newLayout = [...serviceData.layout];
                                  newLayout.splice(index + 1, 0, {
                                    subtitle: "",
                                  });
                                  setServiceData((prev) => ({
                                    ...prev,
                                    layout: newLayout,
                                  }));
                                }}
                              />

                              <AdminBtn
                                text="Add Description"
                                onClick={() => {
                                  const newLayout = [...serviceData.layout];
                                  newLayout.splice(index + 1, 0, {
                                    description: "",
                                  });
                                  setServiceData((prev) => ({
                                    ...prev,
                                    layout: newLayout,
                                  }));
                                }}
                              />

                              <AdminBtn
                                text="Add Image"
                                onClick={() => {
                                  const newLayout = [...serviceData.layout];
                                  newLayout.splice(index + 1, 0, {
                                    image: "",
                                  });
                                  setServiceData((prev) => ({
                                    ...prev,
                                    layout: newLayout,
                                  }));
                                }}
                              />
                              
                              <AdminBtn
                                text="Add Points"
                                onClick={() => {
                                  setShowPointsDropdownExist(true);
                                  setPointesShowIndex(index);
                                }}
                              />
                              {showPointsDropdownExist &&
                                pointesShowIndex === index && (
                                  <div className="relative mb-4">
                                    <div className="absolute z-10 w-48 bg-white shadow-lg rounded-md border">
                                      <div
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() =>
                                          handlePointTypeSelectExisting(
                                            "default",
                                            index
                                          )
                                        }
                                      >
                                        Default
                                      </div>
                                      <div
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() =>
                                          handlePointTypeSelectExisting(
                                            "bullet",
                                            index
                                          )
                                        }
                                      >
                                        Bullet
                                      </div>
                                      <div
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() =>
                                          handlePointTypeSelectExisting(
                                            "checkmark",
                                            index
                                          )
                                        }
                                      >
                                        Checkmark
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      ))}

                    <div className="flex flex-wrap gap-[10px] border-t-2 pt-[20px]">
                      <AdminBtn
                        text="Add Subtitle"
                        onClick={() =>
                          setServiceData((prev) => ({
                            ...prev,
                            layout: [...prev.layout, { subtitle: "" }],
                          }))
                        }
                      />
                      <AdminBtn
                        text="Add Description"
                        onClick={() =>
                          setServiceData((prev) => ({
                            ...prev,
                            layout: [...prev.layout, { description: "" }],
                          }))
                        }
                      />
                      <AdminBtn
                        text="Add Image"
                        onClick={() =>
                          setServiceData((prev) => ({
                            ...prev,
                            layout: [...prev.layout, { image: "" }],
                          }))
                        }
                      />
                      <AdminBtn
                        text="Add Points"
                        onClick={() => addLayoutItemExist("points")}
                      />
                      {showPointsDropdownExist && (
                        <div className="relative mb-4">
                          <div className="absolute z-10 w-48 bg-white shadow-lg rounded-md border">
                            <div
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handlePointTypeSelectExisting("default")
                              }
                            >
                              Default
                            </div>
                            <div
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handlePointTypeSelectExisting("bullet")
                              }
                            >
                              Bullet
                            </div>
                            <div
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handlePointTypeSelectExisting("checkmark")
                              }
                            >
                              Checkmark
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <hr className="mt-4 bg-black h-[2px]" />
                    <div className="mt-4">
                      <h3 className="font-boldvtext-[20px] mb-2">
                        Profile Card
                      </h3>
                      <AdminInput
                        label="Name"
                        type="input"
                        value={serviceData?.team?.name}
                        onChange={(e) =>
                          handleChangeTeam("name", e.target.value)
                        }
                      />
                      <AdminInput
                        label="Title"
                        type="input"
                        value={serviceData?.team?.title}
                        onChange={(e) =>
                          handleChangeTeam("title", e.target.value)
                        }
                      />
                      <AdminInput
                        label="Quote"
                        type="textarea"
                        value={serviceData?.team?.quote}
                        onChange={(e) =>
                          handleChangeTeam("quote", e.target.value)
                        }
                      />
                      <AdminUpload
                        label="Hero Image"
                        type="image"
                        value={serviceData?.team?.image}
                        onChange={(e) =>
                          handleChangeTeam("image", e.target.value)
                        }
                        handleUpload={(e) =>
                          handleImageUpload(e.target.files[0], "team")
                        }
                      />
                      <AdminInput
                        label="Whatsapp"
                        type="input"
                        value={serviceData?.team?.whatsapp}
                        onChange={(e) =>
                          handleChangeTeam("whatsapp", e.target.value)
                        }
                      />
                      <AdminInput
                        label="Facebook"
                        type="input"
                        value={serviceData?.team?.facebook}
                        onChange={(e) =>
                          handleChangeTeam("facebook", e.target.value)
                        }
                      />
                      <AdminInput
                        label="Instagram"
                        type="input"
                        value={serviceData?.team?.instagram}
                        onChange={(e) =>
                          handleChangeTeam("instagram", e.target.value)
                        }
                      />
                      <AdminInput
                        label="Linkedin"
                        type="input"
                        value={serviceData?.team?.linkedin}
                        onChange={(e) =>
                          handleChangeTeam("linkedin", e.target.value)
                        }
                      />
                      <AdminInput
                        label="Gmail"
                        type="input"
                        value={serviceData?.team?.gmail}
                        onChange={(e) =>
                          handleChangeTeam("gmail", e.target.value)
                        }
                      />
                      <AdminInput
                        label="Youtube"
                        type="input"
                        value={serviceData?.team?.youtube}
                        onChange={(e) =>
                          handleChangeTeam("youtube", e.target.value)
                        }
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="font-bold mb-2">FAQ</h3>

                      {serviceData.faqdata &&
                        serviceData.faqdata.faq.map((faq, index) => (
                          <div key={index} className="mb-4">
                            <AdminInput
                              type="edit"
                              label="Question"
                              value={faq[0]}
                              onChange={(e) => {
                                const newFaq = [...serviceData.faqdata.faq];
                                newFaq[index][0] = e;
                                setServiceData((prev) => ({
                                  ...prev,
                                  faqdata: { ...prev.faqdata, faq: newFaq },
                                }));
                              }}
                            />
                            <AdminInput
                              type="edit"
                              label="Answer"
                              value={faq[1]}
                              onChange={(e) => {
                                const newFaq = [...serviceData.faqdata.faq];
                                newFaq[index][1] = e;
                                setServiceData((prev) => ({
                                  ...prev,
                                  faqdata: { ...prev.faqdata, faq: newFaq },
                                }));
                              }}
                            />

                            <div className="flex gap-x-4">
                              {index !== serviceData.faqdata.faq.length - 1 && (
                                <AdminBtn
                                  btnColor="green"
                                  text="Add FAQ"
                                  onClick={() => {
                                    const newFaq = [...serviceData.faqdata.faq];
                                    newFaq.splice(index + 1, 0, ["", ""]);
                                    setServiceData((prev) => ({
                                      ...prev,
                                      faqdata: { ...prev.faqdata, faq: newFaq },
                                    }));
                                  }}
                                />
                              )}

                              <AdminBtn
                                btnColor="red"
                                text="Remove"
                                onClick={() => {
                                  const newFaq = serviceData.faqdata.faq.filter(
                                    (_, i) => i !== index
                                  );
                                  setServiceData((prev) => ({
                                    ...prev,
                                    faqdata: { ...prev.faqdata, faq: newFaq },
                                  }));
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      <AdminBtn
                        text="Add FAQ"
                        onClick={() =>
                          setServiceData((prev) => ({
                            ...prev,
                            faqdata: {
                              ...prev.faqdata,
                              faq: [...prev.faqdata.faq, ["", ""]],
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="mt-4">
                      {/* Add input for heading */}
                      <AdminInput
                        label="PDF Section Heading"
                        type="text"
                        value={serviceData.pdfdata?.heading || "PDF"}
                        onChange={(e) => handleHeadingChange(e.target.value)}
                        className="mb-4"
                      />

                      {serviceData.pdfdata?.pdf &&
                        serviceData.pdfdata.pdf.map((pdf, index) => (
                          <div key={index} className="mb-4">
                            <AdminUpload
                              label="PDF"
                              type="pdf"
                              value={pdf}
                              handleUpload={(event) =>
                                handlePdfUpload(event, index)
                              }
                              onChange={(e) => {
                                const newPdf = [...serviceData.pdfdata.pdf];
                                newPdf[index] = e.target.value;
                                setServiceData((prev) => ({
                                  ...prev,
                                  pdfdata: {
                                    ...prev.pdfdata,
                                    pdf: newPdf,
                                  },
                                }));
                              }}
                            />

                            {/* Remove Button */}
                            <AdminBtn
                              btnColor="red"
                              text="Remove"
                              onClick={() => {
                                const newPdf = serviceData.pdfdata.pdf.filter(
                                  (_, i) => i !== index
                                );
                                setServiceData((prev) => ({
                                  ...prev,
                                  pdfdata: {
                                    ...prev.pdfdata,
                                    pdf: newPdf,
                                  },
                                }));
                              }}
                            />
                          </div>
                        ))}

                      {/* Add New PDF */}
                      <AdminBtn
                        text="Add PDF"
                        onClick={() =>
                          setServiceData((prev) => ({
                            ...prev,
                            pdfdata: {
                              ...prev.pdfdata,
                              heading: prev.pdfdata?.heading || "PDF", // Preserve the heading
                              pdf: [...(prev.pdfdata?.pdf || []), ""],
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="mt-2">
                      <AdminInput
                        type="edit"
                        label="Heading"
                        value={serviceData.rightsection?.title}
                        onChange={(e) => {
                          setServiceData((prev) => ({
                            ...prev,
                            rightsection: {
                              ...prev.rightsection,
                              title: e,
                            },
                          }));
                        }}
                      />
                      <AdminInput
                        type="edit"
                        label="Description"
                        value={serviceData.rightsection?.description}
                        onChange={(e) => {
                          setServiceData((prev) => ({
                            ...prev,
                            rightsection: {
                              ...prev.rightsection,
                              description: e,
                            },
                          }));
                        }}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-[10px] mt-4 border-t-2 pt-[20px]">
                      <AdminBtn
                        width="100%"
                        className="w-full"
                        btnColor="green"
                        text="Update Sub Service"
                        onClick={handleEditSubService}
                      />
                      <AdminBtn
                        width="100%"
                        btnColor="red"
                        className="w-full"
                        text="Delete Sub Service"
                        onClick={() => setPopup(true)}
                      />
                    </div>

                    {popup && (
                      <div className="w-full h-fit flex flex-col gap-[10px] mt-[10px] bg-white rounded-[15px]">
                        <p className="text-[#ff3636] pl-[2px]">
                          Are you sure you want to delete this?
                        </p>
                        <div className="flex gap-[10px]">
                          <AdminBtn
                            text="Cancel"
                            onClick={() => setPopup(false)}
                          />
                          <AdminBtn
                            text="Delete"
                            btnColor="#f6dbdb"
                            onClick={handleDeleteSubService}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
