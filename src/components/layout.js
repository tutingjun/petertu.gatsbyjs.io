import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Navigation } from "./Navigation";

const Layout = ({ pageTitle, children }) => {
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
          <h1 className="heading">{pageTitle}</h1>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
