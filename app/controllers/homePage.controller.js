require('dotenv').config()
const express = require('express');
const router = express.Router();
const fetch = async () => (await import('node-fetch')).default;

router.get('/', (req, res) => {
    res.render('pages/homepage', {layout: "layouts/layout.ejs"});
});

router.post("/transcript", async (req, res) => {
    const { audioData } = req.body;
    if (!audioData) {
      return res.status(400).json({ error: "No audio data received" });
    }

    // Define the API endpoint and API key
    const apiKey = process.env.GOOGLE_API_KEY;
    const apiEndPoint = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;

    // Set up the request payload for the Google Cloud Speech-to-Text API
    const requestBody = {
      audio: {
        content: audioData, // The base64-encoded audio data
      },
      config: {
        encoding: "WEBM_OPUS", // Adjust the encoding if needed
        sampleRateHertz: 48000,
        languageCode: "pa-IN", // Punjabi language code
      },
    };

    try {
      // Import fetch dynamically
      const fetchModule = await fetch();
      const response = await fetchModule(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check if the API response was successful
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Google API Error:", errorText);
        return res.status(500).json({ error: "Error transcribing audio" });
      }

      // Parse the API response
      const data = await response.json();

      // Extract the transcript from the response
      const transcript = data.results[0]?.alternatives[0]?.transcript || "No transcript available";

      // Send the transcript back in the response
      res.json({ message: "Transcription successful", transcript });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;