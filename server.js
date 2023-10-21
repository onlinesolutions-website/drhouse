require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/message', async (req, res) => {
    const userInput = req.body.content;

    const payload = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: userInput
            }
        ],
        // ... other parameters
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', payload, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
