const router=require("express").Router();
const User=require("../models/user");
const {authenticatetoken}=require("./userAuth")


//add course to favourite
router.put("/add-to-fav", authenticatetoken, async (req, res) => {
    try {
        const { courseid, id } = req.headers;
        const userdata = await User.findById(id);
        
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }

        const iscoursefav = userdata.favourites.includes(courseid);
        
        if (iscoursefav) {
            return res.status(200).json({ message: "Course is already in favourite list" }); // ✅ Stops execution
        }

        await User.findByIdAndUpdate(id, { $push: { favourites: courseid } });

        return res.status(200).json({ message: "Course added to favourites" }); // ✅ Return here too
    } catch (err) {
        return res.status(500).json({ message: "An error occurred" }); // ✅ Ensure return on error
    }
});


// delete course to favourite
router.put("/delete-to-fav",authenticatetoken,async(req,res)=>{
    try{
const {courseid,id}=req.headers;
const userdata=await User.findById(id);
const iscoursefav=userdata.favourites.includes(courseid);
if(iscoursefav){
    await User.findByIdAndUpdate(id,{$pull:{favourites:courseid}})
}
res.status(200).json({ message: "Course delete from favourites" });
    }catch(err){
      res.status(500).json({ message: "An error occurred" });
    }
})

// show all favourite courses
router.get("/get-to-fav",authenticatetoken,async(req,res)=>{
    try{
const {id}=req.headers;
const userdata=await User.findById(id).populate("favourites");
const favouritecourse= userdata.favourites;

res.status(200).json({ 
    status:"success",
    data:favouritecourse
});
    }catch(err){
      res.status(500).json({ message: "An error occurred" });
    }
})
router.get("/get-fav", authenticatetoken, async (req, res) => {
  try {
    const user = await User.findById(req.headers.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ favourites: user.favourites }); // ✅ Return fav course ids
  } catch (err) {
    res.status(500).json({ message: "Error getting favourites" });
  }
});



module.exports=router;
