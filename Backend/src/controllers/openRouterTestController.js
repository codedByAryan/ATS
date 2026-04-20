import { testOpenRouterAPI } from "../services/openRouterTestService.js";
import dotenv from "dotenv";

dotenv.config();

export const checkOpenRouter = async (req, res) => {
  try {
    const data = await testOpenRouterAPI();

    res.status(200).json({
      success: true,
      message: "OpenRouter API is working",
      model: data.model,
      output: data.choices?.[0]?.message?.content || "",
      raw: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OpenRouter API test failed",
      error: error.response?.data || error.message,
    });
  }
};