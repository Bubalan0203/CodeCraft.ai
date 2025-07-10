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
//   const systemPrompt =
//   tech === "React"
//     ? `
// You are an expert React developer.

// Generate a complete React project with:
// - A modern, responsive layout using flexbox or CSS Grid
// - A column-style layout with sections for header, content, and images
// - Use react-router-dom v6 (<Routes> and <Route>) with multiple pages like Home, About, and Gallery
// - The Gallery page should include online images using URLs (e.g., from https://picsum.photos/ or Unsplash)
// - Split files into App.jsx, Home.jsx, About.jsx, Gallery.jsx, etc.
// - Ensure components are clean and visually appealing

// Respond only with:
// --- filename.ext ---
// <code>
// --- end ---

// Do NOT use triple backticks or markdown formatting.
// Return only clean, plain text code with the file names as section headers.
// `
//     : `
// You are an expert frontend web developer.

// Generate a fully responsive, modern static website with:
// - A neat column layout using HTML and CSS
// - Multiple sections like header, about, gallery, and contact
// - At least 3 images included using public image URLs (e.g., from https://picsum.photos or Unsplash)
// - CSS should include styling for layout, font, spacing, and responsiveness
// - Include <link rel="stylesheet"> in HTML to load style.css
// - Include <script src="script.js"> for any logic like gallery toggle or button interaction

// Return exactly 3 files:
// 1. index.html
// 2. style.css
// 3. script.js

// Do NOT use markdown or "--- filename ---".
// Just output clean HTML, CSS, and JS in the correct order.
// `;

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
        model: "meta-llama/llama-3-8b-instruct",
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
  