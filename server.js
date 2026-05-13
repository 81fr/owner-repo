// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, ''))); // serve static files (index.html, etc.)

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({status: 'ok'});
});

// Chat endpoint – forwards user question to AI API (mocked for demo)
app.post('/api/chat', async (req, res) => {
  const {question} = req.body;
  // In production replace this with real AI call using process.env.AI_API_KEY
  // For demo we simulate a response after a short delay
  const fakeResponse = `إجابة تجريبية للسؤال: "${question}"`;
  setTimeout(() => {
    res.json({answer: fakeResponse});
  }, 500);
});

// Risk analysis endpoint – could call AI for risk scoring (mock)
app.post('/api/risk', async (req, res) => {
  // In a real scenario, you would process uploaded data and maybe call AI.
  // Here we just return dummy risk scores.
  const dummy = Array.from({length: 12}, (_, i) => ({
    label: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ar-EG'),
    value: Math.round(60 + Math.random() * 40) * 0.8 // simulated risk score
  })).reverse();
  const labels = dummy.map(d => d.label);
  const data = dummy.map(d => d.value);
  res.json({labels, data});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
