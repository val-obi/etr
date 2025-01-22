// src/services/api.ts

// Define the API base URL (replace with your actual backend URL)
const API_BASE_URL = "https://etr.onrender.com/api";

// Define the payload type for creating a presale entry
interface PresaleEntryPayload {
  amount: number;
  walletAddress: string;
  referredCode?: string; // Optional
}

// Define the payload type for claiming tokens
interface ClaimTokensPayload {
  walletAddress: string;
}

// Create a presale entry
export const createPresaleEntry = async (payload: PresaleEntryPayload): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tokens/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating presale entry:", error);
    throw error;
  }
};

// Claim tokens
export const claimTokens = async (payload: ClaimTokensPayload): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tokens/claim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error claiming tokens:", error);
    throw error;
  }
};