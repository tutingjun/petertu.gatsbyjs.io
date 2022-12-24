import * as React from "react";
import { useEffect } from "react";
import Layout from "../components/layout";
import Gallery from "react-photo-gallery";

import "../components/style.css";

export default function PhotoTemplate({ pageContext }) {
  const { photos, photoInfos } = pageContext;
  useEffect(() => {
    console.log(photoInfos);
    console.log(photos);
  }, []);

  return (
    <Layout pageTitle={"camera test"} showPages={false}>
      <div style={{ paddingTop: "3rem" }}>
        <Gallery photos={photos} />
      </div>
      {/* {photoInfos.map((photoInfo) => (
        <div>
          {Object.entries(photoInfo).map((singleInfo) => (
            <div>
              <p>{singleInfo[0]}</p>
              <p>{singleInfo[1]}</p>
            </div>
          ))}
        </div>
      ))} */}
    </Layout>
  );
}
