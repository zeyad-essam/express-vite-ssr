import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import viteLogo from "../assets/vite.svg";
import reactLogo from "../assets/react.svg";
import expressLogo from "../assets/express.svg";
import reactRouterLogo from "../assets/react-router.svg";
import reactQueryLogo from "../assets/react-query.svg";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://expressjs.com/" target="_blank">
          <img src={expressLogo} className="logo express" alt="Vite logo" />
        </a>
        <a href="https://reactrouter.com/" target="_blank">
          <img
            src={reactRouterLogo}
            className="logo react_router"
            alt="React logo"
          />
        </a>
        <a href="https://tanstack.com/query/latest" target="_blank">
          <img
            src={reactQueryLogo}
            className="logo react_query"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React + express + react router + react query</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/api">Api</Link>
          </li>
          <li>
            <Link to="/redirect">Redirect to Home</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>
      <div className="content">{children}</div>
    </>
  );
};

export default Layout;
