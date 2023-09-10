import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { capitalize, slugify } from "../utils/helper";

export const PostSideBar = ({ selectedElement, isTagPage }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        tags: group(field: { frontmatter: { tag: SELECT } }) {
          name: fieldValue
          totalCount
        }
        categories: group(field: { frontmatter: { category: SELECT } }) {
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
            if (category.name !== "") {
              return (
                <Link
                  key={category.name}
                  to={
                    isTagPage
                      ? `/cats/${slugify(category.name)}`
                      : selectedElement === category.name
                      ? `/blogs`
                      : `/cats/${slugify(category.name)}`
                  }
                  className={
                    isTagPage
                      ? "category"
                      : selectedElement === category.name
                      ? "category active"
                      : "category"
                  }
                >
                  <div className="name">{capitalize(category.name)}</div>
                  <div className="count">{category.totalCount}</div>
                </Link>
              );
            }
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
                to={
                  isTagPage
                    ? selectedElement === tag.name
                      ? `/blogs`
                      : `/tags/${slugify(tag.name)}`
                    : `/tags/${slugify(tag.name)}`
                }
                className={
                  isTagPage
                    ? selectedElement === tag.name
                      ? "tag active"
                      : "tag"
                    : "tag"
                }
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
