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
import SingleService from "@/component/SingleService/SingleService";
import Loader from "@/component/UI/Loader";
import Parser from "@/component/UI/Parser";

export default function ManageMainService() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hideNew, setHideNew] = useState(true);
  const [hideExisting, setHideExisting] = useState(false);
  const [serviceData, setServiceData] = useState({});
  const [serviceList, setServiceList] = useState([]);
  const [mainServiceId, setMainServiceId] = useState("");
  const [popup, setPopup] = useState(false);

  // Initialize with proper data structure
  const [newMainService, setNewMainService] = useState({
    serviceType: "main",
    hero: {
      tag: "",
      heading: "",
      description: "",
      image: "",
    },
    title: "",
    coverimage: "",
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

  console.log(serviceData);

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

  // Helper function to ensure points is always an array
  const ensureArray = (value) => {
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  };

  // Modified updateLayoutItem function with type checking
  const updateLayoutItem = (index, type, value) => {
    setNewMainService((prev) => {
      const newLayout = [...prev.layout];
      if (type === "points") {
        // Ensure points is always an array
        const pointsArray =
          typeof value === "string"
            ? value.split("\n").filter((point) => point.trim() !== "")
            : ensureArray(value);
        newLayout[index] = { [type]: pointsArray };
      } else if (type === "image") {
        // Ensure image is always an array
        const imageArray = Array.isArray(value) ? value : [value];
        newLayout[index] = { [type]: imageArray };
      } else {
        newLayout[index] = { [type]: value };
      }
      return { ...prev, layout: newLayout };
    });
  };

  // Modified layout rendering with safe access
  const renderLayoutItem = (item, index) => {
    const itemType = Object.keys(item)[0];

    switch (itemType) {
      case "points":
        return (
          <AdminInput
            type="textarea"
            label="Points (one per line)"
            value={ensureArray(item.points).join("\n")}
            onChange={(e) => updateLayoutItem(index, "points", e.target.value)}
          />
        );
      case "subtitle":
        return (
          <AdminInput
            type="input"
            label="Subtitle"
            value={item.subtitle || ""}
            onChange={(e) =>
              updateLayoutItem(index, "subtitle", e.target.value)
            }
          />
        );
      case "description":
        return (
          <AdminInput
            type="textarea"
            label="Description"
            value={item.description || ""}
            onChange={(e) =>
              updateLayoutItem(index, "description", e.target.value)
            }
          />
        );
      case "image":
        return (
          <AdminUpload
            label="Image"
            type="image"
            value={item.image || []}
            onChange={(e) => updateLayoutItem(index, "image", e.target.value)}
            handleUpload={(e) => handleImageUpload(e.target.files[0], "layout")}
          />
        );
      default:
        return null;
    }
  };

  const getMainService = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${serverUrl}/getMainService/${mainServiceId}`
      );
      setServiceData(data.mainService);
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
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getServiceList();
  }, []);

  useEffect(() => {
    if (mainServiceId) {
      getMainService();
    }
  }, [mainServiceId]);

  const handleNewMainServiceChange = (field, value) => {
    setNewMainService((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleHeroChange = (field, value) => {
    setNewMainService((prev) => ({
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

  const addLayoutItem = (type) => {
    setNewMainService((prev) => ({
      ...prev,
      layout: [...prev.layout, { [type]: type === "image" ? [] : "" }],
    }));
  };

  // const updateLayoutItem = (index, type, value) => {
  //   setNewMainService((prev) => {
  //     const newLayout = [...prev.layout];
  //     newLayout[index] = { [type]: value };
  //     return { ...prev, layout: newLayout };
  //   });
  // };

  const removeLayoutItem = (index) => {
    setNewMainService((prev) => ({
      ...prev,
      layout: prev.layout.filter((_, i) => i !== index),
    }));
  };

  const addFaqItem = () => {
    setNewMainService((prev) => ({
      ...prev,
      faqdata: {
        ...prev.faqdata,
        faq: [...prev.faqdata.faq, ["", ""]],
      },
    }));
  };

  const updateFaqItem = (index, field, value) => {
    setNewMainService((prev) => {
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
    setNewMainService((prev) => ({
      ...prev,
      faqdata: {
        ...prev.faqdata,
        faq: prev.faqdata.faq.filter((_, i) => i !== index),
      },
    }));
  };



  // const updatePdfItem = (index, field, value) => {
  //   setNewMainService((prev) => {
  //     const newPdf = [...prev.pdfdata.pdf];
  //     newPdf[index][field === "pdf" ? 0 : 1] = value; // Update based on the field
  //     return {
  //       ...prev,
  //       pdfdata: {
  //         ...prev.pdfdata,
  //         pdf: newPdf,
  //       },
  //     };
  //   });
  // };

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
      const fileName = generateRandomString(10) + "_" + file.name;
      const storageRef = ref(
        storage,
        `mainService/images/${Date.now()}_${fileName}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      if (field === "hero") {
        handleHeroChange("image", url);
        handleHeroUpdate("image", url);
      } else if (field === "coverimage") {
        handleNewMainServiceChange("coverimage", url);
      } else if (field === "layout") {
        const index = newMainService.layout.findIndex(
          (item) => Object.keys(item)[0] === "image"
        );
        if (index !== -1) {
          updateLayoutItem(index, "image", [
            ...newMainService.layout[index].image,
            url,
          ]);
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
      setNewMainService((prev) => {
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
    setNewMainService((prev) => ({
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
    setNewMainService((prev) => ({
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

    setNewMainService((prev) => ({
      ...prev,
      pdfdata: {
        ...prev.pdfdata,
        pdf: prev.pdfdata.pdf.filter((_, i) => i !== index),
      },
    }));
  };
  
  

  const handleSubmitNewMainService = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${serverUrl}/createMainService`, newMainService);
      console.log("New main service created successfully");
      console.log(newMainService);
      setNewMainService({
        serviceType: "main",
        hero: {
          tag: "",
          heading: "",
          description: "",
          image: "",
        },
        title: "",
        coverimage: "",
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
    } catch (error) {
      console.error("Error creating new main service:", error);
    }
    setIsLoading(false);
  };

  const handleEditMainService = async () => {
    if (!mainServiceId) return;
    setIsLoading(true);
    try {
      await axios.put(
        `${serverUrl}/editMainService/${mainServiceId}`,
        serviceData
      );
      console.log("Main service updated successfully");
      getServiceList();
    } catch (error) {
      console.error("Error updating main service:", error);
    }
    setIsLoading(false);
  };

  const handleDeleteMainService = async () => {
    if (!mainServiceId) return;
    setIsLoading(true);
    try {
      await axios.delete(`${serverUrl}/deleteMainService/${mainServiceId}`);
      console.log("Main service deleted successfully");
      setMainServiceId("");
      setServiceData({});
      getServiceList();
    } catch (error) {
      console.error("Error deleting main service:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      {isLoading && <Loader />}

      <AdminNav page="MANAGE MAIN SERVICE" />

      <div className="AdminContainer">
        {windowWidth > 800 && serviceList && (
          <div className="AdminPreview">
            <SingleService
              serviceData={mainServiceId ? serviceData : newMainService}
              serviceList={serviceList}
              usedIn="admin"
            />
          </div>
        )}

        <div className="AdminForm">
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Create New Main Service</p>
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
                  <h3 className="font-bold mb-2">Hero</h3>
                  <AdminInput
                    label="Tag"
                    type="edit"
                    value={newMainService.hero.tag}
                    onChange={(e) => handleHeroChange("tag", e)}
                  />
                  <AdminInput
                    label="Heading"
                    type="edit"
                    value={newMainService.hero.heading}
                    onChange={(e) => handleHeroChange("heading", e)}
                  />
                  <AdminInput
                    label="Description"
                    type="edit"
                    value={newMainService.hero.description}
                    onChange={(e) => handleHeroChange("description", e)}
                  />
                  <AdminUpload
                    label="Hero Image"
                    type="image"
                    value={newMainService.hero.image}
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
                    type="edit"
                    value={newMainService.title}
                    onChange={(e) => handleNewMainServiceChange("title", e)}
                  />
                  <AdminUpload
                    label="Cover Image"
                    type="image"
                    value={newMainService.coverimage}
                    onChange={(e) =>
                      handleNewMainServiceChange("coverimage", e.target.value)
                    }
                    handleUpload={(e) =>
                      handleImageUpload(e.target.files[0], "coverimage")
                    }
                  />
                </div>

                <div className="mt-4">
                  <h3 className="font-bold mb-2">Layout</h3>
                  {newMainService.layout.map((item, index) => (
                    <div key={index} className="mb-4">
                      {renderLayoutItem(item, index)}
                      <AdminBtn
                        btnColor="red"
                        text="Remove"
                        onClick={() => removeLayoutItem(index)}
                      />
                    </div>
                  ))}
                </div>

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
                </div>

                <div className="mt-4">
                  <h3 className="font-bold mb-2">FAQ</h3>
                  {newMainService.faqdata.faq.map((faq, index) => (
                    <div key={index} className="mb-4">
                      <AdminInput
                        type="edit"
                        label="Question"
                        value={faq[0]}
                        onChange={(e) => updateFaqItem(index, "question", e)}
                      />
                      <AdminInput
                        type="edit"
                        label="Answer"
                        value={faq[1]}
                        onChange={(e) => updateFaqItem(index, "answer", e)}
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
                        value={serviceData?.pdfdata?.heading || "PDF"}
                        onChange={(e) => handleHeadingChange(e.target.value)}
                        className="mb-4"
                      />
                    
                  {serviceData?.pdfdata?.pdf?.map((pdf, index) => (
                    <div key={index} className="mb-4">
                      <AdminUpload
                        label="PDF"
                        type="pdf"
                        value={pdf} // Display the URL
                        handleUpload={(event) => handlePdfUpload(event, index)}
                        onChange={(e) => {
                         
                          setNewMainService((prev) => {
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

                <AdminBtn
                  text="Create Main Service"
                  className="mt-4"
                  onClick={handleSubmitNewMainService}
                />
              </>
            )}
          </div>

          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Manage Existing Main Service</p>
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
                  Select a main service to edit
                </h3>
                <select
                  className="AdminInput"
                  value={mainServiceId}
                  onChange={(e) => setMainServiceId(e.target.value)}
                >
                  <option value="">Select a main service</option>
                  {serviceList.map((service) => (
                    <option key={service._id} value={service._id}>
                      {Parser(service.title)}
                    </option>
                  ))}
                </select>

                {serviceData && mainServiceId && (
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
                      <AdminUpload
                        label="Cover Image"
                        type="image"
                        value={serviceData.coverimage || ""}
                        onChange={(e) =>
                          setServiceData((prev) => ({
                            ...prev,
                            coverimage: e.target.value,
                          }))
                        }
                        handleUpload={(e) =>
                          handleImageUpload(e.target.files[0], "coverimage")
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
                              value={item.image[0] || ""} // Show first image URL in input
                              onChange={(e) => {
                                const newLayout = [...serviceData.layout];
                                // Update only the first image URL in the array
                                newLayout[index] = {
                                  image: [e.target.value], // Keep it as an array with single URL
                                };
                                setServiceData((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                              handleUpload={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setIsLoading(true);
                                  const fileName =
                                    generateRandomString(10) + "_" + file.name;
                                  const storageRef = ref(
                                    storage,
                                    `mainService/images/${Date.now()}_${fileName}`
                                  );

                                  uploadBytes(storageRef, file)
                                    .then((snapshot) =>
                                      getDownloadURL(snapshot.ref)
                                    )
                                    .then((url) => {
                                      const newLayout = [...serviceData.layout];
                                      newLayout[index] = {
                                        image: [
                                          ...(newLayout[index].image || []),
                                          url,
                                        ], // Append new URL to existing array
                                      };
                                      setServiceData((prev) => ({
                                        ...prev,
                                        layout: newLayout,
                                      }));
                                      setIsLoading(false);
                                    })
                                    .catch((error) => {
                                      console.error(
                                        "Error uploading image:",
                                        error
                                      );
                                      setIsLoading(false);
                                    });
                                }
                              }}
                            />
                          )}
                          {Object.keys(item)[0] === "points" && (
                            <AdminInput
                              type="textarea"
                              label="Points (one per line)"
                              value={item.points.join("\n")}
                              onChange={(e) => {
                                const newLayout = [...serviceData.layout];
                                newLayout[index] = {
                                  points: e.target.value.split("\n"),
                                };
                                setServiceData((prev) => ({
                                  ...prev,
                                  layout: newLayout,
                                }));
                              }}
                            />
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
                                  newLayout.splice(index + 1, 0, { image: [] });
                                  setServiceData((prev) => ({
                                    ...prev,
                                    layout: newLayout,
                                  }));
                                }}
                              />

                              <AdminBtn
                                text="Add Points"
                                onClick={() => {
                                  const newLayout = [...serviceData.layout];
                                  newLayout.splice(index + 1, 0, {
                                    points: [],
                                  });
                                  setServiceData((prev) => ({
                                    ...prev,
                                    layout: newLayout,
                                  }));
                                }}
                              />
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
                            layout: [...prev.layout, { image: [] }],
                          }))
                        }
                      />
                      <AdminBtn
                        text="Add Points"
                        onClick={() =>
                          setServiceData((prev) => ({
                            ...prev,
                            layout: [...prev.layout, { points: [] }],
                          }))
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

                    <div className="flex flex-col sm:flex-row gap-[10px] mt-4 border-t-2 pt-[20px]">
                      <AdminBtn
                        width="100%"
                        className="w-full"
                        btnColor="green"
                        text="Update Main Service"
                        onClick={handleEditMainService}
                      />
                      <AdminBtn
                        width="100%"
                        btnColor="red"
                        className="w-full"
                        text="Delete Main Service"
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
                            onClick={handleDeleteMainService}
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
