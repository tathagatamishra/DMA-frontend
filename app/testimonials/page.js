"use client"
import Testimonials from "@/component/Testimonial/Testimonials";
import { serverUrl } from "@/config";
import axios from "axios";

const getTestimonialData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getTestimonial`);
      return data.testimonialData;
    } catch (error) {
      console.log(error);
    }
    return [];
  };

export default async function page (){

    const data = await getTestimonialData()
    return <Testimonials testimonialData={data} />
}