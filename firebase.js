import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
        apiKey: "AIzaSyD16I-4FZM_n4tRR6kwy6yLCF4moUfSQgA",
        authDomain: "dma-website-902c1.firebaseapp.com",
        projectId: "dma-website-902c1",
        storageBucket: "dma-website-902c1.appspot.com",
        messagingSenderId: "473423648533",
        appId: "1:473423648533:web:f64d665f4bcfc30b72fb1c",
        measurementId: "G-3XED4VV67R"
});
export const auth = app.auth();
export default app;
export const storage = getStorage(app, "gs://dma-website-902c1.appspot.com");


