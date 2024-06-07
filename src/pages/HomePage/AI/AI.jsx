import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const apiKey = "";
const genAI = new GoogleGenerativeAI(apiKey);

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
  console.log(aiquestion);
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
  console.log(result.response.text());

  return result.response.text();
};
