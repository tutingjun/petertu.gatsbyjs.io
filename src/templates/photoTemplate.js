import * as React from "react";
import { useState } from "react";

import Layout from "../components/layout";
import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import "../components/style.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function PhotoTemplate({ pageContext }) {
  const { photos } = pageContext;

  const [index, setIndex] = useState(-1);
  const [showInfo, setShowInfo] = useState(false);

  const updateIndex = ({ index: current }) => setIndex(current);

  return (
    <Layout pageTitle={"Chicago"} showPages={false}>
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
          renderPhoto={({
            photo,
            imageProps: { alt, title, sizes, className, onClick },
            wrapperStyle,
          }) => (
            <div style={{ ...wrapperStyle, position: "relative" }}>
              <LazyLoadImage
                src={photo.src}
                effect="blur"
                {...{ alt, title, sizes, className, onClick }}
              />
            </div>
          )}
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
