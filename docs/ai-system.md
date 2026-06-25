# AI System

Alpha Radar uses an OpenAI-compatible provider abstraction in `src/server/ai/provider.ts`.

## Supported Providers

Set `AI_PROVIDER` to one of:

- `openai`
- `openrouter`
- `gemini`
- `deepseek`

Provider keys:

- `OPENAI_API_KEY`
- `OPENROUTER_API_KEY`
- `GEMINI_API_KEY`
- `DEEPSEEK_API_KEY`

`AI_MODEL` can override the default model.

## Reasoning Pipeline

1. Event engine emits standardized events.
2. Radar scoring calculates the signal score and impact classification.
3. Prompt templates produce event explanation, bullish, bearish, neutral, narrative, and confidence-scoring prompts.
4. AI responses are parsed as structured JSON.
5. If provider calls fail or keys are absent, deterministic fallback analysis keeps endpoints responsive.

## Response Shape

AI analysis includes:

- Summary
- Why it matters
- Risk factors
- Confidence score
- Impact assessment
- Sentiment

The system is designed for intelligence generation only. It does not execute trades or provide account-specific financial advice.
