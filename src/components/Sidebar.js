import React from "react";
import { Link } from "gatsby";
import { slugify } from "../utils/helper";

import github from "../assets/github.png";
import link from "../assets/link.png";
import wordpress from "../assets/wordpress.png";

const links = {
  github: {
    text: "Source",
    className: "github",
    icon: github,
  },
  source: {
    text: "Demo",
    className: "source",
    icon: link,
  },
  wordpress: {
    text: "WordPress",
    className: "wordpress",
    icon: wordpress,
  },
};

export const Sidebar = ({
  tags,
  category,
  date,
  timeToRead,
  link,
  linkCate,
}) => {
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card position-fix">
        <h2>Details</h2>
        <ul>
          <li>Published: {date}</li>
          <li>{timeToRead}</li>
        </ul>

        {category && (
          <div>
            <h2>Category</h2>
            <ul>
              <Link to={`/cats/${slugify(category)}`}>
                <li>{category}</li>
              </Link>
            </ul>
          </div>
        )}

        {tags === [] && <h2>Tags</h2>}
        <div className="tags">
          {tags.map((tag) => {
            return (
              <Link
                key={tag}
                to={`/tags/${slugify(tag)}`}
                className="tag"
                activeClassName="active"
              >
                {tag}
              </Link>
            );
          })}
        </div>

        {linkCate.length !== 0 && (
          <div className="button-links">
            <h2>Links</h2>
            <div className="expand-btn-group">
              {linkCate.map((link_cat) => {
                return (
                  <div class={`expand-btn ${links[link_cat].className}`}>
                    <div class="content">
                      <a
                        class="imgBx"
                        href={link[link_cat]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={links[link_cat].icon}
                          alt={links[link_cat].text}
                        />
                      </a>
                    </div>
                    <a
                      class="sci"
                      href={link[link_cat]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {links[link_cat].text}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
