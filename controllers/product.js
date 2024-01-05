import Model from "../models/product.js";
import upload from "../middelware/multer.js";

//get all hidden products (for superAdmin and admin)
export function getHidden(req, res, next) {
  const pageNumber = req.query.pageNumber || 1;
  const pageSize = req.query.pageSize || 10;

  if (pageNumber < 1 || isNaN(pageNumber)) {
    res.status(400).send("Invalid page number");
    return;
  }

  Model.find({ isDeleted: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//get all available products (for admins and user)
export function getAvailable(req, res, next) {
  const pageNumber = req.query.pageNumber || 1;
  const pageSize = req.query.pageSize || 10;

  if (pageNumber < 1 || isNaN(pageNumber)) {
    res.status(400).send("Invalid pageNumber");
    return;
  }

  Model.find({ isDeleted: false })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//get a product by id
export function getById(req, res, next) {
  console.log("params:", req.params);
  let { id } = req.params;
  Model.findOne({ _id: id })
    .then((product) => {
      if (!product) {
        res.status(404).send("product not found");
      } else {
        res.status(200).send({ success: true, response: product });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

// get available product by id
export function getAvailableById(req, res, next) {
  console.log("params:", req.params);
  let { id } = req.params;
  Model.findOne({ _id: id, isDeleted: false })
    .then((product) => {
      if (!product) {
        res.status(404).send("product not found");
      } else {
        res.status(200).send({ success: true, response: product });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//create a new product
export async function post(req, res, next) {
  const {
    name,
    description,
    price,
    currency,
    brand,
    category,
    isDeleted,
    expiryDate,
  } = req.body;
  let doc = new Model({
    name,
    description,
    price,
    currency,
    brand,
    isDeleted,
    category,
    expiryDate,
    image: req.file,
  });
  try {
    // doc.validate();
    await doc.save();
    res.status(200).send(doc);
  } catch (err) {
    res.status(400).send(err);
  }
}

//update a product
export function put(req, res) {
  let { id } = req.params;
  let body = req.body;
  let file = req.file;
  console.log(body);
  Model.findOneAndUpdate({ _id: id }, { $set: body }, { new: true })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//hardDelete a product
export function deleteProduct(req, res) {
  let { id } = req.params;
  Model.findOneAndDelete({ _id: id })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//softDelete (hide a product)
export function softDelete(req, res) {
  let { id } = req.params;
  Model.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

const controller = {
  deleteProduct,
  getAvailable,
  getHidden,
  getById,
  put,
  post,
  softDelete,
  getAvailableById,
};

export default controller;
