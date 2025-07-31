import { serverUrl } from "@/config";
import axios from "axios";

export async function GetBlogPosts() {
    try {
        const response = await axios.get(`${serverUrl}/getHome`);
        console.log("API Response:", response.data); // Add this log
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

export async function getServiceList() {
    try {
        const { data } = await axios.get(`${serverUrl}/getServiceList`);
        console.log("ServiceList",data.serviceList)
        return  data.serviceList
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
 
    
}