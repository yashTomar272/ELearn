const router=require("express").Router();
const Courses=require("../models/courses")
const Purchases=require("../models/purchases");
const {authenticatetoken}=require("./userAuth")
const User = require('../models/user')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
//purchases place

router.post('/place-order', async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== 'paid')
      return res.status(400).json({ message: 'Payment not verified' });

    // Step 1: Create a purchase
    const purchase = await Purchases.create({
      user: session.metadata.userId,
      courses: session.metadata.courseId,
    });

    // Step 2: Push purchase ID to user's purchases array
    await User.findByIdAndUpdate(
      session.metadata.userId,
      { $push: { purchases: purchase._id } }
    );

    res.json({ message: 'Course purchased', purchase });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Order placement failed' });
  }
});



// GET user history of particular user

router.get("/my-purchases", async (req, res) => {
  try {
    const { id } = req.headers;

    const user = await User.findById(id)
      .populate({
        path: "purchases",
        populate: {
          path: "courses", // assuming 'courses' is also an ObjectId or an array of ObjectIds from Course model
          model: "courses"
        }
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      totalPurchases: user.purchases.length,
      data: user.purchases
    });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: "Failed to fetch purchases" });
  }
});



// get all purchases 
router.get("/get-all-purchases", authenticatetoken, async (req, res) => {
    try {
        const purchases = await Purchases.find()
            .populate("courses user") // Combined for efficiency
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: "success",
            data: purchases
        });

    } catch (err) {
        console.error("Error fetching purchases:", err); // Added error logging
        return res.status(500).json({ message: "An error occurred" });
    }
});


// update order admin
router.put("/update-status/:id",authenticatetoken,async(req,res)=>{
    try{
const {id}=req.params;
await Purchases.findByIdAndUpdate(id,{status:req.body.status});
return res.json({
    status:"success",
    message:"status update successfully"
})
    }catch(err){
        res.status(500).json({ message: "An error occurred" });
    }
})

router.get("/my-buyers", async (req, res) => {
  try {
    const { id } = req.headers; // teacher ID from frontend
    console.log("Teacher ID:", id);

    // Step 1: Find all courses created by this teacher
    const myCourses = await Courses.find({ teacher: new mongoose.Types.ObjectId(id) });

    if (!myCourses || myCourses.length === 0) {
      return res.status(200).json({ totalBuyers: 0, buyers: [] });
    }

    // Step 2: Extract all course IDs
    const myCourseIds = myCourses.map(course => course._id);

    // Step 3: Find purchases where students bought any of these courses
    const purchases = await Purchases.find({
      courses: { $in: myCourseIds }
    }).populate("user", "fullname email") // populate student info
      .populate("courses", "title"); // optional: show course title too

    res.json({
      totalBuyers: purchases.length,
      buyers: purchases
    });

  } catch (err) {
    console.error("Error fetching buyers:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports=router;