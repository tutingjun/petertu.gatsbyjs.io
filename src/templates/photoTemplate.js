import * as React from "react";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import Layout from "../components/layout";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import "../components/style.css";
import { PhotoFooter } from "../components/PhotoFooter";

export default function PhotoTemplate({ pageContext }) {
  const { photos, photoInfos } = pageContext;

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    console.log(photoInfos);
    console.log(photos);
  }, []);

  const FooterCaption = ({ currentView, isModal }) =>
    isModal ? (
      <div>
        <PhotoFooter photoInfo={currentView} />
      </div>
    ) : null;

  return (
    <Layout pageTitle={"camera test"} showPages={false}>
      <div style={{ paddingTop: "3rem" }}>
        <Gallery photos={photos} onClick={openLightbox} />
      </div>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              components={{
                FooterCaption: FooterCaption,
              }}
              currentIndex={currentImage}
              views={photoInfos}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </Layout>
  );
}
