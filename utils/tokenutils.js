const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  const accessTokenSecret = "deema";
  const accessTokenExpiration ="1h"; // Expiration time for the token
  const accessToken = jwt.sign(
    { UserInfo: { id: userId } },
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiration,
    }
  );
  return accessToken;
};

const generateRefreshToken = (userId) => {
  const refreshTokenSecret = "deema";
  const refreshTokenExpiration = "1h"; // Expiration time for the token

  // Generate the refresh token
  const refreshToken = jwt.sign(
    { UserInfo: { id: userId } },
    refreshTokenSecret,
    {
      expiresIn: refreshTokenExpiration,
    }
  );

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };