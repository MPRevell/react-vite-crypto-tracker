import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/dshboard");
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
        className="flex justify-center space-between p-4"
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
          <button>Sign In</button>
        </div>
      </form>
    </div>
  );
}
