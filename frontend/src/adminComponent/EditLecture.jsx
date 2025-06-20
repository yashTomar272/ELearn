import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditLecture = () => {
  const { courseId, lessonId } = useParams(); // 👈 make sure both params exist in the route
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_URL;

  const [lecture, setLecture] = useState({ lessonName: "", url: "" });

  // ✅ Get existing lesson data
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`${URL}/courses-lecture/${courseId}`);
        const found = response.data.find((item) => item._id === lessonId);
        if (found) {
          setLecture(found);
        } else {
          toast.error("Lecture not found");
        }
      } catch (err) {
        toast.error("Failed to load lecture");
      }
    };
    fetchLesson();
  }, [courseId, lessonId]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setLecture({ ...lecture, [e.target.name]: e.target.value });
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${URL}/update-lecture`,
        {
          lessonName: lecture.lessonName,
          url: lecture.url,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            courseid: courseId,
            lessonid: lessonId,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Lecture updated successfully");
        navigate(`/admin/SeeLecture/${courseId}`);
      }
    } catch (err) {
      toast.error("Failed to update lecture");
    }
  };

  return (
    <div className='h-100 w-100 p-3'>
      <h3 className='text-center fw-bold' style={{ fontSize: "25px" }}>
        Update Lecture Details
      </h3>

      <div className='w-100 h-100 DALJU mt-3'>
        <form
          onSubmit={handleSubmit}
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            height: "auto",
            width: "390px",
            backgroundColor: "rgba(110, 98, 214, 0.4)",
          }}
          className='p-3 d-flex flex-column gap-3'
        >
          <div className='userInputBox'>
            <input
              type='text'
              id='name'
              name='lessonName'
              value={lecture.lessonName}
              onChange={handleChange}
              required
              className='m-0 text-dark'
            />
            <label htmlFor='name'>Lecture Title</label>
          </div>

          <div className='userInputBox'>
            <input
              type='text'
              id='video_url'
              name='url'
              value={lecture.url}
              onChange={handleChange}
              required
              className='m-0 text-dark'
            />
            <label htmlFor='video_url'>Lecture Video Link</label>
          </div>

          <div className='d-flex justify-content-end w-100'>
            <button className='see_btn' type='submit'>
              Update Lecture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLecture;
