import { initializeApp } from 'firebase-admin/app';
import FirebaseEnv from '@/env/firebase.env'


class InstanceFirebase {

  public app: any;

  constructor() {
    this.initFirebase({
      type: FirebaseEnv.FIREBASE_TYPE,
      project_id: FirebaseEnv.FIREBASE_PROJECT_ID,
      private_key_id: FirebaseEnv.FIREBASE_PRIVATE_KEY_ID,
      private_key: FirebaseEnv.FIREBASE_PRIVATE_KEY,
      client_email: FirebaseEnv.FIREBASE_CLIENT_EMAIL,
      client_id: FirebaseEnv.FIREBASE_CLIENT_ID,
      auth_uri: FirebaseEnv.FIREBASE_AUTH_URI,
      token_uri: FirebaseEnv.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: FirebaseEnv.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: FirebaseEnv.FIREBASE_CLIENT_X509_CERT_URL
    })
  }

  public initFirebase({...config}: any) {
    this.app = initializeApp({...config})
  }
}

export default InstanceFirebase