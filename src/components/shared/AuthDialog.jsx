import React, { useState } from "react";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import TextField from "@mui/material/TextField";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Dialog from "@mui/material/Dialog";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { auth, Providers } from "../../firebase.config";
import CustomTabPanel from "./CustomTabPanel";

export default function AuthDialog(props) {
  const [passwordMatch, setMatch] = useState(null);

  const { onClose, open } = props;

  const [activeTab, setActiveTab] = React.useState(0);

  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [formSignIn, setFormSignIn] = useState({
    username: "",
    password: "",
  });

  const [formSignUp, setFormSignUp] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputSignInChange = (e) => {
    setFormSignIn({
      ...formSignIn,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputSignUpChange = (e) => {
    setFormSignUp({
      ...formSignUp,
      [e.target.name]: e.target.value,
    });
  };

  const signInWithPassword = () => {
    setDisabled(true);
    signInWithEmailAndPassword(auth, formSignIn.username, formSignIn.password)
      .then((userCredential) => {
        // Signed in
        setDisabled(false);
        setErrorMessage("");
        onClose();
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
        console.log("error", error);
        setDisabled(false);
      });
  };

  const signUpWithPassword = () => {
    while (formSignUp.password !== formSignUp.confirmPassword) {
      return setErrorMessage("The two passwords do not match!");
    }

    setDisabled(true);
    createUserWithEmailAndPassword(
      auth,
      formSignUp.username,
      formSignUp.password
    )
      .then((userCredential) => {
        // Signed up
        setDisabled(false);
        setErrorMessage("");
        onClose();
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
        setDisabled(false);
      });
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleClose = () => {
    onClose();
  };

  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, Providers.google)
      .then(() => {
        setDisabled(false);
        // navigate("/");
        handleClose();
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
        setDisabled(false);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Sign in" />
            <Tab label="Sign up" />
          </Tabs>
        </Box>
        <CustomTabPanel value={activeTab} index={0}>
          <Button
            onClick={signInWithGoogle}
            variant="outlined"
            startIcon={<GoogleIcon />}
            disabled={disabled}
          >
            Sign in with Google
          </Button>

          <hr />

          <TextField
            name="username"
            onChange={handleInputSignInChange}
            value={formSignIn.username}
            id="username-login"
            label="Username"
            variant="outlined"
          />
          <TextField
            name="password"
            onChange={handleInputSignInChange}
            type="password"
            value={formSignIn.password}
            id="password-login"
            label="Password"
            variant="outlined"
          />

          <Button
            onClick={signInWithPassword}
            disabled={disabled}
            variant="outlined"
            color="secondary"
          >
            Sign in with credentials
          </Button>

          <hr />

          <p className="text-red-500">{errorMessage}</p>
        </CustomTabPanel>

        <CustomTabPanel value={activeTab} index={1}>
          <Button
            onClick={signInWithGoogle}
            variant="outlined"
            startIcon={<GoogleIcon />}
            disabled={disabled}
          >
            Sign up with Google
          </Button>

          <hr />

          <TextField
            name="username"
            onChange={handleInputSignUpChange}
            value={formSignUp.username}
            id="username-login"
            label="Username"
            variant="outlined"
          />
          <TextField
            name="password"
            onChange={handleInputSignUpChange}
            type="password"
            value={formSignUp.password}
            id="password-login"
            label="Password"
            variant="outlined"
          />

          <TextField
            name="confirmPassword"
            onChange={handleInputSignUpChange}
            type="password"
            value={formSignUp.confirmPassword}
            id="confirmpassword-login"
            label="Confirm Password"
            variant="outlined"
          />

          <Button
            onClick={signUpWithPassword}
            disabled={disabled}
            variant="outlined"
            color="secondary"
          >
            Sign up with credentials
          </Button>

          <hr />

          <p className="text-red-500">{errorMessage}</p>
        </CustomTabPanel>
      </Box>
    </Dialog>
  );
}
