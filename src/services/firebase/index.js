import fb from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAdRxL2Onjf18FI8oNO_j5jC1dqA-irb54',
  authDomain: 'tstdb-4f7b6.firebaseapp.com',
  databaseURL: 'https://tstdb-4f7b6.firebaseio.com',
  projectId: 'tstdb-4f7b6',
  storageBucket: 'tstdb-4f7b6.appspot.com',
  messagingSenderId: '286048288586'
}

fb.initializeApp(config)

const auth = fb.auth()
const db = fb.database()

export { fb, auth, db }

// sign out just for example
auth.signOut()
