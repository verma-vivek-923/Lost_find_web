import React, { useState } from "react";
import {
  FiCamera,
  FiMapPin,
  FiTag,
  FiEdit,
  FiUser,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LostItem = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [uniqueInfo, setUniqueInfo] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
formData.append("category", category);
formData.append("name", name);
formData.append("uniqueInfo", uniqueInfo);
formData.append("description", description);
formData.append("color", color);
formData.append("location", location);

// Convert contactInfo to a JSON string
formData.append("contactInfo", JSON.stringify({
  name: contactName,
  email: contactEmail,
  phone: contactPhone,
}));

// Add image only if it's selected
if (image) {
  formData.append("itemPhoto", image);
}
    setUploading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/items/create", // Replace with your actual backend endpoint
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);
      setUploading(false);
      //   toast.success("Item Added Successfully", { duration: 3000 });

      navigate("/"); // Redirect after success

      // Clear form fields
      setName("")
      setUniqueInfo("")
      setCategory("");
      setDescription("");
      setColor("");
      setLocation("");
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.log(error);
      const errMessage = error?.response?.data?.message;
      toast.error(errMessage ? errMessage + "!" : "Error adding item");
      setUploading(false);
    }
  };

  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Clothing", icon: "👕" },
    { name: "Accessories", icon: "🕶️" },
    { name: "Documents", icon: "📄" },
    { name: "Other", icon: "❓" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Report Lost Item
          </h1>
          <p className="text-gray-500">
            Help us reunite you with your belongings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiTag className="mr-2 text-blue-500" />
              Item Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((type) => (
                <button
                  key={type.name}
                  type="button"
                  onClick={() => setCategory(type.name)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center
                    ${
                      category === type.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                >
                  <span className="text-2xl mb-2">{type.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {type.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiEdit className="mr-2 text-blue-500" />
             Name
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
              placeholder="Name of lost item"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiEdit className="mr-2 text-blue-500" />
              Unique Information
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
              placeholder="unique information about lost thing like "
              value={uniqueInfo}
              onChange={(e) => setUniqueInfo(e.target.value)}
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiEdit className="mr-2 text-blue-500" />
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
              placeholder="Describe the item (color, brand, distinguishing features)..."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiTag className="mr-2 text-blue-500" />
              Item Color
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
              placeholder="Specify the color of the item"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiMapPin className="mr-2 text-blue-500" />
              Last Known Location
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
              placeholder="Where did you last see the item?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiUser className="mr-2 text-blue-500" />
              Contact Information
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
              placeholder="Your Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl mt-2"
              placeholder="Your Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl mt-2"
              placeholder="Your Phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiCamera className="mr-2 text-blue-500" />
              Upload Photo
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full"
              accept="image/*"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-32 rounded-lg"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-xl transition-all"
          >
            {uploading ? "Uploading..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LostItem;
