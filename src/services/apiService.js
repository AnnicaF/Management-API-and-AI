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
        Authorization: `Bearer ${token}`, // Send token som Bearer header
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
    const host = "https://localhost:44333"; 
    try {
      const response = await axios.post(`${host}/umbraco/management/api/v1/document`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fejl ved oprettelse af content node:", error.response?.data || error.message);
      throw error;
    }
  }
