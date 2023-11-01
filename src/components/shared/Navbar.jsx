import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { IconMoonFilled, IconMoon } from "@tabler/icons-react";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { auth, Providers } from "../../firebase.config";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div id="signin-container">{children}</div>
        </Box>
      )}
    </div>
  );
}

function AuthDialog(props) {
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
    if (formSignUp.password !== formSignUp.confirmPassword) {
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

function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div id="app-container" className={theme}>
      <AuthDialog open={open} onClose={handleModalClose} />

      <nav className="dark:bg-gray-950 bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {/*
        Icon when menu is closed.

        Menu open: "hidden", Menu closed: "block"
      */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/*
        Icon when menu is open.

        Menu open: "block", Menu closed: "hidden"
      */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <Link
                    to="/"
                    className="dark:text-gray-300 text-slate-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <a
                    href="#"
                    className="dark:text-gray-300 text-slate-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Portfolio
                  </a>

                  <Link
                    to="/test"
                    className="dark:text-gray-300 text-slate-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Test
                  </Link>
                  <Link
                    to="/signup"
                    className="dark:text-gray-300 text-slate-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                  <span
                    onClick={handleModalOpen}
                    className="dark:text-gray-300 text-slate-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Sign In
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <span className="absolute -inset-1.5" />
                {theme === "dark" ? (
                  <IconMoon size={18} className="text-slate-500" />
                ) : (
                  <IconMoonFilled size={18} className="text-slate-500" />
                )}
              </button>
              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={handleMenu}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-5 w-5 rounded-full"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Profile Avatar"
                    />
                  </button>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {auth.currentUser ? (
                      <MenuItem onClick={handleSignout}>Sign out</MenuItem>
                    ) : (
                      <>
                        <MenuItem onClick={handleModalOpen}>Sign in</MenuItem>
                        <MenuItem onClick={handleModalOpen}>Sign up</MenuItem>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <Link to="/">Dashboard</Link>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Portfolio
            </a>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Navbar;
