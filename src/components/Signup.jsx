import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <form
        className="signup-form"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit" className="sign-up-button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
