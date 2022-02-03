const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const router = require("express").Router();

//Update
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update your account only");
  }
});

//Delete
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      
  
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Has been Deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can Delete your account only");
    }
  });

//Get
router.get("/find/:id", async (req, res) => {
      
  
      try {
        const user = await User.findById(req.params.id);

        const { password, ...info } = user._doc;

        res.status(200).json(info);
      } catch (err) {
        res.status(500).json(err);
      }
    
  });

//Get All
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
      
  
      try {
        const users = query ?  await User.find().sort({id:-1}).limit(5) : await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see all users");
    }
  });

//Stats

router.get("/stats", async (req,res)=>{
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear()-1);

    

    try {
        const data = await User.aggregate([
            {
                $project:{
                    month: {$month : "$createdAt"}
                }
            },{
                $group:{
                    _id : "$month",
                    total: {$sum:1}
                }
            }

        ]);

        res.status(202).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
