import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Sidebar } from "../components/Sidebar";
import { convertPageData } from "../utils/helper";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const showPage = false;
  const convertData = convertPageData(markdownRemark);
  // const image = getImage(frontmatter.hero_image);
  return (
    <Layout pageTitle={convertData.title} showPage={showPage}>
      <div className="grid">
        <div className="article-content">
          <div className="post-header medium width">
            <h1>{convertData.title}</h1>
          </div>

          <section className="segment small">
            <div
              id={convertData.slug}
              className="post-content"
              dangerouslySetInnerHTML={{ __html: convertData.html }}
            />
          </section>
        </div>

        <Sidebar
          tags={convertData.tags}
          category={convertData.category}
          date={convertData.date}
          timeToRead={convertData.readingTime}
          link={convertData.links}
          linkCate={convertData.linkCategory}
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
        date(formatString: "MMM DD, YYYY")
        slug
        title
        github
        source
        wordpress
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;
