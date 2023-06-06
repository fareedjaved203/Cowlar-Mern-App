require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postUser = async (req, res) => {
  const { name, email, password, profilePic } = req.body; //storing the posted data from form/postman to the model defined schema using obj destructuring
  console.log(`name is ${name}`);
  // console.log(name);

  if (!name || !email || !password) {
    // status 422 when user doesn't filled all fields
    return res.status(422).json({ error: "Plz fill properly" });
  }

  //to find and verify if email already exist or not
  //Status Code: 201 - created

  try {
    const userExists = await User.findOne({ email: email }); //database_column : input_fieldOfUser

    if (userExists) {
      return res.status(422).json({ error: "Email Already exists" });
    }
    const user = new User({ name, email, password, profilePic });

    //hashing of password takes place here just before save() but in the model where schema is defined

    const register = await user.save();
    if (register) {
      res.status(201).json({ message: "Data added successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

const authenticateUser = async (req, res) => {
  // res.json({ message: "Everything is good" }); //this will be shown by the postman
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Fill all fields plz" });
    }

    //finding user email in database
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      //matching password
      const isMatch = await bcrypt.compare(password, userLogin.password);

      //fetching token value that is defined in the schema
      const token = userLogin.generateAuthToken();

      //store the token in a cookie
      res.cookie("jwt-token", token, {
        expires: new Date(Date.now() + 25892000000), //to expire the token after 30 days
        httpOnly: true, //right now working with http only
      });

      if (isMatch) {
        res.json({ message: userLogin });
        console.log("login Successful");
      } else {
        res.json({ message: "User not found" });
      }
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

//req.body fetches the data from forms submitted
//response from the server is in the form of json
//below code line is used to show below data on the postman
// res.json({ message: req.body });

module.exports = { authenticateUser, postUser };
