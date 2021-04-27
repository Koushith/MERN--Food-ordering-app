import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

// middleware function

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //   console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'abc123');

      //   we can get user data from decoded- get everything except password. we will assign this var in finding profile route
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      res.status(401);
      throw new Error('Not Authorized, no Token');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, no Token');
  }
});

export default protect;
