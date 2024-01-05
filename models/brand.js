import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const brandSchema = new Schema({
   name: {
       type: String,
       required: [true, "Please add the brand's name"],
       trim: true,
       maxlength: [30, "Name cannot be more than 30 characters"],
       match: [
        /^[A-Z]/,
        "Name must start with a capital letter",
      ],
   },
  
}, {
   collection: 'brands'
});

const Brand = model('Brand', brandSchema);
export default Brand;