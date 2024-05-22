// firebaseAdmin.js

import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const initializeFirebase = () => {
  try {
const serviceAccountPath = path.resolve(process.cwd(), 'config', '../sap.json');


// Load the service account key JSON file synchronously
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));



if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin SDK initialized successfully');
}
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
}
};

// Initialize Firebase
initializeFirebase();

export default admin;