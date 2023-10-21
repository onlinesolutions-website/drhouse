const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // Add this for path operations

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // This will handle CORS issues.
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle GET requests to the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
