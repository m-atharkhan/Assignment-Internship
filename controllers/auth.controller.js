import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({ message: "Login successfull."});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("jwt").status(200).json({ message: "Logout successfull."});
}

export { registerUser, loginUser, logoutUser };