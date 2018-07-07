import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const updateUserData = functions.auth.user().onCreate((user) => { // eslint-disable-line import/prefer-default-export
  const { uid } = user;
  const photoURL = user.photoURL || "https://crowdalert.herokuapp.com/static/images/meerkat.svg";
  const displayName = user.displayName || "Anonymous Meerkat";

  return admin.database().ref(`/users/${uid}`).update({
    displayName,
    photoURL,
  });
});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
