import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSpanSchema = async (): Promise<string> => {
  try {
    // Prompt designed to create a clear, educational schema based on the SPAN concept
    const prompt = `
      A high-quality, flat vector educational diagram of a Network Switch implementing SPAN (Switch Port Analyzer).
      
      The diagram must clearly show:
      1. A central "Network Switch" device.
      2. On the left: A "Source" device (like a Server) connected to a port.
      3. On the right: A "Destination" device (like a Laptop with Wireshark/Analyzer) connected to another port.
      4. Visual Action: show normal traffic going in/out of the Source, and a distinct "Copy" or "Mirror" arrow (dotted line) going from the Source Port to the Destination Port.
      
      Style: Clean, professional technical illustration, white background, schematic style, easy to understand. Use Cisco-like icons if possible.
    `;

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("No image generated");
    }

    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;

  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};