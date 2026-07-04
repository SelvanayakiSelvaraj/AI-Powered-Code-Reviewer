const { GoogleGenerativeAI } = require('@google/generative-ai');

const analyzeCode = async (language, code) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in the environment variables.');
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `
You are an expert ${language} code reviewer.
Analyze the following ${language} code carefully and return ONLY a raw valid JSON object.
Do NOT include markdown, backticks, or any explanation outside the JSON.

The JSON must follow this EXACT structure:
{
  "bugs": ["string describing each bug or error found"],
  "qualityScore": 85,
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "optimizationSuggestions": ["string with each optimization suggestion"],
  "securityIssues": ["string describing each security vulnerability"],
  "refactoredCode": "the full improved version of the code as a string"
}

Rules:
- bugs: array of strings (empty array if none)
- qualityScore: integer from 0 to 100
- timeComplexity: Big O notation string
- spaceComplexity: Big O notation string
- optimizationSuggestions: array of strings (empty array if none)
- securityIssues: array of strings (empty array if none)
- refactoredCode: full refactored code as a single string

Code to analyze:
\`\`\`${language}
${code}
\`\`\`
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text().trim();

    // Strip markdown code blocks if model wraps response
    text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error('Gemini Error:', error.message);
    throw new Error('Failed to analyze code using Gemini AI: ' + error.message);
  }
};

module.exports = { analyzeCode };
