// Step 1: Import React
import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

// Step 2: Define your component
const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page" showPages={false}>
      <div className="hero-wrapper">
        <header className="hero index">
          <h1>Hi, I'm Peter</h1>
          <p className="hero-description small width">
            I am a junior computer science major at Carleton College, aiming to
            become a full stack developer. I enjoy movies, video games, and
            photography.
            <br />
            <br />
            This is my space to record what I love and enjoy.
          </p>
        </header>
        <div className="decoration">
          <StaticImage
            alt="Random images from unsplash"
            src="https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          />
        </div>
      </div>

      <section className="segment">
        <h2 className="home-heading">
          <div className="title">Recent Posts</div>
          <a className="button" href="/blogs">
            View all
          </a>
        </h2>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            date: date(formatString: "MMMM DD YYYY")
            category
          }
          id
        }
      }
    }
  }
`;
