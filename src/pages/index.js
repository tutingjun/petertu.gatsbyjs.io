// Step 1: Import React
import * as React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { capitalize, slugify } from "../utils/helper";
import { projectLists } from "../data/projectList";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypewriterHook = () => {
  const wordArray = [
    "a programmer",
    "a photographer",
    "an amateur director",
    "a movie lover",
    "a video game enthusiast",
  ];
  const { text, count } = useTypewriter({
    words: wordArray,
    loop: true,
    autoStart: true,
    typeSpeed: 100,
  });

  return (
    <div className={`typewriter-text-${count % wordArray.length}`}>
      <span>{text}</span>
      <Cursor />
    </div>
  );
};

// Step 2: Define your component
const IndexPage = ({ data }) => {
  const recent = data.allMarkdownRemark.edges;
  return (
    <Layout pageTitle="Home Page" slug="./">
      <div className="hero-wrapper">
        <header className="hero index">
          <h1>Hi, I'm Peter Tu</h1>
          <div className="subheading">
            <div className="typewriter">
              <TypewriterHook />
            </div>
          </div>
          <p className="hero-description">
            I am a senior computer science major at Carleton College, aiming to
            become a full stack developer. I enjoy movies, video games, and
            photography.
            <br />
            <br />
            This is my space to record what I love and enjoy.
          </p>
        </header>
        {/* <div className="decoration">
          <StaticImage
            alt="Random images from unsplash"
            src="https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          />
        </div> */}
      </div>

      <section className="segment">
        <h2 className="home-heading">
          <div className="title">Recent Posts</div>
          <a className="button" href="/blogs">
            View all
          </a>
        </h2>
        <div className="post-preview">
          {recent.map((edge) => {
            return (
              <div className="anchored card">
                <p>{edge.node.frontmatter.date}</p>
                <Link to={edge.node.frontmatter.slug} className="card-header">
                  {edge.node.frontmatter.title}
                </Link>
                <div className="anchored categories">
                  <Link
                    className="cat"
                    to={`/cats/${slugify(edge.node.frontmatter.category)}`}
                    key={slugify(edge.node.frontmatter.category)}
                  >
                    {capitalize(edge.node.frontmatter.category)}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="segment">
        <h2 className="home-heading">
          <div className="title">My Projects</div>
        </h2>
        <div className="highlight-preview">
          {projectLists.map((project) => {
            return (
              <div className="muted card flex">
                <div className="project-image">
                  <img
                    src={project.image}
                    alt="test Images"
                    className="index-images"
                  />
                </div>
                <div>
                  <p>{project.date}</p>
                  <a
                    href={project.slug}
                    className="card-header"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                  </a>
                  <a className="button small" href={project.writeup}>
                    Article
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

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
            date: date(formatString: "MMM DD YYYY")
            category
          }
          id
        }
      }
    }
  }
`;

export default IndexPage;
