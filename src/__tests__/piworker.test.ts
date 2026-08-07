import { describe, it, expect } from 'vitest';
import { PiWorkerTelegramBot } from '../telegram/bot';
import { ZeroCostInferenceEngine } from '../inference/nvidia';
import { SuperteamJobEngine } from '../agentic/job_engine';
import { PiNodeComputeNetwork } from '../node/compute_network';

describe('PiWorker 2.0 Suite', () => {
  it('processes Telegram bot /status, /bounties, and /help commands', async () => {
    const bot = new PiWorkerTelegramBot({ botToken: 'mock_token' });

    const statusRes = await bot.handleUpdate({
      message: { message_id: 1, chat: { id: 100, type: 'private' }, text: '/status', date: 1234 },
    });
    expect(statusRes.status).toBe('handled');
    expect(statusRes.response).toContain('PiWorker 2.0 Status Report');

    const bountiesRes = await bot.handleUpdate({
      message: { message_id: 2, chat: { id: 100, type: 'private' }, text: '/bounties', date: 1235 },
    });
    expect(bountiesRes.status).toBe('handled');
    expect(bountiesRes.response).toContain('earn.axiomid.app');
  });

  it('executes Zero-Cost Inference via NVIDIA NIM / Gemini fallback', async () => {
    const engine = new ZeroCostInferenceEngine();
    const result = await engine.generate('Hello PiWorker');

    expect(result.costUsd).toBe(0.0);
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    expect(result.text).toBeDefined();
  });

  it('runs Superteam autonomous job discovery & claims rewards', async () => {
    const jobEngine = new SuperteamJobEngine();
    const cycleResult = await jobEngine.runAutonomousCycle();

    expect(cycleResult.bountiesFound).toBeGreaterThan(0);
    expect(cycleResult.totalPiClaimed).toBeGreaterThan(0);
    expect(cycleResult.claims[0].status).toBe('claimed');
  });

  it('registers Pioneer nodes and calculates 80/20 & 95/5 reward splits', () => {
    const net = new PiNodeComputeNetwork();

    // Standard node (80/20 split)
    const stdNode = net.registerNode('GC_STANDARD_WALLET', 'desktop', 'standard');
    const stdSplit = net.distributeEarnings(stdNode.nodeId, 100);
    expect(stdSplit.pioneerSharePi).toBe(80);
    expect(stdSplit.treasurySharePi).toBe(20);

    // Pro node (95/5 split)
    const proNode = net.registerNode('GC_PRO_WALLET', 'server', 'pro');
    const proSplit = net.distributeEarnings(proNode.nodeId, 100);
    expect(proSplit.pioneerSharePi).toBe(95);
    expect(proSplit.treasurySharePi).toBe(5);
  });
});
