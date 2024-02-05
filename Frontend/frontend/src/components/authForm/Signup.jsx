import { useContext, useState } from "react";
import styles from "./Signup.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchSignUp } from "../../db/authData";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { fetchGoogle } from "../../db/authData";
import google from "../../assets/icons/Google.svg";

import { UserContext } from "../../userContext/userContext";

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const handleGoogleButton = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);

    console.log(result);
    try {
      toast("loading...");
      let data = await fetchGoogle(result);
      if (data.token && data.newUser) {
        toast.success("Helloo!!");
        setUser(data.newUser);
        return navigate("/", { replace: true });
      } else toast.error("can't continue with google");
    } catch (error) {
      console.log(error);
    }
  };
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ email: "", password: "", verifyPassword: "" });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(formData).some((item) => item === "" || item === null)) {
      toast.error("All fields are required");
    } else {
      toast("loadingg..");
      let log = await fetchSignUp(formData);
      if (log.token && log.newUser) {
        toast.success("Helloo!!");
        setUser(log.newUser);
        return navigate("/", { replace: true });
      } else {
        if (log.error.includes("Invalid email")) {
          setErrors({ ...errors, email: "Invalid email" });
        } else if (log.error.includes("email")) {
          setErrors({ ...errors, email: log.error });
        } else if (log.error === "Passwords do not match") {
          setErrors({ ...errors, verifyPassword: log.error });
        } else if (log.error.includes("password should start")) {
          setErrors({ ...errors, password: "Invalid password" });
        } else {
          toast.error("Can't sign up");
        }
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <h1 className={styles.heading}>Sign Up</h1>
      </div>
      <div className={styles.container2}>
        <form method="post">
          <div className={styles["form-group"]}>
            <div className={styles["inline-input-group"]}>
              <div className={styles["label-input-group"]}>
                <input
                  className={styles.formInputs}
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  onChange={handleChange}
                />
                <p></p>
              </div>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <div className={styles["inline-input-group"]}>
              <div className={styles["label-input-group"]}>
                <input
                  className={styles.formInputs}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                {errors.email ? (
                  <p className={styles.error}>{errors.email}</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <div className={styles["inline-input-group"]}>
              <div className={styles["label-input-group"]}>
                <input
                  className={styles.formInputs}
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                {errors.password ? (
                  <p className={styles.error}>{errors.password}</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>

          <div className={styles["form-group"]}>
            <div className={styles["label-input-group"]}>
              <button
                type="submit"
                className={styles.btn}
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
            <div className={styles.or}>OR</div>
            <div className={styles.google} onClick={handleGoogleButton}>
              <img src={google} />
              <p>Continue with Google</p>
            </div>
            <div className={styles.ref}>
              <p>Already have an account?</p>
              <NavLink to="/login" className={styles.log}>
                Log In
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
