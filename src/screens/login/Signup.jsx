import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import homeStyles from "../home/Home.module.css";
import Logo from "../../components/logo/Logo";
import CandyButton from "../../components/buttons/candybutton/CandyButton";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Snackbar from "../../components/snackbar/Snackbar";
import Loading from "../../components/loading/Loading";

const Signup = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const referralCode = query.get("ref");
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleChange(e);
    if (error !== "") return;
    setLoading(true);
    try {
      await signup({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        referralCode: referralCode,
      });
      navigate("/");
    } catch (error) {
      // handle error
      setErrorSnackbarMessage(error.message);
      setTimeout(() => {
        setErrorSnackbarMessage("");
      }, 2000);
    }
    setLoading(false);
  };

  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
  );

  const handleChange = (e) => {
    e.preventDefault();
    if (nameRef.current.value.length < 3) {
      setError("Name must be at least 3 characters long");
    } else if (!emailRegex.test(emailRef.current.value)) {
      setError("Email is not valid");
    } else if (passwordRef.current.value.length < 6) {
      setError("Password must be at least 6 characters long");
    } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.layout}>
      {loading && <Loading />}
      {errorSnackbarMessage !== "" && (
        <Snackbar duration={2000}>{errorSnackbarMessage}</Snackbar>
      )}
      <div className={styles.logoArea}>
        <Logo />
      </div>
      <div className={styles.middle}>
        <div className={styles.inputsContainer}>
          <input
            ref={nameRef}
            className={styles.input}
            placeholder="Name"
            type="name"
            id="name"
            required
            onChange={handleChange}
          ></input>
          <input
            ref={emailRef}
            className={styles.input}
            placeholder="Email"
            type="email"
            id="email"
            required
            onChange={handleChange}
          ></input>
          <input
            ref={passwordRef}
            className={styles.input}
            placeholder="Password"
            type="password"
            id="password"
            required
            onChange={handleChange}
          ></input>
          <input
            ref={confirmPasswordRef}
            className={styles.input}
            placeholder="Confirm Password"
            type="password"
            id="password"
            required
            onChange={handleChange}
          ></input>
          {error !== "" && <div className={styles.error}>{error}</div>}
          <CandyButton
            color="white"
            colorLight="#00c486"
            colorDark="#00c486"
            onClick={handleSubmit}
          >
            <div style={{ margin: "0 1.25rem" }}>Sign up</div>
          </CandyButton>
          <div className={styles.signup}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
