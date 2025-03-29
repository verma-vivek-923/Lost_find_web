import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
// import { generateUniqueIdentity } from "../utils/uniqueIdentityGenerator.js";

const itemSchema = new mongoose.Schema(
  {
    uniqueInfo: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Accessories", "Documents", "Other"],
    },
    color: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        // required:true,
      },
      url: {
        type: String,
        // required:true,
      },
    },
    status: {
      type: String,
      enum: ["Lost", "Found", "Claimed"],
      default: "Lost",
    },
    contactInfo: {
      name: String,
      email: String,
      phone: String,
    },
    foundDate: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate unique identity
// itemSchema.pre("save", function (next) {
//   if (!this.uniqueIdentity) {
//     this.uniqueIdentity = generateUniqueIdentity({
//       category: this.category,
//       color: this.color,
//     });
//   }
//   next();
// });

export default mongoose.model("item", itemSchema);
