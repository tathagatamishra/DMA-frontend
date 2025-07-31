import Blogs from '@/component/Blogs/Blogs'

import { serverUrl } from "@/config";
import axios from "axios";
export const dynamic = "force-dynamic";

const recentPost = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getAllBlogs?limit=4&page=1`);
    return data.blogs;
  } catch (error) {
    console.log(error);
  }
}

const getBlogPage = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/getBlogPage`);
    return data.blogPageData;
  } catch (error) {
    console.log(error);
  }
  return {};
};

export default async function page() {
  const blogPageData = await getBlogPage();
  const recentPosts = await recentPost()
  return (
    <Blogs blogPageData={blogPageData} recentPosts={recentPosts}/>
  )
}
