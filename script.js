// Assuming Axios is loaded via CDN in the HTML
require('dotenv').config();
const axios = require('axios');

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key
const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';

document.getElementById('sendBtn').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;

    const payload = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: userInput
            }
        ],
        temperature: 0.5,
        max_tokens: 3028,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + OPENAI_API_KEY
    };

    axios.post(url, payload, { headers })
        .then(response => {
            const responseData = response.data.choices[0].text.trim();
            const messagesDiv = document.querySelector('.messages');
            const messageElement = document.createElement('div');
            messageElement.className = 'message bot';
            messageElement.textContent = responseData;
            messagesDiv.appendChild(messageElement);
        })
        .catch(error => {
            console.error(error);
        });
});
