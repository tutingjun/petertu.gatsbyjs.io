import * as React from "react";
import { useState } from "react";

import Layout from "../components/layout";
import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "../components/style.css";
import { PhotoFooter } from "../components/PhotoFooter";

export default function PhotoTemplate({ pageContext }) {
  const { photos, photoInfos } = pageContext;

  const [index, setIndex] = useState(-1);
  const [showInfo, setShowInfo] = useState(false);

  const updateIndex = ({ index: current }) => setIndex(current);

  return (
    <Layout pageTitle={"camera test"} showPages={false}>
      {showInfo && <PhotoFooter photoInfo={photoInfos[index]} />}
      <div className="post-header medium width">
        <h1>Chicago</h1>
      </div>
      <div style={{ paddingTop: "3rem" }}>
        <PhotoAlbum
          layout="rows"
          photos={photos}
          targetRowHeight={250}
          spacing={5}
          onClick={({ index }) => setIndex(index)}
        />
      </div>
      <Lightbox
        toolbar={{
          buttons: [
            <button
              key="my-button"
              type="button"
              className="yarl__button"
              onClick={() => setShowInfo(!showInfo)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
                focusable="false"
                className="yarl__icon"
              >
                <g fill="currentColor">
                  <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z" />
                </g>
              </svg>
            </button>,
            "close",
          ],
        }}
        slides={photos}
        open={index >= 0}
        index={index}
        on={{ view: updateIndex }}
        close={() => {
          setIndex(-1);
          setShowInfo(false);
        }}
        plugins={[Fullscreen, Zoom]}
      />
    </Layout>
  );
}
