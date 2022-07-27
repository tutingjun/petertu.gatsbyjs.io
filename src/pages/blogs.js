import * as React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";

import "../components/style.css";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Blog Posts" showPages={true}>
      {data.allMarkdownRemark.edges.map((edge) => (
        <div key={edge.node.id}>
          <Link to={edge.node.frontmatter.slug} className="post">
            <h3>{edge.node.frontmatter.title} </h3>
            <p>{edge.node.frontmatter.date}</p>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD YYYY")
          }
          id
        }
      }
    }
  }
`;

export default BlogPage;
