import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  async function signup(user) {
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/auth/register",
        {
          email: user.email,
          password: user.password,
          name: user.name,
          referralCode: user.referralCode,
        }
      );
      setCurrentUser(response.data.user);
      setLoading(false);
    } catch (error) {
      // handle error
      console.log(error);
    }
    setLoading(false);
  }

  async function login(user) {
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/auth/login",
        {
          email: user.email,
          password: user.password,
        }
      );
      setCurrentUser(response.data.user);
    } catch (error) {
      // handle error
      if (error.response.data.suspended) {
        setServerError(error.response.data);
      }
      console.log(error);
    }
    setLoading(false);
  }

  async function logout() {
    setLoading(true);
    try {
      await axios.get(process.env.REACT_APP_API_BASE_URL + "/auth/logout");
      setCurrentUser(null);
      setLoading(false);
    } catch (error) {
      // handle error
      console.log(error);
    }
    setLoading(false);
  }

  async function updateCurrentUser() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/user/${currentUser._id}`
      );
      setCurrentUser(response.data.user);
      setLoading(false);
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  useEffect(() => {
    if (!currentUser) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            process.env.REACT_APP_API_BASE_URL + "/auth/user"
          );
          setCurrentUser(response.data.user);
        } catch (error) {
          // handle error
          console.log(error);
        }
      };
      fetchUser();
    }
    setLoading(false);
    return () => {};
  }, []);

  const value = {
    loading,
    serverError,
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    updateCurrentUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
