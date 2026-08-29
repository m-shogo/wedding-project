import type {WeddingProductionRecovery} from './resolveHandoff.schema.ts';

export type ProductionRecoveryAction = WeddingProductionRecovery['blockerActions'][number];

export function assertProductionRecoveryActionTargets(
  actions: readonly ProductionRecoveryAction[],
  context = 'production recovery',
): void {
  for (const action of actions) {
    if (action.kind === 'ROUTE') {
      if (!action.route) throw new Error(`${context}: ROUTE action ${action.id} is missing route`);
      if (action.command) throw new Error(`${context}: ROUTE action ${action.id} must not carry command`);
      continue;
    }
    if (action.kind === 'COMMAND') {
      if (!action.command) throw new Error(`${context}: COMMAND action ${action.id} is missing command`);
      if (action.route) throw new Error(`${context}: COMMAND action ${action.id} must not carry route`);
      continue;
    }
    if (action.route || action.command) {
      throw new Error(`${context}: HUMAN action ${action.id} must not carry executable route/command targets`);
    }
  }
}
