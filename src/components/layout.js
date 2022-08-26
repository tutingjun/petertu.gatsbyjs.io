import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

const Layout = ({ pageTitle, children, slug }) => {
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
      <Navigation slug={slug} />
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
