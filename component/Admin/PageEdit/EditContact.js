"use client";
import React, { useEffect, useState } from "react";
import { serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";
import AdminUpload from "../AdminUi/AdminUpload";
import Contact from "@/component/Contact/Contact";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function EditContact() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const [windowWidth, setWindowWidth] = useState(0);
  const [hideHero, setHideHero] = useState(false);
  const [hideInfo, setHideInfo] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [isManualHeroUrl, setIsManualHeroUrl] = useState(false);

  const [contactData, setContactData] = useState({
    dataType: "contact",
    hero: {
      tag: "",
      heading: "",
      description: "",
      image: "",
    },
    card: {
      heading: "",
      description: "",
      social: ["", ""],
      time: "",
      phone: "",
      email: "",
      location: "",
    },
    form: {
      heading: "",
      description: "",
      problems: [],
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

  const getContact = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getContact`);
      setContactData(data.contactData);
      setIsManualHeroUrl(!!data.contactData.hero.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  const handleInputChange = (section, field, value) => {
    setContactData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSocialChange = (index, value) => {
    setContactData((prevData) => {
      const newSocial = [...prevData.card.social];
      newSocial[index] = value;
      return {
        ...prevData,
        card: {
          ...prevData.card,
          social: newSocial,
        },
      };
    });
  };

  const handleProblemChange = (index, value) => {
    setContactData((prevData) => {
      const newProblems = [...prevData.form.problems];
      newProblems[index] = value;
      return {
        ...prevData,
        form: {
          ...prevData.form,
          problems: newProblems,
        },
      };
    });
  };

  const addProblem = () => {
    setContactData((prevData) => ({
      ...prevData,
      form: {
        ...prevData.form,
        problems: [...prevData.form.problems, ""],
      },
    }));
  };

  const removeProblem = (index) => {
    setContactData((prevData) => {
      const newProblems = prevData.form.problems.filter((_, i) => i !== index);
      return {
        ...prevData,
        form: {
          ...prevData.form,
          problems: newProblems,
        },
      };
    });
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

  const uploadToFirebase = async (file) => {
    const fileName = generateRandomString(10) + "_" + file.name;
    const storageRef = ref(storage, `contactPage/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const url = await uploadToFirebase(file);
        handleInputChange("hero", "image", url);
        setIsManualHeroUrl(false);
        console.log("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleManualUrlChange = (value) => {
    handleInputChange("hero", "image", value);
    setIsManualHeroUrl(true);
  };

  const handleDelete = async () => {
    try {
      let updatedContactData = { ...contactData };
      if (!isManualHeroUrl && contactData.hero.image) {
        const fileRef = ref(storage, contactData.hero.image);
        await deleteObject(fileRef);
      }
      updatedContactData.hero.image = "";
      setIsManualHeroUrl(false);
      await axios.put(`${serverUrl}/editContact`, updatedContactData);
      console.log("Image deleted successfully");
      setContactData(updatedContactData);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${serverUrl}/editContact`, contactData);
      console.log("Contact page updated successfully");
      getContact();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      <AdminNav page="EDIT CONTACT" />

      <div className="AdminContainer">
        {windowWidth > 800 && (
          <div className="AdminPreview">
            <Contact contactData={contactData} usedIn="admin" />
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
                  label="Tag"
                  className="w-full"
                  type="edit"
                  value={contactData.hero.tag}
                  onChange={(e) =>
                    handleInputChange("hero", "tag", e)
                  }
                />
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={contactData.hero.heading}
                  onChange={(e) =>
                    handleInputChange("hero", "heading", e)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={contactData.hero.description}
                  onChange={(e) =>
                    handleInputChange("hero", "description", e)
                  }
                />
                <AdminUpload
                  className="mt-[10px]"
                  label="Hero Image"
                  type="image"
                  crossBtn={true}
                  value={contactData.hero.image}
                  handleDelete={handleDelete}
                  handleUpload={handleUpload}
                  onChange={(e) => handleManualUrlChange(e.target.value)}
                />
                <AdminBtn text="Save" onClick={handleSubmit} />
              </>
            )}
          </div>

          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Info Card</p>
              {hideInfo ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideInfo(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideInfo(true)}
                />
              )}
            </div>

            {!hideInfo && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={contactData.card.heading}
                  onChange={(e) =>
                    handleInputChange("card", "heading", e)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={contactData.card.description}
                  onChange={(e) =>
                    handleInputChange("card", "description", e)
                  }
                />
                <AdminInput
                  label="Facebook"
                  className="w-full"
                  type="input"
                  value={contactData.card.social[0]}
                  onChange={(e) => handleSocialChange(0, e.target.value)}
                />
                <AdminInput
                  label="Instagram"
                  className="w-full"
                  type="input"
                  value={contactData.card.social[1]}
                  onChange={(e) => handleSocialChange(1, e.target.value)}
                />
                <AdminInput
                  label="Time"
                  className="w-full"
                  type="edit"
                  value={contactData.card.time}
                  onChange={(e) =>
                    handleInputChange("card", "time", e)
                  }
                />
                <AdminInput
                  label="Phone"
                  className="w-full"
                  type="edit"
                  value={contactData.card.phone}
                  onChange={(e) =>
                    handleInputChange("card", "phone", e)
                  }
                />
                <AdminInput
                  label="Email"
                  className="w-full"
                  type="edit"
                  value={contactData.card.email}
                  onChange={(e) =>
                    handleInputChange("card", "email", e)
                  }
                />
                <AdminInput
                  label="Location"
                  className="w-full"
                  type="edit"
                  value={contactData.card.location}
                  onChange={(e) =>
                    handleInputChange("card", "location", e)
                  }
                />
                <AdminBtn text="Save" onClick={handleSubmit} />
              </>
            )}
          </div>

          <div className="AdminEditCard mt-[20px]">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Form</p>
              {hideForm ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideForm(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideForm(true)}
                />
              )}
            </div>

            {!hideForm && (
              <>
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={contactData.form.heading}
                  onChange={(e) =>
                    handleInputChange("form", "heading", e)
                  }
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={contactData.form.description}
                  onChange={(e) =>
                    handleInputChange("form", "description", e)
                  }
                />
                {contactData.form.problems.map((problem, index) => (
                  <div key={index} className="flex items-center mb-[10px]">
                    <AdminInput
                      crossBtn={true}
                      label={`Problem ${index + 1}`}
                      className="w-full"
                      type="input"
                      value={problem}
                      onChange={(e) =>
                        handleProblemChange(index, e.target.value)
                      }
                      onClick={() => removeProblem(index)}
                      warningMsg="Do you want to delete this problem?"
                    />
                  </div>
                ))}

                <div className="w-full flex flex-row justify-between">
                  <AdminBtn text="Add Problem" onClick={addProblem} />
                  <AdminBtn text="Save" onClick={handleSubmit} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
