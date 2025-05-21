// server.js
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

// إعداد CORS للسماح بالطلبات من المتصفح
app.use(cors());
app.use(express.json());

// إعداد مكتبة Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyDUNwf4yoF-zGVzilinK2uMggaOGeMrH68");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// إنشاء endpoint للحصول على نصيحة
app.post("/api/getAdvice", async (req, res) => {
  try {
    const prompt = req.body.prompt || "Explain how AI works";
    const result = await model.generateContent(prompt);
    res.json({ advice: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ advice: "Error fetching advice from Gemini" });
  }
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
