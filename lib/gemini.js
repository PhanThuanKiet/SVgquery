const { GoogleGenerativeAI } = require("@google/generative-ai");
const { API_KEY } = require("./config");

const googleAI = new GoogleGenerativeAI(API_KEY);
const geminiModel = googleAI.getGenerativeModel({ model: "gemini-pro" });

const generateText = async (prompt) => {
  try {
    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lỗi khi lấy dữ liệu từ AI.";
  }
};

module.exports = { generateText };
