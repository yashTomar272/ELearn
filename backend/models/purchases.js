const mongoose = require("mongoose");

const purchasesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user", // ✅ Make sure this matches actual model name
    required: true
  },
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "courses", // ✅ This should match your Course model name
      required: true
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("purchases", purchasesSchema);
