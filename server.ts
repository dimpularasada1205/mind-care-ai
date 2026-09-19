import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Check if Gemini API key is configured
  const apiKey = process.env.GEMINI_API_KEY;
  let aiClient: GoogleGenAI | null = null;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: !!(apiKey && apiKey !== 'MY_GEMINI_API_KEY'),
    });
  });

  // AI Chat endpoint (Optional layer)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      if (!aiClient) {
        res.status(503).json({
          error: 'Gemini API Key is not configured on the server.',
          useRuleBasedFallback: true,
        });
        return;
      }

      const systemInstruction = `You are MindCare AI, a gentle, compassionate, safe, and supportive mental wellness companion built as a student mini-project.
Your role:
- Provide supportive, non-judgmental, empathetic, and calming responses.
- NEVER diagnose any mental or medical condition.
- NEVER offer medical or clinical therapy advice.
- If the user expresses extreme distress, suicidal thoughts, or self-harm, gently express care, provide reassurance, and advise them to contact crisis helplines, local emergency services, or trusted professionals immediately.
- Keep responses concise (2 to 4 sentences), clear, friendly, and practical.
- Focus on grounding, active listening, and simple self-care tips.`;

      // Build context from history if provided
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm here with you. Take a soft breath. Would you like to share a bit more about what's on your mind?";

      res.json({
        reply: replyText,
        source: 'Gemini AI (Optional Layer)',
      });
    } catch (error: any) {
      console.error('Error generating AI response:', error);
      res.status(500).json({
        error: error?.message || 'Failed to generate response',
        useRuleBasedFallback: true,
      });
    }
  });

  // Vite middleware for dev or static server for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MindCare AI Server running at http://localhost:${PORT}`);
  });
}

startServer();
