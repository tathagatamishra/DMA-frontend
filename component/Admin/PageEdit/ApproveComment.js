"use client";
import React, { useEffect, useState } from "react";
import { getCookie, serverUrl } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminInput from "../AdminUi/AdminInput";
import AdminBtn from "../AdminUi/AdminBtn";
import AdminNav from "../AdminUi/AdminNav";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Parser from "../../UI/Parser";


export default function ApproveComment() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [approvedComments, setApprovedComments] = useState([]);
  const [pendingComments, setPendingComments] = useState([]);
  const [hidePending, setHidePending] = useState(false);
  const [hideApproved, setHideApproved] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchBlogs();
    fetchPendingComments();
  }, []);

  useEffect(() => {
    if (selectedBlog) {
      fetchApprovedComments(selectedBlog);
    }
  }, [selectedBlog]);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getAllBlogs`);
      setBlogs(data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchApprovedComments = async (blogId) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/getApprovedComments/${blogId}`
      );
      setApprovedComments(data.comments);
    } catch (error) {
      console.error("Error fetching approved comments:", error);
    }
  };

  const fetchPendingComments = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getPendingComments`);
      setPendingComments(data.comments);
    } catch (error) {
      console.error("Error fetching pending comments:", error);
    }
  };

  const handleApprove = async (commentId) => {
    try {
      await axios.put(`${serverUrl}/approveComment/${commentId}`);
      // Refresh comments
      fetchPendingComments();
      if (selectedBlog) fetchApprovedComments(selectedBlog);
    } catch (error) {
      console.error("Error approving comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${serverUrl}/deleteComment/${commentId}`);
      // Refresh comments
      fetchPendingComments();
      if (selectedBlog) fetchApprovedComments(selectedBlog);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const renderComments = (comments, isPending = false) => {
    return comments.map((comment) => {
      const blog = blogs.find((blog) => blog._id === comment.blogId); // Find the blog associated with the comment
      const blogTitle = blog ? blog.title : "Unknown Blog";
  
      return (
        <div key={comment._id} className="border-b p-4">
          <p>
            <strong>{comment.name}</strong> - {comment.date}
          </p>
          <p>
            <strong>Blog name :</strong> {Parser(blogTitle)}
          </p>
          <p>  <strong>comment:</strong> {comment.content}</p>
          <div className="mt-[10px] flex flex-row justify-end gap-[10px]">
            <AdminBtn
              text="Delete"
              onClick={() => handleDelete(comment._id)}
              width="100px"
              height="30px"
              fontSize="14px"
              btnColor="#f6dbdb"
            />
            {isPending && (
              <AdminBtn
                text="Approve"
                onClick={() => handleApprove(comment._id)}
                width="100px"
                height="30px"
                fontSize="14px"
              />
            )}
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-4 mt-2">
              <p className="font-bold">Replies:</p>
              {renderComments(comment.replies, isPending)}
            </div>
          )}
        </div>
      );
    });
  };
  
  

  return (
    <div className="w-screen h-screen px-[20px] pb-[40px] flex flex-col items-center overflow-y-scroll overflow-x-hidden select-none">
      <AdminNav page="APPROVE COMMENTS" />

      <div className="AdminContainer">
        <div
          className="AdminForm smd:!flex-row-reverse !flex-col !justify-start"
          style={{
            flexWrap: "nowrap !important",
            alignContent: "unset !important",
          }}
        >
          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Pending Comments</p>{" "}
              {hidePending ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHidePending(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHidePending(true)}
                />
              )}
            </div>

            {!hidePending && (
              <div className="overflow-y-scroll h-[50vh] smd:h-full w-full flex flex-col">
                {renderComments(pendingComments, true)}
              </div>
            )}
          </div>

          <div className="AdminEditCard">
            <div className="w-full flex flex-row justify-between">
              <p className="mb-[10px]">Approve Comments</p>{" "}
              {hideApproved ? (
                <IoIosArrowDown
                  className="text-[22px]"
                  onClick={() => setHideApproved(false)}
                />
              ) : (
                <IoIosArrowUp
                  className="text-[22px]"
                  onClick={() => setHideApproved(true)}
                />
              )}
            </div>

            {!hideApproved && (
              <>
                <select
                  className="w-full p-2 mb-4 border rounded"
                  onChange={(e) => setSelectedBlog(e.target.value)}
                >
                  <option value="">Select a blog</option>
                  {blogs.map((blog) => (
                    <option key={blog._id} value={blog._id}>
                      {Parser(blog.title)}
                    </option>
                  ))}
                </select>
                <div className="border rounded overflow-y-scroll h-[50vh] smd:h-full">
                  {renderComments(approvedComments)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
