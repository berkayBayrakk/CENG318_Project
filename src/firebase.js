// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {addDoc,collection,getDocs,query,where,deleteDoc} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPPUpJOzQZdruMm0B4LXYaZYHlqE_zakc",
  authDomain: "poll-d34bc.firebaseapp.com",
  databaseURL: "https://poll-d34bc-default-rtdb.firebaseio.com",
  projectId: "poll-d34bc",
  storageBucket: "poll-d34bc.appspot.com",
  messagingSenderId: "990568073978",
  appId: "1:990568073978:web:1f4ba3cbed55b770c35743",
  measurementId: "G-HDSJN55W7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStore=getFirestore(app);
const usersRef=collection(fireStore,'users');
const pollsRef=collection(fireStore,'polls');

export const saveUser=(user)=>{
  
  addDoc(usersRef,user);
}


export const savePoll=(poll)=>{

  addDoc(pollsRef,poll);
 
}

export const getPolls=async()=>{
  const data = getDocs(pollsRef);
  return await data.then((obj)=>{
    return  obj.docs.map((doc) => 
     ( {...doc.data(),id:doc.id}));
   })
}



export const getUsers=async()=>{
  const data = getDocs(usersRef);
 return await data.then((obj)=>{
   return  obj.docs.map((doc) => 
    ( {...doc.data(),id:doc.id}));
  })
}

export const getUserById=async(id)=>{
  const data = getDocs(usersRef);
  return await data.then((obj)=>{
   return  obj.docs.map((doc) => 
    ( {...doc.data(),id:doc.id})).find((element)=>(id==element.id));
  })
};

export const getPollById=async(id)=>{
  const data = getDocs(pollsRef);
  return await data.then((obj)=>{
   return  obj.docs.map((doc) => 
    ( {...doc.data(),id:doc.id})).find((element)=>(id==element.id));
  })
};