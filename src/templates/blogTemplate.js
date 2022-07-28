import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Sidebar } from "../components/BlogSidebar";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const showPage = false;

  // const image = getImage(frontmatter.hero_image);
  return (
    <Layout pageTitle={frontmatter.title} showPage={showPage}>
      <div className="grid">
        <div className="article-content">
          <div className="post-header medium width">
            <h1>{frontmatter.title}</h1>
          </div>

          <section className="segment small">
            <div
              id={frontmatter.slug}
              className="post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </section>
        </div>

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
