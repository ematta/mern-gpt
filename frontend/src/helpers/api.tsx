import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/user/login", { email, password });
  if (response.status !== 200) {
    throw new Error("Error logging in");
  }
  const data = await response.data;
  return data;
};

export const checkAuthStatus = async () => {
  const response = await axios.get("/user/auth");
  if (response.status !== 200) {
    throw new Error("Error authenticating");
  }
  const data = await response.data;
  return data;
};


// export const registerUser = async (
//   name: string,
//   email: string,
//   password: string,
// ) => {};
