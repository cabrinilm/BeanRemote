


import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

 
const serviceAccount = {
    "project_info": {
      "project_number": "651977461639",
      "project_id": "bean-remote",
      "storage_bucket": "bean-remote.firebasestorage.app"
    },
    "client": [
      {
        "client_info": {
          "mobilesdk_app_id": "1:651977461639:android:878a5ec2add10fe82d8d22",
          "android_client_info": {
            "package_name": "auth.app"
          }
        },
        "oauth_client": [],
        "api_key": [
          {
            "current_key": "AIzaSyBdJOyvRWV30WyIMdKuwLQOMaMiAi5dF3s"
          }
        ],
        "services": {
          "appinvite_service": {
            "other_platform_oauth_client": []
          }
        }
      }
    ],
    "configuration_version": "1"
  
};

if (!serviceAccount) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT env var');
}

// const serviceAccount = JSON.parse(serviceAccountJson);

const app = initializeApp(serviceAccount);
const auth = getAuth(app)

export {auth};


