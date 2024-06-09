import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY = import.meta.env.VITE_API_KEY_API_AI;

console.log(API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export const run = async (aiquestion) => {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: 'user',
        parts: [{ text: 'vracej odpovědi na otázky, funguj v českém jazyce' }],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Jsem připravena ti odpovídat na otázky v českém jazyce. Co bys chtěl/a vědět? 😊\n',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(aiquestion);

  return result.response.text();
};
