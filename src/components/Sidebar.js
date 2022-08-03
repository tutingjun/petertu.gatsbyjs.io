import React from "react";
import { Link } from "gatsby";
import { slugify } from "../utils/helper";

export const Sidebar = ({ tags, category, date, timeToRead }) => {
  // const tagList = tags.split(",")
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

        <h2>Tags</h2>
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
      </div>
    </aside>
  );
};

export default Sidebar;
