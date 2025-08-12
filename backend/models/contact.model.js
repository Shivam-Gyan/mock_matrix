import mongoose from "mongoose";



const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
  contactType: {
    type: String,
    enum: ["question", "feedback", "collab"],
    required: true,
    default: "feedback",
  },
  createdAt: {
    type: String,
  },
});

const ContactModel = mongoose.model("Contact", contactSchema);

export default ContactModel;
