import * as React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";

import "../components/style.css";
import { PostSideBar } from "../components/PostSideBar";

export default function TagTemplate({ data, pageContext }) {
  return (
    <Layout pageTitle="Blog Posts" showPages={false}>
      <div className="grid">
        <div className="article-content">
          <header className="hero">
            <h1>Blog Posts</h1>
          </header>
          <div className="segment">
            <h2 className="year">2022</h2>
            {data.allMarkdownRemark.edges.map((edge) => (
              <Link to={edge.node.frontmatter.slug} className="post">
                <h3>{edge.node.frontmatter.title} </h3>
                <p>{edge.node.frontmatter.dateNoYear}</p>
              </Link>
            ))}
          </div>
        </div>
        <PostSideBar />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            slug
            title
            year: date(formatString: "YYYY")
            dateNoYear: date(formatString: "MMMM DD")
          }
          id
        }
      }
    }
  }
`;
