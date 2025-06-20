const mongoose = require("mongoose");

const avatars = [
"https://t3.ftcdn.net/jpg/08/12/63/16/360_F_812631683_ek5GhlY2zdlSILJMT7pHFujzi37i4Os4.jpg",
"https://img.freepik.com/premium-photo/cartoon-male-teacher-isolated-white-background-vector-illustration-ai-generated_894218-546.jpg" ,
"https://img.freepik.com/premium-photo/smiling-kawaii-cartoon-character-points-with-index-finger-light-portrait-teenager-isolated-transparent-background_1257429-76873.jpg",
"https://img.freepik.com/premium-photo/teacher-with-white-background-high-quality-ultra-hd_889056-35048.jpg",
"https://img.freepik.com/premium-photo/whimsical-intellectual-cartoon-character-this-3d-headshot-illustration-features-dapper-man-wearing-almond-white-coat-engrossed-book-his-animated-expression-captures-jo_14117-64163.jpg"
];

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  profileimg: {
  type: String,
  default: function () {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
  }
},
  purchases: [{
    type: mongoose.Types.ObjectId,
    ref: "purchases"
  }], 
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  qualification: { // only for teachers
    type: String,
    default: null
  },
   favourites: [{    // 👈 added this
    type: mongoose.Types.ObjectId,
    ref: "courses"
  }],
  myCourses: [{    // 👈 added this
    type: mongoose.Types.ObjectId,
    ref: "courses"
  }]
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
