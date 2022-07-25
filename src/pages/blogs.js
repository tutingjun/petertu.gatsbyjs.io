import * as React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { blogPost } from "../components/layout.module.css";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Blog Posts">
      {data.allMarkdownRemark.edges.map((edge) => (
        <article key={edge.node.id} className={blogPost}>
          <h2>
            <Link to={edge.node.frontmatter.slug}>
              {edge.node.frontmatter.title}
            </Link>
          </h2>
          <p>{edge.node.frontmatter.date}</p>
        </article>
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
