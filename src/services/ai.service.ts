import { ai, modelId, auraConfig } from "@/lib/gemini";

export const getAuraResponse = async (
  history: { role: string; parts: { text: string }[] }[],
  userMessage: string
) => {
  try {
    const contents = [
      ...history,
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ];

    const response = await ai.models.generateContent({
      model: modelId,
      contents: contents,
      config: auraConfig,
    });

    return response.text;
  } catch (error) {
    console.error("Erro na nova SDK Gemini:", error);
    throw new Error("A Aura teve um problema técnico. Tente novamente.");
  }
};
