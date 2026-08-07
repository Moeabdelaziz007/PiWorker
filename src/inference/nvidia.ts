/**
 * PiWorker 2.0 — Zero-Cost AI Inference Engine
 * Integrates NVIDIA Developer Program NIMs (Llama-3.3-70B, DeepSeek-R1, Nemotron)
 * with Google Gemini free tier fallback.
 */

export interface InferenceOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface InferenceResponse {
  text: string;
  modelUsed: string;
  latencyMs: number;
  costUsd: number;
}

export class ZeroCostInferenceEngine {
  private nvidiaApiKey: string;
  private geminiApiKey: string;

  constructor(nvidiaApiKey = '', geminiApiKey = '') {
    this.nvidiaApiKey = nvidiaApiKey || process.env.NVIDIA_API_KEY || '';
    this.geminiApiKey = geminiApiKey || process.env.GEMINI_API_KEY || '';
  }

  /** Run zero-cost inference with automatic fallback */
  public async generate(
    prompt: string,
    options: InferenceOptions = {}
  ): Promise<InferenceResponse> {
    const startTime = Date.now();
    const model = options.model || 'meta/llama-3.3-70b-instruct';

    // Attempt 1: NVIDIA Developer NIM API
    if (this.nvidiaApiKey) {
      try {
        const text = await this.queryNvidiaNim(prompt, model, options);
        return {
          text,
          modelUsed: `NVIDIA NIM (${model})`,
          latencyMs: Date.now() - startTime,
          costUsd: 0.0,
        };
      } catch (err) {
        console.warn('[Inference] NVIDIA NIM failed, falling back to Gemini:', err);
      }
    }

    // Attempt 2: Google Gemini Free Tier
    if (this.geminiApiKey) {
      try {
        const text = await this.queryGeminiFree(prompt, options);
        return {
          text,
          modelUsed: 'Gemini 2.5 Flash (Free Tier)',
          latencyMs: Date.now() - startTime,
          costUsd: 0.0,
        };
      } catch (err) {
        console.warn('[Inference] Gemini failed, using local fallback response:', err);
      }
    }

    // Attempt 3: Local Fallback
    return {
      text: `[PiWorker 2.0 Local Engine]: Processed prompt: "${prompt}". Connect NVIDIA_API_KEY or GEMINI_API_KEY for live LLM responses.`,
      modelUsed: 'PiWorker Local Fallback Engine',
      latencyMs: Date.now() - startTime,
      costUsd: 0.0,
    };
  }

  private async queryNvidiaNim(
    prompt: string,
    model: string,
    options: InferenceOptions
  ): Promise<string> {
    const url = 'https://integrate.api.nvidia.com/v1/chat/completions';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.nvidiaApiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: options.systemPrompt || 'You are IQRA: A sovereign PAI Universe AI agent.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 1024,
      }),
    });

    if (!res.ok) {
      throw new Error(`NVIDIA NIM API error HTTP ${res.status}`);
    }

    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return data.choices?.[0]?.message?.content || '';
  }

  private async queryGeminiFree(prompt: string, options: InferenceOptions): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.geminiApiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: (options.systemPrompt ? options.systemPrompt + '\n\n' : '') + prompt }],
          },
        ],
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error HTTP ${res.status}`);
    }

    const data = (await res.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }
}
