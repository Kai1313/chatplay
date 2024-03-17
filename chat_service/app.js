// Import required packages
const express = require('express');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000; // You can change the port number as needed
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set in .env file");
  process.exit(1);
}

// Initialize Generative AI instance
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// Configuration settings for chat generation
const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

// Safety settings for chat generation
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle chat generation
app.post('/chat', async (req, res) => {
  const { message } = req.body; // Assuming message is sent in the request body
  
  // Start a new chat session
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  try {
    // Send user input and get response
    const result = await chat.sendMessage(message);
    const response = result.response;

    // Send response back to the client
    res.json({ response: response.text() });
  } catch (error) {
    console.error("Error in chat generation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
