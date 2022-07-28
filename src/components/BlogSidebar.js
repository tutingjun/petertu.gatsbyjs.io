import React from "react";
import { Link } from "gatsby";

export const Sidebar = ({ tags, category, date, timeToRead }) => {
  // const tagList = tags.split(",")
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card ">
        <h2>Details</h2>
        <ul>
          <li>Published: {date}</li>
          <li>{timeToRead}</li>
        </ul>

        {category && (
          <div>
            <h2>Category</h2>
            <ul>
              <Link to="/">
                <li>{category}</li>
              </Link>
            </ul>
          </div>
        )}

        <h2>Tags</h2>
        <div className="tags">
          {tags.map((tag) => {
            return (
              <Link key={tag} to="/" className="tag" activeClassName="active">
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
