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
