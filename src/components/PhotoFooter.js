import React from "react";

export const PhotoFooter = ({ photoInfo }) => {
  return (
    <div className="card photo-card">
      <p className="photo-card-title">{photoInfo.camera}</p>
      <p className="photo-card-title">{photoInfo.lens}</p>
      <hr class="solid" />
      <div className="camera-stats">
        <p>{"ISO " + photoInfo.iso}</p>
        <p>{photoInfo.focalLength + " mm"}</p>
        <p>{"f" + photoInfo.fStop}</p>
        <p>{photoInfo.shutter + " s"}</p>
      </div>
    </div>
  );
};
