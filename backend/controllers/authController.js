const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existusername = await User.findOne({ username });
    const existemail = await User.findOne({ email });
    console.log(existemail);
    console.log(existusername);
    if (existemail || existusername) {
      return res.status(401).json({
        message: existemail
          ? "Email already exists"
          : "Username already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      });
    } else {
      res.status(400).json({ error: "internal server error" });
    }
  } catch (error) {
    console.log("Signup error ", error.message);
    res.status(500).json({ error: "inernal server error " });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json("wrong credentials");
    }

    const verifay = await bcrypt.compare(password, user?.password || "");
    if (verifay) {
      generateTokenAndSetCookie(user._id, res);
      res.status(200).json({
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
    } else {
      return res.status(401).json("wrong credentials");
    }
  } catch (error) {
    console.log("login error ", error.message);
    res.status(500).json({ error: "inernal server error " });
  }
};
const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("logout error ", error.message);
    res.status(500).json(error.message);
  }
};
export { logout, signup, login };
