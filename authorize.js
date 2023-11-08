const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "divya") {
    req.user = { name: "divya", id: 4 };
    next();
  } else {
    res.status(401).send("Unauthorised");
  }
  console.log("Authorise");
  next();
};
module.exports = authorize;
