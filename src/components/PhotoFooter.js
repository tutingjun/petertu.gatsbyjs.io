import React from "react";

export const PhotoFooter = ({ photoInfo }) => {
  return (
    <div className="card photo-card" style={{ zIndex: 2000000 }}>
      <p className="photo-card-title">{photoInfo.camera}</p>
      <hr className="solid" />
      <div className="camera-stats">
        <p>{"ISO " + photoInfo.iso}</p>
        <p>{photoInfo.focalLength + " mm"}</p>
        <p>{"f" + photoInfo.fStop}</p>
        <p>{photoInfo.shutter + " s"}</p>
      </div>
    </div>
  );
};
