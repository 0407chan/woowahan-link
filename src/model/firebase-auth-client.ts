import { getApps, initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'

const FirebaseCredentials = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

export default class FirebaseAuthClient {
  public static instance: FirebaseAuthClient

  private auth: Auth

  public constructor() {
    const apps = getApps()
    if (!!apps.length === false) {
      console.log('firebase initializeApp')
      initializeApp(FirebaseCredentials)
    }
    this.auth = getAuth()
    console.log('firebase auth client constructor')
  }

  public static getInstance(): FirebaseAuthClient {
    if (!FirebaseAuthClient.instance) {
      FirebaseAuthClient.instance = new FirebaseAuthClient()
    }
    return FirebaseAuthClient.instance
  }

  public get Auth(): Auth {
    return this.auth
  }
}
