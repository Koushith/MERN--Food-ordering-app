import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   get the username and password
  // cif exist compare it with database and return the token

  res.json({
    email,
    password,
  });
});

export { authUser };
