import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

const Layout = ({ pageTitle, children, showPages }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div>
      <title>
        {pageTitle} | {data.site.siteMetadata.title}
      </title>
      <Navigation />
      <main>
        <div className="container">
          {showPages && <h1 className="heading">{pageTitle}</h1>}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
