import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User koushith',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'testuser',
    email: 'test@example.com',
    password: 'test123',
  },
];

export default users;
