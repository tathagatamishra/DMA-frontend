// for Production purpose
// export const serverUrl = "https://dm-abackend-9uwv.vercel.app"; // AWS
export const serverUrl = "https://server.dmassociates.in"; // AWS
export const clientUrl = "https://dmassociates.in";
export const hostname = "dmassociates.in";


// for Development purpose
// export const serverUrl = "http://localhost:2610";
// export const clientUrl = "http://localhost:3000";
// export const hostname = "localhost:3000";

//for getting jwt token from cookie
export function getCookie(name) {
 if (typeof self === "undefined") return null;
 const cookieName = `${name}=`;
 const decodedCookie = decodeURIComponent(document.cookie);
 const cookieArray = decodedCookie.split(";");

 for (let i = 0; i < cookieArray.length; i++) {
   let cookie = cookieArray[i];
   while (cookie.charAt(0) === " ") {
     cookie = cookie.substring(1);
   }
   if (cookie.indexOf(cookieName) === 0) {
     return cookie.substring(cookieName.length, cookie.length);
   }
 }
 return null;
}
