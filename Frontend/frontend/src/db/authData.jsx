import axios from "axios";

export async function fetchSignUp(formData) {
  try {
    const data = await axios.post(`${process.env.REACT_APP_PATH}auth/signup`, {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    if (data && data.data.token) {
      console.log(data);
      localStorage.setItem("token", `Bearer ${data.data.token}`);
      return data.data;
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data) {
      console.error("Server error response:", error.response.data);
      return error.response.data;
    } else {
      console.error("Other error:", error);
      return { error: "An unexpected error occurred" };
    }
  }
}

export async function fetchUser() {
  try {
    const data = await axios.get(`${process.env.REACT_APP_PATH}users/readOne`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    if (data) {
      console.log(data);
      return data.data.user;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchLogin(formData) {
  try {
    const data = await axios.post(`${process.env.REACT_APP_PATH}auth/signin`, {
      email: formData.email,
      password: formData.password,
    });
    if (data && data.data.token) {
      console.log(data);
      localStorage.setItem("token", `Bearer ${data.data.token}`);
      return data.data;
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data) {
      console.error("Server error response:", error.response.data);
      return error.response.data;
    } else {
      console.error("Other error:", error);
      return { error: "An unexpected error occurred" };
    }
  }
}

export async function fetchGoogle(result) {
  try {
    const data = await axios.post(`${process.env.REACT_APP_PATH}auth/google`, {
      name: result.displayName,
      email: result.user.email,
      googlePhotoUrl: result.user.photoURL,
    });
    if (data && data.data.token) {
      console.log(data);
      localStorage.setItem("token", `Bearer ${data.data.token}`);
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
}
