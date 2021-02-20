import { db } from "./firebase";
import { mock } from "./mock";

export const saveToLocalStorage = (data, name: string) => {
  const json = JSON.stringify(data);
  localStorage.setItem(name, json);
};

export const loadLocalStorage = (name: string) => {
  const json = localStorage.getItem(name);
  if (json) {
    return JSON.parse(json);
  } else {
    return [];
  }
};

export const clearLocalStorage = (name: string) => {
  if (localStorage.getItem(name)) localStorage.setItem(name, "");
};

export const uploadAllMockToFirestore = async () => {
  console.log("uploading");
  try {
    const ref = db.collection("products").doc("all");
    await ref.set({
      items: mock,
    });
    console.log("done");
  } catch (error) {
    console.log(error);
  }
};

export const uploadEachMockToFirestore = () => {
  try {
    for (const { code, name, price, category, imageBig, imageSmall } of mock) {
      const ref = db.collection("products").doc(code);
      ref.set({
        code,
        name,
        price,
        category,
        imageBig,
        imageSmall,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
