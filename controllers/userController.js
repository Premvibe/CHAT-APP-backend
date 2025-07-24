

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

    
  } catch (error) {
