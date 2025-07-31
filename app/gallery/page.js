import Gallery from "@/component/Gallery/Gallery";
import { serverUrl } from "@/config";
import axios from "axios";
export const dynamic = "force-dynamic";
const getGallery = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getGallery`);
    return data.galleryData;
  } catch (error) {
    console.log(error);
  }
  return {};
};

export default async function page() {
  const galleryData = await getGallery();
  return (
    <Gallery galleryData={galleryData}/>
    // <p>gg</p>
  )
}
