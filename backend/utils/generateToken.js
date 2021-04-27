import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, 'abc123', {
    expiresIn: '30d',
  });
};

export default generateToken;

// from jwt docs, we need to pass an obj, here we aee passing user id- obj is nothing but payload - id, secret
