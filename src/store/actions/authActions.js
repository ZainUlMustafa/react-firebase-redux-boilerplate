import { storage } from "../../config/firebaseConfig";

//////////////////////////////////////////////////////////////////////////////////////////////
/// README: SECTION 1 => HANDLE THE AUTH
///

export const signIn = (email, password) => {
  return (dispatch, getState, { getFirebase }) => {
    // async call to login to firebase
    dispatch({
      type: "INIT_USER_ACTION",
    });

    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({
          type: "SIGN_IN",
        });
      })
      .catch((error) => {
        //console.log("SIGNING IN FAILED!");
        dispatch({
          type: "SIGN_IN_ERROR",
          error: error.message,
        });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    // async call to logout to firebase
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: "SIGN_OUT",
        });
      })
      .catch((error) => {
        //console.log("SIGNING OUT FAILED!");
      });
  };
};

export const sendPasswordResetEmail = (email) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({
      type: "INIT_FORGOT_PASSWORD_ACTION",
    });
    // async call to password reset email
    const firebase = getFirebase();
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      dispatch({
        type: "PASSWORD_RESET",
        message: "Please check your inbox, we have sent you a reset link!"
      });
    }).catch((ex) => {
      dispatch({
        type: "PASSWORD_FORGOT_EXCEPTION",
        message: ex.message
      })
    })
  }
};

export const removeAuthErrorAndMessage = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({
      type: "CLEAR_ERROR_MSG"
    })
  }
}

export const sendVerificationEmail = () => {
  return (dispatch, getState, { getFirebase }) => {
    // async call to verify email
    const firebase = getFirebase();
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        dispatch({
          type: "VERIFY",
        });
      })
      .catch((error) => {
        //console.log(error.message)
      });
  };
};

export const updateButton = (organizationName, name, countryName, uid) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({
      type: "UPDATE_DETAILS",
    });
    // updating the firestore data

    await firestore.collection("Users").doc(uid).update({
      // ...credentials,
      uid: uid,
      name: name,
      organizationName: organizationName,
      country: countryName
    });

    return dispatch({
      type: "UPDATED_DETAILS",
    });
  }
}

export const signUp = (fullName, email, orgName, password, country) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    dispatch({
      type: "INIT_USER_ACTION",
    });

    firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    ).then(async (res) => {
      const uid = res.user.uid

      await res.user.sendEmailVerification();
      await firestore.collection("Users").doc(uid).set({
        uid: uid,
        countryName: country,
        email: email,
        name: fullName,
        nameLC: fullName.toLowerCase(),
        nameInitial: fullName[0],
        organizationName: orgName
      });
    }).then(() => {
      dispatch({
        type: "SIGN_UP",
      });
    }).catch((error) => {
      dispatch({
        type: "SIGN_UP_ERROR",
        error: error.message,
      });
    });
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////
/// README: SECTION 2 => HANDLE UPDATES
///

export const openUserUpdateModal = () => {
  return {
    type: "OPEN_USER_UPDATE_MODAL",
  };
};

export const updateUser = (uid, selectedDp, phone, address) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    /// dispatch to indicate user update started
    dispatch({ type: "UPDATE_USER" });

    // async call to update the user to firebase
    const firestore = getFirestore();

    // upload dp
    var dpUrl = "";
    if (selectedDp !== null) {
      var result = await addUserDp(uid, selectedDp);
      if (result != null) {
        //console.log(`Available at: ${result.substring(0, 5)}`);
        dpUrl = result;

        await firestore
          .collection("Users")
          .doc(uid)
          .update({
            profilePic: `${dpUrl}`,
          });
      }
    }

    /// dispatch to indicate successful file uploaded
    dispatch({ type: "USER_DP_UPDATED" });

    await firestore
      .collection("Users")
      .doc(uid)
      .update({
        phone: `${phone}` ?? "",
        address: `${address}` ?? "",
      });

    /// finally dispatch success action
    return dispatch({
      type: "USER_UPDATED",
    });
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////
/// README: SECTION 3 => ADD FILES UTILS
///
async function addUserDp(uid, selectedFile) {
  //console.log(`Uploading: dp`);
  var metadata = {
    contentType: "image/jpg",
  };

  var storageReference = storage.ref(`Users/${uid}/dp/dp.jpg`);
  var uploadTask = await storageReference.put(selectedFile, metadata);
  return storageReference
    .getDownloadURL()
    .then((downloadURL) => {
      return downloadURL;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}
