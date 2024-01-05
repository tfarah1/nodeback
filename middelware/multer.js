// import multer, { memoryStorage } from "multer";

// const storage = memoryStorage();

// const upload = multer({ storage: storage });


import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

export default upload;
