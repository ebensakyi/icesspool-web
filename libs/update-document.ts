import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore/lite";
import { app } from "./firebase-config";

const admin = initializeApp(); // Initialize Firebase Admin SDK

async function updateDocuments() {
    const db = getFirestore(app);
    // Get Firestore collection reference
    const collectionRef = collection('yourCollection');
  
    try {
      // Query documents with txStatus = 1
      const snapshot = await collectionRef.where('txStatus', '==', 1).get();
  
      // Update each document
      snapshot.forEach(async docSnapshot => {
        // Get the document reference
        const documentRef = collectionRef.doc(docSnapshot.id);
        // Get the document data
        const data = docSnapshot.data();
        
        // Update logic here
        await documentRef.update({ /* Update fields as needed */ });
      });
  
      console.log('Documents updated successfully.');
    } catch (error) {
      console.error('Error updating documents:', error);
    }
}

updateDocuments(); // Call the function to update documents
