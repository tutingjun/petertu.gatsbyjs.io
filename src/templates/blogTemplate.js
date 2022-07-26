import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  // const image = getImage(frontmatter.hero_image);
  return (
    <Layout pageTitle={frontmatter.title}>
      <p>Reading time: {markdownRemark.fields.readingTime.text}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        hero_image_alt
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;
