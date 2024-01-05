import Model from "../models/user.js";
import bcrypt from "bcrypt";

//get all users
export function getAll(req, res, next) {
  Model.find({ role: "user" })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

// get a user by id
export function getById(req, res, next) {
  console.log("params:", req.params);
  let { id } = req.params;
  Model.findOne({ _id: id })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

// // get all admins
// export function getAllAdmins(req, res, next) {
//   Model.find({ role: "admin" })
//     .then((response) => {
//       console.log(response);
//       res.status(200).send({ success: true, response });
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// }

// get all admins
export async function getAllAdmins(req, res, next) {
  try {
    const response = await Model.find({ role: "admin" });
    console.log(response);
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(500).send(error);
  }
}


//identifier a user
export async function get(req, res) {
  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    const user = await Model.findById(req.user._id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

// create a user/ register
export async function post(req, res, next) {
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = await Model.findOne({ email });
    if (user) {
      return res.status(400).send("User already registered"); //we dont need it bcz email is unique (in schema)
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const doc = new Model({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await doc.save();

    const token = doc.generateAuthToken();

    res.header("x-auth-token", token).status(200).send({
      success: true,
      message: "User created successfully",
      doc,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Could not create user, please try again later" });
  }
}

// create an admin
export async function postAdmin(req, res) {
  const { email, password, firstName, lastName } = req.body;
  console.log(password);
  try {
    const user = await Model.findOne({ email });
    if (user) {
      return res.status(400).send("User already registered"); //we dont need it bcz email is unique (in schema)
    }
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    const doc = new Model({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "admin",
    });
    await doc.save().catch((error) => {
      res.status(500).send(error);
    });

    const token = doc.generateAuthToken();

    res.header("x-auth-token", token).status(200).send({
      success: true,
      message: "admin created successfully",
    });
    console.log(doc);
  } catch (err) {
    console.error(err);
    res
      .status(600)
      .send({ message: "Could not create admin, please try again later" });
  }
}

//delete a user
export function deleteUser(req, res) {
  let { id } = req.params;
  Model.findOneAndDelete({ _id: id, role: "user" })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//delete an admin
export function deleteAdmin(req, res) {
  const { id } = req.params;
  Model.findOneAndDelete({ _id: id, role: "admin" })
    .then((response) => {
      console.log("response", response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//login
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await Model.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send("Invalid email or password!");
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(400).send("Invalid email or password!");

  await user.setIsLoggedIn(); // set isloggedin to true

  const token = generateAuthToken();

  res.send(token);
}

const controller = {
  deleteUser,
  deleteAdmin,
  postAdmin,
  getAllAdmins,
  post,
  get,
  getById,
  getAll,
  login,
};
export default controller;
