const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: "english",
        enum: ["english", "hindi"]
    },
    type: {
        type: String,
        default: "paid",
        enum: ["paid", "free"]
    },
    subject: {
        type: String,
        required: true
    },
    price: {
        type: String,
       default: null
    },
    title: {
        type: String,
        required: true
    },
    valid: {
        type: String,
        required: true
    },
    lecture: {
        type: String,
        required: true
    },
    teachername: {
        type: String,
        required: true
    },
// ✅ ADD THIS FIELD
  teacher: {
        type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },

    // ✅ New Field for Lessons
lessons: [
  {
    lessonName: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
]
}, { timestamps: true });

module.exports = mongoose.model("courses", courseSchema);
