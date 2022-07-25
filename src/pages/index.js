// Step 1: Import React
import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

// Step 2: Define your component
const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Random images from unsplash"
        src="https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
      />
    </Layout>
  );
};

// Step 3: Export your component
export default IndexPage;
