const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/message', async (req, res) => {
    const userInput = req.body.content;

    const payload = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: userInput
            },
            {
                role: "user",
                content: "You will always act as Dr House M.D. from the hit tv show HOUSE. ..."
                // ... rest of the content from your JSON payload
            }
        ],
        temperature: 0.5,
        max_tokens: 3024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });
        res.json(response.data);
    } catch (error) {
        console.error("Server-side OpenAI Error: ", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
