import React from "react";
import { Link } from "gatsby";

export const Sidebar = ({tags, category, date, timeToRead }) => {
  // const tagList = tags.split(",")
  return (
    <aside className="post-sidebar">
      <div>
        <h2>Details</h2>
        <ul>
          <li>Published: {date}</li>
          <li>{timeToRead}</li>
        </ul>
      </div>

      {category && (
        <div>
          <h2>Category</h2>
          <ul>
            <li>{category}</li>
          </ul>
        </div>
      )}

      <h2>Tags</h2>
      <div className="tags">
        {tags.map(tag => <div>{tag}</div>)}
      </div>
    </aside>
  );
};
