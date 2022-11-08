import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc, getDocs, doc,updateDoc, deleteDoc} from 'firebase/firestore'
import { API_KEY } from "../../constans/envValues";

export class Database {
    constructor(){
        const firebaseConfig = {
            apiKey: API_KEY,
            authDomain: "it-todo-list.firebaseapp.com",
            projectId: "it-todo-list",
            storageBucket: "it-todo-list.appspot.com",
            messagingSenderId: "393230119513",
            appId: "1:393230119513:web:f5542ba2c82ce072707748",
            measurementId: "G-KQ8BWFQMKM"
          };
        const app = initializeApp(firebaseConfig);
        this._database = getFirestore(app);
    }

    create(collectionKey, body){
        const collectionRef = collection(this._database, collectionKey);
        return addDoc(collectionRef, body)
    }
    read(collectionKey){
        const collectionRef = collection(this._database, collectionKey);
        return getDocs(collectionRef).then((documents)=>{
            return documents.docs.map((doc)=>({ ...doc.data(), id: doc.id }))
        });
    }
    update(collectionKey,id,body){
        const document = doc(this._database, collectionKey,id)
        return updateDoc(document,body)
    }
    delete(collectionKey,id){
        const document = doc(this._database,collectionKey,id);
        return deleteDoc(document);
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance
    }
}