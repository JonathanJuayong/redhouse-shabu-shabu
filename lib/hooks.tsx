import { auth, db, googleProvider } from "./firebase";
import firebase from "firebase/app";

export const useAuthProvider = () => {
  const googleSignIn = async (onSuccess?, onError?) => {
    try {
      await auth.signInWithPopup(googleProvider);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  const emailAndPasswordSignIn = async (
    email: string,
    password: string,
    onSuccess?,
    onError?
  ) => {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      onSuccess(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async (onSuccess?, onError?) => {
    try {
      await auth.signOut();
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return { googleSignIn, emailAndPasswordSignIn, signOut };
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

  const getLatestOrders = async (limit) => {
    const query = db
      .collection("orders")
      .orderBy("timestamp", "desc")
      .limit(limit);
    const snapshot = await query.get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    return { docs, lastDoc };
  };

  const getNextOrders = async (doc, limit) => {
    const query = db
      .collection("orders")
      .orderBy("timestamp", "desc")
      .limit(limit)
      .startAfter(doc);
    const snapshot = await query.get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    return { docs, lastDoc };
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

  const checkIfAdmin = async (uid) => {
    const ref = db.doc(`admins/${uid}`);
    const docSnap = await ref.get();
    return docSnap.exists;
  };

  return {
    createOrder,
    getAllProducts,
    getProduct,
    getLatestOrders,
    getNextOrders,
    checkIfAdmin,
  };
};
