const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // registration logic
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });


    user = new User({ name, email, password });
    await user.save();

    //create JWT payload
    const payload = { user: { _id: user._id, role: user.role } };

    //sign and return the token with user data

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) throw err;

        //send the user and token in resp

        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route POST api/users/login
// @desc Authenticate user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //find the user
    let user = await User.findOne({ email });
    const isMatch = await user.matchPassword(password);

    if (!user) {
      return res.status(400).json({ message: "Invalid Credential" });
    } else if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credential" });
    } else {
      //create JWT payload
      const payload = { user: { _id: user._id, role: user.role } };

      //sign and return the token with user data

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "12h" },
        (err, token) => {
          if (err) throw err;

          //send the user and token in resp

          res.json({
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token,
          });
        }
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// @route GET api/users/profile
// @desc Get logged-in user's profile (Protected Route)
// @access Private
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
