export const addToLocal = (user) => {
  console.log("adding user to localStorage:", user);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user === null ? null : JSON.parse(user);
};

export const clearLocal = () => {
  localStorage.clear();
};
