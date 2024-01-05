import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add your first name"],
      trim: true,
      match: [
        /^[A-Za-z\s]+$/,
        "the first name must only contain letters and spaces",
      ],
    },
    lastName: {
      type: String,
      required: [true, "Please add your last name"],
      trim: true,
      match: [
        /^[A-Za-z\s]+$/,
        "the last name must only contain letters and spaces",
      ],
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      required: true,
      default: "user",
    },
    email: {
      type: String,
      unique: [true, "User is already registered. Email is used"],
      required: [true, "Email address is required"],
      trim: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
      //unique: true,
      select: false, //exclude the password field from query results by default
      validate: [
        {
          validator: function (password) {
            return /[A-Z]/.test(password);
          },
          message: "Password must contain at least one uppercase letter",
        },
        {
          validator: function (password) {
            return /[@#$%&*]/.test(password);
          },
          message:
            "Password must contain at least one special character (@#$%&*)",
        },
        {
          validator: function (password, inputValue) {
            return password.length >= 8;
          },
          message: "Password must be at least 8 characters long",
        },
      ],
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role , isLoggedIn: this.isLoggedIn },
    process.env.jwtPrivateKey
  );
  return token;
};

userSchema.methods.setIsLoggedIn = async function() {
  this.isLoggedIn = true;
  await this.save();
};

userSchema.methods.setRoleAdmin = async function() {
  this.role == "admin";
  await this.save();
};


const User = model("User", userSchema);
export default User;
