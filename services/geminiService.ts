import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generatePostIdea = async (): Promise<string> => {
  if (!API_KEY) {
    return "AI feature is currently unavailable. Please check your API key.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a short, engaging social media post about one of the following topics: a travel dream, a delicious meal, a cool tech gadget, a great book, or a simple daily thought. Keep it under 280 characters. Do not use hashtags.',
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return "Sorry, I couldn't come up with an idea right now.";
  }
};