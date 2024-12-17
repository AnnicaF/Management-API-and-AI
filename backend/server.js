const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware for at kunne læse JSON
app.use(express.json());

// CORS-konfiguration for at tillade alle domæner
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));  // Brug CORS-middleware

// Håndter POST-anmodning til OpenAI
app.post('/openai', async (req, res) => {
  const { prompt } = req.body;

  // Valider
  if (!prompt || prompt.length < 3 || prompt.length > 1000) {
    return res.status(400).send({ 
      error: 'Prompt skal være mellem 3 og 1000 tegn' 
    });
  }

  // Undgå xss
  const sanitizedPrompt = prompt.replace(/[<>]/g, ''); 

  try {
    // Send prompten til OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions', 
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: "You are a helpful assistant that generates structured JSON responses." },
          { role: 'user', content: `Generate a structured JSON response with a 'title' and a 'bodytext'. Always in english. The 'title' should be a concise and clear summary, and the 'bodytext' should be detailed content based on the following prompt: "${sanitizedPrompt}"` }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
      }
    );

    // Log svaret fra OpenAI for fejlsøgning
    console.log('OpenAI svar (råt JSON):', response.data);


    // Validér, at response indeholder en 'message' med JSON-format
    let aiResponse;
    try {
      aiResponse = JSON.parse(response.data.choices[0].message.content);
    } catch (parseError) {
      return res.status(500).send({ error: 'Ugyldigt JSON-format fra OpenAI', details: parseError.message });
    }

    // Returner svaret fra OpenAI i JSON
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

app.post('/create-content-node', async (req, res) => {
    const { aiResponse, token } = req.body;
  
    // Tjekker om aiResponse er blevet sendt korrekt
    if (!aiResponse || !aiResponse.title || !aiResponse.body) {
      return res.status(400).send({ error: 'Mangler data fra OpenAI.' });
    }
  
    // Data til Umbraco content node
    const contentNodeData = {
      values: [],
      variants: [
        {
          culture: null,
          segment: null,
          name: aiResponse.title,
        }
      ],
      parent: {
        id: "e9862648-dd5a-454a-bdad-3e3d6343b257"
      },
      documentType: {
        id: "c3b10a51-b8d3-4ad2-b5a0-15a3cd99b6ca" 
      },
      template: {
        id: "518c282d-6591-4943-8b29-cfe9fdf70c58" 
      }
    };
  
    try {
      // Opret content node i Umbraco
      const response = await axios.post(`${host}/umbraco/management/api/v1/document`, contentNodeData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // Hvis oprettelsen er succesfuld
      res.status(201).send({ message: 'Content node oprettet i Umbraco', data: response.data });
    } catch (error) {
      console.error('Fejl ved oprettelse af content node i Umbraco:', error.response?.data || error.message);
      res.status(500).send({ error: 'Fejl ved oprettelse af content node i Umbraco' });
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
