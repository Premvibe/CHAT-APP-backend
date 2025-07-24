import { generateToken } from "../lib/utils";
import User from "../models/User.js";
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

    if (!email || !password) {
      return res.json({
        status: false,
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: false,
        message: "User does not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        status: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      userData: user,
      token,
      message: "Login successful",
    });

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
}   