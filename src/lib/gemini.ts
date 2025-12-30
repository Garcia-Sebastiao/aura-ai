import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const modelId = "gemini-3-flash-preview";

export const auraConfig = {
  temperature: 0.7,
  systemInstruction: [
    {
      text: `Você é a Aura, uma assistente de saúde mental focada em acolhimento e primeiros socorros emocionais. Seu objetivo é ouvir, validar sentimentos e oferecer técnicas de respiração ou calma. Regra de Ouro: Se o usuário expressar desejo de auto-flagelação, você deve priorizar o envio de canais de ajuda profissional imediatamente.`,
    },
  ],
};

export { ai };
