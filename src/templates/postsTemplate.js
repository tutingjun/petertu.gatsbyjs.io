import * as React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";

import "../components/style.css";
import { PostSideBar } from "../components/PostSideBar";
import { capitalize, getYearList } from "../utils/helper";

export default function PostsTemplate({ data, pageContext }) {
  const { key, isTagPage } = pageContext;
  const markdown = isTagPage ? data.tag : data.category;
  const posts = markdown.edges;
  const postsByYear = getYearList(posts);
  const years = Object.keys(postsByYear).reverse();
  const totalCount = markdown.totalCount;
  const message = isTagPage
    ? totalCount === 1
      ? " post tagged:"
      : " posts tagged:"
    : totalCount === 1
    ? " post categorized as:"
    : " posts categorized as:";

  return (
    <Layout
      pageTitle={isTagPage ? `Posts tagged: ${key}` : `${key}`}
      showPages={false}
    >
      <div className="grid">
        <div className="article-content">
          <header className="hero">
            <div className="sub-title">
              <span className="highlight">{totalCount}</span>
              {message}
            </div>
            {isTagPage ? <h1>{key}</h1> : <h1>{capitalize(key)}</h1>}
          </header>
          {years.map((year) => (
            <div className="segment">
              <h2 className="year">{year}</h2>
              {postsByYear[year].map((post) => (
                <Link to={post.slug} className="post">
                  <h3>{post.title} </h3>
                  <p>{post.date}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <PostSideBar />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query Pages($key: String, $isTagPage: Boolean!, $isCatPage: Boolean!) {
    category: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { category: { in: [$key] } } }
    ) @include(if: $isCatPage) {
      totalCount
      edges {
        node {
          frontmatter {
            slug
            title
            year: date(formatString: "YYYY")
            date: date(formatString: "MMMM DD")
            category
            tag
          }
          id
        }
      }
    }

    tag: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tag: { in: [$key] } } }
    ) @include(if: $isTagPage) {
      totalCount
      edges {
        node {
          frontmatter {
            slug
            title
            year: date(formatString: "YYYY")
            date: date(formatString: "MMMM DD")
            category
            tag
          }
          id
        }
      }
    }
  }
`;
