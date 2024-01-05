import fs from "node:fs/promises";
import Model from "../models/file.js";

//get all files
export function getAll(req, res, next) {
  Model.find()
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//get a file by id
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

// add a file
export function post(req, res, next) {
  console.log(req.file);
  let { filename: name, mimetype: type } = req.file || {};
  let extension = name ? name.split(".").pop() : "";
  let doc = new Model({
    name,
    type,
    extension,
    destination: "uploads",

    // images
  });
  doc
    .save()
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

// add array of photos
// export function postArray(req, res, next) {
//   console.log(req.files);
//   let files = req.files || [];
//   let docs = files.map(file => {
//     let { filename: name, mimetype: type } = file;
//     let extension = name ? name.split(".").pop() : "";
//     return new Model({ name, type, extension, destination: "uploads" });
//   });
//   Model.insertMany(docs)
//     .then((response) => {
//       console.log(response);
//       res.status(200).send({ success: true, response });
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// }

//edit a file
export async function updateFile(req, res, next) {
  try {
    const { id } = req.params;
    const file = await Model.findById(id);
    if (!file) {
      return res.status(404).send({ status: 404, message: "Not Found" });
    }
    const { name } = req.body;
    console.log("before update:", file);

    file.name = name || file.name;
    console.log("after update:", file);

    await Model.findByIdAndUpdate(id, file, { new: true });
    res.status(200).send({ status: 200, data: file });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
}

//delete a file
export async function deleteFile(req, res, next) {
  try {
    const { id } = req.params;
    const file = await Model.findByIdAndDelete(id);
    if (!file) {
      return res.status(404).send({ status: 404, message: "Not Found" });
    }
    const filePath = `images/${file.name}`;
    await fs.unlink(filePath);
    res.status(200).send({ status: 200, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
}

const controller = {
  deleteFile,
  getAll,
  updateFile,
  post,
  getById,
};

export default controller;
