import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    projectId: "mock-matrix",
});

/**
 * Convert a basic JSON schema into Gemini-compatible responseSchema
 */
const convertToGeminiSchema = (jsonSchema) => {
    const convert = (obj) => {
        if (typeof obj === "string") {
            return { type: Type.STRING };
        } else if (typeof obj === "object" && obj !== null) {
            return {
                type: Type.OBJECT,
                properties: Object.fromEntries(
                    Object.entries(obj).map(([key, value]) => [key, convert(value)])
                ),
                propertyOrdering: Object.keys(obj),
            };
        }
    };

    return {
        type: Type.ARRAY,
        items: convert(jsonSchema),
    };
};

const generateDynamicJSON = async (userSchema) => {
    const prompt = `
        You are a strict JSON generator.

        Given the following object schema, generate an array of 5 realistic JSON objects that follow this structure.

        Requirements:
        - Output must be valid **raw JSON** (parsable by JSON.parse).
        - Return only an array of 5 objects—do NOT include any explanation, markdown, or extra formatting.
        - Replace all "string" values with realistic data: names, emails, phone numbers, timestamps, etc.
        - For arrays, include 2–3 realistic items.
        - For nested objects, follow the structure carefully.

        ---
        SCHEMA (for one object):
        ${JSON.stringify(userSchema, null, 2)}
        ---
        IMPORTANT:
        - Output: a JSON **array** of 5 objects based on this schema.
        - Follow the structure strictly.
        `;

    const geminiSchema = convertToGeminiSchema(userSchema);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: geminiSchema,
        },
    });

    console.log(response.text);
    return response.text;
};

export default generateDynamicJSON;
