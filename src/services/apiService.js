import axios from "axios";

// Base URL til Umbraco API
const host = import.meta.env.VITE_API_HOST;
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

// Hent adgangstoken
export async function getToken() {
  try {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("grant_type", "client_credentials");

    const response = await axios.post(`${host}/umbraco/management/api/v1/security/back-office/token`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.data && response.data.access_token) {
      console.log("Token hentet:", response.data.access_token);
      return response.data.access_token;
    } else {
      throw new Error("Ingen adgangstoken fundet.");
    }
  } catch (error) {
    console.error("Fejl ved hentning af token:", error.response?.data || error.message);
    throw error;
  }
}

// Hent nuværende brugerdata
export async function getCurrentUser(token) {
  try {
    const response = await axios.get(`${host}/umbraco/management/api/v1/user/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Brugerdata hentet:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fejl ved hentning af brugerdata:", error.response?.data || error.message);
    throw error;
  }
}

// Opret content node
export async function createContentNode(data, token) {
    const umbracoApiUrl = "https://localhost:44333";
  
    const requestBody = {
      values: [],
      variants: [
        {
            culture: null,
            segment: null,
            name: data.title, 
        }
      ],
      parent: {
        id: "e9862648-dd5a-454a-bdad-3e3d6343b257",  
      },
      documentType: {
        id: "c3b10a51-b8d3-4ad2-b5a0-15a3cd99b6ca",  
      },
      template: {
        id: "518c282d-6591-4943-8b29-cfe9fdf70c58",  // Dit template ID
      },
    };
  
    try {
      // Send data til Umbraco API
      const response = await axios.post(`${umbracoApiUrl}/umbraco/management/api/v1/document`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,  // Authorization header med token
          "Content-Type": "application/json",
        },
      });
  
      console.log("Content node oprettet:", response.data);
      return response.data;  // Returnér svar fra Umbraco
    } catch (error) {
      console.error("Fejl ved oprettelse af content node:", error.response?.data || error.message);
      throw error;
    }
  }
  

  export const fetchOpenAIResponse = async (prompt, token) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/openai",
        { prompt: prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Fejl ved hentning af OpenAI svar:", error);
      throw error;
    }
  };
