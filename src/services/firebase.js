// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  writeBatch,
} from "firebase/firestore";
import PRODUCTS from "../products";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPT8nrkZbIantsL0kjmIFDSPTQsPMtj-8",
  authDomain: "latienditadegilberto-reactjs.firebaseapp.com",
  projectId: "latienditadegilberto-reactjs",
  storageBucket: "latienditadegilberto-reactjs.appspot.com",
  messagingSenderId: "174636593350",
  appId: "1:174636593350:web:cda7270897ea00f4f7e7c7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//
const db = getFirestore(firebaseApp);

export async function getData() {
  const productsConnectionRef = collection(db, "Products");
  const productsSnapshot = await getDocs(productsConnectionRef);
  const arrayDocs = productsSnapshot.docs;
  const dataDocs = arrayDocs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return dataDocs;
}

export async function getCartItems(items) {
  const cartItemsArray = Object.entries(items);
  const dataDocs = await Promise.all(
    cartItemsArray.map(async ([itemID, count]) => {
      const docRef = doc(db, "Products", itemID);
      const docSnap = await getDoc(docRef);
      return { id: itemID, count: count, ...docSnap.data() };
    })
  );
  return dataDocs;
}

export async function getItemData(idUrl) {
  const docRef = doc(db, "Products", idUrl);
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}

export async function getCategoryData(categoryid) {
  // const q = query(collection(db, "Products"), where("", "==", true));
  const productsCollectionRef = collection(db, "Products");
  const q = query(productsCollectionRef, where("category", "==", categoryid));

  const productsSnapshot = await getDocs(q);
  const arrayDocs = productsSnapshot.docs;
  const dataDocs = arrayDocs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return dataDocs;
}

export async function createOrder(data) {
  const ordersCollectionRef = collection(db, "orders");

  const response = await addDoc(ordersCollectionRef, data);
  return response.id;

}

export async function createOrderWithStockUpdate(data) {
  const ordersCollectionRef = collection(db, "orders");
  const batch = writeBatch(db);
  const { items } = data;

  for (let itemInCart of items) {
    const refDoc = doc(db, "Products", itemInCart.id);
    const docSnap = await getDoc(refDoc);

    const { stock } = docSnap.data();
    console.log(stock);

    const stockToUpdate = stock - itemInCart.count;
    if (stockToUpdate < 0) {
      throw new Error(`No hay stock suficiente del producto: ${itemInCart.id}`);
    } else {
      const docRef = doc(db, "Products", itemInCart.id);
      batch.update(docRef, { stock: stockToUpdate });
    }
  }

  await batch.commit();
  const response = await addDoc(ordersCollectionRef, data);

  return response.id;
}


export async function exportDataWithBatch() {
    const batch = writeBatch(db);
  
    const collectionRef = collection(db, "Products");
  
    for (let item of PRODUCTS) {
      item.index = item.id;
      delete item.id;
  
      const docRef = doc(collectionRef);
      batch.set(docRef, item);
    }
  
    await batch.commit();
    console.log("Items Exportados");
  }

// exportar productos.

// export async function exportData(){
//     const productsCollectionRef = collection(db, "Products")

//     for (let item of PRODUCTS){
//     item.index = item.id
//     delete item.id;
//         const res = await addDoc(productsCollectionRef, item)
//         console.log("Documento creado:", res.id);
//     }
// }
