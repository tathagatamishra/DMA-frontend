import SingleBlog from '@/component/SingleBlog/SingleBlog';

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

const getBlog = async (blogId) => {
  try {
    const { data } = await axios.get(`${serverUrl}/getBlog/${blogId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// const getComments = async (blogId) => {
//   try {
//     const { data } = await axios.get(`${serverUrl}/getApprovedComments/${blogId}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const incViews = async (blogId) => {
  try {
    await axios.put(`${serverUrl}/incBlogView/${blogId}`);
    console.log("view");
  } catch (error) {
    console.log(error);
  }
};

export default async function page({params}) {
  const blogId = params.blogId;
  const blogData = await getBlog(blogId);
  const recentPosts = await recentPost();
  // const comments = await getComments(blogId);
  await incViews(blogId);
  return (
    <SingleBlog blogData={blogData.blogData} previous={blogData.previous} next={blogData.next} blogId={blogId} recentPosts={recentPosts} />
  )
}
