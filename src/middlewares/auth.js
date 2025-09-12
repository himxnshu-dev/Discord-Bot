require("dotenv").config();

function checkAuth(req, res, next) {
  const providedKey = req.headers["x-api-key"];
  const expectedKey = process.env.URL_API_KEY;

//   console.log("AUTH Middleware log");
//   console.log("Received Header (x-api-key):", providedKey);
//   console.log("Expected Key from .env:", expectedKey);

  if (!providedKey || providedKey !== expectedKey) {
    return res.status(403).end("UNAUTHORIZED!");
  } 

  console.log('Authentication Successful!')
  next()
}

module.exports = {checkAuth};
