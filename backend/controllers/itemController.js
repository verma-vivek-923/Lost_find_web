import itemModel from "../models/itemModel.js";
import { v2 as cloudinary } from "cloudinary";
import { createTokenAndSaveCookies } from "../jwt/AuthToken.js";


export let createItem = async (req, res) => {
  try {
    // const { name, category, color, location, status, contactInfo } = req.body;
    console.log("name");
    
    if (!req.files || Object.keys(req.files).length == 0) {
      return res.status(400).json({ message: "No File uploaded" });
    }
    
    
    const { itemPhoto } = req.files;
    console.log(itemPhoto);
    
    const allowed_formats = ["image/jpeg", "image/png"];
    if (!allowed_formats.includes(itemPhoto.mimetype)) {
      return res.status(400).json({ message: "Invalid Photo Format" });
    }

    const { name,uniqueInfo,description, category, color, location, status, contactInfo } = req.body;
    console.log( name,uniqueInfo,description, category, color, location, status, contactInfo ) 
    // console.log(name, phone, email, role, education, password);

    // if (!name || !phone || !email || !role || !password) {
    //   return res.status(500).json({ message: "Fill All Fields" });
    // }

    
    const cloudinaryResponse = await cloudinary.uploader.upload(
      itemPhoto.tempFilePath,
      {
        folder: "Blog_web/user_data/new_data",
      }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ message: "Cloud Error.Try Again Letter" });
    }
    console.log(cloudinaryResponse.public_id, cloudinaryResponse.secure_url);
    {
      // const hashed_pass = await bycrypt.hash(password, 10);

      const create_items = new itemModel({
        name: name,
        uniqueInfo: uniqueInfo,
        description: description,
        location: location,
        category: category,
        color:color,
        image: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      });
      console.log(create_items);
      await create_items.save();
      res.status(200).json({
        message: "Lost item created Successfully",
        create_items,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getItems=async (req,res) =>{
console.log("first get")
  try {
    const allitems=await itemModel.find();
    
    console.log(allitems);
    
   return res.status(200).json(allitems);
    
  } catch (error) {
    
  }

  

}


