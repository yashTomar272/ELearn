import React, { useState ,useEffect} from "react";
import axios from "axios";
import {  toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate=useNavigate();
  const cathArr=[
  {name:"english"},
  {name:"hindi"}
]

const fullname=localStorage.getItem("fullname");
const [formData, setFormData] = useState({
    language: "",
    type: "",
    subject: "",
    price: "",
    title: "",
    valid: "",
    lecture: "",
    teachername: ""
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState("");

 const URL = "http://localhost:8000";

  // ✅ useEffect to set teachername
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      teachername: fullname || ""
    }));
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      alert("Please upload a thumbnail.");
      return;
    }

    const data = new FormData();
    data.append("language", formData.language);
    data.append("type", formData.type);
    data.append("subject", formData.subject);
    data.append("price", formData.price);
    data.append("title", formData.title);
    data.append("valid", formData.valid);
    data.append("lecture", formData.lecture);
    data.append("teachername", formData.teachername);
    data.append("thumbnail", thumbnail);

    try {
      const response = await axios.post(`${URL}/add-course`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if(response.status===200){
      toast.success(response.data.message)
    }else{
    toast.error(response.data.message)
    }
    navigate("/teacher/MyCourses");
    } catch (error) {
      console.error("Course add failed:", error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    
   <>
   <div className='h-100 w-100 p-3'>
<h3 style={{fontWeight:"500",fontSize:"25px"}} className='text-center fw-bold'>Add Course Details</h3>

<div className='w-100 h-100 DALJU mt-3'>
<form onSubmit={handleSubmit} encType="multipart/form-data" style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",borderRadius:"10px",height:"auto",width:"390px", backgroundColor: "rgba(110, 98, 214, 0.4)"}} className='p-3 d-flex flex-column gap-3' action="#">
                <div className="userInputBox">
                <input id="thumbnail" type="file" name="thumbnail" onChange={handleFileChange}  required className='m-0 text-dark' />
               
               </div>

               <div className=" position-relative  mt-2">
           <select 
           name="language"
           onChange={handleChange}
             className="" style={{border:"1px solid white",background:"none",outline:"none",padding:"10px 15px",borderRadius:"10px",width:"350px"}}>
           <option >Select Course language</option>{
          cathArr.map((val,id)=>{
            return(
              <option key={id}>
              {val.name}
              </option>
            )
          })
           }
           </select>
           <select 
           name="type"
           onChange={handleChange}
             className="mt-2" style={{border:"1px solid white",background:"none",outline:"none",padding:"10px 15px",borderRadius:"10px",width:"350px"}}>
           <option >Select Course type</option>
           <option >paid</option>
           <option >free</option>
           </select>
         </div>
            <div className="userInputBox">
                <input type="text" id="Subject" name="subject"  onChange={handleChange} required className='m-0 text-dark '/>
                <label htmlFor="Subject">Enter subject name</label>
               </div>
          {formData.type === "paid" && (
  <div className="userInputBox">
    <input
      type="text"
      id="price"
      name="price"
      onChange={handleChange}
      required
      className="m-0 text-dark"
    />
    <label htmlFor="price">Enter Price</label>
  </div>
)}

                 <div className="password position-relative  mt-2">
         <textarea
         name="title" 
         onChange={handleChange}
           placeholder="Enter Course title" style={{background:"none",color:"black",outline:"none",padding:"10px 16px",border:"1px solid white",borderRadius:"10px",width:"350px"}}></textarea>
         </div>
          <div className="userInputBox">
                <input type="text" id="valid"   name="valid" onChange={handleChange} required className='m-0 text-dark' />
                <label htmlFor="valid">Enter valid date</label>
               </div>
          <div className="userInputBox">
                <input type="text" id="lecture"  name="lecture" onChange={handleChange} required className='m-0 text-dark' />
                <label htmlFor="lecture">How many lecture</label>
               </div>
          <div className="userInputBox">
  <input
    type="text"
    id="teachername"
    name="teachername"
    value={formData.teachername}
    onChange={handleChange}
    required
    className='m-0 text-dark'
    readOnly
  />
</div>

               <button className='see_btn text-center' type="submit">Submit</button>

</form>
</div>
</div>
   </>
  )
}

export default AddCourse