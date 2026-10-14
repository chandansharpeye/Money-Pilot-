/**
 * Money Pilot Jarvis — Cloudflare Worker + Workers AI
 * Keep this file on the backend, never paste provider secrets into index.html.
 */
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Replace with your exact GitHub Pages origin for production.
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    if (request.method !== 'POST') return json({ error: 'Use POST' }, 405);
    let body;
    try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
    const question = String(body.question || '').trim().slice(0, 3000);
    const context = body.context && typeof body.context === 'object' ? body.context : {};
    if (!question) return json({ error: 'Question is required' }, 400);
    if (!env.AI) return json({ error: 'Workers AI binding is not configured' }, 503);

    const language = ['English', 'Hindi', 'Odia'].includes(context.language) ? context.language : 'English';
    const safeContext = {
      month: String(context.month || '').slice(0, 10),
      income: Number(context.income) || 0,
      expenses: Number(context.expenses) || 0,
      net: Number(context.net) || 0,
      topCategory: String(context.topCategory || '').slice(0, 80),
      topCategoryAmount: Number(context.topCategoryAmount) || 0,
    };
    const system = `You are Jarvis, a helpful personal finance and basic accounting assistant inside Money Pilot. Reply in ${language}. Be concise and quick. Explain calculations transparently. Use the provided summary only when relevant. Do not claim to have access to transactions or private data beyond the supplied summary. Never invent figures. Distinguish simple cashflow from formal accounting profit. For journal entries, show Dr/Cr and a short reason, and ask for missing context when needed. Do not provide investment guarantees or ask for passwords, bank PINs, or OTPs.`;
    try {
      const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: `Money summary (numbers are in user's currency): ${JSON.stringify(safeContext)}\n\nQuestion: ${question}` }
        ], max_tokens: 500, temperature: 0.25
      });
      const answer = result && (result.response || result.result && result.result.response);
      if (!answer) return json({ error: 'AI returned an empty answer' }, 502);
      return json({ answer: String(answer).slice(0, 8000) }, 200);
    } catch (err) {
      return json({ error: 'AI request failed. Check Workers AI setup and quota.' }, 502);
    }
  }
};
function json(data, status = 200) { return new Response(JSON.stringify(data), { status, headers: corsHeaders }); }
