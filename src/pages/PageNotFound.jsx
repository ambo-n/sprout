import React from "react";
import NotFound from "../assets/404.jpeg";
import "./PageNotFound.css";
import { Link, Outlet } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-container-items">
        <h1>404 PAGE</h1>
        <p>Um..This is awkward..</p>
        <p>
          We tried really hard but couldn't find the page you are looking for.
          You may find what you are looking for in the{" "}
          {<Link to="/">Home Page</Link>}.
        </p>
        <p>
          P.S. If your name is Alexander, please stop trying to break my
          app...cuz it will break. Thank you.{" "}
        </p>
      </div>
      <div className="not-found-container-items">
        <img src={NotFound} />
      </div>
    </div>
  );
}

export default PageNotFound;
