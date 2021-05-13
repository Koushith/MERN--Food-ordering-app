import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, 'abc12345', {
    expiresIn: '30d',
  });
};

export default generateToken;
