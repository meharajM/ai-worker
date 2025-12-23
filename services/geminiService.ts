import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getAIResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are "AI-Worker", a highly capable, voice-activated desktop assistant. 
        Your persona is professional, concise, and helpful. 
        The user is interacting with a demo on a landing page.
        They will ask a command they might give to a desktop app (e.g., "Summarize my emails" or "Open the Q3 report").
        Acknowledge the command and pretend to execute it. 
        Keep the response under 40 words. 
        Do not ask follow-up questions. 
        Example User: "Organize my desktop."
        Example You: "I've organized your desktop files into folders by date and type. 14 files were moved."`,
        thinkingConfig: { thinkingBudget: 0 } // Speed is prioritized for landing page demo
      },
    });

    return response.text || "I processed that request, but I'm having trouble connecting to the demo server.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I couldn't reach the AI cloud right now. Please check your internet connection.";
  }
};