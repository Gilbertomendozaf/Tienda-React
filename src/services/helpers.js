import PRODUCTS from "../products"
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCPT8nrkZbIantsL0kjmIFDSPTQsPMtj-8",
    authDomain: "latienditadegilberto-reactjs.firebaseapp.com",
    projectId: "latienditadegilberto-reactjs",
    storageBucket: "latienditadegilberto-reactjs.appspot.com",
    messagingSenderId: "174636593350",
    appId: "1:174636593350:web:cda7270897ea00f4f7e7c7"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);



export async function exportData(){
    const productsCollectionRef = collection(db, "Products")
    
    for (let item of PRODUCTS){
        const res = await addDoc(productsCollectionRef, item)
        console.log("Documento creado:", res.id);
    }
}

