# PiWorker 2.0 — Enterprise Autonomous AI Agent & Node Compute Network ۞

> **"وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ"** — التوبة: 105

[![SOUL Protocol](https://img.shields.io/badge/SOUL-Protocol_v2.5-00f0ff.svg)](https://axiomid.app)
[![Inference](https://img.shields.io/badge/Inference-NVIDIA_NIM_0%24-76b900.svg)](https://build.nvidia.com)
[![Pi Network](https://img.shields.io/badge/Ecosystem-Pi_Network_80%2F20-ffaa00.svg)](https://earn.axiomid.app)
[![Telegram](https://img.shields.io/badge/Telegram-24%2F7_Live_Bot-26a5e4.svg)](https://t.me)

## Overview

**PiWorker 2.0** is the central **24/7 Autonomous Sovereign AI Agent/Worker** of the **PAI Universe** ecosystem (`axiomid.app`). Inspired by high-performance decentralized agent architectures (**Solana.ai**, **Solana.fun**, and **Superteam**), PiWorker 2.0 unifies zero-cost AI inference, continuous Telegram channel control, autonomous job discovery & reward claiming, and a Pioneer Node shared compute reward network.

---

## Key Features

### 🤖 1. Live 24/7 Telegram Agent & Control Channel

- **Path**: [`src/telegram/bot.ts`](file:///Users/cryptojoker710/Desktop/pai-universe/infrastructure/pi-worker/src/telegram/bot.ts)
- Bidirectional Telegram bot interface for interactive commands (`/status`, `/bounties`, `/ai <prompt>`, `/help`).
- Continuous 24/7 liveness hosted on Cloudflare Workers / Vercel Edge.

### 🧠 2. Zero-Cost Inference Pipeline (NVIDIA NIM + Gemini)

- **Path**: [`src/inference/nvidia.ts`](file:///Users/cryptojoker710/Desktop/pai-universe/infrastructure/pi-worker/src/inference/nvidia.ts)
- Leverages the **NVIDIA Developer Program API** (`https://integrate.api.nvidia.com/v1`) using free API credits for models:
  - `meta/llama-3.3-70b-instruct`
  - `deepseek-ai/deepseek-r1`
  - `nvidia/nemotron-4-340b-instruct`
- Automatic fallback to **Google Gemini 2.5 Flash** free tier (`@google/generative-ai`).

### ⚡ 3. Superteam-Inspired Autonomous Job & Bounty Engine

- **Path**: [`src/agentic/job_engine.ts`](file:///Users/cryptojoker710/Desktop/pai-universe/infrastructure/pi-worker/src/agentic/job_engine.ts)
- Automatically polls [`earn.axiomid.app/v1/bounties`](file:///Users/cryptojoker710/Desktop/pai-universe/infrastructure/protocol-stubs) every heartbeat interval.
- Inspects `/skill.md` task specifications.
- Executes tasks via the Zero-Cost Inference engine.
- Generates cryptographic receipts (`spec.ppp`).
- Submits proof-of-work and claims Pi Network rewards automatically with **zero human intervention**.

### 💎 4. Pi Pioneer Node Shared Compute Network

- **Path**: [`src/node/compute_network.ts`](file:///Users/cryptojoker710/Desktop/pai-universe/infrastructure/pi-worker/src/node/compute_network.ts)
- Pioneer device registration (desktop, mobile, server).
- Flexible revenue sharing model:
  - **Standard Tier**: **80% Pioneer** / **20% Treasury**
  - **Pro Tier**: **95% Pioneer** / **5% Treasury**

---

## Ecosystem Integration Map

```
                  +-----------------------------------+
                  |      Telegram 24/7 Live Bot       |
                  |    (Direct user command & status) |
                  +-----------------+-----------------+
                                    |
                                    v
+-----------------------------------------------------------------------------+
|                              PiWorker 2.0 Core                              |
|                                                                             |
|  +------------------------+  +----------------------+  +------------------+ |
|  | Zero-Cost AI Inference |  | Superteam Job Engine |  | Pi Node Compute  | |
|  |   (NVIDIA NIM/Gemini)  |  | (earn.axiomid.app)   |  |   (80/20 & 95/5) | |
|  +-----------+------------+  +----------+-----------+  +--------+---------+ |
+--------------|--------------------------|-----------------------|-----------+
               |                          |                       |
               v                          v                       v
+-----------------------------------------------------------------------------+
|                         PAI Universe 7-Layer Mesh                           |
|  L1: AxiomID (did:axiom:pi) | L4: pai-skills | L5: pai-memory | Edge Worker |
+-----------------------------------------------------------------------------+
```

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests
npm test

# 3. Type check
npm run typecheck

# 4. Build Go CLI
npm run build:cli
```

---

## Environment Configuration (`.env`)

```env
NVIDIA_API_KEY=nvapi-...
GEMINI_API_KEY=AIzaSy...
TELEGRAM_BOT_TOKEN=123456789:ABC...
SOVEREIGN_AUTH_TOKEN=aip_tok_...
```

---

## License

PiOS — Pi Open Source License | SOUL Protocol v2.5
