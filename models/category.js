import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the category's name"],
      trim: true,
      // minlength: [10, "Name must be at least 10 characters"],
      maxlength: [30, "Name cannot be more than 30 characters"],
      match: [
        /^[A-Z][A-Za-z\s]+$/,
        "Name must start with a capital letter and only contain letters and spaces",
      ],
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      maxlength: [40, "Slug cannot be more than 40 characters"],
      match: [
        /^[a-zA-Z_-]+$/,
        "Slug must only contain letters, underscores, and dashes",
      ],
    },
  },
  {
    collection: "categories",
  }
);

const Category = model("Category", categorySchema);
export default Category;
