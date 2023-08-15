const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { id, email } = await jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id: id, email });
    req.user = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      image: user.image,
      shoppingCart: user.shoppingCart,
      userCollection: user.userCollection,
    };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "You must be logged in",
      error: error.message,
    });
  }
};

module.exports = requireAuth;
