import React from "react";
import { Link } from "gatsby";

import info from "../assets/info.png";
// import user from "../assets/user.png";
import note from "../assets/notebook.png";

const mainNavItems = [
  { url: "/blogs", icon: note, label: "Writing" },
  { url: "/about", icon: info, label: "About me" },
];

export const Navigation = ({ title }) => {
  return (
    <section className="navigation">
      <div className="container">
        <nav>
          <Link to="/" className="item brand">
            <span>Peter Tu</span>
          </Link>
          {mainNavItems.map((item) => (
            <div className="nav-item-outer">
              {/* <img src={item.icon} alt={item.label} className="nav-image" /> */}
              <Link
                to={item.url}
                key={item.label}
                activeClassName="active"
                className="item"
              >
                <span>{item.label}</span>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default Navigation;
