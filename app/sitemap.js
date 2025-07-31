// export const dynamic = "force-dynamic"; 
// import { GetBlogPosts, getServiceList } from "@/component/lib/GetBlogPosts";
// import { serverUrl } from "@/config";

// export default async function sitemap() {
//     const staticRoutes =[
//       {
//         url: 'https://dmassociates.in/',
//         lastModified: new Date(),
//         changeFrequency: 'monthly',
//         priority: 1,
//       },
//       {
//         url: 'https://dmassociates.in/about',
//         lastModified: new Date(),
//         changeFrequency: 'monthly',
//         priority: 0.8,
//       },
//       {
//         url: 'https://dmassociates.in/about/founder',
//         lastModified: new Date(),
//         changeFrequency: 'monthly',
//         priority: 0.8,
//       },
//       {
//         url: 'https://dmassociates.in/blogs',
//         lastModified: new Date(),
//         changeFrequency: 'weekly',
//         priority: 0.5,
//       },
//       {
//         url: 'https://dmassociates.in/gallery',
//         lastModified: new Date(),
//         changeFrequency: 'monthly',
//         priority: 0.8,
//       },
//       {
//         url: 'https://dmassociates.in/testimonials',
//         lastModified: new Date(),
//         changeFrequency: 'monthly',
//         priority: 0.8,
//       },
//       {
//         url: 'https://dmassociates.in/team',
//         lastModified: new Date(),
//         changeFrequency: 'monthly',
//         priority: 0.8,
//       },
//       {
//         url: 'https://dmassociates.in/about',
//         lastModified: new Date(),
//         changeFrequency: 'monthly',
//         priority: 0.8,
//       },
//       {
//         url: 'https://dmassociates.in/contact',
//         lastModified: new Date(),
//         changeFrequency: 'monthly',
//         priority: 0.8,
//       },
//     ]

//     // Fetch dynamic blog posts
//   const posts = await GetBlogPosts(); 
//   const dynamicRoutes = posts?.posts?.blog?.list.map((post) => ({
//     url: `${serverUrl}blogs/${post._id}`,
//     lastModified: new Date(),
//     changeFrequency: "weekly",
//     priority: 0.7,
//   }));
//   // Fetch dynamic blog posts
//   const service = await getServiceList(); 
//   const dynamicSubService = service?.service?.subService?.map((subservice) => ({
//     url: `${serverUrl}/service/subservice/${subservice._id}`,
//     lastModified: new Date(),
//     changeFrequency: "weekly",
//     priority: 0.7,
//   }));

//   return [...staticRoutes, ...dynamicRoutes, ...dynamicSubService]; // Combine static & dynamic URLs
//   }


export const dynamic = "force-dynamic";

import { GetBlogPosts, getServiceList } from "@/component/lib/GetBlogPosts";
import { clientUrl} from "@/config";

export default async function sitemap() {
    const staticRoutes = [
        {
            url: 'https://dmassociates.in/',
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://dmassociates.in/about',
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://dmassociates.in/about/founder',
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://dmassociates.in/blogs',
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: 'https://dmassociates.in/gallery',
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://dmassociates.in/testimonials',
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://dmassociates.in/team',
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://dmassociates.in/contact',
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    try {
        // Fetch dynamic blog posts
        const posts = await GetBlogPosts();
        const dynamicRoutes = posts?.homeData?.blog?.list?.map((post) => ({
            url: `${clientUrl}/blogs/${post._id}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.7,
        })) || [];

        // Fetch dynamic services
        const service = await getServiceList();
        const dynamicSubService = service?.flatMap((service) => 
            service.subService?.map((subservice) => ({
                url: `${clientUrl}/service/subservice/${subservice._id}`,
                lastModified: new Date().toISOString(),
                changeFrequency: 'weekly',
                priority: 0.7,
            })) || []
        ) || [];

        return [...staticRoutes, ...dynamicRoutes, ...dynamicSubService];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Return at least the static routes if there's an error with dynamic routes
        return staticRoutes;
    }
}