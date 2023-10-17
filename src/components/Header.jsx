import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="app-container">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/test">TestPage</Link>
          </li>
        </ul>
      </nav>

      {/* This component is actually where the rest
            of your application goes */}
      <Outlet />
    </div>
  );
};
export default Header;
