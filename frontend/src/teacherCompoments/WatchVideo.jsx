import React from "react";
import { useParams } from "react-router-dom";

const WatchVideo = () => {
  const { url } = useParams();
  const videoUrl = decodeURIComponent(url);

  return (
    <div className="d-flex justify-content-center mt-5">
      <iframe
        width="800"
        height="450"
        src={videoUrl}
        title="Lecture Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchVideo;
