import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

const SeeLecture = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [lecture, setLecture] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const res = await axios.get(`${URL}/courses-lecture/${id}`);
        setLecture(res.data);
        setShowLoader(false);
      } catch (err) {
        console.error("Error fetching lecture:", err);
      }
    };
    fetchLecture();
  }, [id]);

  const deleteProduct = async (lessonId) => {
    try {
      const response = await axios.delete(`${URL}/delete-lecture`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          courseid: id,
          lessonid: lessonId,
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error("Error deleting lesson");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting lesson");
    }
  };

  // 🔽 function to convert YouTube short URL to embed format
  const getEmbedUrl = (url) => {
    if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // fallback
  };

  return (
    <div className="w-100 p-3" style={{ height: "100%" }}>
      <h3 className="text-center fw-bold" style={{ fontSize: "25px" }}>
        All Lecture
      </h3>
      {showLoader && <Loader />}
      <div className="mt-3 d-flex flex-column gap-2 align-items-center">
        {lecture.length > 0 ? (
          <>
            {lecture.map((item, i) => (
              <div
                key={i}
                className="p-3"
                style={{
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "9px",width:"100%",maxWidth:"450px"
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ fontWeight: "600" }}>Lecture {i + 1}:</span>
                  <div className="d-flex gap-2">
                    <MdDeleteOutline
                      className="delet_Course_iconn"
                      onClick={() => deleteProduct(item._id)}
                    />
                    <BiEditAlt
                      className="edit_Course_iconn"
                      onClick={() =>
                        navigate(`/teacher/EditLecture/${id}/${item._id}`)
                      }
                    />
                  </div>
                </div>
                <span>{item.lessonName}</span>
                <div className="d-flex flex-row justify-content-right align-items-center mt-2">
                  <button
                    className="see_btn"
onClick={() => {
  const embedUrl = getEmbedUrl(item.url);
  navigate(`/teacher/WatchVideo/${encodeURIComponent(embedUrl)}`);
}}
                  >
                    Watch Video
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h5>No lectures found</h5>
        )}
        
      </div>
    </div>
  );
};

export default SeeLecture;
