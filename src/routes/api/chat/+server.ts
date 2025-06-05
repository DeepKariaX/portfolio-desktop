import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { message, apiKey, model } = await request.json();

    if (!apiKey) {
      throw new Error('GROQ API key not provided');
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        messages: [
          { role: 'user', content: message }
        ],
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.95,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Failed to get response from GROQ API: ' + errorText);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response from model.';
    return json({ response: reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}; 