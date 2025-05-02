export const generateCode = async (prompt, tech) => {
    const OPENROUTER_API_KEY = "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";
  
    const systemPrompt =
      tech === "React"
        ? `
  You are an expert React developer. Generate a working React frontend project with proper component files (like App.jsx, Home.jsx, etc.) using react-router-dom v6 (use <Routes> and <Route>).
  
  Respond with:
  --- filename.ext ---
  <code>
  --- end ---
  
  Do NOT use Markdown code blocks (no triple backticks), no explanations, no extra commentary. Only output valid code split into these file sections.
  `
        : `
  You are a frontend developer. Generate a full static website using HTML with separate style.css and script.js files.
  
  Return the following files:
  1. index.html
  2. style.css (styles extracted from <style>)
  3. script.js (logic extracted from <script>)
  
  Include <link rel="stylesheet"> and <script src=""> in HTML.
  
  DO NOT use any "--- filename ---" syntax.
  DO NOT wrap code in markdown or triple backticks.
  Just give clean HTML with inline <style> and <script> so it can be parsed.
  `;
  
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `User Request: ${prompt}` }
    ];
  
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages,
        temperature: 0.2,
        max_tokens: 2000
      })
    });
  
    const data = await response.json();
  
    if (!data.choices || !data.choices[0].message) {
      console.error("OpenRouter full response:", data);
      throw new Error(data.error?.message || "Invalid response from OpenRouter");
    }
  
    return data.choices[0].message.content.trim();
  };
  