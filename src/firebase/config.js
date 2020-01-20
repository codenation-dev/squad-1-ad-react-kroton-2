import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC6MDxQNQrBiYHJ_zTBVWCht_UajqYN-SQ',
  authDomain: 'squad-1-ad-react-kroton-2.firebaseapp.com',
  databaseURL: 'https://squad-1-ad-react-kroton-2.firebaseio.com',
  projectId: 'squad-1-ad-react-kroton-2',
  storageBucket: 'squad-1-ad-react-kroton-2.appspot.com',
  messagingSenderId: '1053669150329',
  appId: '1:1053669150329:web:06713eba5851e04e598ea8'
};

firebase.initializeApp(firebaseConfig);
