import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import homeStyles from "../home/Home.module.css";
import Logo from "../../components/logo/Logo";
import CandyButton from "../../components/buttons/candybutton/CandyButton";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import ServerErrorDialogbox from "../../components/server-errors-dialogbox/ServerErrorDialogbox";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    login,
    currentUser,
    setCurrentUser,
    loading: currentUserLoading,
  } = useAuth();
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
      await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      navigate("/");
    } catch (error) {
      // handle error
      setLoading(false);
    }
  };

  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
  );

  const handleChange = (e) => {
    e.preventDefault();
    if (!emailRegex.test(emailRef.current.value)) {
      setError("Email is not valid");
    } else if (passwordRef.current.value.length < 6) {
      setError("Password must be at least 6 characters long");
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.layout}>
      {loading || currentUserLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.logoArea}>
            <Logo />
          </div>
          <div className={styles.middle}>
            <div className={styles.inputsContainer}>
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
              {error !== "" && <div className={styles.error}>{error}</div>}
              <CandyButton
                color="white"
                colorLight="#00c486"
                colorDark="#00c486"
                onClick={handleSubmit}
              >
                <div style={{ margin: "0 1.25rem" }}>Login</div>
              </CandyButton>
              <div className={styles.signup}>
                First time here?{" "}
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
