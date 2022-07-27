import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Sidebar } from "../components/sidebar";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const tagList = ["asd", "asdd"];
  const category = "untitled";

  // const image = getImage(frontmatter.hero_image);
  return (
    <Layout pageTitle={frontmatter.title}>
      <div className="grid">
        {/* <p>Reading time: {markdownRemark.fields.readingTime.text}</p> */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Sidebar
          tags={frontmatter.tag}
          category={frontmatter.category}
          date={frontmatter.date}
          timeToRead={markdownRemark.fields.readingTime.text}
        />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        tag
        category
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
