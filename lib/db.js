const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const responseSchema = new mongoose.Schema({
  question: String,
  answer: String,
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });


const Response = mongoose.model("Response", responseSchema);

const saveResponse = async (question, answer) => {
  try {
    const responseData = { question, answer, createdAt: new Date() };

    // Dùng aggregation pipeline với $out để lưu vào collection
    await Response.aggregate([
      { $addFields: responseData },
      { $out: 'responses' }  // Ghi kết quả vào collection "responses"
    ]);
    console.log("Response saved successfully.");
  } catch (error) {
    console.error("Error saving response:", error);
    throw new Error("Không thể lưu dữ liệu vào MongoDB");
  }
}; 


const getResponses = async () => {
  try {
    const responses = await Response.aggregate([
      { $sort: { createdAt: -1 } }
    ]);
    return responses;
  } catch (error) {
    console.error("Error fetching responses:", error);
    throw new Error("Không thể lấy dữ liệu từ MongoDB");
  }
};



module.exports = { saveResponse, getResponses };
