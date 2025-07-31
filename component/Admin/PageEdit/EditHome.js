"use client";
import React, { useEffect, useState } from "react";
import { serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";
import AdminUpload from "../AdminUi/AdminUpload";
import Homepage from "@/component/Homepage/Homepage";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function EditHome() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const [windowWidth, setWindowWidth] = useState(0);
  const [hideHero, setHideHero] = useState(false);
  const [hideClient, setHideClient] = useState(false);
  const [hideService, setHideService] = useState(false);
  const [hideBlog, setHideBlog] = useState(false);
  const [hideReason, setHideReason] = useState(false);
  const [hideAbout, setHideAbout] = useState(false);
  const [hideGallery, setHideGallery] = useState(false);
  const [hideReviews, setHideReviews] = useState(false);
  const [hideFaq, setHideFaq] = useState(false);
  const [FaqData, setFaqData] = useState({
    heading: "",
    faq: [], // Array of [question, answer]
  });

  const [homeData, setHomeData] = useState({
    hero: { heading: "", description: "", image: "", default: false },
    client: { heading: "", image: [""], default: false },
    service: {
      heading: "",
      description: "",
      all: false,
      selected: [0],
      default: false,
    },
    blog: {
      heading: "",
      description: "",
      all: false,
      selected: [0],
      default: false,
    },
    reason: {
      heading: "",
      description: "",
      cards: [{ logo: "", tag: "", value: "" }],
      default: false,
    },
    about: {
      heading: "",
      subheading: "",
      description: ["", ""],
      link: "",
      image: "",
      default: false,
    },
    gallery: {
      heading: "",
      description: "",
      video: "",
      extra: {
        heading: "",
        description: "",
        cards: [{ logo: "", heading: "", description: "" }],
      },
      default: false,
    },
    reviews: {
      heading: "",
      description: "",
      all: false,
      selected: [0],
      default: false,
    },
  });

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

  const handleInputChange = (section, field, value) => {
    setHomeData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleInputChange2 = (section, fieldPath, value) => {
    setHomeData((prevData) => {
      const newSection = { ...prevData[section] };
      const keys = fieldPath.split(".");
      let current = newSection;
  
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
  
      current[keys[keys.length - 1]] = value;
  
      return {
        ...prevData,
        [section]: newSection,
      };
    });
  };

  const handleInputChangeGallery = (section,field,key, value) => {
    setHomeData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: {
          ...prevData.gallery.extra,
          [key] : value
        }
      },
    }));
  };
  const handleSubmit = async () => {
    try {
      await axios.put(`${serverUrl}/editHome`, homeData);
      console.log("Home data updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitFaq = async () => {
    try {
      await axios.put(`${serverUrl}/editFaq`, FaqData);
      console.log("Faq data updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const getHome = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getHome`);
      setHomeData(data.homeData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHome();
  }, []);

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

  const uploadToFirebase = async (file, folder = "homePage") => {
    const fileName = generateRandomString(10) + "_" + file.name;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleUpload = async (e, section, index = null) => {
    if (e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const url = await uploadToFirebase(file);

        if (section === "client") {
          const newImages = [...homeData.client.image];
          newImages[index] = url;
          handleInputChange("client", "image", newImages);
        } else if (section === "reason") {
          const newCards = [...homeData.reason.cards];
          newCards[index].logo = url;
          handleInputChange("reason", "cards", newCards);
        } else if(section === "gallery"){
          const newCards = [...homeData.gallery.extra.cards]
          newCards[index].logo =url;
        } else {
          handleInputChange(section, "image", url);
        }

        console.log("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDelete = async (section, index = null) => {
    try {
      let imageUrl;
      if (section === "client") {
        imageUrl = homeData.client.image[index];
      } else if (section === "reason") {
        imageUrl = homeData.reason.cards[index].logo;
      } else {
        imageUrl = homeData[section].image;
      }

      if (imageUrl) {
        const fileRef = ref(storage, imageUrl);
        await deleteObject(fileRef);
      }

      if (section === "client") {
        const newImages = homeData.client.image.filter((_, i) => i !== index);
        handleInputChange("client", "image", newImages);
      } else if (section === "reason") {
        const newCards = [...homeData.reason.cards];
        newCards[index].logo = "";
        handleInputChange("reason", "cards", newCards);
      }else if(section === "gallery"){
       const newCards = [...homeData.gallery.extra.cards]
       newCards[index] = ""
       handleInputChangeGallery("gallery","extra","cards",newCards)
      } else {
        handleInputChange(section, "image", "");
      }

      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const addReasonCard = () => {
    const newCards = [
      ...homeData.reason.cards,
      { logo: "", tag: "", value: "" },
    ];
    handleInputChange("reason", "cards", newCards);
  };

  const removeReasonCard = (index) => {
    const newCards = homeData.reason.cards.filter((_, i) => i !== index);
    handleInputChange("reason", "cards", newCards);
  };

  const getFAQData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getFaq`);
      setFaqData(data.faqData);
      return;
    } catch (error) {
      console.log(error);
    }
    return {};
  };

  useEffect(() => {
    getFAQData();
  }, []);

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden  select-none">
      <AdminNav page="EDIT HOME" />

      <div className="AdminContainer">
        {windowWidth > 800 && (
          <div className="AdminPreview">
            <Homepage homeData={homeData} faqData={FaqData} usedIn="admin" />
          </div>
        )}

        <div className="AdminForm">
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Hero</p>
              {hideHero ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideHero(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideHero(true)}
                />
              )}
            </div>

            {!hideHero && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={homeData.hero.heading}
                  onChange={(e) => handleInputChange("hero", "heading", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={homeData.hero.description}
                  onChange={(e) => handleInputChange("hero", "description", e)}
                />
                <AdminUpload
                  label="Hero Image"
                  type="image"
                  value={homeData.hero.image}
                  handleUpload={(e) => handleUpload(e, "hero")}
                  handleDelete={() => handleDelete("hero")}
                  onChange={(e) =>
                    handleInputChange("hero", "image", e.target.value)
                  }
                />
                <AdminBtn
                  text="Save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          {/* About Section */}
          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">About</p>
              {hideAbout ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideAbout(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideAbout(true)}
                />
              )}
            </div>

            {!hideAbout && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={homeData.about.heading}
                  onChange={(e) => handleInputChange("about", "heading", e)}
                />
                <AdminInput
                  label="Subheading"
                  className="w-full"
                  type="edit"
                  value={homeData.about.subheading}
                  onChange={(e) => handleInputChange("about", "subheading", e)}
                />
                <AdminInput
                  label="Description 1"
                  className="w-full"
                  type="edit"
                  value={homeData.about.description[0]}
                  onChange={(e) => {
                    const newDescription = [...homeData.about.description];
                    newDescription[0] = e;
                    handleInputChange("about", "description", newDescription);
                  }}
                />
                <AdminInput
                  label="Description 2"
                  className="w-full"
                  type="edit"
                  value={homeData.about.description[1]}
                  onChange={(e) => {
                    const newDescription = [...homeData.about.description];
                    newDescription[1] = e;
                    handleInputChange("about", "description", newDescription);
                  }}
                />
                <AdminInput
                  label="Link"
                  className="w-full"
                  type="input"
                  value={homeData.about.link}
                  onChange={(e) =>
                    handleInputChange("about", "link", e.target.value)
                  }
                />
                <AdminInput
                  label="Video"
                  className="w-full"
                  type="input"
                  value={homeData.about.image}
                  onChange={(e) =>
                    handleInputChange("about", "image", e.target.value)
                  }
                />
                {/* <AdminUpload
                  label="About Image"
                  type="image"
                  value={homeData.about.image}
                  handleUpload={(e) => handleUpload(e, "about")}
                  handleDelete={() => handleDelete("about")}
                  onChange={(e) =>
                    handleInputChange("about", "image", e.target.value)
                  }
                /> */}

                <AdminBtn
                  text="Save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          {/* Client Section */}
          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Client</p>
              {hideClient ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideClient(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideClient(true)}
                />
              )}
            </div>

            {!hideClient && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={homeData.client.heading}
                  onChange={(e) => handleInputChange("client", "heading", e)}
                />
                {homeData.client.image.map((img, index) => (
                  <div key={index} className="flex items-center mb-[10px]">
                    <AdminUpload
                      label={`Client Image ${index + 1}`}
                      type="image"
                      value={img}
                      handleUpload={(e) => handleUpload(e, "client", index)}
                      handleDelete={() => handleDelete("client", index)}
                      onChange={(e) => {
                        const newImages = [...homeData.client.image];
                        newImages[index] = e.target.value;
                        handleInputChange("client", "image", newImages);
                      }}
                    />
                    <AdminBtn
                      text="Remove"
                      onClick={() => handleDelete("client", index)}
                    />
                  </div>
                ))}
                <AdminBtn
                  text="Add Client Image"
                  onClick={() =>
                    handleInputChange("client", "image", [
                      ...homeData.client.image,
                      "",
                    ])
                  }
                />
                <AdminBtn
                  text="Save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Service</p>{" "}
              {hideService ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideService(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideService(true)}
                />
              )}
            </div>

            {!hideService && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={homeData.service.heading}
                  onChange={(e) => handleInputChange("service", "heading", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={homeData.service.description}
                  onChange={(e) =>
                    handleInputChange("service", "description", e)
                  }
                />

                <div></div>

                <AdminBtn
                  text="save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Blog</p>{" "}
              {hideBlog ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideBlog(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideBlog(true)}
                />
              )}
            </div>

            {!hideBlog && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={homeData.blog.heading}
                  onChange={(e) => handleInputChange("blog", "heading", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={homeData.blog.description}
                  onChange={(e) => handleInputChange("blog", "description", e)}
                />
                <AdminBtn
                  text="save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          {/* Reason Section */}
          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Reason</p>
              {hideReason ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideReason(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideReason(true)}
                />
              )}
            </div>

            {!hideReason && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={homeData.reason.heading}
                  onChange={(e) => handleInputChange("reason", "heading", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={homeData.reason.description}
                  onChange={(e) =>
                    handleInputChange("reason", "description", e)
                  }
                />
                {homeData.reason.cards.map((card, index) => (
                  <div key={index} className="mb-[20px] border-b pb-[10px]">
                    <AdminUpload
                      label={`Card ${index + 1} Logo`}
                      type="image"
                      value={card.logo}
                      handleUpload={(e) => handleUpload(e, "reason", index)}
                      handleDelete={() => handleDelete("reason", index)}
                      onChange={(e) => {
                        const newCards = [...homeData.reason.cards];
                        newCards[index].logo = e.target.value;
                        handleInputChange("reason", "cards", newCards);
                      }}
                    />
                    <AdminInput
                      label={`Card ${index + 1} Tag`}
                      className="w-full"
                      type="edit"
                      value={card.tag}
                      onChange={(e) => {
                        const newCards = [...homeData.reason.cards];
                        newCards[index].tag = e;
                        handleInputChange("reason", "cards", newCards);
                      }}
                    />
                    <AdminInput
                      label={`Card ${index + 1} Value`}
                      className="w-full"
                      type="edit"
                      value={card.value}
                      onChange={(e) => {
                        const newCards = [...homeData.reason.cards];
                        newCards[index].value = e;
                        handleInputChange("reason", "cards", newCards);
                      }}
                    />
                    <AdminBtn
                      text="Remove Card"
                      onClick={() => removeReasonCard(index)}
                    />
                  </div>
                ))}
                <AdminBtn text="Add Reason Card" onClick={addReasonCard} />
                <AdminBtn
                  text="Save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Gallery</p>{" "}
              {hideGallery ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideGallery(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideGallery(true)}
                />
              )}
            </div>

            {!hideGallery && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={homeData.gallery.heading}
                  onChange={(e) => handleInputChange("gallery", "heading", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={homeData.gallery.description}
                  onChange={(e) =>
                    handleInputChange("gallery", "description", e)
                  }
                />
                <AdminInput
                  label="Video"
                  className="w-full"
                  type="input"
                  value={homeData.gallery.video}
                  onChange={(e) =>
                    handleInputChange("gallery", "video", e.target.value)
                  }
                />
                <AdminInput
                  label="Extra Heading"
                  className="w-full"
                  type="input"
                  value={homeData.gallery.extra.heading}
                  onChange={(e) =>
                    handleInputChange2(
                      "gallery",
                      "extra.heading",
                      e.target.value
                    )
                  }
                />
                <AdminInput
                  label="Extra Description"
                  className="w-full"
                  type="textarea"
                  value={homeData.gallery.extra.description}
                  onChange={(e) =>
                    handleInputChange2(
                      "gallery",
                      "extra.description",
                      e.target.value
                    )
                  }
                />
                {homeData.gallery?.extra.cards?.map((card, index) => (
                  <div key={index} className="mb-[20px] border-b pb-[10px]">
                    <AdminUpload
                      label={`Card ${index + 1} Logo`}
                      type="image"
                      value={card.logo}
                      handleUpload={(e) => handleUpload(e, "gallery", index)}
                      handleDelete={() => handleDelete("gallery", index)}
                      onChange={(e) => {
                        const newCards = [...homeData.reason.cards];
                        newCards[index].logo = e.target.value;
                        handleInputChangeGallery("gallery","extra","cards",newCards);
                      }}
                    />
                    <AdminInput
                      label={`Card ${index + 1} Heading`}
                      className="w-full"
                      type="edit"
                      value={card?.heading}
                      onChange={(e) => {
                        const newCards = [...homeData.gallery?.extra?.cards];
                        newCards[index].heading = e;
                        setHomeData((prevData) => ({
                          ...prevData,
                          gallery: {
                            ...prevData.gallery,
                            extra: {
                              ...prevData.gallery.extra,
                              cards:newCards
                            }
                          },
                        }));
                      }}
                    />
                    <AdminInput
                      label={`Card ${index + 1} Description`}
                      className="w-full"
                      type="edit"
                      value={card?.description}
                      onChange={(e) => {
                        const newCards = [...homeData?.gallery?.extra?.cards];
                        newCards[index].description = e;
                        setHomeData((prevData) => ({
                          ...prevData,
                          gallery: {
                            ...prevData.gallery,
                            extra: {
                              ...prevData.gallery.extra,
                              cards:newCards
                            }
                          },
                        }));
                      }}
                    />
                    {/* <AdminBtn
                      text="Remove Card"
                      onClick={() => removeReasonCard(index)}
                    /> */}
                  </div>
                ))}
                {/* <AdminBtn text="Add Reason Card" onClick={addReasonCard} /> */}
                <AdminBtn
                  text="save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>

          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Reviews</p>{" "}
              {hideReviews ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideReviews(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideReviews(true)}
                />
              )}
            </div>

            {!hideReviews && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="input"
                  value={homeData.reviews.heading}
                  onChange={(e) =>
                    handleInputChange("reviews", "heading", e.target.value)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="textarea"
                  value={homeData.reviews.description}
                  onChange={(e) =>
                    handleInputChange("reviews", "description", e.target.value)
                  }
                />
                <AdminBtn
                  text="save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
              </>
            )}
          </div>
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">FAQ</p>{" "}
              {hideFaq ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideFaq(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideFaq(true)}
                />
              )}
            </div>

            {!hideFaq && (
              <>
                {FaqData &&
                  FaqData.faq?.map((f, index) => {
                    return (
                      <div key={index} className="mb-4">
                        <AdminInput
                          type="edit"
                          label="Question"
                          value={f[0]}
                          onChange={(e) => {
                            const newFaq = [...FaqData.faq];
                            newFaq[index][0] = e;
                            setFaqData((prev) => ({
                              ...prev,
                              faq: newFaq,
                            }));
                          }}
                        />
                        <AdminInput
                          type="edit"
                          label="Answer"
                          value={f[1]}
                          onChange={(e) => {
                            const newFaq = [...FaqData.faq];
                            newFaq[index][1] = e;
                            setFaqData((prev) => ({
                              ...prev,
                              faq: newFaq,
                            }));
                          }}
                        />
                        <div className="flex gap-x-4">
                          {index !== FaqData.faq.length - 1 && (
                            <AdminBtn
                              btnColor="green"
                              text="Add FAQ"
                              onClick={() => {
                                const newFaq = [...FaqData.faq];
                                newFaq.splice(index + 1, 0, ["", ""]);
                                setFaqData((prev) => ({
                                  ...prev,
                                  faq: newFaq,
                                }));
                              }}
                            />
                          )}

                          <AdminBtn
                            btnColor="red"
                            text="Remove"
                            onClick={() => {
                              const newFaq = FaqData.faq.filter(
                                (_, i) => i !== index
                              );
                              setFaqData((prev) => ({
                                ...prev,
                                faq: newFaq,
                              }));
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
            <AdminBtn
              text="Add FAQ"
              onClick={() =>
                setFaqData((prev) => ({
                  ...prev,
                  faq: [...prev.faq, ["", ""]],
                }))
              }
            />
            <AdminBtn
              text="save"
              className="w-full flex flex-row justify-end"
              onClick={handleSubmitFaq}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
