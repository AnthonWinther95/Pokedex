// NavigationBar.js
import React from "react";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link> {/* Update the link to the Home page */}
        </li>
        <li>
          <Link to="/about">About</Link> {/* Add a link to the About page */}
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
