const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const loginService = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findAll({ where: { email, password } });

    if (findUser.length) {
      const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

      const payload = { data: email };

      const token = jwt.sign(payload, JWT_SECRET, jwtConfig);

      return res.status(200).json({ token });
    }

    if (!findUser.email || !findUser.password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginService,
}; 