/**
 * PiWorker 2.0 — Pi Pioneer Node Shared Compute Network
 * Manages background device node compute registration and revenue sharing (80/20 or 95/5 splits).
 */

export interface PioneerNode {
  nodeId: string;
  pioneerWallet: string;
  deviceType: 'desktop' | 'mobile' | 'server';
  tier: 'standard' | 'pro'; // Standard = 80/20 split, Pro = 95/5 split
  active: boolean;
  tasksCompleted: number;
  totalEarningsPi: number;
}

export interface RewardDistribution {
  nodeId: string;
  grossAmountPi: number;
  pioneerSharePi: number;
  treasurySharePi: number;
  pioneerPercentage: number;
  timestamp: string;
}

export class PiNodeComputeNetwork {
  private nodes: Map<string, PioneerNode> = new Map();

  /** Register a pioneer's device node */
  public registerNode(
    pioneerWallet: string,
    deviceType: 'desktop' | 'mobile' | 'server' = 'desktop',
    tier: 'standard' | 'pro' = 'standard'
  ): PioneerNode {
    const nodeId = `node_pi_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    const node: PioneerNode = {
      nodeId,
      pioneerWallet,
      deviceType,
      tier,
      active: true,
      tasksCompleted: 0,
      totalEarningsPi: 0,
    };

    this.nodes.set(nodeId, node);
    return node;
  }

  /** Distribute earnings from background mining / ad revenue / inference tasks */
  public distributeEarnings(nodeId: string, grossAmountPi: number): RewardDistribution {
    const node = this.nodes.get(nodeId);
    const tier = node?.tier || 'standard';
    const pioneerPercentage = tier === 'pro' ? 95 : 80;

    const pioneerSharePi = Number(((grossAmountPi * pioneerPercentage) / 100).toFixed(4));
    const treasurySharePi = Number((grossAmountPi - pioneerSharePi).toFixed(4));

    if (node) {
      node.tasksCompleted += 1;
      node.totalEarningsPi += pioneerSharePi;
    }

    return {
      nodeId,
      grossAmountPi,
      pioneerSharePi,
      treasurySharePi,
      pioneerPercentage,
      timestamp: new Date().toISOString(),
    };
  }

  /** Get registered node details */
  public getNode(nodeId: string): PioneerNode | undefined {
    return this.nodes.get(nodeId);
  }

  /** List all active nodes */
  public listNodes(): PioneerNode[] {
    return Array.from(this.nodes.values());
  }
}
