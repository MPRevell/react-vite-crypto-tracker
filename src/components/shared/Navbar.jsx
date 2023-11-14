import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { IconMoonFilled, IconMoon } from "@tabler/icons-react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import AuthDialog from "./AuthDialog";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [defaultOpenTab, setDefaultOpenTab] = React.useState(0);

  const checkAuthAndNavigateOrOpenModal = (event) => {
    // Prevent default link behavior
    event.preventDefault();
    if (auth.currentUser) {
      // This will check whether one of mu user's is logged in.
      navigate("/watchlist");
    } else {
      // If the user is not logged in, open the modal with sign-in
      handleModalOpen(0)();
    }
  };

  const handleModalOpen = (activeTab) => () => {
    setDefaultOpenTab(activeTab);
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
      <AuthDialog
        open={open}
        defaultOpenTab={defaultOpenTab}
        onClose={handleModalClose}
      />

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
                    href="/watchlist"
                    onClick={checkAuthAndNavigateOrOpenModal}
                    className="dark:text-gray-300 text-slate-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Watchlist
                  </a>
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
                      <MenuItem
                        className="flex space-between"
                        onClick={handleSignout}
                      >
                        Sign out <LogoutIcon />
                      </MenuItem>
                    ) : (
                      <div>
                        <MenuItem onClick={handleModalOpen(0)}>
                          <ListItemIcon>
                            <LoginIcon />
                          </ListItemIcon>
                          Sign in
                        </MenuItem>
                        <MenuItem onClick={handleModalOpen(1)}>
                          <ListItemIcon>
                            <FontAwesomeIcon icon={faUserPlus} />
                          </ListItemIcon>
                          Sign up
                        </MenuItem>
                      </div>
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
              onClick={checkAuthAndNavigateOrOpenModal}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Watchlist
            </a>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Navbar;
