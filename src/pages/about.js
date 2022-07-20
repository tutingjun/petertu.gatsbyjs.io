// Step 1: Import React
import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";

// Step 2: Define your component
const AboutPage = () => {
  return (
    <Layout pageTitle="About">
      <p>
        Hi there! I'm the proud creator of this site, which I built with Gatsby.
      </p>
      <StaticImage
        alt="Photo from google Doodles"
        src="https://www.google.com/logos/doodles/2022/oskar-salas-112th-birthday-6753651837108454.4-2x.png"
      />
    </Layout>
  );
};

// Step 3: Export your component
export default AboutPage;
