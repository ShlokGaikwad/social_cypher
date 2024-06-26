const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userMode");
const { BlacklistModel } = require("../models/blacklistModel");

require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password, contact } = req.body;
    const exUser = await UserModel.findOne({ email });
    if (exUser) {
      res.status(409).send({ msg: "user is already registered,Kindly Login" });
    }
    bcrypt.hash(password, 8, async (err, hash) => {
      if (hash) {
        const user = new UserModel({
          username,
          email,
          password: hash,
          contact,
        });
        await user.save();
        res
          .status(201)
          .send({ mas: "new user has been register", user: username });
      } else {
        console.log(err);
        res
          .status(404)
          .send({ msg: "error in password hashing process", err: err });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error while registering user", err });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).send({ msg: "User not found please register" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, author: user.username },
            "Abhay",
            { expiresIn: "7d" }
          );
          res.status(200).send({ msg: "login successfully", token });
        } else {
          return res.status(401).send({ error: "Wrong password." });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ msg: "error in user login", errors: err });
  }
});

userRouter.get('/logout', async(req, res)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const blacktoken = new BlacklistModel({ blacklistToken: token });
            await blacktoken.save();
            res.status(200).send({ msg: 'User logged out successfully' });
        } else {
            res.status(400).send({ msg: 'Token is missing or empty' });
        }
    }catch(err){
        res.status(404).send({msg:'error in user logout',Errors:err})
    }
})

module.exports = { userRouter };
