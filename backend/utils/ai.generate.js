import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    projectId: "mock-matrix",
});

/**
 * Convert user-friendly schema into Gemini-compatible responseSchema
 */
const convertToGeminiSchema = (jsonSchema) => {
    const convert = (obj) => {
        if (typeof obj === "string") {
            switch (obj.toLowerCase()) {
                case "string":
                    return { type: Type.STRING };
                case "number":
                    return { type: Type.NUMBER };
                case "uuid":
                    return {
                        type: Type.STRING,
                        pattern:
                            "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
                    };
                default:
                    return { type: Type.STRING };
            }
        } else if (typeof obj === "object" && obj !== null) {
            return {
                type: Type.OBJECT,
                properties: Object.fromEntries(
                    Object.entries(obj).map(([key, value]) => [
                        key,
                        convert(value),
                    ])
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

/**
 * Validate JSON output against schema types
 */
const isValidJSONArray = (text, schema) => {
    try {
        const arr = JSON.parse(text);
        if (!Array.isArray(arr) || arr.length !== 5) return false;

        const validateTypes = (obj, schemaObj) => {
            for (const [key, value] of Object.entries(schemaObj)) {
                if (typeof value === "string") {
                    const lower = value.toLowerCase();
                    if (lower === "number" && typeof obj[key] !== "number")
                        return false;
                    if (lower === "string" && typeof obj[key] !== "string")
                        return false;
                    if (
                        lower === "uuid" &&
                        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                            obj[key]
                        )
                    )
                        return false;
                } else if (typeof value === "object" && obj[key]) {
                    if (!validateTypes(obj[key], value)) return false;
                }
            }
            return true;
        };

        return arr.every((item) => validateTypes(item, schema));
    } catch {
        return false;
    }
};

/**
 * Generate JSON with retries
 */
const generateDynamicJSON = async (userSchema, maxRetries = 5) => {
    const basePrompt = `
You are a strict JSON generator.

Given the following object schema, generate an array of exactly 5 realistic JSON objects that follow this structure.

Rules:
- Match the schema's data types exactly:
    • "number" → JSON number (no quotes)
    • "string" → realistic string
    • "uuid" → valid UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
- Output must be valid raw JSON (parsable by JSON.parse).
- Return only the array — no explanation, no markdown, no extra formatting.
- Replace string values with realistic data: names, emails, phone numbers, timestamps, etc.
- For nested objects, follow the structure exactly.
- Do not add or remove fields.
- Each object must have different values.

---
SCHEMA (for one object):
${JSON.stringify(userSchema, null, 2)}
---
IMPORTANT:
- Output: JSON array of 5 objects based on this schema.
- Keep data types exactly as specified.
`;

    const geminiSchema = convertToGeminiSchema(userSchema);

    let attempt = 0;
    let responseText = null;

    while (attempt < maxRetries) {
        attempt++;
        console.log(`🔄 Attempt ${attempt} to generate JSON...`);

        const prompt =
            attempt === 1
                ? basePrompt
                : `${basePrompt}\n\nNOTE: The previous output failed validation. Make sure numbers are not in quotes, UUIDs match format, and schema is followed exactly.`;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-pro",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: geminiSchema,
                },
            });

            responseText = response.text?.trim();

            if (isValidJSONArray(responseText, userSchema)) {
                console.log(`✅ Valid JSON generated on attempt ${attempt}`);
                return responseText;
            } else {
                console.warn(
                    `⚠️ Invalid JSON on attempt ${attempt}, retrying...`
                );
            }
        } catch (err) {
            console.error(`❌ Error on attempt ${attempt}:`, err.message);
        }
    }

    throw new Error(
        `Failed to generate valid JSON after ${maxRetries} attempts. Last response:\n${responseText}`
    );
};

export default generateDynamicJSON;
