import { auth, db, googleProvider } from "./firebase";
import firebase from "firebase/app";

export const useAuthProvider = () => {
  const googleSignIn = () => {
    auth
      .signInWithPopup(googleProvider)
      .then(() => {
        console.log("user signed in successfully with Google");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("user signed out successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return { googleSignIn, signOut };
};

export const useFirestore = () => {
  const createOrder = async (user, orders, branch, orderIdHandler) => {
    try {
      const { id } = await db.collection("orders").add({
        user,
        orders,
        branch,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: "pending",
      });
      orderIdHandler(id);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    const ref = db.doc("products/all");
    const snapshot = await ref.get();
    return snapshot.data().items;
  };
  const getProduct = async (code) => {
    const ref = db.doc(`products/${code}`);
    const snapshot = await ref.get();
    return snapshot.data();
  };

  return { createOrder, getAllProducts, getProduct };
};
