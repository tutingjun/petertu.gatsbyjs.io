import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const image = getImage(frontmatter.hero_image);
  return (
    <Layout pageTitle={frontmatter.title}>
      {/* <GatsbyImage image={image} alt={frontmatter.hero_image_alt} /> */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
    // <div className="blog-post-container">
    //   <div className="blog-post">
    //     <h1>{frontmatter.title}</h1>
    //     <h2>{frontmatter.date}</h2>
    //     <div
    //       className="blog-post-content"
    //       dangerouslySetInnerHTML={{ __html: html }}
    //     />
    //   </div>
    // </div>
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
    }
  }
`;
