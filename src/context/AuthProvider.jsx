import React, { createContext, useContext, useState } from "react";
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();
//* with custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  const createUser = async (email, password) => {
    try {
      //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/login");

      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Email/password
  //! Email/password ile girişi enable yap
  const signIn = async (email, password) => {
    try {
      //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");

      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  const values = { currentUse, createUser, signIn };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
