const router=require("express").Router();
const User=require("../models/user")
const {authenticatetoken}=require("./userAuth")
const Courses=require("../models/courses")
const upload=require("../utils/multer")


//add course with admin and teacher
router.post("/add-course", authenticatetoken, upload.single("thumbnail"), async (req, res) => {
  try {
    const { language,type, subject,price, title, valid, lecture, teachername } = req.body;
    const { id } = req.headers;

    if (!id) return res.status(400).json({ message: "User ID is missing in headers" });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "admin" && user.role !== "teacher") {
      return res.status(403).json({ message: "You are not authorized to add a course" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Thumbnail file is required" });
    }

    const courses = new Courses({
      thumbnail: req.file.path,
      language,
      type,
      subject,
      price,
      title,
      valid,
      lecture,
      teachername
    });

    await courses.save();

    user.myCourses.push(courses._id);
    await user.save();

    res.status(200).json({ message: "Course added successfully", data: courses });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// ✅ Get my courses by user
router.get("/get-my-courses", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.headers;

    const user = await User.findById(id).populate("myCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Courses fetched successfully", data: user.myCourses });

  } catch (err) {
    console.error("Get myCourses error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// update course
router.put("/update-course", authenticatetoken, upload.single("thumbnail"), async (req, res) => {
  try {
    const { courseid } = req.headers;
    const { language,type, subject,price, title, valid, lecture, teachername } = req.body;

    const user = await User.findById(req.user.id); // From token

  //  if (user.role !== "admin" && user.role !== "teacher") {
  //     return res.status(403).json({ message: "You are not authorized to add a course" });
  //   }

    const updateData = {
      language,
      type,
      subject,
      price,
      title,
      valid,
      lecture,
      teachername,
    };

    if (req.file) {
      updateData.thumbnail = req.file.path;
    }

    await Courses.findByIdAndUpdate(courseid, updateData);

    return res.status(200).json({ message: "Course update successful!" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// POST route to add lesson in existing course
router.post("/courses-lecture/:id", async (req, res) => {
  const { id } = req.params;
  const { lessonName, url } = req.body;

  try {
    const course = await Courses.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Push new lesson into lessons array
    course.lessons.push({ lessonName, url });

    await course.save();

    res.status(200).json({ message: "Lesson added successfully", course });
  } catch (error) {
    console.error("Error adding lesson:", error); // 👈 terminal me error print hoga
    res.status(500).json({ message: "Error adding lesson", error });
  }
});


// Get all lessons of a course
router.get("/courses-lecture/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Courses.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course.lessons); // only lessons
  } catch (error) {
    res.status(500).json({ message: "Error fetching lessons", error });
  }
});
//update lecture
router.put("/update-lecture", authenticatetoken, async (req, res) => {
  try {
    const { courseid, lessonid } = req.headers;
    const { lessonName, url } = req.body;

    if (!courseid || !lessonid) {
      return res.status(400).json({ message: "Missing courseid or lessonid" });
    }

    const course = await Courses.findById(courseid);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const lesson = course.lessons.id(lessonid);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    lesson.lessonName = lessonName;
    lesson.url = url;

    await course.save();

    return res.status(200).json({ message: "Lesson updated successfully" });
  } catch (err) {
    console.error("Update lesson error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// ✅ DELETE a single lesson from a course using lesson _id and course _id
router.delete("/delete-lecture", authenticatetoken, async (req, res) => {
  try {
    const { courseid, lessonid } = req.headers;

    if (!courseid || !lessonid) {
      return res.status(400).json({ message: "Missing courseid or lessonid" });
    }

    const updatedCourse = await Courses.findByIdAndUpdate(
      courseid,
      {
        $pull: {
          lessons: { _id: lessonid }
        }
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Lesson deleted successfully", course: updatedCourse });
  } catch (err) {
    console.error("Error deleting lesson:", err);
    res.status(500).json({ message: "An error occurred while deleting the lesson" });
  }
});

//delete course
router.delete("/delete-course", authenticatetoken, async (req, res) => {
  try {
    const { courseid } = req.headers;
    
    const userId = req.headers.id; // make sure you're sending user id in headers

    // Step 1: Delete course from Courses collection
    await Courses.findByIdAndDelete(courseid);

    // Step 2: Remove course ID from user's myCourses array
    await User.findByIdAndUpdate(userId, {
      $pull: { myCourses: courseid }
    });

    return res.status(200).json({ message: "Course deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// delet teacher course
router.delete("/delete-teacher-course", authenticatetoken, async (req, res) => {
  try {
    const { courseid } = req.headers;

    // Step 1: Find the course to get its creator (teacher's user ID)
    const course = await Courses.findById(courseid);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const teacherId = course.userid; // assuming you store teacher's ID in course.userid

    // Step 2: Delete course from Courses collection
    await Courses.findByIdAndDelete(courseid);

    // Step 3: Remove course from that teacher's myCourses array
    await User.findByIdAndUpdate(teacherId, {
      $pull: { myCourses: courseid },
    });

    return res.status(200).json({ message: "Course deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});


// get-all-course
router.get("/get-all-course",async(req,res)=>{
    try{

        const course =await Courses.find().sort({createdAt:-1});
        return res.json({
            status:200,
            data:course,
        })
    }catch(err){
      res.status(500).json({ message: "An error occurred" });
    }
})

// get-recent-course
router.get("/get-recent-course",async(req,res)=>{
    try{

        const course =await Courses.find().sort({createdAt:-1}).limit(4);
        return res.json({
            status:200,
            data:course,
        })
    }catch(err){
      res.status(500).json({ message: "An error occurred" });
    }
})


// get-course-by-id
router.get("/get-courses-by-id/:id", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("myCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Courses fetched successfully", data: user.myCourses });

  } catch (err) {
    console.error("Get myCourses error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




// get-course-by-teachername
router.get("/get-course-by-teachername/:teachername", async (req, res) => {
    try {
        const { teachername } = req.params;

        // teachername ke basis pe course filter karna
        const course = await Courses.find({ teachername: teachername }).sort({ createdAt: -1 });

        return res.json({
            status: 200,
            data: course,
        });
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
});
// get paid course
router.get("/get-paid-course", async (req, res) => {
    try {
      

        // paid ke basis pe course filter karna
        const course = await Courses.find({ type: "paid" }).sort({ createdAt: -1 });

        return res.json({
            status: 200,
            data: course,
        });
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
});
// get free course
router.get("/get-free-course", async (req, res) => {
    try {
      

        // paid ke basis pe course filter karna
        const course = await Courses.find({ type: "free" }).sort({ createdAt: -1 });

        return res.json({
            status: 200,
            data: course,
        });
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
});

// Search course route
router.get("/search-course", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { query } = req.query;

    if (!query || !id) {
      return res.status(400).json({ message: "Missing query or user id" });
    }

    const user = await User.findById(id).populate("myCourses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const filteredCourses = user.myCourses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );

    res.status(200).json({ data: filteredCourses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/search-all-course", authenticatetoken, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Missing search query" });
    }

    const searchRegex = { $regex: query, $options: "i" }; // case-insensitive regex

    const filteredCourses = await Courses.find({
      $or: [
        { title: searchRegex },
        { subject: searchRegex },
        { teachername: searchRegex },
        { type: searchRegex },
        { language: searchRegex }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({ data: filteredCourses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});





  
  //get my all course by my name 
  router.get("/my-courses", authenticatetoken, async (req, res) => {
  try {
    // 🔐 Token se user ki info le rahe hain
    const user = await User.findById(req.user.id);

    // 🔒 Sirf teachers access kar sakte hain
    if (user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can access their courses" });
    }

    // 👨‍🏫 Teacher ke naam ke basis par courses fetch karo
    const myCourses = await Cources.find({ teachername: user.username }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Courses fetched successfully",
      data: myCourses,
    });

  } catch (err) {
    console.error("Error fetching teacher's courses:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// ✅ Course ID se course fetch karne ke liye
router.get("/get-course-by-id/:id", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Courses.findById(id); // 👈 Ye course ka model hai

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course fetched successfully", data: course });

  } catch (err) {
    console.error("Get course by ID error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports=router;