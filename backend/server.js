const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());

// CORS-konfiguration for at tillade alle domæner
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)); 

// Umbraco API host
const host = 'https://localhost:44333';

app.post('/create-content-node', async (req, res) => {
  const { aiResponse, token } = req.body;

  // Validering af input
  if (!aiResponse || !aiResponse.title || !aiResponse.body) {
    return res.status(400).send({ error: 'Mangler data fra AI.' });
  }

  if (!token) {
    return res.status(401).send({ error: 'Adgang nægtet. Token mangler.' });
  }

  try {
    const response = await axios.post(`${host}/umbraco/management/api/v1/document`, contentNodeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    res.status(201).send({ message: 'Content node oprettet i Umbraco', data: response.data });
  } catch (error) {
    console.error('Fejl ved oprettelse af content node:', error.response?.data || error.message);
    res.status(500).send({ error: 'Fejl ved oprettelse af content node i Umbraco', details: error.message });
  }
});


// Default GET route for server status
app.get('/', (req, res) => {
  res.send('Backend server kører. Brug POST /openai til at sende prompts.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server kører på port ${port}`);
});


app.post('/openaiwithhistory', async (req, res) => {
  const { history } = req.body;

  // Undgå xss
  const sanitizedPrompt = history.replace(/[<>]/g, ''); 

  const listOfConversation = JSON.parse(sanitizedPrompt);

  let promptIsInvalid = false
  // Valider
  listOfConversation.forEach(element => {
    const prompt = element.content[0].text;
    const role = element.role;
    if ((!prompt || prompt.length < 3 || prompt.length > 1000) && role === "user") {
      promptIsInvalid = true
    }
  });

  if(promptIsInvalid){
    return res.status(400).send({ 
      error: 'Prompt skal være mellem 3 og 1000 tegn' 
    });
  }

  try {
    // Send prompten til OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: "You are a helpful assistant that generates structured JSON responses. Generate a structured JSON response with a 'title' and a 'bodytext'. Always in english. The 'title' should be a concise and clear summary, and the 'bodytext' should be detailed content based on the users prompts." },
          ...JSON.parse(sanitizedPrompt)
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
      }
    );

    console.log('OpenAI svar (råt JSON):', response.data);

    let aiResponse;
    try {
      aiResponse = JSON.parse(response.data.choices[0].message.content);
    } catch (parseError) {
      return res.status(500).send({ error: 'Ugyldigt JSON-format fra OpenAI', details: parseError.message });
    }

    res.json({
      response: aiResponse,
    });
  } catch (error) {
    console.error('Fejl ved OpenAI-anmodning:', error.response?.data || error.message);
    res.status(500).send({
      error: 'Fejl ved at hente data fra OpenAI',
      details: error.message
    });
  }
});