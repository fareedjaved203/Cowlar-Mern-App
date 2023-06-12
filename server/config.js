require("dotenv").config();

const config = {
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  Api: process.env.API,
};

module.exports = config;
