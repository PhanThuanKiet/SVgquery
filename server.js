require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { generateText } = require("./lib/gemini");
const { saveResponse, getResponses } = require("./lib/db");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Câu hỏi không được để trống" });

  try {
    const answer = await generateText(question);
    await saveResponse(question, answer);
    res.json({ question, answer });
  } catch (error) {
    res.status(500).json({ error: "Lỗi xử lý Gemini AI" });
  }
});

app.get("/responses", async (req, res) => {
  try {
    const data = await getResponses();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Lỗi lấy dữ liệu từ MongoDB" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
