import { generateToken } from "../lib/utils";
import User from "./models/User.js";
import bcrypt from "bcrypt";


//signup  a new user
export const signup = async (req, res) => {
  const { email, fullName, password, bio } = req.body;

  try {
    if (!email || !fullName || !password || !bio) {
      return res.json ({
        status: false,
        message: "Please fill all the fields",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: false,
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    res.json({
      success: true,
      userDate: newUser,
      token,
      message: "User created successfully",
    });

  } catch (error) {
    console.log (error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
} 

//controller for user login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
   
    const isPasswordCorrect  = await bcrypt.compare(password, userData.password);
    if(!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = generateToken(userData._id);

    res.json({
      success: true,
      userDate: userData,
      token,
      message: "Login successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
} 
