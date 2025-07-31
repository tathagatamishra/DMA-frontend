"use client";
import React, { useEffect, useState } from "react";
import { serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import AdminUpload from "../AdminUi/AdminUpload";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Loader from "@/component/UI/Loader";
import Team from "@/component/Team/Team";

export default function EditTeam() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const [windowWidth, setWindowWidth] = useState(0);

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

  const [isLoading, setIsLoading] = useState(true);
  const [hideHero, setHideHero] = useState(false);
  const [hideContact, setHideContact] = useState(false);
  const [hideFirstSection, setHideFirstSection] = useState(false);
  const [hideSecondSection, setHideSecondSection] = useState(false);
  const [hideThirdSection, setHideThirdSection] = useState(false);
  const [isManualHeroUrl, setIsManualHeroUrl] = useState(false);

  const [teamData, setTeamData] = useState({
    dataType: "team",
    hero: {
      tag: "",
      heading: "",
      description: "",
      image: "",
    },
    team: {
      heading: "",
      member: [{ image: "", name: "", designation: "" }],
    },
  });

  const handleImageChange = (index, field, value) => {
    setTeamData((prevData) => {
      const newMembers = [...prevData.team.member];
      newMembers[index] = {
        ...newMembers[index],
        [field]: value,
      };
      return {
        ...prevData,
        team: {
          ...prevData.team,
          member: newMembers,
        },
      };
    });
  };

  const uploadToFirebase = async (file, folder = "teamPage") => {
    const fileName = generateRandomString(10) + "_" + file.name;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleHeroImageUpload=async(e)=>{
    console.log(e.target.files[0])
    if (e.target.files[0]) {
      const file = e.target.files[0];

      try {
        let updatedTeamData = { ...teamData };
        const url = await uploadToFirebase(file, "teamPage/images");
       
          // Updating hero image
          console.log(url)
          handleInputChange("hero", "image", url);
          updatedTeamData.hero = {
            ...updatedTeamData.hero,
            image: url,
          };
          setIsManualHeroUrl(false);


        // Update database
        await axios.put(`${serverUrl}/editTeam`, updatedTeamData);

        // Update local state
        setTeamData(updatedTeamData);

        console.log("Image uploaded successfully:");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.warn("No file selected for upload");
    }
  }

  const handleUpload = async (e, index = null) => {
    console.log(e.target.files[0])
    if (e.target.files[0]) {
      const file = e.target.files[0];

      try {
        let updatedTeamData = { ...teamData };
        const url = await uploadToFirebase(file, "teamPage/images");
        if (index !== null) {
          // Updating team member image
          updatedTeamData.team.member[index] = {
            ...updatedTeamData.team.member[index],
            image: url,
          };
        } else {
          // Updating hero image
          console.log(url)
          handleInputChange("hero", "image", url);
          updatedTeamData.hero = {
            ...updatedTeamData.hero,
            image: url,
          };
          setIsManualHeroUrl(false);
        }

        // Update database
        await axios.put(`${serverUrl}/editTeam`, updatedTeamData);

        // Update local state
        setTeamData(updatedTeamData);

        console.log("Image uploaded successfully:");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.warn("No file selected for upload");
    }
  };

  const handleInputChange = (section, field, value) => {
    setTeamData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${serverUrl}/editTeam`, teamData);
      console.log("Edited");
      getTeam();
    } catch (error) {
      console.log(error);
    }
  };

  const getTeam = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getTeam`);
      setTeamData(data.teamData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTeam();
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

  const handleDelete = async (index) => {
      const newLayout = teamData.team.member.filter(
        (_, i) => i !== index
      );
      setTeamData((prev)=>({
        ...prev,
        team:{...prev.team.member,member:newLayout}
      }))
  };

  const handleImageUpload = async (file, index) => {
    setIsLoading(true);
    try {
      const fileName = generateRandomString(10) + "_" + file.name;
      const storageRef = ref(storage, `team/${Date.now()}_${fileName}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      setTeamData((prevData) => ({
        ...prevData,
        image: url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden select-none">
      {isLoading && <Loader />}

      <AdminNav page="EDIT TEAM" />

      <div className="AdminContainer">
        {windowWidth > 800 && (
          <div className="AdminPreview">
            <Team teamData={teamData} />
          </div>
        )}

        <div className="AdminForm">
          {/* Hero Section */}
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
                  value={teamData.hero.tag}
                  onChange={(e) => handleInputChange("hero", "tag", e)}
                />
                <AdminInput
                  label="Heading"
                  className="w-full"
                  type="edit"
                  value={teamData.hero.heading}
                  onChange={(e) => handleInputChange("hero", "heading", e)}
                />
                <AdminInput
                  label="Description"
                  className="w-full"
                  type="edit"
                  value={teamData.hero.description}
                  onChange={(e) => handleInputChange("hero", "description", e)}
                />
                <AdminUpload
                  label="Hero Image"
                  type="image"
                  value={teamData.hero.image}
                  handleUpload={(e) => handleHeroImageUpload(e)}
                  handleDelete={() => handleDelete("hero")}
                  onChange={(e) =>
                    handleInputChange("hero", "image", e.target.value)
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
          {/* Body */}
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Our Team</p>
              {hideFirstSection ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideFirstSection(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideFirstSection(true)}
                />
              )}
            </div>

            {!hideFirstSection && (
              <>
                <AdminInput
                  label="Tag"
                  className="w-full"
                  type="edit"
                  value={teamData.team.heading}
                  onChange={(e) => handleInputChange("team", "heading", e)}
                />

                {teamData?.team?.member.map((image, index) => (
                  <div
                    key={index}
                    className="flex flex-col mb-[20px] gap-[10px]"
                  >
                    <AdminInput
                      label={`Image ${index + 1} Name`}
                      className="w-full"
                      type="edit"
                      value={image.name}
                      onChange={(e) => handleImageChange(index, "name", e)}
                    />

                    <AdminInput
                      label={`Image ${index + 1} Designation`}
                      className="w-full"
                      v
                      type="edit"
                      value={image.designation}
                      onChange={(e) =>
                        handleImageChange(index, "designation", e)
                      }
                    />
                    <AdminUpload
                      label={`Image ${index + 1} URL`}
                      type="image"
                      crossBtn={true}
                      value={image.image || ""} // Fallback handling
                      handleDelete={() => handleDelete(index)}
                      handleUpload={(e) => handleUpload(e, index)}
                      onChange={(e) =>
                        handleImageChange(index, "image", e.target.value)
                      }
                      // onClick={() => removeImage(index)}
                      warningMsg="Are you sure you want to delete this image?"
                    />
                    
                  </div>
                ))}
                <div className="flex gap-5" >
                    <AdminBtn
                     text="Add Member"
                     btnColor="green"
                     onClick={()=>{
                      setTeamData((prev) => ({
                        ...prev,
                        team: {
                          ...prev.team,
                          member: [
                            ...prev.team.member,
                            { image: "", name: "", designation: "" },
                          ],
                        },
                      }));
                     }}
                    />
                    {/* <AdminBtn
                      btnColor="red"
                      text="Remove"
                      onClick={() => {
                        const newLayout = teamData.team.member.filter(
                          (_, i) => i !== index
                        );
                        setTeamData((prev)=>({
                          ...prev,
                          team:{...prev.team.member,member:newLayout}
                        }))
                      }}
                    /> */}
                <AdminBtn
                  text="save"
                  className="w-full flex flex-row justify-end"
                  onClick={handleSubmit}
                />
                    </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
