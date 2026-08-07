# PiWorker — Cloudflare Worker Autonomous Agent ۞

> **"وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ"** — التوبة: 105

[![SOUL Protocol](https://img.shields.io/badge/SOUL-Protocol_v2.5-00f0ff.svg)](https://axiomid.app)
[![Pi Network](https://img.shields.io/badge/Ecosystem-Pi_Network-ffaa00.svg)](https://earn.axiomid.app)
[![Cloudflare](https://img.shields.io/badge/Edge-Cloudflare_Workers-f38020.svg)](https://workers.cloudflare.com)

---

## Overview

**PiWorker** is a **Cloudflare Worker** that runs as a 24/7 autonomous agent within the **PAI Universe** ecosystem (`axiomid.app`). It bridges Pi Network, zero-cost AI inference, and Cloudflare's global edge for serverless agent execution.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      PiWorker Cloudflare Worker                 │
├─────────────────────────────────────────────────────────────────┤
│  src/telegram/bot.ts       →  Telegram 24/7 bot interface      │
│  src/inference/nvidia.ts   →  Zero-cost AI inference (NVIDIA +  │
│                               Google Gemini fallback)            │
│  src/agentic/job_engine.ts →  Autonomous bounty/job processor   │
│                               from earn.axiomid.app              │
│  src/node/compute_network.ts → Pi Pioneer Node compute mesh    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PAI Universe 7-Layer Mesh                    │
│  L1: AxiomID (did:axiom:pi)  L4: pai-skills  L5: pai-memory    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Modules (src/)

| Module | Purpose |
|--------|---------|
| `telegram/bot.ts` | Telegram bot: `/status`, `/bounties`, `/ai <prompt>`, `/help` |
| `inference/nvidia.ts` | NVIDIA NIM free tier + Gemini 2.5 Flash fallback |
| `agentic/job_engine.ts` | Polls `earn.axiomid.app/v1/bounties`, executes, submits proof |
| `node/compute_network.ts` | Pioneer Node registration, 80/20 & 95/5 revenue split |

---

## Shared Core (core/)

| Package | Purpose |
|---------|---------|
| `core/identity/` | DID, keys, DNA, AxiomID resolver |
| `core/finance/` | Pi integration, treasury, price oracle |
| `core/engine/` | Bridge, client, plugin gateway, Aix foundry |
| `core/security/` | Signature provider, sovereign shield |

---

## Quick Start

```bash
# 1. Install dependencies (workspaces: core, plugins/*, src)
npm install

# 2. Run type check
npm run typecheck

# 3. Run tests
npm test

# 4. Build Go CLI
npm run build:cli

# 5. Develop locally
npm run dev

# 6. Deploy to Cloudflare Workers
npm run deploy
```

---

## Environment (`.env`)

```env
NVIDIA_API_KEY=nvapi-...
GEMINI_API_KEY=AIzaSy...
TELEGRAM_BOT_TOKEN=123456789:ABC...
SOVEREIGN_AUTH_TOKEN=aip_tok_...
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev via `wrangler dev` |
| `npm run deploy` | Deploy to Cloudflare Workers |
| `npm run test` | Run vitest suite |
| `npm run typecheck` | TypeScript strict check |
| `npm run lint` | Prettier check |
| `npm run format` | Prettier write |
| `npm run build:cli` | Build Go CLI binary |

---

## Project Structure (Post-Cleanup)

```
pi-worker/
├── package.json              # workspaces: core, plugins/*, src
├── tsconfig.json             # strict, bundler, ESNext
├── tsconfig.core.json        # core/plugins/src shared config
├── vitest.config.ts          # vitest node env
├── wrangler.jsonc            # Cloudflare Worker config
├── core/                     # Shared TS modules
│   ├── identity/             # DID, keys, DNA, resolver
│   ├── finance/              # Pi, treasury, price oracle
│   ├── engine/               # Bridge, client, plugin gateway
│   └── security/             # Signatures, shield
├── plugins/                  # 11 plugins (single .ts each)
│   └── */index.ts + manifest.json
├── src/                      # Worker entry points
│   ├── telegram/bot.ts
│   ├── inference/nvidia.ts
│   ├── agentic/job_engine.ts
│   └── node/compute_network.ts
├── cmd/piworker/             # Go CLI
│   └── main.go
└── AGENTS.md                 # SOUL Protocol
```

---

## License

PiOS — Pi Open Source License | SOUL Protocol v2.5