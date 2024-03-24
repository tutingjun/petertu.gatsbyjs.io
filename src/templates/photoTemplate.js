import * as React from "react";
import { useState } from "react";

import Layout from "../components/layout";
import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import "../components/style.css";
import { PhotoFooter } from "../components/PhotoFooter";

export default function PhotoTemplate({ pageContext }) {
  const { photos, photoInfos } = pageContext;

  const [index, setIndex] = useState(-1);
  const [showInfo, setShowInfo] = useState(false);

  const updateIndex = ({ index: current }) => setIndex(current);

  return (
    <Layout pageTitle={"Chicago"} showPages={false}>
      {showInfo && <PhotoFooter photoInfo={photoInfos[index]} />}
      <div className="post-header medium width">
        <h1>Chicago</h1>
      </div>
      <div style={{ paddingTop: "3rem" }}>
        <PhotoAlbum
          layout="rows"
          photos={photos}
          targetRowHeight={500}
          spacing={15}
          onClick={({ index }) => setIndex(index)}
          key={index}
        />
      </div>
      <Lightbox
        styles={{ container: { backgroundColor: "rgba(0,0,0, 0.9)" } }}
        slides={photos}
        open={index >= 0}
        index={index}
        on={{ view: updateIndex }}
        close={() => {
          setIndex(-1);
          setShowInfo(false);
        }}
      />
    </Layout>
  );
}
