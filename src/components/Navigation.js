import React from "react";
import { Link } from "gatsby";

const mainNavItems = [
  { url: "/photos", label: "Photography" },
  { url: "/blogs", label: "Writing" },
];

export const Navigation = ({ slug }) => {
  return (
    <section className="navigation">
      <div className=" flex max-w-4xl mx-auto">
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
