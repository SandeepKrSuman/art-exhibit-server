import auth from "../models/auth.js";

// ---------> Find User <----------------
const findUser = async (req, res) => {
  try {
    const user = await auth.findOne({ email: req.loggedmail }, "-password");
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: true, errorMsg: "User Not Found!" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

// ------------> Update User Details <--------------
const updateProfile = async (req, res) => {
  try {
    const { fname, lname } = req.body;
    const profile = await auth.findOneAndUpdate(
      { email: req.loggedmail },
      { fname, lname }
    );
    if (profile) {
      return res
        .status(200)
        .json({ error: false, msg: "Profile updated successfully." });
    } else {
      return res
        .status(400)
        .json({ error: true, errorMsg: "Failed to update profile." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

export { findUser, updateProfile };
