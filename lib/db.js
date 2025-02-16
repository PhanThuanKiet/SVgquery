const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const responseSchema = new mongoose.Schema({
  question: String,
  answer: String,
  createdAt: { type: Date, default: Date.now },
});

const Response = mongoose.model("Response", responseSchema);

const saveResponse = async (question, answer) => {
  const response = new Response({ question, answer });
  await response.save();
};

const getResponses = async () => {
  return await Response.find().sort({ createdAt: -1 });
};

module.exports = { saveResponse, getResponses };
