import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //   we are passing this user id into generate token fnc
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc   Create new user
// @route   POST /api/users/
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  // pullout name, email and password from body

  const { name, email, password } = req.body;

  // check in db as user exists if yes thow new error saying that user exist
  const userExist = await User.findOne({ email });

  console.log(userExist);
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  // create new user and return details along with token

  const user = await User.create({
    name,
    email,
    password,
  });

  // if creation successful-

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid Data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id); // this is from missleware

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, getUserProfile, registerUser };
