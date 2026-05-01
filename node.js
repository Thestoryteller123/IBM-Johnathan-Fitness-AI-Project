import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost",
                "X-Title": "FitnessAI"
            },
            body: JSON.stringify({
    model: "openai/gpt-3.5-turbo",
    messages: [
        { role: "system", content: "You are a helpful fitness AI." },
        { role: "user", content: req.body.message }
    ]
})
        });

        const data = await response.json();

        console.log("OPENROUTER RESPONSE:", data);

        // Handle API errors
        if (data.error) {
            return res.json({
                reply: "Error: " + data.error.message
            });
        }

        const reply =
            data.choices?.[0]?.message?.content ||
            data.choices?.[0]?.text ||
            "No response";

        res.json({ reply });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));