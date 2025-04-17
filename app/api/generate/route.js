export async function POST(req) {
    try {
      const { prompt } = await req.json();
  
      const response = await fetch("https://api.gemini.ai/generate", { // Correct API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer AIzaSyDI8lQdg6SAGIrlZePoEmYp6wwqDUDvXR4`, // Replace with actual Gemini API key
        },
        body: JSON.stringify({
          prompt,
          max_tokens: 1000,
        }),
      });
  
      const data = await response.json();
  
      console.log("Gemini API Response:", data); // Log full response for debugging
  
      if (data && data.output) {
        return new Response(JSON.stringify({ output: data.output }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(
          JSON.stringify({ error: "No output in response from Gemini API" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } catch (error) {
      console.error("❌ Error in API route:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  