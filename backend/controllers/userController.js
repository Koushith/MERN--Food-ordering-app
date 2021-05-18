import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc auth user and get token
//  @route Post /api/user/login
//  @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('incorrect email or password');
  }
});

// @desc register user and get token
//  @route Post /api/users
//  @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error('user already exist');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  //  user created successfully
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
    throw new Error('something went wrong, invalid user data');
  }
});

// @desc send token in header from frontend and return loggedin user
//  @route GET /api/user/profile
//  @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

export { authUser, getUserProfile, registerUser };
