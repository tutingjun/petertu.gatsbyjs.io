import * as React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";

import "../components/style.css";
import { PostSideBar } from "../components/PostSideBar";
import { getYearList, isEnglish } from "../utils/helper";

const BlogPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const postsByYear = getYearList(posts);
  const years = Object.keys(postsByYear).reverse();

  return (
    <Layout pageTitle="Blog Posts" slug="./blogs">
      <div className="grid">
        <div className="article-content">
          <header className="hero">
            <h1>Blog Posts</h1>
          </header>
          {years.map((year) => (
            <div className="segment">
              <h2 className="year">{year}</h2>
              {postsByYear[year].map((post) => {
                if (isEnglish(post.title)) {
                  return (
                    <Link to={post.slug} className="post">
                      <h3>{post.title} </h3>
                      <p>{post.date}</p>
                    </Link>
                  );
                }
              })}
            </div>
          ))}
        </div>
        <PostSideBar />
      </div>
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
            year: date(formatString: "YYYY")
            date: date(formatString: "MMM DD")
          }
          id
        }
      }
    }
  }
`;

export default BlogPage;
