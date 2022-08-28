import React from "react";
import { Link } from "gatsby";

const mainNavItems = [
  { url: "/blogs", label: "Writing" },
  // { url: "/about", icon: info, label: "About me" },
];

export const Navigation = ({ slug }) => {
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
                className={slug === item.url ? "item active" : "item"}
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
