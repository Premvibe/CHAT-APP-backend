

//get all users except the logged-in user
export const getUsersForSidebar = async (req, res) => {
  try{
    const userId = req.user._id;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");

  //count number of messages not seen
    
    });
  }