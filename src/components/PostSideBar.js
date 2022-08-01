import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { slugify } from "../utils/helper";

export const PostSideBar = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        tags: group(field: frontmatter___tag) {
          name: fieldValue
          totalCount
        }

        categories: group(field: frontmatter___category) {
          name: fieldValue
          totalCount
        }
      }
    }
  `);
  const categories = data.allMarkdownRemark.categories;
  const tags = data.allMarkdownRemark.tags;

  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>Category</h2>
        <div className="list">
          {categories.map((category) => {
            return (
              <Link
                key={category.name}
                to={`/cats/${slugify(category.name)}`}
                className="category"
                activeClassName="active"
              >
                <div className="name">{category.name}</div>
                <div className="count">{category.totalCount}</div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="post-sidebar-card">
        <h2>Tags</h2>
        <div className="tags">
          {tags.map((tag) => {
            return (
              <Link
                key={tag.name}
                to={`/tags/${slugify(tag.name)}`}
                className="tag"
                activeClassName="active"
              >
                {tag.name}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default PostSideBar;
